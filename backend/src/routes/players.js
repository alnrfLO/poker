import { Router } from "express";
import { rooms } from "./rooms.js";

const router = Router();

/**
* @swagger
* /api/rooms/{id}/players:
* get:
* summary: Liste les joueurs d'une salle
* tags: [Players]
* parameters:
* - in: path
* name: id
* required: true
* schema:
* type: string
* responses:
* 200:
* description: Liste des joueurs
* 404:
* description: Salle introuvable
*/
router.get("/:id/players", (req, res) => {
    const room = rooms.get(req.params.id.toUpperCase());
    if (!room) return res.status(404).json({ success: false, message: "Salle introuvable" });
    res.json({ success: true, players: room.players });
});

/**
* @swagger
* /api/rooms/{id}/players/{playerId}:
* get:
* summary: Récupère un joueur spécifique
* tags: [Players]
* parameters:
* - in: path
* name: id
* required: true
* schema:
* type: string
* - in: path
* name: playerId
* required: true
* schema:
* type: integer
* responses:
* 200:
* description: Détails du joueur
* content:
* application/json:
* schema:
* $ref: '#/components/schemas/Player'
* 404:
* description: Joueur ou salle introuvable
*/
router.get("/:id/players/:playerId", (req, res) => {
    const room = rooms.get(req.params.id.toUpperCase());
    if (!room) return res.status(404).json({ success: false, message: "Salle introuvable" });
    
    const player = room.players.find((p) => p.id === parseInt(req.params.playerId));
    if (!player) return res.status(404).json({ success: false, message: "Joueur introuvable" });
    
    res.json({ success: true, player });
});

export { router };

