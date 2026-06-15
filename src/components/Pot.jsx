import React from "react";
import ChipStack from "./ChipStack";

export default function Pot({ amount }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <ChipStack amount={amount} label="Pot" />
    </div>
  );
}