import React from "react";
import Hand from "./Hand";
import ChipDisplay from "./ChipDisplay";
import { PLAYER_STATUS } from "../utils/constants";

export default function Player({
  player,
  isCurrentPlayer,
  isDealer,
  showCards = false,
}) {
  const isFolded = player.status === PLAYER_STATUS.FOLDED;

  return (
    <div
      className={`flex flex-col items-center gap-2 p-3 rounded-2xl transition-all duration-300
        ${isCurrentPlayer ? "ring-2 ring-yellow-400 bg-white/10 scale-105" : "bg-white/5"}
        ${isFolded ? "opacity-40" : "opacity-100"}
      `}
    >
      {/* Nom + badges */}
      <div className="flex items-center gap-2">
        {isDealer && (
          <span className="bg-white text-black text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
            D
          </span>
        )}
        <span className="text-white font-semibold text-sm">{player.name}</span>
        {player.isHuman && (
          <span className="text-xs bg-blue-600 rounded-full px-2 py-0.5 text-white">
            Toi
          </span>
        )}
        {isFolded && (
          <span className="text-xs bg-red-800 rounded-full px-2 py-0.5 text-white">
            Fold
          </span>
        )}
      </div>

      {/* Cartes */}
      <Hand
        cards={player.hand}
        hidden={!showCards && !player.isHuman}
        small={true}
      />

      {/* Jetons */}
      <ChipDisplay amount={player.chips} />

      {/* Mise actuelle */}
      {player.bet > 0 && (
        <div className="text-xs text-yellow-400">
          Mise : {player.bet}
        </div>
      )}
    </div>
  );
}