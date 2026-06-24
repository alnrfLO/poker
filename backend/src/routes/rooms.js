import { Router } from "express";
import { v4 as uuidv4 } from "uuid";

const router = Router();

// Stockage en mémoire (sera remplacé par Firebase/DB plus tard)
const rooms = new Map();

function generateRoomId() {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
}

/**
* @swagger
* /api/rooms:
* get:
* summary: Liste toutes les salles actives
* tags: [Rooms]
* responses:
* 200:
* description: Liste des salles
* content:
* application/json:
* schema:
* type: object
* properties:
* success:
* type: boolean
* rooms:
* type: array
* items:
* $ref: '#/components/schemas/Room'
*/
router.get("/", (req, res) => {
    const allRooms = Array.from(rooms.values()).map((r) => ({
        id: r.id,
        phase: r.phase,
        playerCount: r.players.length,
        createdAt: r.createdAt,
    }));
    res.json({ success: true, rooms: allRooms });
});

/**
* @swagger
* /api/rooms/{id}:
* get:
* summary: Récupère une salle par son ID
* tags: [Rooms]
* parameters:
* - in: path
* name: id
* required: true
* schema:
* type: string
* description: ID de la salle
* responses:
* 200:
* description: Détails de la salle
* content:
* application/json:
* schema:
* $ref: '#/components/schemas/Room'
* 404:
* description: Salle introuvable
* content:
* application/json:
* schema:
* $ref: '#/components/schemas/Error'
*/
router.get("/:id", (req, res) => {
    const room = rooms.get(req.params.id.toUpperCase());
    if (!room) {
        return res.status(404).json({ success: false, message: "Salle introuvable" });
    }
    res.json({ success: true, room });
});

/**
* @swagger
* /api/rooms:
* post:
* summary: Crée une nouvelle salle
* tags: [Rooms]
* requestBody:
* required: true
* content:
* application/json:
* schema:
* type: object
* required:
* - playerName
* properties:
* playerName:
* type: string
* example: "raf"
* responses:
* 201:
* description: Salle créée avec succès
* content:
* application/json:
* schema:
* type: object
* properties:
* success:
* type: boolean
* roomId:
* type: string
* playerId:
* type: integer
* 400:
* description: Données manquantes
*/
router.post("/", (req, res) => {
    const { playerName } = req.body;
    if (!playerName?.trim()) {
        return res.status(400).json({ success: false, message: "Nom du joueur requis" });
    }
    
    const roomId = generateRoomId();
    const player = {
        id: 0,
        name: playerName.trim(),
        chips: 1000,
        hand: [],
        bet: 0,
        status: "active",
        isHuman: true,
        isHost: true,
    };
    
    const room = {
        id: roomId,
        phase: "waiting",
        players: [player],
        communityCards: [],
        pot: 0,
        currentPlayerIndex: 0,
        dealerIndex: 0,
        currentBet: 0,
        winner: null,
        createdAt: Date.now(),
    };
    
    rooms.set(roomId, room);
    res.status(201).json({ success: true, roomId, playerId: 0 });
});

/**
* @swagger
* /api/rooms/{id}/join:
* post:
* summary: Rejoindre une salle existante
* tags: [Rooms]
* parameters:
* - in: path
* name: id
* required: true
* schema:
* type: string
* description: ID de la salle
* requestBody:
* required: true
* content:
* application/json:
* schema:
* type: object
* required:
* - playerName
* properties:
* playerName:
* type: string
* example: "tazk"
* responses:
* 200:
* description: Joueur ajouté avec succès
* 404:
* description: Salle introuvable
* 400:
* description: Salle pleine ou erreur
*/
router.post("/:id/join", (req, res) => {
    const room = rooms.get(req.params.id.toUpperCase());
    if (!room) return res.status(404).json({ success: false, message: "Salle introuvable" });
    if (room.players.length >= 4) return res.status(400).json({ success: false, message: "Salle pleine (max 4 joueurs)" });
    if (room.phase !== "waiting") return res.status(400).json({ success: false, message: "Partie déjà en cours" });
    
    const { playerName } = req.body;
    if (!playerName?.trim()) return res.status(400).json({ success: false, message: "Nom du joueur requis" });
    
    const playerId = room.players.length;
    const player = {
        id: playerId,
        name: playerName.trim(),
        chips: 1000,
        hand: [],
        bet: 0,
        status: "active",
        isHuman: true,
        isHost: false,
    };
    
    room.players.push(player);
    res.json({ success: true, playerId, roomId: room.id });
});

/**
* @swagger
* /api/rooms/{id}:
* delete:
* summary: Supprime une salle
* tags: [Rooms]
* parameters:
* - in: path
* name: id
* required: true
* schema:
* type: string
* responses:
* 200:
* description: Salle supprimée
* 404:
* description: Salle introuvable
*/
router.delete("/:id", (req, res) => {
    const id = req.params.id.toUpperCase();
    if (!rooms.has(id)) return res.status(404).json({ success: false, message: "Salle introuvable" });
    rooms.delete(id);
    res.json({ success: true, message: "Salle supprimée" });
});

export { router, rooms };