import React from "react";
import { CONFIG } from "../utils/constants";

export default function RaiseSlider({ player, currentBet, value, onChange }) {
  if (!player) return null;

  const toCall = Math.max(0, currentBet - player.bet);
  const minRaise = CONFIG.BIG_BLIND;
  const maxRaise = player.chips - toCall;

  if (maxRaise <= 0) return null;

  return (
    <div className="flex flex-col items-center gap-2 w-full max-w-xs">
      <div className="flex justify-between w-full text-xs text-white/50">
        <span>Min: {minRaise}</span>
        <span className="text-yellow-300 font-bold">Raise: {value}</span>
        <span>Max: {maxRaise}</span>
      </div>
      <input
        type="range"
        min={minRaise}
        max={maxRaise}
        step={CONFIG.BIG_BLIND}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-yellow-400 cursor-pointer"
      />
    </div>
  );
}