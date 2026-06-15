import React from "react";

export default function MenuPage({ onPlay, onRules, onSuits }) {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-between p-6"
      style={{ background: "linear-gradient(135deg, #030712 0%, #052e16 50%, #030712 100%)" }}
    >
      {/* Header */}
      <div />

      {/* Logo + titre */}
      <div className="flex flex-col items-center gap-6">
        <div className="flex gap-4 text-5xl">
          <span>♠</span>
          <span className="text-red-500">♥</span>
          <span className="text-red-500">♦</span>
          <span>♣</span>
        </div>

        <div className="text-center">
          <h1 className="text-white font-black text-5xl tracking-widest">POKER</h1>
          <p className="text-white/30 text-sm tracking-widest mt-1">TEXAS HOLD'EM</p>
        </div>

        {/* Cartes déco */}
        <div className="flex gap-2 mt-2">
          {["A♠", "K♥", "Q♦", "J♣", "10♠"].map((c, i) => (
            <div
              key={i}
              className="w-10 h-14 rounded-lg bg-white flex items-center justify-center text-xs font-black shadow-xl border border-gray-200"
              style={{
                color: c.includes("♥") || c.includes("♦") ? "#e63946" : "#1a1a2e",
                transform: `rotate(${(i - 2) * 5}deg)`,
              }}
            >
              {c}
            </div>
          ))}
        </div>
      </div>

      {/* Boutons */}
      <div className="flex flex-col gap-4 w-full max-w-xs">
        <button
          onClick={onPlay}
          className="w-full py-5 rounded-2xl font-black text-black text-xl transition-all hover:scale-105 active:scale-95 shadow-2xl"
          style={{ background: "linear-gradient(135deg, #eab308, #f59e0b)" }}
        >
          🃏 Jouer
        </button>

        <button
          onClick={onRules}
          className="w-full py-4 rounded-2xl font-bold text-white text-lg transition-all hover:scale-105 active:scale-95 border border-white/20"
          style={{ background: "rgba(255,255,255,0.05)" }}
        >
          📋 Règles du jeu
        </button>

        <button
          onClick={onSuits}
          className="w-full py-4 rounded-2xl font-bold text-white text-lg transition-all hover:scale-105 active:scale-95 border border-white/20"
          style={{ background: "rgba(255,255,255,0.05)" }}
        >
          🎴 Les familles de cartes
        </button>
      </div>

      {/* Footer */}
      <p className="text-white/10 text-xs tracking-widest">v1.0.0</p>
    </div>
  );
}