import { Router } from "express";
import { v4 as uuidv4 } from "uuid";

const router = Router();

const rooms = new Map();

function generateRoomId() {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
}

router.get("/", (req, res) => {
    const allRooms = Array.from(rooms.values()).map((r) => ({
        id: r.id,
        phase: r.phase,
        playerCount: r.players.length,
        createdAt: r.createdAt,
    }));
    res.json({ success: true, rooms: allRooms });
});

router.get("/:id", (req, res) => {
    const room = rooms.get(req.params.id.toUpperCase());
    if (!room) {
        return res.status(404).json({ success: false, message: "Salle introuvable" });
    }
    res.json({ success: true, room });
});

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

router.delete("/:id", (req, res) => {
    const id = req.params.id.toUpperCase();
    if (!rooms.has(id)) return res.status(404).json({ success: false, message: "Salle introuvable" });
    rooms.delete(id);
    res.json({ success: true, message: "Salle supprimée" });
});

export { router, rooms };