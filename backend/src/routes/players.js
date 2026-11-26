import { Router } from "express";
import { rooms } from "./rooms.js";

const router = Router();

router.get("/:id/players", (req, res) => {
    const room = rooms.get(req.params.id.toUpperCase());
    if (!room) return res.status(404).json({ success: false, message: "Salle introuvable" });
    res.json({ success: true, players: room.players });
});

router.get("/:id/players/:playerId", (req, res) => {
    const room = rooms.get(req.params.id.toUpperCase());
    if (!room) return res.status(404).json({ success: false, message: "Salle introuvable" });
    
    const player = room.players.find((p) => p.id === parseInt(req.params.playerId));
    if (!player) return res.status(404).json({ success: false, message: "Joueur introuvable" });
    
    res.json({ success: true, player });
});

export { router };

