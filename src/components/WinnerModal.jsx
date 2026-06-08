import React from "react";
import { HAND_NAMES } from "../utils/constants";

export default function WinnerModal({ winner, handResult, pot, onNewRound }) {
  if (!winner) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="bg-gradient-to-br from-yellow-900 to-gray-900 border border-yellow-500/50 rounded-3xl p-8 flex flex-col items-center gap-4 shadow-2xl max-w-sm w-full mx-4">
        {/* Trophée */}
        <div className="text-6xl animate-bounce">:trophy:</div>

        {/* Gagnant */}
        <h2 className="text-2xl font-bold text-yellow-300 text-center">
          {winner.name} gagne !
        </h2>

        {/* Combinaison */}
        {handResult && (
          <div className="bg-black/40 rounded-xl px-4 py-2 text-center">
            <span className="text-white/60 text-sm">Combinaison : </span>
            <span className="text-yellow-400 font-bold">
              {HAND_NAMES[handResult.rank]}
            </span>
          </div>
        )}

        {/* Pot gagné */}
        <div className="flex items-center gap-2 text-white">
          <span className="text-2xl">:coin:</span>
          <span className="text-xl font-bold text-yellow-300">+{pot}</span>
        </div>

        {/* Bouton */}
        <button
          onClick={onNewRound}
          className="mt-2 px-8 py-3 bg-yellow-500 hover:bg-yellow-400 text-black font-bold rounded-xl
            transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg text-lg"
        >
          Nouvelle manche
        </button>
      </div>
    </div>
  );
}