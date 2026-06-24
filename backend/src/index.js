import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./swagger.js";
import { router as roomsRouter } from "./routes/rooms.js";
import { router as playersRouter } from "./routes/players.js";
import { router as gameRouter } from "./routes/game.js";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());


app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
    customCss: `
    .swagger-ui .topbar { background: linear-gradient(135deg, #1a0a2e, #0d1a0d); }
    .swagger-ui .topbar-wrapper img { content: url(''); }
    .swagger-ui .topbar-wrapper::before { content: '♠ Poker API'; color: #eab308; font-size: 1.5rem; font-weight: 900; }
  `,
    customSiteTitle: "♠ Poker API Docs",
}));


app.use("/api/rooms", roomsRouter);
app.use("/api/rooms", playersRouter);
app.use("/api/rooms", gameRouter);


app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "♠ Poker API is running !",
        docs: `http://localhost:${PORT}/api-docs`,
        version: "1.0.0",
    });
});

app.listen(PORT, () => {
    console.log(`♠ Poker API running on http://localhost:${PORT}`);
    console.log(`📚 Swagger docs: http://localhost:${PORT}/api-docs`);
});