import React from "react";

const SUITS = [
  {
    symbol: "♠",
    name: "Pique",
    color: "#1a1a2e",
    bg: "from-slate-800 to-slate-900",
    border: "border-slate-600",
    desc: "Le Pique est la couleur la plus haute dans certaines variantes. Son symbole ressemble à une feuille de trèfle retournée avec une tige.",
    fun: "Représente les épées ou lances dans les jeux de cartes médiévaux.",
  },
  {
    symbol: "♥",
    name: "Cœur",
    color: "#e63946",
    bg: "from-red-900 to-red-950",
    border: "border-red-700",
    desc: "Le Cœur est associé à l'amour et la passion. C'est l'une des deux couleurs rouges du jeu.",
    fun: "Représente les calices (coupes) dans les jeux de cartes anciens.",
  },
  {
    symbol: "♦",
    name: "Carreau",
    color: "#e63946",
    bg: "from-orange-900 to-red-950",
    border: "border-orange-700",
    desc: "Le Carreau est la deuxième couleur rouge. Son symbole en losange est facilement reconnaissable.",
    fun: "Représente les pièces de monnaie dans les jeux espagnols et italiens.",
  },
  {
    symbol: "♣",
    name: "Trèfle",
    color: "#1a1a2e",
    bg: "from-green-900 to-green-950",
    border: "border-green-700",
    desc: "Le Trèfle est l'une des deux couleurs noires. Son symbole à trois feuilles est inspiré de la plante porte-bonheur.",
    fun: "Représente les bâtons ou massues dans les jeux médiévaux.",
  },
];

const RANKS = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

export default function SuitsPage({ onBack }) {
  return (
    <div
      className="min-h-screen flex flex-col p-6 gap-6"
      style={{ background: "linear-gradient(135deg, #030712, #0f172a)" }}
    >
      {/* Header */}
      <div className="flex items-center gap-4 pt-2">
        <button onClick={onBack} className="text-white/50 hover:text-white transition-all text-lg">
          ←
        </button>
        <h1 className="text-white font-black text-2xl">🎴 Les familles</h1>
      </div>

      {/* Intro */}
      <p className="text-white/50 text-sm">
        Un jeu de 52 cartes est composé de <span className="text-white font-bold">4 familles</span> de
        <span className="text-white font-bold"> 13 cartes</span> chacune.
      </p>

      {/* Familles */}
      <div className="flex flex-col gap-4">
        {SUITS.map((suit, i) => (
          <div
            key={i}
            className={`rounded-2xl p-5 border ${suit.border} flex flex-col gap-3 bg-gradient-to-br ${suit.bg}`}
          >
            {/* En-tête */}
            <div className="flex items-center gap-3">
              <span className="text-5xl" style={{ color: suit.color }}>{suit.symbol}</span>
              <div>
                <h2 className="text-white font-black text-xl">{suit.name}</h2>
                <p className="text-white/40 text-xs">{suit.fun}</p>
              </div>
            </div>

            {/* Description */}
            <p className="text-white/60 text-sm">{suit.desc}</p>

            {/* Toutes les cartes */}
            <div className="flex flex-wrap gap-1.5 mt-1">
              {RANKS.map((rank) => (
                <div
                  key={rank}
                  className="w-8 h-10 rounded-md bg-white flex items-center justify-center text-xs font-black shadow-md border border-gray-100"
                  style={{ color: suit.color }}
                >
                  {rank}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Info deck */}
      <div
        className="rounded-2xl p-4 border border-yellow-500/20"
        style={{ background: "rgba(234,179,8,0.05)" }}
      >
        <p className="text-yellow-300 font-bold text-sm mb-1">🃏 Composition du jeu</p>
        <p className="text-white/50 text-xs leading-relaxed">
          52 cartes = 4 familles × 13 rangs (As, 2 à 10, Valet, Dame, Roi).
          Au poker, l'As peut valoir 1 (pour la suite A-2-3-4-5) ou 14 (la plus haute carte).
        </p>
      </div>

      <div className="h-6" />
    </div>
  );
}