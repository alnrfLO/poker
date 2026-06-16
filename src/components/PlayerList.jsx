import React from "react";
import Player from "./Player";

export default function PlayerList({ players, currentPlayerIndex, dealerIndex, showAllCards, localPlayerId }) {
  return (
    <div className="grid grid-cols-2 gap-4 w-full max-w-2xl">
      {players.map((player, index) => (
        <Player
          key={player.id}
          player={player}
          isCurrentPlayer={index === currentPlayerIndex}
          isDealer={index === dealerIndex}
          showCards={showAllCards || player.id === localPlayerId}
          localPlayerId={localPlayerId}
        />
      ))}
    </div>
  );
}