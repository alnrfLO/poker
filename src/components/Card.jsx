import React from "react";

function getCardImage(card) {
  const rankMap = {
    "A": "ace", "2": "2", "3": "3", "4": "4", "5": "5",
    "6": "6", "7": "7", "8": "8", "9": "9", "10": "10",
    "J": "jack", "Q": "queen", "K": "king"
  };
  const suitMap = {
    "♠": "spades", "♥": "hearts", "♦": "diamonds", "♣": "clubs"
  };

  const rank = rankMap[card.rank];
  const suit = suitMap[card.suit];
  return `/src/assets/cards/${rank}_of_${suit}.png`;
}

export default function Card({ card, hidden = false, small = false }) {
  const w = small ? "w-12 h-16" : "w-20 h-28";

if (hidden || !card) {
  return (
    <img
      src="/assets/cards/back.png"
      alt="carte cachée"
      className={`${w} rounded-xl shadow-2xl object-contain bg-white`}
      style={{ boxShadow: "0 4px 15px rgba(0,0,0,0.4)", padding: "2px" }}
    />
  );
}

return (
  <img
    src={getCardImage(card)}
    alt={`${card.rank}${card.suit}`}
    className={`${w} rounded-xl shadow-2xl object-contain bg-white`}
    style={{ boxShadow: "0 4px 15px rgba(0,0,0,0.4)", padding: "2px" }}
  />
);
}