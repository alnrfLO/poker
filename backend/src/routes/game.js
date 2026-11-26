import { Router } from "express";
import { rooms } from "./rooms.js";

const router = Router();

router.post("/:id/start", (req, res) => {
    const room = rooms.get(req.params.id.toUpperCase());
    if (!room) return res.status(404).json({ success: false, message: "Salle introuvable" });
    if (room.players.length < 2) return res.status(400).json({ success: false, message: "Minimum 2 joueurs requis" });
    if (room.phase !== "waiting") return res.status(400).json({ success: false, message: "Partie déjà en cours" });
    
    room.phase = "preflop";
    room.currentBet = 20;
    room.pot = 30;
    res.json({ success: true, message: "Partie lancée !", phase: room.phase });
});

router.post("/:id/action", (req, res) => {
    const room = rooms.get(req.params.id.toUpperCase());
    if (!room) return res.status(404).json({ success: false, message: "Salle introuvable" });
    if (room.phase === "waiting") return res.status(400).json({ success: false, message: "La partie n'a pas encore commencé" });
    
    const { playerId, action, amount = 0 } = req.body;
    const player = room.players.find((p) => p.id === playerId);
    if (!player) return res.status(404).json({ success: false, message: "Joueur introuvable" });
    if (room.currentPlayerIndex !== playerId) return res.status(400).json({ success: false, message: "Ce n'est pas ton tour" });
    
    const validActions = ["fold", "check", "call", "raise"];
    if (!validActions.includes(action)) return res.status(400).json({ success: false, message: "Action invalide" });
    
    res.json({ success: true, action, playerId, message: `Action ${action} enregistrée` });
});

router.get("/:id/state", (req, res) => {
    const room = rooms.get(req.params.id.toUpperCase());
    if (!room) return res.status(404).json({ success: false, message: "Salle introuvable" });
    res.json({ success: true, state: room });
});

export { router };
