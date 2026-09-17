import express from "express";
import geminiRoutes from "../server/geminiRoutes";
import henrikRoutes from "../server/henrikRoutes";

const app = express();
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

app.use("/api/gemini", geminiRoutes);
app.use("/gemini", geminiRoutes);
app.use("/api/henrik", henrikRoutes);
app.use("/henrik", henrikRoutes);

export default (req: any, res: any) => app(req, res);
