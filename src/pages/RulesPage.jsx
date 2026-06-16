import React, { useState } from "react";

const HANDS = [
  { rank: 1, name: "Quinte Flush Royale", desc: "A K Q J 10 de la même couleur", example: "A♠ K♠ Q♠ J♠ 10♠", color: "#eab308" },
  { rank: 2, name: "Quinte Flush", desc: "5 cartes consécutives de la même couleur", example: "5♥ 6♥ 7♥ 8♥ 9♥", color: "#a855f7" },
  { rank: 3, name: "Carré", desc: "4 cartes du même rang", example: "K♠ K♥ K♦ K♣", color: "#3b82f6" },
  { rank: 4, name: "Full House", desc: "Un brelan + une paire", example: "Q♠ Q♥ Q♦ 7♣ 7♠", color: "#06b6d4" },
  { rank: 5, name: "Couleur", desc: "5 cartes de la même couleur", example: "2♦ 5♦ 8♦ J♦ A♦", color: "#22c55e" },
  { rank: 6, name: "Suite", desc: "5 cartes consécutives", example: "4♠ 5♥ 6♦ 7♣ 8♠", color: "#84cc16" },
  { rank: 7, name: "Brelan", desc: "3 cartes du même rang", example: "J♠ J♥ J♦", color: "#f97316" },
  { rank: 8, name: "Double Paire", desc: "Deux paires différentes", example: "10♠ 10♥ 4♦ 4♣", color: "#f43f5e" },
  { rank: 9, name: "Paire", desc: "2 cartes du même rang", example: "A♠ A♥", color: "#94a3b8" },
  { rank: 10, name: "Carte Haute", desc: "Aucune combinaison", example: "A♠ J♥ 9♦ 5♣ 2♠", color: "#64748b" },
];

const PHASES = [
  { name: "Preflop", desc: "Chaque joueur reçoit 2 cartes privées. Le small blind et le big blind misent obligatoirement.", color: "#1d4ed8" },
  { name: "Flop", desc: "3 cartes communes sont révélées. Un tour de mises commence.", color: "#0369a1" },
  { name: "Turn", desc: "Une 4ème carte commune est révélée. Un nouveau tour de mises.", color: "#0e7490" },
  { name: "River", desc: "La 5ème et dernière carte commune est révélée. Dernier tour de mises.", color: "#0f766e" },
  { name: "Showdown", desc: "Les joueurs révèlent leurs cartes. La meilleure main gagne le pot.", color: "#b45309" },
];

const ACTIONS = [
  { name: "✗ Fold", desc: "Abandonner sa main et quitter le tour", color: "#991b1b", border: "#7f1d1d" },
  { name: "✓ Check", desc: "Passer sans miser (si personne n'a misé)", color: "#1e40af", border: "#1e3a8a" },
  { name: "📞 Call", desc: "Suivre la mise du joueur précédent", color: "#1e40af", border: "#1e3a8a" },
  { name: "↑ Raise", desc: "Relancer en augmentant la mise", color: "#166534", border: "#14532d" },
];

const TABS = ["Déroulement", "Actions", "Mains"];

