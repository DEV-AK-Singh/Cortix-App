import express from "express";
import analyzeRouter from "./routes/analyze.js";
import infraGenRouter from "./routes/infraGen.js";
import infraExporterRouter from "./routes/infraExport.js";
import cors from "cors";

const app = express();
app.use(cors())
app.use(express.json());

app.use("/api/analyze", analyzeRouter);
app.use("/api/infra-gen", infraGenRouter);
app.use("/api/infra-export", infraExporterRouter);

app.use("/api/health", (req, res) => {
    res.json({ status: "OK" });
});

app.get("/", (req, res) => {
    res.json({ message: "AKS Repo Inspector API is running 🚀" });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`🔥 Server running on port ${PORT}`);
});

export default app;