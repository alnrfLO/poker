import React from "react";
import Board from "./Board";
import Pot from "./Pot";
import PlayerList from "./PlayerList";
import ActionBar from "./ActionBar";
import WinnerModal from "./WinnerModal";
import { PHASES } from "../utils/constants";

export default function Table({
  gameState,
  playerId,
  onAction,
  onNewRound,
}) {
  if (!gameState) return (
    <div className="min-h-screen flex items-center justify-center"
      style={{ background: "linear-gradient(135deg, #030712, #052e16, #030712)" }}>
      <div className="text-white text-xl animate-pulse">Chargement...</div>
    </div>
  );

  const {
    players = [],
    communityCards = [],
    pot = 0,
    phase,
    currentPlayerIndex,
    dealerIndex,
    currentBet = 0,
    winner,
    winnerHandResult,
  } = gameState;

  const humanPlayer = players.find((p) => p.id === playerId);
  const isShowdown = phase === PHASES.SHOWDOWN;
  const isWaiting = phase === PHASES.WAITING;
  const isMyTurn = players[currentPlayerIndex]?.id === playerId;

  const phaseLabel = {
    waiting: "En attente",
    preflop: "Preflop",
    flop: "Flop",
    turn: "Turn",
    river: "River",
    showdown: "Showdown",
  }[phase] || phase;

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-between p-4 gap-4"
      style={{ background: "linear-gradient(135deg, #030712 0%, #052e16 50%, #030712 100%)" }}>

      {/* Header */}
      <div className="w-full max-w-2xl flex justify-between items-center pt-2">
        <h1 className="text-white font-black text-xl tracking-widest">♠ POKER</h1>
        <div className="text-white/60 text-sm px-3 py-1 rounded-full border border-white/10"
          style={{ background: "rgba(0,0,0,0.4)" }}>
          {phaseLabel}
        </div>
      </div>

      {/* Tour actuel */}
      {!isWaiting && !winner && (
        <div className={`text-sm px-4 py-2 rounded-full border ${
          isMyTurn
            ? "text-yellow-300 border-yellow-500/50 bg-yellow-500/10"
            : "text-white/50 border-white/10 bg-black/30"
        }`}>
          {isMyTurn ? "🎯 C'est ton tour !" : `⏳ Tour de ${players[currentPlayerIndex]?.name}...`}
        </div>
      )}

      {/* Joueurs */}
      <PlayerList
        players={players}
        currentPlayerIndex={currentPlayerIndex}
        dealerIndex={dealerIndex}
        showAllCards={isShowdown}
      />

      {/* Board + Pot */}
      {!isWaiting && (
        <div className="flex flex-col items-center gap-4 w-full">
          <div className="w-full max-w-lg rounded-3xl p-6 flex flex-col items-center gap-4 border border-white/5"
            style={{ background: "radial-gradient(ellipse at center, #14532d 0%, #052e16 70%)" }}>
            <Board cards={communityCards} />
            <Pot amount={pot} />
          </div>
        </div>
      )}

      {/* Actions */}
      {!isWaiting && !winner && humanPlayer && (
        <div className="flex flex-col items-center gap-3 w-full max-w-sm pb-4">
          <ActionBar
            player={humanPlayer}
            currentBet={currentBet}
            onAction={onAction}
            disabled={!isMyTurn}
          />
          {!isMyTurn && (
            <p className="text-white/30 text-xs text-center">
              Attends que ce soit ton tour...
            </p>
          )}
        </div>
      )}

      {/* Modal gagnant */}
      <WinnerModal
        winner={winner}
        handResult={winnerHandResult}
        pot={pot}
        onNewRound={onNewRound}
      />
    </div>
  );
}