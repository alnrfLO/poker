import React, { useState } from "react";
import { ACTIONS, PLAYER_STATUS } from "../utils/constants";

const CHIP_OPTIONS = [
  { value: 1,   color: "#e5e7eb", border: "#9ca3af", textColor: "#1a1a2e" },
  { value: 5,   color: "#ca8a04", border: "#92400e", textColor: "white" },
  { value: 10,  color: "#2563eb", border: "#1e3a8a", textColor: "white" },
  { value: 25,  color: "#16a34a", border: "#14532d", textColor: "white" },
  { value: 50,  color: "#dc2626", border: "#991b1b", textColor: "white" },
  { value: 100, color: "#1a1a2e", border: "#374151", textColor: "white" },
  { value: 500, color: "#7c3aed", border: "#5b21b6", textColor: "white" },
];

function ClickableChip({ chip, onClick, disabled }) {
  return (
    <button
      onClick={() => onClick(chip.value)}
      disabled={disabled}
      className="flex flex-col items-center gap-1 group disabled:opacity-30 disabled:cursor-not-allowed"
    >
      {/* Jeton */}
      <div
        className="rounded-full flex items-center justify-center font-black transition-all duration-150 group-hover:scale-110 group-active:scale-95 shadow-lg"
        style={{
          width: 48,
          height: 48,
          background: chip.color,
          border: `4px solid ${chip.border}`,
          color: chip.textColor,
          fontSize: 11,
          boxShadow: `0 4px 10px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.2)`,
        }}
      >
        {chip.value}
      </div>
    </button>
  );
}

export default function ActionBar({ player, currentBet, onAction, disabled = false }) {
  const [pendingBet, setPendingBet] = useState(0);

  if (!player || !player.isHuman || player.status !== PLAYER_STATUS.ACTIVE) return null;

  const toCall = Math.max(0, currentBet - player.bet);
  const canCheck = toCall === 0;
  const maxBet = player.chips;

  function addChip(value) {
    setPendingBet((prev) => Math.min(prev + value, maxBet));
  }

  function clearBet() {
    setPendingBet(0);
  }

  function confirmAction() {
    if (pendingBet === 0) {
      if (canCheck) {
        onAction(ACTIONS.CHECK);
      } else {
        onAction(ACTIONS.CALL);
      }
    } else if (pendingBet <= toCall) {
      onAction(ACTIONS.CALL);
    } else {
      onAction(ACTIONS.RAISE, pendingBet - toCall);
    }
    setPendingBet(0);
  }

  // Label du bouton confirmer
  function confirmLabel() {
    if (pendingBet === 0 && canCheck) return "✓ Check";
    if (pendingBet === 0 && !canCheck) return `📞 Call ${toCall}`;
    if (pendingBet > 0 && pendingBet <= toCall) return `📞 Call ${toCall}`;
    return `↑ Raise ${pendingBet}`;
  }

  function confirmColor() {
    if (pendingBet === 0 && canCheck) return "linear-gradient(135deg, #1e3a8a, #1d4ed8)";
    if (pendingBet > 0 && pendingBet > toCall) return "linear-gradient(135deg, #14532d, #15803d)";
    return "linear-gradient(135deg, #1e3a8a, #1d4ed8)";
  }

  return (
    <div className="flex flex-col items-center gap-4 w-full max-w-sm">

      {/* Instruction */}
      <p className="text-white/40 text-xs text-center">
        {toCall > 0
          ? `💡 Clique sur des jetons pour relancer, ou confirme pour suivre (${toCall})`
          : "💡 Clique sur des jetons pour miser, ou confirme pour checker"}
      </p>

      {/* Jetons cliquables */}
      <div className="flex gap-2 flex-wrap justify-center">
        {CHIP_OPTIONS.map((chip) => (
          <ClickableChip
            key={chip.value}
            chip={chip}
            onClick={addChip}
            disabled={disabled || pendingBet >= maxBet}
          />
        ))}
      </div>

      {/* Mise en cours */}
      {pendingBet > 0 && (
        <div className="flex items-center gap-3 bg-black/40 border border-yellow-500/30 rounded-2xl px-4 py-2">
          <span className="text-white/50 text-sm">Mise :</span>
          <span className="text-yellow-300 font-black text-xl">{pendingBet} 🪙</span>
          <button
            onClick={clearBet}
            className="text-white/30 hover:text-red-400 transition-all text-sm ml-2"
          >
            ✕ Reset
          </button>
        </div>
      )}

      {/* Boutons principaux */}
      <div className="flex gap-3 w-full">
        {/* Fold */}
        <button
          onClick={() => { onAction(ACTIONS.FOLD); setPendingBet(0); }}
          disabled={disabled}
          className="flex-1 py-3 rounded-xl font-black text-white text-sm transition-all hover:scale-105 active:scale-95 disabled:opacity-40 border border-red-800"
          style={{ background: "linear-gradient(135deg, #7f1d1d, #991b1b)" }}
        >
          ✗ Fold
        </button>

        {/* Confirmer */}
        <button
          onClick={confirmAction}
          disabled={disabled}
          className="flex-[2] py-3 rounded-xl font-black text-white text-sm transition-all hover:scale-105 active:scale-95 disabled:opacity-40"
          style={{ background: confirmColor() }}
        >
          {confirmLabel()}
        </button>
      </div>
    </div>
  );
}