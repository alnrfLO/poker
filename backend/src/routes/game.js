import { Router } from "express";
import { rooms } from "./rooms.js";

const router = Router();

/**
* @swagger
* /api/rooms/{id}/start:
* post:
* summary: Lance la partie
* tags: [Game]
* parameters:
* - in: path
* name: id
* required: true
* schema:
* type: string
* responses:
* 200:
* description: Partie lancée
* 400:
* description: Pas assez de joueurs ou partie déjà lancée
* 404:
* description: Salle introuvable
*/
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

/**
* @swagger
* /api/rooms/{id}/action:
* post:
* summary: Effectue une action de jeu
* tags: [Game]
* parameters:
* - in: path
* name: id
* required: true
* schema:
* type: string
* requestBody:
* required: true
* content:
* application/json:
* schema:
* type: object
* required:
* - playerId
* - action
* properties:
* playerId:
* type: integer
* example: 0
* action:
* type: string
* enum: [fold, check, call, raise]
* example: "call"
* amount:
* type: integer
* example: 40
* responses:
* 200:
* description: Action effectuée
* 400:
* description: Action invalide
* 404:
* description: Salle introuvable
*/
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

/**
* @swagger
* /api/rooms/{id}/state:
* get:
* summary: Récupère l'état actuel de la partie
* tags: [Game]
* parameters:
* - in: path
* name: id
* required: true
* schema:
* type: string
* responses:
* 200:
* description: État de la partie
* content:
* application/json:
* schema:
* $ref: '#/components/schemas/Room'
* 404:
* description: Salle introuvable
*/
router.get("/:id/state", (req, res) => {
    const room = rooms.get(req.params.id.toUpperCase());
    if (!room) return res.status(404).json({ success: false, message: "Salle introuvable" });
    res.json({ success: true, state: room });
});

export { router };
