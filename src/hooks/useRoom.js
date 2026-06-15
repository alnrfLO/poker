import { useState } from "react";
import { db } from "../firebase";
import { ref, set, get, onValue, update } from "firebase/database";
import { PHASES, PLAYER_STATUS, CONFIG } from "../utils/constants";
import { createDeck, shuffleDeck, dealCards } from "../utils/deck";

function generateRoomId() {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
}

function createInitialPlayer(id, name, isHost) {
  return {
    id,
    name,
    chips: CONFIG.STARTING_CHIPS,
    hand: [],
    bet: 0,
    status: PLAYER_STATUS.ACTIVE,
    isHuman: true,
    isHost,
    ready: false,
  };
}

export function useRoom() {
  const [roomId, setRoomId] = useState(null);
  const [playerId, setPlayerId] = useState(null);
  const [playerName, setPlayerName] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  async function createRoom(name) {
    setLoading(true);
    setError(null);
    try {
      const id = generateRoomId();
      const pId = 0;
      const player = createInitialPlayer(pId, name, true);

      await set(ref(db, `rooms/${id}`), {
        id,
        phase: PHASES.WAITING,
        players: [player],
        communityCards: [],
        pot: 0,
        currentPlayerIndex: 0,
        dealerIndex: 0,
        currentBet: 0,
        winner: null,
        createdAt: Date.now(),
      });

      setRoomId(id);
      setPlayerId(pId);
      setPlayerName(name);
      setLoading(false);
      return id;
    } catch (e) {
      setError("Erreur lors de la création de la salle.");
      setLoading(false);
    }
  }

async function joinRoom(id, name) {
  setLoading(true);
  setError(null);
  try {
    const snapshot = await get(ref(db, `rooms/${id}`));
    if (!snapshot.exists()) {
      setError("Salle introuvable.");
      setLoading(false);
      return false;
    }

    const room = snapshot.val();
    const players = room.players || [];

    if (players.length >= 4) {
      setError("La salle est pleine (max 4 joueurs).");
      setLoading(false);
      return false;
    }

    const pId = players.length;
    const player = createInitialPlayer(pId, name, false);
    const updatedPlayers = [...players, player];

    await update(ref(db, `rooms/${id}`), { players: updatedPlayers });

    setRoomId(id);
    setPlayerId(pId);
    setPlayerName(name);
    setLoading(false);
    return pId; 
  } catch (e) {
    setError("Erreur lors de la connexion à la salle.");
    setLoading(false);
    return false;
  }
}
  async function startGame(id, players) {
    let deck = shuffleDeck(createDeck());
    let remaining = deck;

    const updatedPlayers = players.map((p) => {
      const { cards, remainingDeck } = dealCards(remaining, 2);
      remaining = remainingDeck;
      return {
        ...p,
        hand: cards,
        bet: 0,
        status: PLAYER_STATUS.ACTIVE,
      };
    });

    const smallIdx = 1 % updatedPlayers.length;
    const bigIdx = 2 % updatedPlayers.length;
    updatedPlayers[smallIdx].chips -= CONFIG.SMALL_BLIND;
    updatedPlayers[smallIdx].bet = CONFIG.SMALL_BLIND;
    updatedPlayers[bigIdx].chips -= CONFIG.BIG_BLIND;
    updatedPlayers[bigIdx].bet = CONFIG.BIG_BLIND;

    const firstToAct = 3 % updatedPlayers.length;

    await update(ref(db, `rooms/${id}`), {
      phase: PHASES.PREFLOP,
      players: updatedPlayers,
      communityCards: [],
      pot: CONFIG.SMALL_BLIND + CONFIG.BIG_BLIND,
      currentPlayerIndex: firstToAct,
      currentBet: CONFIG.BIG_BLIND,
      dealerIndex: 0,
      winner: null,
      deck: remaining,
    });
  }

  return {
    roomId, playerId, playerName,
    error, loading,
    createRoom, joinRoom, startGame,
  };
}