import express from "express";
import fs from "fs";
import path from "path";
import { zipFolder } from "../utils/zip.js";
import { cleanLLMOutput } from "../utils/cleanLLMOutput.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { dockerfile, docker_compose, infra_bash } = req.body;

    if (!dockerfile || !docker_compose || !infra_bash) {
      return res.status(400).json({
        error: "Missing fields. Required: dockerfile, docker_compose, infra_bash"
      });
    }

    // Create a unique temp directory for each request
    const folderName = `infra_${Date.now()}`;
    const folderPath = path.join(process.cwd(), "generated", folderName);
    fs.mkdirSync(folderPath, { recursive: true });

    // Write files
    fs.writeFileSync(path.join(folderPath, "Dockerfile"), cleanLLMOutput(dockerfile));
    fs.writeFileSync(path.join(folderPath, "docker-compose.yml"), cleanLLMOutput(docker_compose));
    fs.writeFileSync(path.join(folderPath, "infra.sh"), cleanLLMOutput(infra_bash));

    // Make infra.sh executable
    fs.chmodSync(path.join(folderPath, "infra.sh"), 0o755);

    // Create ZIP path
    const zipPath = path.join(process.cwd(), "generated", `${folderName}.zip`);

    // Zip it
    await zipFolder(folderPath, zipPath);

    // Send ZIP for download
    res.download(zipPath, `${folderName}.zip`, err => {
      if (err) {
        console.error("Download error:", err);
      }

      // Optional: cleanup after download
      // fs.rmSync(folderPath, { recursive: true, force: true });
      // fs.rmSync(zipPath, { force: true });
    });

  } catch (error) {
    console.error("infraExport error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
