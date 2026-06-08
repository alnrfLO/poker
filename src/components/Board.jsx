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
            card ? "scale-100 opacity-100" : "scale-95 opacity-30"
          }`}
        >x
          <Card card={card} hidden={!card} />
        </div>
      ))}
    </div>
  );
}