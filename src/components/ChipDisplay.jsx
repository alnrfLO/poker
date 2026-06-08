import React from "react";

export default function ChipDisplay({ amount, label = "" }) {
  return (
    <div className="flex flex-col items-center">
      {label && (
        <span className="text-xs text-white/60 uppercase tracking-widest mb-1">
          {label}
        </span>
      )}
      <div className="flex items-center gap-1 bg-black/40 border border-yellow-500/40 rounded-full px-3 py-1">
        <span className="text-yellow-400 text-sm">:coin:</span>
        <span className="text-yellow-300 font-bold text-sm">{amount}</span>
      </div>
    </div>
  );
}