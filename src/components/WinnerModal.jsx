import React from "react";
import { HAND_NAMES } from "../utils/constants";
import Hand from "./Hand";

export default function WinnerModal({ winner, handResult, pot, onNewRound }) {
  if (!winner) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm"
      style={{ background: "rgba(0,0,0,0.75)" }}>
      <div className="flex flex-col items-center gap-5 p-8 rounded-3xl border shadow-2xl max-w-sm w-full mx-4"
        style={{
          background: "linear-gradient(135deg, #1a0a00, #2d1500, #1a0a00)",
          borderColor: "rgba(234,179,8,0.4)"
        }}>

        {/* Trophée animé */}
        <div className="text-7xl animate-bounce">🏆</div>

        {/* Gagnant */}
        <h2 className="text-3xl font-black text-yellow-300 text-center">
          {winner.name} gagne !
        </h2>

        {/* Main gagnante */}
        {handResult && (
          <div className="flex flex-col items-center gap-1">
            <span className="text-white/50 text-xs uppercase tracking-widest">Combinaison</span>
            <span className="text-yellow-400 font-bold text-lg">
              {HAND_NAMES[handResult.rank]}
            </span>
          </div>
        )}

        {/* Cartes du gagnant */}
        {winner.hand?.length > 0 && (
          <Hand cards={winner.hand} hidden={false} small={false} />
        )}

        {/* Pot gagné */}
        <div className="flex items-center gap-2 bg-black/40 rounded-full px-5 py-2 border border-yellow-500/30">
          <span className="text-2xl">🪙</span>
          <span className="text-yellow-300 font-black text-2xl">+{pot}</span>
        </div>

        {/* Bouton */}
        <button
          onClick={onNewRound}
          className="w-full py-4 rounded-2xl font-black text-black text-lg transition-all duration-200 hover:scale-105 active:scale-95 shadow-xl"
          style={{ background: "linear-gradient(135deg, #eab308, #f59e0b)" }}
        >
          🃏 Nouvelle manche
        </button>
      </div>
    </div>
  );
}