import React, { useEffect, useState } from "react";

export default function MenuPage({ onPlay, onRules, onSuits }) {
  const [visible, setVisible] = useState(false);
  
  useEffect(() => {
    setTimeout(() => setVisible(true), 100);
  }, []);
  
  return (
    <div
    className="min-h-screen flex flex-col items-center justify-between relative overflow-hidden"
    style={{
      background: "radial-gradient(ellipse at top, #1a0a2e 0%, #0d1a0d 40%, #0a0a0a 100%)",
    }}
    >
    {/* Cercles décoratifs */}
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
    <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full opacity-10"
    style={{ background: "radial-gradient(circle, #7c3aed, transparent)" }} />
    <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full opacity-10"
    style={{ background: "radial-gradient(circle, #dc2626, transparent)" }} />
    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-64 opacity-10"
    style={{ background: "radial-gradient(ellipse, #14532d, transparent)" }} />
    <div className="absolute top-1/3 left-0 right-0 h-px opacity-20"
    style={{ background: "linear-gradient(90deg, transparent, #eab308, transparent)" }} />
    </div>
    
    {/* Header */}
    <div className="w-full flex justify-end px-6 pt-5 z-10">
    <span className="text-white/10 text-xs tracking-widest uppercase">v1.0.0</span>
    </div>
    
    {/* Logo central */}
    <div
    className={`flex flex-col items-center gap-6 z-10 transition-all duration-700 ${
      visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
    }`}
    >
    {/* Symboles familles */}
    <div className="flex gap-5 text-4xl">
    <span style={{ color: "#7c3aed", textShadow: "0 0 20px #7c3aed80" }}>♠</span>
    <span style={{ color: "#dc2626", textShadow: "0 0 20px #dc262680" }}>♥</span>
    <span style={{ color: "#dc2626", textShadow: "0 0 20px #dc262680" }}>♦</span>
    <span style={{ color: "#7c3aed", textShadow: "0 0 20px #7c3aed80" }}>♣</span>
    </div>
    
    {/* Titre */}
    <div className="text-center">
    <h1
    className="font-black tracking-[0.2em] uppercase"
    style={{
      fontSize: "clamp(2.5rem, 8vw, 5rem)",
      background: "linear-gradient(135deg, #eab308 0%, #fde68a 40%, #eab308 60%, #92400e 100%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      filter: "drop-shadow(0 0 30px rgba(234,179,8,0.3))",
    }}
    >
    POKER
    </h1>
    <div className="flex items-center gap-3 justify-center mt-1">
    <div className="h-px flex-1 max-w-16"
    style={{ background: "linear-gradient(90deg, transparent, #eab30860)" }} />
    <p className="text-white/30 text-xs tracking-[0.3em] uppercase">Texas Hold'em</p>
    <div className="h-px flex-1 max-w-16"
    style={{ background: "linear-gradient(90deg, #eab30860, transparent)" }} />
    </div>
    </div>
    
    {/* Cartes PNG en éventail */}
    <div className="flex gap-2 mt-2">
    {[
      { rank: "ace", suit: "spades" },
      { rank: "king", suit: "hearts" },
      { rank: "queen", suit: "diamonds" },
      { rank: "jack", suit: "clubs" },
      { rank: "10", suit: "spades" },
    ].map((c, i) => (
      <img
      key={i}
      src={`/cards/${c.rank}_of_${c.suit}.png`}
      alt={`${c.rank} of ${c.suit}`}
      className="w-12 h-16 rounded-xl shadow-2xl object-contain bg-white"
      style={{
        transform: `rotate(${(i - 2) * 6}deg) translateY(${Math.abs(i - 2) * 4}px)`,
        boxShadow: "0 8px 25px rgba(0,0,0,0.6), 0 0 0 1px rgba(234,179,8,0.2)",
        padding: "2px",
      }}
      />
    ))}
    </div>
    </div>
    
    {/* Boutons */}
    <div
    className={`flex flex-col gap-3 w-full max-w-xs px-6 pb-10 z-10 transition-all duration-700 delay-200 ${
      visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
    }`}
    >
    <button
    onClick={onPlay}
    className="w-full py-5 rounded-2xl font-black text-black text-xl transition-all duration-200 hover:scale-105 active:scale-95"
    style={{
      background: "linear-gradient(135deg, #eab308 0%, #fbbf24 50%, #eab308 100%)",
      boxShadow: "0 0 30px rgba(234,179,8,0.4), 0 4px 20px rgba(0,0,0,0.4)",
    }}
    >
    🃏 Jouer
    </button>
    
    <button
    onClick={onRules}
    className="w-full py-4 rounded-2xl font-bold text-white text-base transition-all duration-200 hover:scale-105 active:scale-95 border"
    style={{
      background: "linear-gradient(135deg, rgba(124,58,237,0.2), rgba(124,58,237,0.05))",
      borderColor: "rgba(124,58,237,0.4)",
      boxShadow: "0 0 20px rgba(124,58,237,0.1)",
    }}
    >
    📋 Règles du jeu
    </button>
    
    <button
    onClick={onSuits}
    className="w-full py-4 rounded-2xl font-bold text-white text-base transition-all duration-200 hover:scale-105 active:scale-95 border"
    style={{
      background: "linear-gradient(135deg, rgba(220,38,38,0.2), rgba(220,38,38,0.05))",
      borderColor: "rgba(220,38,38,0.3)",
      boxShadow: "0 0 20px rgba(220,38,38,0.1)",
    }}
    >
    🎴 Les familles de cartes
    </button>
    
    <div className="flex items-center gap-3 mt-2">
    <div className="h-px flex-1"
    style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.1))" }} />
    <span className="text-white/10 text-xs">♠ ♥ ♦ ♣</span>
    <div className="h-px flex-1"
    style={{ background: "linear-gradient(90deg, rgba(255,255,255,0.1), transparent)" }} />
    </div>
    </div>
    </div>
  );
}

