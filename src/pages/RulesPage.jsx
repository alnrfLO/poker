import React from "react";

const HANDS = [
  { rank: "🥇", name: "Quinte Flush Royale", desc: "A K Q J 10 de la même couleur", example: "A♠ K♠ Q♠ J♠ 10♠" },
  { rank: "🥈", name: "Quinte Flush", desc: "5 cartes consécutives de la même couleur", example: "5♥ 6♥ 7♥ 8♥ 9♥" },
  { rank: "3", name: "Carré", desc: "4 cartes du même rang", example: "K♠ K♥ K♦ K♣" },
  { rank: "4", name: "Full House", desc: "Un brelan + une paire", example: "Q♠ Q♥ Q♦ 7♣ 7♠" },
  { rank: "5", name: "Couleur", desc: "5 cartes de la même couleur", example: "2♦ 5♦ 8♦ J♦ A♦" },
  { rank: "6", name: "Suite", desc: "5 cartes consécutives", example: "4♠ 5♥ 6♦ 7♣ 8♠" },
  { rank: "7", name: "Brelan", desc: "3 cartes du même rang", example: "J♠ J♥ J♦" },
  { rank: "8", name: "Double Paire", desc: "Deux paires différentes", example: "10♠ 10♥ 4♦ 4♣" },
  { rank: "9", name: "Paire", desc: "2 cartes du même rang", example: "A♠ A♥" },
  { rank: "10", name: "Carte Haute", desc: "Aucune combinaison", example: "A♠ J♥ 9♦ 5♣ 2♠" },
];

const PHASES = [
  { name: "Preflop", icon: "🂠", desc: "Chaque joueur reçoit 2 cartes privées. Le small blind et le big blind misent obligatoirement." },
  { name: "Flop", icon: "🃏", desc: "3 cartes communes sont révélées. Un tour de mises commence." },
  { name: "Turn", icon: "🃏", desc: "Une 4ème carte commune est révélée. Un nouveau tour de mises." },
  { name: "River", icon: "🃏", desc: "La 5ème et dernière carte commune est révélée. Dernier tour de mises." },
  { name: "Showdown", icon: "🏆", desc: "Les joueurs encore en jeu révèlent leurs cartes. La meilleure main gagne le pot." },
];

export default function RulesPage({ onBack }) {
  return (
    <div
      className="min-h-screen flex flex-col p-6 gap-6"
      style={{ background: "linear-gradient(135deg, #030712, #0f172a)" }}
    >
      {/* Header */}
      <div className="flex items-center gap-4 pt-2">
        <button
          onClick={onBack}
          className="text-white/50 hover:text-white transition-all text-lg"
        >
          ←
        </button>
        <h1 className="text-white font-black text-2xl">📋 Règles du jeu</h1>
      </div>

      {/* Intro */}
      <div
        className="rounded-2xl p-4 border border-white/10"
        style={{ background: "rgba(255,255,255,0.04)" }}
      >
        <p className="text-white/70 text-sm leading-relaxed">
          Le <span className="text-yellow-300 font-bold">Texas Hold'em</span> est la variante
          de poker la plus jouée au monde. Chaque joueur reçoit <strong className="text-white">2 cartes privées</strong> et
          combine avec <strong className="text-white">5 cartes communes</strong> pour former
          la meilleure main possible.
        </p>
      </div>

      {/* Déroulement */}
      <div className="flex flex-col gap-3">
        <h2 className="text-white font-bold text-lg">🔄 Déroulement d'une manche</h2>
        {PHASES.map((phase, i) => (
          <div
            key={i}
            className="flex gap-3 rounded-xl p-3 border border-white/5"
            style={{ background: "rgba(255,255,255,0.03)" }}
          >
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-yellow-500/20 border border-yellow-500/30 flex items-center justify-center">
              <span className="text-yellow-300 font-black text-xs">{i + 1}</span>
            </div>
            <div>
              <p className="text-yellow-300 font-bold text-sm">{phase.name}</p>
              <p className="text-white/60 text-xs mt-0.5">{phase.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-3">
        <h2 className="text-white font-bold text-lg">🎯 Les actions</h2>
        <div className="grid grid-cols-2 gap-2">
          {[
            { name: "Fold ✗", desc: "Se coucher, abandonner la main", color: "#7f1d1d" },
            { name: "Check ✓", desc: "Passer sans miser (si personne n'a misé)", color: "#1e3a8a" },
            { name: "Call", desc: "Suivre la mise du joueur précédent", color: "#1e3a8a" },
            { name: "Raise ↑", desc: "Relancer en augmentant la mise", color: "#14532d" },
          ].map((a, i) => (
            <div
              key={i}
              className="rounded-xl p-3 border border-white/10"
              style={{ background: `${a.color}40` }}
            >
              <p className="text-white font-bold text-sm">{a.name}</p>
              <p className="text-white/50 text-xs mt-1">{a.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Hiérarchie des mains */}
      <div className="flex flex-col gap-3">
        <h2 className="text-white font-bold text-lg">🏆 Hiérarchie des mains</h2>
        <div className="flex flex-col gap-2">
          {HANDS.map((hand, i) => (
            <div
              key={i}
              className="flex items-center gap-3 rounded-xl p-3 border border-white/5"
              style={{ background: "rgba(255,255,255,0.03)" }}
            >
              <span className="text-lg w-6 text-center">{hand.rank}</span>
              <div className="flex-1">
                <p className="text-white font-bold text-sm">{hand.name}</p>
                <p className="text-white/40 text-xs">{hand.desc}</p>
              </div>
              <span className="text-yellow-300/60 text-xs font-mono">{hand.example}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="h-6" />
    </div>
  );
}