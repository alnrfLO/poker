import { useState, useEffect } from "react";
import { db } from "../firebase";
import { ref, onValue, update } from "firebase/database";
import { PHASES, PLAYER_STATUS, CONFIG } from "../utils/constants";
import { dealCards } from "../utils/deck";

export function useGameState(roomId) {
  const [gameState, setGameState] = useState(null);

  useEffect(() => {
    if (!roomId) return;
    const roomRef = ref(db, `rooms/${roomId}`);
    const unsub = onValue(roomRef, (snapshot) => {
      if (snapshot.exists()) {
        setGameState(snapshot.val());
      }
    });
    return () => unsub();
  }, [roomId]);

  async function updateState(changes) {
    if (!roomId) return;
    await update(ref(db, `rooms/${roomId}`), changes);
  }

  async function nextPhase(state) {
    const { phase, deck, players, communityCards } = state;
    let newCommunity = [...(communityCards || [])];
    let newDeck = [...(deck || [])];
    let newPhase = phase;

    const resetPlayers = players.map((p) => ({ ...p, bet: 0 }));
    const firstActive = resetPlayers.findIndex((p) => p.status === PLAYER_STATUS.ACTIVE);

    if (phase === PHASES.PREFLOP) {
      const { cards, remainingDeck } = dealCards(newDeck, 3);
      newCommunity = cards;
      newDeck = remainingDeck;
      newPhase = PHASES.FLOP;
    } else if (phase === PHASES.FLOP) {
      const { cards, remainingDeck } = dealCards(newDeck, 1);
      newCommunity = [...newCommunity, ...cards];
      newDeck = remainingDeck;
      newPhase = PHASES.TURN;
    } else if (phase === PHASES.TURN) {
      const { cards, remainingDeck } = dealCards(newDeck, 1);
      newCommunity = [...newCommunity, ...cards];
      newDeck = remainingDeck;
      newPhase = PHASES.RIVER;
    } else if (phase === PHASES.RIVER) {
      newPhase = PHASES.SHOWDOWN;
    }

    await updateState({
      phase: newPhase,
      communityCards: newCommunity,
      deck: newDeck,
      currentBet: 0,
      currentPlayerIndex: firstActive,
      players: resetPlayers,
    });

    return newPhase === PHASES.SHOWDOWN;
  }

  return { gameState, updateState, nextPhase };
}