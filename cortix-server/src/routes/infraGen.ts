import express from "express";
import axios from "axios";
import { configDotenv } from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

configDotenv({ path: ".env" });

const gemini = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

const router = express.Router();

interface InfraGenRequest {
    repoMeta: any; // your JSON containing everything you analysed
    dockerBaseImage?: string;
}

function buildPrompt(repoMeta: any, baseImage: string) {
    return `
You are an expert DevOps engineer.

Below is a complete JSON object describing a project's entire structure:
- files & folders
- frontend framework
- backend framework
- runtime
- build tools
- dev tools
- infra hints
- ports
- environment variables used
- database choice
- queue system
- API endpoints
- language/toolchain details

===PROJECT_METADATA_JSON===
${JSON.stringify(repoMeta, null, 2)}
===END_JSON===

Your task: Generate infrastructure configuration files.

You MUST output **strictly using these delimiters**:

===DOCKERFILE===
<dockerfile content>
===DOCKER-COMPOSE===
<docker compose content>
===INFRA-BASH===
<bash script content>
===END===

### RULES:
- Produce a production-ready Dockerfile.
- If TypeScript → multi-stage build.
- If React/Vite frontend → dedicated build and serve or Nginx static.
- If backend Node/Express → expose proper port.
- If database present → add to compose.
- Add comments explaining important infra decisions.
- infra.sh script should include: build, up, down, logs, migrate, reset.
- No markdown formatting. Only raw file contents inside delimiters.
- Keep everything concise and professional.
`;
}

async function callGemini(prompt: string) {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY missing");
  }

  // Choose model (you can change this)
  const model = gemini.getGenerativeModel({
    model: "gemini-2.5-flash-lite", // or "gemini-1.5-flash"
  });

  const result = await model.generateContent(prompt);

  // depending on SDK version, it's usually result.response.text()
  return result.response.text();
}

function parseOutput(raw: string) {
    const extract = (key: string) => {
        const start = `===${key}===`;
        const end = /===DOCKERFILE===|===DOCKER-COMPOSE===|===INFRA-BASH===|===END===/;

        const withoutStart = raw.split(start)[1];
        if (!withoutStart) return "";

        const next = withoutStart.split(end)[0];
        return next.trim();
    };

    return {
        dockerfile: extract("DOCKERFILE"),
        compose: extract("DOCKER-COMPOSE"),
        bash: extract("INFRA-BASH"),
    };
}

router.post("/", async (req, res) => {
    try {
        const { repoMeta, dockerBaseImage = "node:18-alpine" } =
            req.body as InfraGenRequest;

        if (!repoMeta) {
            return res.status(400).json({ error: "repoMeta JSON is required" });
        }

        const prompt = buildPrompt(repoMeta, dockerBaseImage);
        const raw = await callGemini(prompt);
        const parsed = parseOutput(raw);

        return res.json({
            success: true,
            promptUsed: prompt.length,
            generated: {
                dockerfile: parsed.dockerfile,
                docker_compose: parsed.compose,
                infra_bash: parsed.bash,
            },
            raw,
        });
    } catch (err: any) {
        console.error("infra-gen error:", err);
        res.status(500).json({ error: err.message });
    }
});

export default router;
