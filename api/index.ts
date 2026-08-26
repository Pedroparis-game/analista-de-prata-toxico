import express from "express";
import geminiRoutes from "../server/geminiRoutes";

const app = express();

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

app.use("/api/gemini", geminiRoutes);

export default app;
