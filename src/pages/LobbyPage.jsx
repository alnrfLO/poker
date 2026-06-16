import React, { useState } from "react";
import { useRoom } from "../hooks/useRoom";

export default function LobbyPage({ onJoin, onBack }) {
  const [name, setName] = useState("");
  const [roomCode, setRoomCode] = useState("");
  const [mode, setMode] = useState(null);
  const { createRoom, joinRoom, error, loading } = useRoom();
  
  async function handleCreate() {
    if (!name.trim()) return;
    const id = await createRoom(name.trim());
    if (id) onJoin(id, 0);
  }
  
  async function handleJoin() {
    if (!name.trim() || !roomCode.trim()) return;
    const result = await joinRoom(roomCode.trim().toUpperCase(), name.trim());
    if (result !== false) onJoin(roomCode.trim().toUpperCase(), result);
  }
  
  return (
    <div
    className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden p-6"
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
    <div className="absolute top-1/3 left-0 right-0 h-px opacity-20"
    style={{ background: "linear-gradient(90deg, transparent, #eab308, transparent)" }} />
    </div>
    
    <div className="flex flex-col items-center gap-6 w-full max-w-xs z-10">
    
    {/* Logo */}
    <div className="flex flex-col items-center gap-2">
    <div className="flex gap-4 text-3xl">
    <span style={{ color: "#7c3aed", textShadow: "0 0 20px #7c3aed80" }}>♠</span>
    <span style={{ color: "#dc2626", textShadow: "0 0 20px #dc262680" }}>♥</span>
    <span style={{ color: "#dc2626", textShadow: "0 0 20px #dc262680" }}>♦</span>
    <span style={{ color: "#7c3aed", textShadow: "0 0 20px #7c3aed80" }}>♣</span>
    </div>
    <h1
    className="font-black tracking-[0.2em] uppercase text-4xl"
    style={{
      background: "linear-gradient(135deg, #eab308 0%, #fde68a 40%, #eab308 60%, #92400e 100%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      filter: "drop-shadow(0 0 20px rgba(234,179,8,0.3))",
    }}
    >
    POKER
    </h1>
    </div>
    
    {/* Champ nom - toujours visible */}
    {!mode && (
      <div className="w-full flex flex-col gap-2">
      <label className="text-white/40 text-xs uppercase tracking-widest">Ton pseudo</label>
      <input
      type="text"
      value={name}
      onChange={(e) => setName(e.target.value)}
      placeholder="Entre ton pseudo..."
      maxLength={12}
      className="w-full px-4 py-3 rounded-xl text-white placeholder-white/20 outline-none transition-all"
      style={{
        background: "rgba(255,255,255,0.05)",
        border: "1px solid rgba(255,255,255,0.1)",
      }}
      onFocus={(e) => e.target.style.borderColor = "rgba(234,179,8,0.5)"}
      onBlur={(e) => e.target.style.borderColor = "rgba(255,255,255,0.1)"}
      />
      </div>
    )}
    
    {/* Choix mode */}
    {!mode && (
      <div className="flex flex-col gap-3 w-full">
      <button
      onClick={() => setMode("create")}
      disabled={!name.trim()}
      className="w-full py-4 rounded-2xl font-black text-black text-lg transition-all hover:scale-105 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
      style={{
        background: "linear-gradient(135deg, #eab308, #fbbf24)",
        boxShadow: "0 0 30px rgba(234,179,8,0.3)",
      }}
      >
      ✦ Créer une salle
      </button>
      <button
      onClick={() => setMode("join")}
      disabled={!name.trim()}
      className="w-full py-4 rounded-2xl font-black text-white text-lg transition-all hover:scale-105 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed border"
      style={{
        background: "linear-gradient(135deg, rgba(124,58,237,0.2), rgba(124,58,237,0.05))",
        borderColor: "rgba(124,58,237,0.4)",
      }}
      >
      → Rejoindre une salle
      </button>
      </div>
    )}
    
    {/* Créer */}
    {mode === "create" && (
      <div className="flex flex-col gap-4 w-full">
      <div className="rounded-2xl p-4 border border-yellow-500/20 text-center"
      style={{ background: "rgba(234,179,8,0.05)" }}>
      <p className="text-white/50 text-xs uppercase tracking-widest mb-1">Ton pseudo</p>
      <p className="text-yellow-300 font-black text-xl">{name}</p>
      </div>
      <div className="rounded-2xl p-4 border border-white/10 text-center"
      style={{ background: "rgba(255,255,255,0.03)" }}>
      <p className="text-white/40 text-sm">
      Un code unique sera généré — partage-le à tes amis pour qu'ils rejoignent !
      </p>
      </div>
      <button
      onClick={handleCreate}
      disabled={loading}
      className="w-full py-4 rounded-2xl font-black text-black text-lg transition-all hover:scale-105 active:scale-95 disabled:opacity-40"
      style={{
        background: "linear-gradient(135deg, #eab308, #fbbf24)",
        boxShadow: "0 0 30px rgba(234,179,8,0.3)",
      }}
      >
      {loading ? "Création..." : "🃏 Créer la salle"}
      </button>
      <button onClick={() => setMode(null)} className="text-white/20 text-sm hover:text-white/40 transition-all text-center">
      ← Retour
      </button>
      </div>
    )}
    
    {/* Rejoindre */}
    {mode === "join" && (
      <div className="flex flex-col gap-4 w-full">
      <div className="rounded-2xl p-4 border border-yellow-500/20 text-center"
      style={{ background: "rgba(234,179,8,0.05)" }}>
      <p className="text-white/50 text-xs uppercase tracking-widest mb-1">Ton pseudo</p>
      <p className="text-yellow-300 font-black text-xl">{name}</p>
      </div>
      <div className="flex flex-col gap-2 w-full">
      <label className="text-white/40 text-xs uppercase tracking-widest">Code de la salle</label>
      <input
      type="text"
      value={roomCode}
      onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
      placeholder="Ex: A1B2C3"
      maxLength={6}
      className="w-full px-4 py-4 rounded-xl text-white placeholder-white/20 outline-none text-center text-2xl font-black tracking-widest uppercase transition-all"
      style={{
        background: "rgba(255,255,255,0.05)",
        border: "1px solid rgba(255,255,255,0.1)",
      }}
      onFocus={(e) => e.target.style.borderColor = "rgba(234,179,8,0.5)"}
      onBlur={(e) => e.target.style.borderColor = "rgba(255,255,255,0.1)"}
      />
      </div>
      <button
      onClick={handleJoin}
      disabled={loading || !roomCode.trim()}
      className="w-full py-4 rounded-2xl font-black text-black text-lg transition-all hover:scale-105 active:scale-95 disabled:opacity-40"
      style={{
        background: "linear-gradient(135deg, #eab308, #fbbf24)",
        boxShadow: "0 0 30px rgba(234,179,8,0.3)",
      }}
      >
      {loading ? "Connexion..." : "→ Rejoindre"}
      </button>
      <button onClick={() => setMode(null)} className="text-white/20 text-sm hover:text-white/40 transition-all text-center">
      ← Retour
      </button>
      </div>
    )}
    
    {error && (
      <div className="w-full px-4 py-3 rounded-xl border border-red-500/30 text-red-400 text-sm text-center"
      style={{ background: "rgba(220,38,38,0.1)" }}>
      {error}
      </div>
    )}
    
    <button onClick={onBack} className="text-white/15 text-xs hover:text-white/30 transition-all">
    ← Menu principal
    </button>
    </div>
    </div>
  );
}

