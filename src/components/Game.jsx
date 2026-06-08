import React, { useEffect, useState } from "react";
import Table from "./Table";
import { useGameState } from "../hooks/useGameState";
import { usePokerLogic } from "../hooks/usePokerLogic";
import { PHASES, CONFIG } from "../utils/constants";

export default function Game() {
  const gameState = useGameState();
  const { handleAction, runAI } = usePokerLogic(gameState);
  const [raiseAmount, setRaiseAmount] = useState(CONFIG.BIG_BLIND * 2);

  const {
    players, communityCards, pot, phase,
    currentPlayerIndex, dealerIndex,
    currentBet, winner, winnerHand,
    message, lastAction,
    startNewRound,
  } = gameState;

  // Déclenche l'IA quand c'est son tour
  useEffect(() => {
    if (
      phase === PHASES.WAITING ||
      phase === PHASES.SHOWDOWN ||
      winner
    ) return;

    const currentPlayer = players[currentPlayerIndex];
    if (currentPlayer && !currentPlayer.isHuman) {
      runAI(currentPlayerIndex);
    }
  }, [currentPlayerIndex, phase, winner]);

  return (
    <Table
      players={players}
      communityCards={communityCards}
      pot={pot}
      phase={phase}
      currentPlayerIndex={currentPlayerIndex}
      dealerIndex={dealerIndex}
      currentBet={currentBet}
      winner={winner}
      winnerHand={winnerHand}
      message={message}
      lastAction={lastAction}
      raiseAmount={raiseAmount}
      onRaiseChange={setRaiseAmount}
      onAction={handleAction}
      onNewRound={startNewRound}
    />
  );
}