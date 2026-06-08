import React from "react";
import ChipDisplay from "./ChipDisplay";

export default function Pot({ amount }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="text-white/50 text-xs uppercase tracking-widest">Pot</div>
      <div className="bg-black/50 border border-yellow-500/30 rounded-2xl px-6 py-2 flex items-center gap-2 shadow-lg">
        <span className="text-2xl">:coin:</span>
        <span className="text-yellow-300 font-bold text-xl">{amount}</span>
      </div>
    </div>
  );
}