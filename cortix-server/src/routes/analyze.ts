import { Router } from "express";
import { inspectRepositoryService } from "../services/inspector.js";
import { formatToRepoAnalysis } from "../utils/format.js";

const router = Router();

router.post("/", async (req, res) => {
    try {
        const { repoUrl, flags } = req.body;

        if (!repoUrl) {
            return res.status(400).json({ error: "repoUrl is required." });
        }

        const result = await inspectRepositoryService(repoUrl, flags);
        const formatted = formatToRepoAnalysis(repoUrl, result);

        res.status(200).json(formatted);
    } catch (err: any) {
        console.error(err);
        res.status(500).json({ error: err.message || "Unknown error" });
    }
});

export default router;
