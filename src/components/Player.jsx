import React from "react";
import Hand from "./Hand";
import ChipStack from "./ChipStack";
import { PLAYER_STATUS } from "../utils/constants";

export default function Player({ player, isCurrentPlayer, isDealer, showCards = false , localPlayerId }) {
  const isFolded = player.status === PLAYER_STATUS.FOLDED;
  const isAllIn = player.status === PLAYER_STATUS.ALL_IN;

  return (
    <div className={`flex flex-col items-center gap-2 p-3 rounded-2xl transition-all duration-300
      ${isCurrentPlayer ? "ring-2 ring-yellow-400 scale-105" : ""}
      ${isFolded ? "opacity-40" : "opacity-100"}
    `}
      style={{ background: isCurrentPlayer ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.04)" }}
    >
      {/* Badges */}
      <div className="flex items-center gap-1.5 flex-wrap justify-center">
        {isDealer && (
          <span className="bg-white text-black text-xs font-black rounded-full w-5 h-5 flex items-center justify-center">D</span>
        )}
        <span className="text-white font-bold text-sm">{player.name}</span>
        {player.id === localPlayerId && (
          <span className="text-xs bg-blue-600 rounded-full px-2 py-0.5 text-white font-bold">Toi</span>
        )}
        {isFolded && (
          <span className="text-xs bg-red-800 rounded-full px-2 py-0.5 text-white">Fold</span>
        )}
        {isAllIn && (
          <span className="text-xs bg-orange-600 rounded-full px-2 py-0.5 text-white font-bold">All-in</span>
        )}
      </div>


      <Hand cards={player.hand} hidden={!showCards} small />

      <div className="flex items-center gap-1 bg-black/40 border border-yellow-500/30 rounded-full px-3 py-1">
        <span className="text-yellow-400 text-sm">🪙</span>
        <span className="text-yellow-300 font-bold text-sm">{player.chips}</span>
      </div>

      {/* Mise en jetons */}
      {player.bet > 0 && (
        <ChipStack amount={player.bet} small />
      )}
    </div>
  );
}