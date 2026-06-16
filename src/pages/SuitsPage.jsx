import React from "react";

const SUITS = [
  {
    symbol: "♠", name: "Pique", color: "#7c3aed", border: "rgba(124,58,237,0.4)",
    bg: "rgba(124,58,237,0.08)",
    desc: "Le Pique est la couleur la plus haute dans certaines variantes. Son symbole ressemble à une feuille de trèfle retournée avec une tige.",
    fun: "Représente les épées ou lances dans les jeux de cartes médiévaux.",
    suit: "spades",
  },
  {
    symbol: "♥", name: "Cœur", color: "#dc2626", border: "rgba(220,38,38,0.4)",
    bg: "rgba(220,38,38,0.08)",
    desc: "Le Cœur est associé à l'amour et la passion. C'est l'une des deux couleurs rouges du jeu.",
    fun: "Représente les calices (coupes) dans les jeux de cartes anciens.",
    suit: "hearts",
  },
  {
    symbol: "♦", name: "Carreau", color: "#f97316", border: "rgba(249,115,22,0.4)",
    bg: "rgba(249,115,22,0.08)",
    desc: "Le Carreau est la deuxième couleur rouge. Son symbole en losange est facilement reconnaissable.",
    fun: "Représente les pièces de monnaie dans les jeux espagnols et italiens.",
    suit: "diamonds",
  },
  {
    symbol: "♣", name: "Trèfle", color: "#22c55e", border: "rgba(34,197,94,0.4)",
    bg: "rgba(34,197,94,0.08)",
    desc: "Le Trèfle est l'une des deux couleurs noires. Son symbole à trois feuilles est inspiré de la plante porte-bonheur.",
    fun: "Représente les bâtons ou massues dans les jeux médiévaux.",
    suit: "clubs",
  },
];

const RANKS = ["ace", "2", "3", "4", "5", "6", "7", "8", "9", "10", "jack", "queen", "king"];
const RANK_LABELS = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

export default function SuitsPage({ onBack }) {
  return (
    <div
    className="min-h-screen flex flex-col relative overflow-hidden"
    style={{ background: "radial-gradient(ellipse at top, #1a0a2e 0%, #0d1a0d 40%, #0a0a0a 100%)" }}
    >
    {/* Cercles décoratifs */}
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
    <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full opacity-10"
    style={{ background: "radial-gradient(circle, #7c3aed, transparent)" }} />
    <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full opacity-10"
    style={{ background: "radial-gradient(circle, #dc2626, transparent)" }} />
    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-64 opacity-10"
    style={{ background: "radial-gradient(ellipse, #14532d, transparent)" }} />
    </div>
    
    {/* Header */}
    <div className="flex items-center gap-4 px-6 py-5 z-10 border-b border-white/5"
    style={{ background: "rgba(0,0,0,0.3)" }}>
    <button
    onClick={onBack}
    className="w-9 h-9 rounded-xl flex items-center justify-center text-white/50 hover:text-white border border-white/10 hover:border-yellow-500/50 transition-all"
    style={{ background: "rgba(255,255,255,0.05)" }}
    >
    ←
    </button>
    <div>
    <h1 className="font-black text-xl"
    style={{
      background: "linear-gradient(135deg, #eab308, #fde68a)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
    }}
    >
    Les familles
    </h1>
    <p className="text-white/30 text-xs tracking-widest uppercase">4 familles · 52 cartes</p>
    </div>
    </div>
    
    {/* Intro */}
    <div className="mx-6 mt-5 rounded-2xl p-4 border border-yellow-500/20 z-10"
    style={{ background: "linear-gradient(135deg, rgba(234,179,8,0.08), rgba(234,179,8,0.03))" }}>
    <p className="text-white/70 text-sm leading-relaxed">
    Un jeu de 52 cartes est composé de{" "}
    <span className="text-yellow-300 font-bold">4 familles</span> de{" "}
    <span className="text-yellow-300 font-bold">13 cartes</span> chacune.
    Au poker, l'As peut valoir <span className="text-white font-bold">1 ou 14</span>.
    </p>
    </div>
    
    {/* Familles */}
    <div className="flex flex-col gap-4 px-6 py-5 z-10">
    {SUITS.map((suit, i) => (
      <div
      key={i}
      className="rounded-2xl p-5 border flex flex-col gap-3"
      style={{ background: suit.bg, borderColor: suit.border }}
      >
      {/* En-tête */}
      <div className="flex items-center gap-3">
      <span className="text-5xl" style={{
        color: suit.color,
        textShadow: `0 0 20px ${suit.color}60`,
      }}>
      {suit.symbol}
      </span>
      <div>
      <h2 className="text-white font-black text-xl">{suit.name}</h2>
      <p className="text-white/30 text-xs">{suit.fun}</p>
      </div>
      </div>
      
      {/* Description */}
      <p className="text-white/60 text-sm">{suit.desc}</p>
      
      {/* Cartes PNG */}
      <div className="flex flex-wrap gap-1.5 mt-1">
      {RANKS.map((rank, j) => (
        <img
        key={j}
        src={`/src/assets/cards/${rank}_of_${suit.suit}.png`}
        alt={`${rank} of ${suit.suit}`}
        className="rounded-md bg-white object-contain"
        style={{
          width: 28,
          height: 38,
          padding: "1px",
          boxShadow: `0 2px 8px rgba(0,0,0,0.4), 0 0 0 1px ${suit.color}30`,
        }}
        />
      ))}
      </div>
      </div>
    ))}
    </div>
    
    <div className="h-6" />
    </div>
  );
}

