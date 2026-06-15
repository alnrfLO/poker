import React, { useState } from "react";
import { useRoom } from "../hooks/useRoom";

export default function LobbyPage({ onJoin, onBack }) {
  const [name, setName] = useState("");
  const [roomCode, setRoomCode] = useState("");
  const [mode, setMode] = useState(null); // "create" | "join"
  const { createRoom, joinRoom, error, loading } = useRoom();

        async function handleCreate() {
        if (!name.trim()) return;
        const id = await createRoom(name.trim());
        if (id) onJoin(id, 0);
        }   
    async function handleJoin() {
    if (!name.trim() || !roomCode.trim()) return;
    const result = await joinRoom(roomCode.trim().toUpperCase(), name.trim());
    if (result !== false) {
        onJoin(roomCode.trim().toUpperCase(), result);
    }
    }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6"
      style={{ background: "linear-gradient(135deg, #030712, #0f172a)" }}>

      <div className="flex flex-col items-center gap-6 w-full max-w-sm">
        {/* Logo */}
        <div className="text-center">
          <div className="text-6xl mb-2">♠</div>
          <h1 className="text-white font-black text-3xl tracking-widest">POKER</h1>
        </div>

        {/* Nom */}
        <div className="w-full">
          <label className="text-white/50 text-xs uppercase tracking-widest mb-2 block">Ton nom</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Entre ton pseudo..."
            maxLength={12}
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/20 outline-none focus:border-yellow-500/50 transition-all"
          />
        </div>

        {/* Choix mode */}
        {!mode && (
          <div className="flex flex-col gap-3 w-full">
            <button
              onClick={() => setMode("create")}
              disabled={!name.trim()}
              className="w-full py-4 rounded-2xl font-black text-black text-lg transition-all hover:scale-105 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed shadow-xl"
              style={{ background: "linear-gradient(135deg, #eab308, #f59e0b)" }}
            >
              ✦ Créer une salle
            </button>
            <button
              onClick={() => setMode("join")}
              disabled={!name.trim()}
              className="w-full py-4 rounded-2xl font-black text-white text-lg transition-all hover:scale-105 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed border border-white/20"
              style={{ background: "rgba(255,255,255,0.05)" }}
            >
              → Rejoindre une salle
            </button>
          </div>
        )}

        {/* Créer */}
        {mode === "create" && (
          <div className="flex flex-col gap-3 w-full">
            <p className="text-white/50 text-sm text-center">
              Une salle sera créée avec un code unique à partager à tes amis.
            </p>
            <button
              onClick={handleCreate}
              disabled={loading || !name.trim()}
              className="w-full py-4 rounded-2xl font-black text-black text-lg transition-all hover:scale-105 active:scale-95 disabled:opacity-40 shadow-xl"
              style={{ background: "linear-gradient(135deg, #eab308, #f59e0b)" }}
            >
              {loading ? "Création..." : "🃏 Créer la salle"}
            </button>
            <button onClick={() => setMode(null)} className="text-white/30 text-sm hover:text-white/50 transition-all">
              ← Retour
            </button>
          </div>
        )}

        {/* Rejoindre */}
        {mode === "join" && (
          <div className="flex flex-col gap-3 w-full">
            <div className="w-full">
              <label className="text-white/50 text-xs uppercase tracking-widest mb-2 block">Code de la salle</label>
              <input
                type="text"
                value={roomCode}
                onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
                placeholder="Ex: A1B2C3"
                maxLength={6}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/20 outline-none focus:border-yellow-500/50 transition-all text-center text-2xl font-black tracking-widest uppercase"
              />
            </div>
            <button
              onClick={handleJoin}
              disabled={loading || !name.trim() || !roomCode.trim()}
              className="w-full py-4 rounded-2xl font-black text-black text-lg transition-all hover:scale-105 active:scale-95 disabled:opacity-40 shadow-xl"
              style={{ background: "linear-gradient(135deg, #eab308, #f59e0b)" }}
            >
              {loading ? "Connexion..." : "→ Rejoindre"}
            </button>
            <button onClick={() => setMode(null)} className="text-white/30 text-sm hover:text-white/50 transition-all">
              ← Retour
            </button>
          </div>
        )}

        {error && (
          <div className="w-full px-4 py-3 rounded-xl border border-red-500/30 bg-red-500/10 text-red-400 text-sm text-center">
            {error}
          </div>
        )}

        <button onClick={onBack} className="text-white/20 text-sm hover:text-white/40 transition-all">
          ← Menu principal
        </button>
      </div>
    </div>
  );
}