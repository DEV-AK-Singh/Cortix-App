import express from "express";
import analyzeRouter from "./routes/analyze.js";
import cors from "cors";

const app = express();
app.use(cors())
app.use(express.json());

app.use("/analyze", analyzeRouter);

app.get("/", (req, res) => {
    res.json({ message: "AKS Repo Inspector API is running 🚀" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🔥 Server running on port ${PORT}`);
});

export default app;