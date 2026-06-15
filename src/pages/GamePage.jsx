import React, { useState } from "react";
import Table from "../components/Table";
import { useGameState } from "../hooks/useGameState";
import { usePokerLogic } from "../hooks/usePokerLogic";
import { useRoom } from "../hooks/useRoom";
import { PHASES, CONFIG } from "../utils/constants";
import Chat from "../components/Chat";

export default function GamePage({ roomId, playerId, onLeave }) {
  const { gameState, updateState, nextPhase } = useGameState(roomId);
  const { handleAction } = usePokerLogic({ roomId, gameState, updateState, nextPhase, playerId });
  const { startGame } = useRoom();
  const [raiseAmount, setRaiseAmount] = useState(CONFIG.BIG_BLIND * 2);

  const isHost = gameState?.players?.[0]?.id === playerId;
  const isWaiting = gameState?.phase === PHASES.WAITING;
  const players = gameState?.players || [];

  async function handleStartGame() {
    await startGame(roomId, players);
  }

  async function handleNewRound() {
    await startGame(roomId, players);
  }

  return (
    <div className="relative">
      <Table
        gameState={gameState}
        playerId={playerId}
        onAction={handleAction}
        onNewRound={handleNewRound}
        raiseAmount={raiseAmount}
        onRaiseChange={setRaiseAmount}
      />

      {/* Bouton quitter */}
      <button
        onClick={onLeave}
        className="fixed top-4 right-4 z-40 px-3 py-2 rounded-xl text-white/50 text-xs border border-white/10 hover:text-white hover:border-white/30 transition-all"
        style={{ background: "rgba(0,0,0,0.5)" }}
      >
        ✗ Quitter
      </button>

      {/* Lobby en attente */}
      {isWaiting && (
        <div className="fixed inset-0 z-30 flex items-center justify-center backdrop-blur-sm"
          style={{ background: "rgba(0,0,0,0.8)" }}>
          <div className="flex flex-col items-center gap-6 p-8 rounded-3xl border border-white/10 max-w-sm w-full mx-4"
            style={{ background: "linear-gradient(135deg, #0f172a, #1e293b)" }}>

            <h2 className="text-white font-black text-2xl">Salle {roomId}</h2>

            {/* ID à partager */}
            <div className="flex flex-col items-center gap-2 w-full">
              <p className="text-white/50 text-sm">Partage ce code :</p>
              <div className="flex items-center gap-2 bg-black/50 rounded-xl px-4 py-3 border border-yellow-500/30 w-full justify-center">
                <span className="text-yellow-300 font-black text-3xl tracking-widest">{roomId}</span>
              </div>
            </div>

            {/* Joueurs connectés */}
            <div className="flex flex-col gap-2 w-full">
              <p className="text-white/50 text-xs uppercase tracking-widest">Joueurs ({players.length}/4)</p>
              {players.map((p) => (
                <div key={p.id} className="flex items-center gap-2 bg-white/5 rounded-xl px-3 py-2">
                  <span className="text-green-400">●</span>
                  <span className="text-white font-semibold">{p.name}</span>
                  {p.isHost && <span className="text-xs text-yellow-400 ml-auto">Hôte</span>}
                </div>
              ))}
            </div>

            {/* Bouton start (hôte seulement) */}
            {isHost && players.length >= 2 && (
              <button
                onClick={handleStartGame}
                className="w-full py-4 rounded-2xl font-black text-black text-lg transition-all hover:scale-105 active:scale-95 shadow-xl"
                style={{ background: "linear-gradient(135deg, #eab308, #f59e0b)" }}
              >
                🃏 Lancer la partie !
              </button>
            )}

            {isHost && players.length < 2 && (
              <p className="text-white/30 text-sm text-center">
                En attente d'au moins 1 autre joueur...
              </p>
            )}

            {!isHost && (
              <p className="text-white/30 text-sm text-center animate-pulse">
                En attente que l'hôte lance la partie...
              </p>
            )}

          </div>
        </div>
      )}
                            <Chat 
  roomId={roomId} 
  playerName={gameState?.players?.find(p => p.id === playerId)?.name || "Joueur"} 
/>
    </div>
  );
}