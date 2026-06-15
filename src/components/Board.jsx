import React from "react";
import Card from "./Card";

export default function Board({ cards = [] }) {
  const slots = Array(5).fill(null).map((_, i) => cards[i] || null);

  return (
    <div className="flex gap-3 items-center justify-center">
      {slots.map((card, i) => (
        <div
          key={i}
          className={`transition-all duration-500 ${
            card ? "scale-100 opacity-100 translate-y-0" : "scale-95 opacity-25 translate-y-1"
          }`}
        >
          <Card card={card} hidden={!card} />
        </div>
      ))}
    </div>
  );
}