export default function RulesPage({ onBack }) {
  const [activeTab, setActiveTab] = useState(0);
  
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
    Règles du jeu
    </h1>
    <p className="text-white/30 text-xs tracking-widest uppercase">Texas Hold'em Poker</p>
    </div>
    </div>
    
    {/* Intro */}
    <div className="mx-6 mt-5 rounded-2xl p-4 border border-yellow-500/20 flex gap-3 items-start z-10"
    style={{ background: "linear-gradient(135deg, rgba(234,179,8,0.08), rgba(234,179,8,0.03))" }}>
    <span className="text-yellow-400 text-xl">♠</span>
    <p className="text-white/70 text-sm leading-relaxed">
    Le <span className="text-yellow-300 font-bold">Texas Hold'em</span> est la variante de poker la plus jouée au monde.
    Chaque joueur reçoit <span className="text-white font-bold">2 cartes privées</span> et
    combine avec <span className="text-white font-bold">5 cartes communes</span> pour former la meilleure main.
    </p>
    </div>
    
    {/* Tabs */}
    <div className="flex gap-2 px-6 mt-5 z-10">
    {TABS.map((tab, i) => (
      <button
      key={i}
      onClick={() => setActiveTab(i)}
      className="flex-1 py-2.5 rounded-xl text-sm font-bold transition-all duration-200"
      style={{
        background: activeTab === i
        ? "linear-gradient(135deg, #eab308, #f59e0b)"
        : "rgba(255,255,255,0.05)",
        color: activeTab === i ? "#000" : "rgba(255,255,255,0.4)",
        border: activeTab === i ? "none" : "1px solid rgba(255,255,255,0.08)",
      }}
      >
      {tab}
      </button>
    ))}
    </div>
    
    {/* Content */}
    <div className="flex-1 px-6 py-5 flex flex-col gap-3 overflow-y-auto z-10">
    
    {activeTab === 0 && PHASES.map((phase, i) => (
      <div key={i} className="flex gap-4 rounded-2xl p-4 border border-white/5 items-center"
      style={{ background: "rgba(255,255,255,0.03)" }}>
      <div className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center font-black text-white text-sm"
      style={{ background: phase.color }}>
      {i + 1}
      </div>
      <div>
      <p className="text-white font-black text-base">{phase.name}</p>
      <p className="text-white/50 text-xs mt-1 leading-relaxed">{phase.desc}</p>
      </div>
      </div>
    ))}
    
    {activeTab === 1 && (
      <div className="flex flex-col gap-3">
      <p className="text-white/30 text-xs text-center mb-1">À chaque tour, tu peux faire l'une de ces actions :</p>
      {ACTIONS.map((a, i) => (
        <div key={i} className="flex items-center gap-4 rounded-2xl p-4 border"
        style={{ background: `${a.color}20`, borderColor: `${a.border}60` }}>
        <div className="flex-shrink-0 px-3 py-2 rounded-xl font-black text-white text-sm"
        style={{ background: a.color }}>
        {a.name}
        </div>
        <p className="text-white/70 text-sm">{a.desc}</p>
        </div>
      ))}
      <div className="rounded-2xl p-4 border border-yellow-500/20 mt-2"
      style={{ background: "rgba(234,179,8,0.05)" }}>
      <p className="text-yellow-300 font-bold text-sm mb-2">🪙 Les blinds</p>
      <p className="text-white/50 text-xs leading-relaxed">
      Avant chaque manche, 2 joueurs misent obligatoirement :<br />
      <span className="text-white">Small blind</span> = mise minimale •{" "}
      <span className="text-white">Big blind</span> = double du small blind
      </p>
      </div>
      </div>
    )}
    
    {activeTab === 2 && (
      <div className="flex flex-col gap-2">
      <p className="text-white/30 text-xs text-center mb-1">De la plus forte à la plus faible :</p>
      {HANDS.map((hand, i) => (
        <div key={i} className="flex items-center gap-3 rounded-xl p-3 border border-white/5"
        style={{ background: "rgba(255,255,255,0.03)" }}>
        <div className="flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center font-black text-white text-xs"
        style={{ background: hand.color }}>
        {hand.rank}
        </div>
        <div className="flex-1 min-w-0">
        <p className="text-white font-bold text-sm">{hand.name}</p>
        <p className="text-white/40 text-xs truncate">{hand.desc}</p>
        </div>
        <span className="text-xs font-mono flex-shrink-0 px-2 py-1 rounded-lg"
        style={{ color: hand.color, background: `${hand.color}15` }}>
        {hand.example}
        </span>
        </div>
      ))}
      </div>
    )}
    </div>
    </div>
  );
}