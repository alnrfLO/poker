import React from "react";

const suitColors = {
  "♠": "#1a1a2e",
  "♣": "#1a1a2e",
  "♥": "#e63946",
  "♦": "#e63946",
};

export default function Card({ card, hidden = false, small = false }) {
  const size = small ? "w-10 h-14 text-xs" : "w-16 h-24 text-base";

  if (hidden || !card) {
    return (
      <div className={`${size} rounded-lg border-2 border-white/20 bg-gradient-to-br from-blue-900 to-blue-700 flex items-center justify-center shadow-lg`}>
        <span className="text-white/40 text-xl">🂠</span>
      </div>
    );
  }

  const color = suitColors[card.suit] || "#1a1a2e";

  return (
    <div
      className={`${size} rounded-lg bg-white flex flex-col justify-between p-1 shadow-xl border border-gray-200 select-none`}
      style={{ color }}
    >
      <div className="font-bold leading-none">{card.rank}</div>
      <div className="text-center text-lg leading-none">{card.suit}</div>
      <div className="font-bold leading-none self-end rotate-180">{card.rank}</div>
    </div>
  );
}