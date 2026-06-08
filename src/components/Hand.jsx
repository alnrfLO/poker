import React from "react";
import Card from "./Card";

export default function Hand({ cards = [], hidden = false, small = false }) {
  return (
    <div className="flex gap-2">
      {cards.map((card, i) => (
        <Card key={card?.id || i} card={card} hidden={hidden} small={small} />
      ))}
      {cards.length === 0 && (
        <>
          <Card hidden small={small} />
          <Card hidden small={small} />
        </>
      )}
    </div>
  );
}