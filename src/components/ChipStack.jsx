import React from "react";

const CHIPS = [
  { value: 500, color: "#7c3aed", border: "#5b21b6", textColor: "white" },
  { value: 100, color: "#1a1a2e", border: "#374151", textColor: "white" },
  { value: 50,  color: "#dc2626", border: "#991b1b", textColor: "white" },
  { value: 25,  color: "#16a34a", border: "#14532d", textColor: "white" },
  { value: 10,  color: "#2563eb", border: "#1e3a8a", textColor: "white" },
  { value: 5,   color: "#ca8a04", border: "#92400e", textColor: "white" },
  { value: 1,   color: "#e5e7eb", border: "#9ca3af", textColor: "#1a1a2e" },
];

function decompose(amount) {
  let remaining = amount;
  const result = [];
  for (const chip of CHIPS) {
    const count = Math.floor(remaining / chip.value);
    if (count > 0) {
      result.push({ ...chip, count });
      remaining -= count * chip.value;
    }
  }
  return result;
}

function ChipPile({ chip, size = 36 }) {
  const MAX_STACK = 5;
  const stack = Math.min(chip.count, MAX_STACK);

  return (
    <div className="flex flex-col items-center gap-1">
      <div style={{ position: "relative", height: size + (stack - 1) * 7, width: size }}>
        {Array.from({ length: stack }).map((_, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              bottom: i * 7,
              left: 0,
              width: size,
              height: size,
              borderRadius: "50%",
              background: chip.color,
              border: `3px solid ${chip.border}`,
              boxShadow: "0 2px 6px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.15)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: chip.textColor,
              fontSize: size * 0.27,
              fontWeight: 900,
            }}
          >
            {i === stack - 1 ? chip.value : ""}
          </div>
        ))}
      </div>
      {chip.count > 1 && (
        <span className="text-white/50 text-xs font-bold">×{chip.count}</span>
      )}
    </div>
  );
}

export default function ChipStack({ amount, label = "", small = false }) {
  if (!amount || amount <= 0) return null;
  const chips = decompose(amount);

  if (small) {
    return (
      <div className="flex items-center gap-1 flex-wrap justify-center">
        {chips.map((chip, i) => (
          <div key={i} className="flex items-center gap-0.5">
            <div
              className="rounded-full flex items-center justify-center font-black"
              style={{
                width: 22,
                height: 22,
                background: chip.color,
                border: `2px solid ${chip.border}`,
                color: chip.textColor,
                fontSize: 8,
              }}
            >
              {chip.value}
            </div>
            {chip.count > 1 && (
              <span className="text-white/40 text-xs">×{chip.count}</span>
            )}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-3">
      {label && (
        <span className="text-white/40 text-xs uppercase tracking-widest">{label}</span>
      )}
      <div className="flex items-end gap-3 flex-wrap justify-center">
        {chips.map((chip, i) => (
          <ChipPile key={i} chip={chip} size={40} />
        ))}
      </div>
      <span className="text-yellow-300 font-black text-lg">{amount} 🪙</span>
    </div>
  );
}