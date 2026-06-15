import React, { useState } from "react";
import { useChat } from "../hooks/useChat";

const EMOJI_REACTIONS = ["👍", "😂", "😮", "😢", "🔥", "♠️"];

export default function Chat({ roomId, playerName }) {
  const { messages, sendMessage, bottomRef } = useChat(roomId);
  const [input, setInput] = useState("");
  const [open, setOpen] = useState(false);
  const [unread, setUnread] = useState(0);
  const prevLengthRef = React.useRef(0);

  // Compte les non lus quand le chat est fermé
  React.useEffect(() => {
    if (!open && messages.length > prevLengthRef.current) {
      setUnread((u) => u + (messages.length - prevLengthRef.current));
    }
    prevLengthRef.current = messages.length;
  }, [messages, open]);

  function handleOpen() {
    setOpen(true);
    setUnread(0);
  }

  async function handleSend() {
    if (!input.trim()) return;
    await sendMessage(playerName, input);
    setInput("");
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") handleSend();
  }

  async function handleEmoji(emoji) {
    await sendMessage(playerName, emoji);
  }

  function formatTime(timestamp) {
    const d = new Date(timestamp);
    return `${d.getHours().toString().padStart(2, "0")}:${d.getMinutes().toString().padStart(2, "0")}`;
  }

  return (
    <>
      {/* Bouton flottant */}
      {!open && (
        <button
          onClick={handleOpen}
          className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all hover:scale-110 active:scale-95 border border-white/20"
          style={{ background: "linear-gradient(135deg, #1e3a8a, #1d4ed8)" }}
        >
          <span className="text-2xl">💬</span>
          {unread > 0 && (
            <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 flex items-center justify-center">
              <span className="text-white text-xs font-black">{unread}</span>
            </div>
          )}
        </button>
      )}

      {/* Panel chat */}
      {open && (
        <div
          className="fixed bottom-6 right-6 z-50 w-80 rounded-2xl border border-white/10 shadow-2xl flex flex-col overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #0f172a, #1e293b)",
            height: "420px",
          }}
        >
          {/* Header */}
          <div
            className="flex items-center justify-between px-4 py-3 border-b border-white/10"
            style={{ background: "rgba(0,0,0,0.3)" }}
          >
            <div className="flex items-center gap-2">
              <span className="text-lg">💬</span>
              <span className="text-white font-bold text-sm">Chat</span>
              <span className="text-white/30 text-xs">{messages.length} msgs</span>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="text-white/40 hover:text-white transition-all text-lg leading-none"
            >
              ✕
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-3 py-2 flex flex-col gap-2">
            {messages.length === 0 && (
              <div className="flex-1 flex items-center justify-center">
                <p className="text-white/20 text-sm text-center">
                  Aucun message pour l'instant.<br />Dis bonjour ! 👋
                </p>
              </div>
            )}
            {messages.map((msg, i) => {
              const isMe = msg.playerName === playerName;
              return (
                <div
                  key={i}
                  className={`flex flex-col ${isMe ? "items-end" : "items-start"}`}
                >
                  {/* Nom */}
                  {!isMe && (
                    <span className="text-white/30 text-xs mb-0.5 px-1">{msg.playerName}</span>
                  )}
                  {/* Bulle */}
                  <div
                    className={`max-w-[85%] px-3 py-2 rounded-2xl text-sm ${
                      isMe
                        ? "rounded-br-sm text-white"
                        : "rounded-bl-sm text-white"
                    }`}
                    style={{
                      background: isMe
                        ? "linear-gradient(135deg, #1d4ed8, #1e40af)"
                        : "rgba(255,255,255,0.08)",
                    }}
                  >
                    {msg.text}
                  </div>
                  {/* Heure */}
                  <span className="text-white/20 text-xs mt-0.5 px-1">
                    {formatTime(msg.timestamp)}
                  </span>
                </div>
              );
            })}
            <div ref={bottomRef} />
          </div>

          {/* Réactions rapides */}
          <div
            className="flex gap-2 px-3 py-2 border-t border-white/5"
            style={{ background: "rgba(0,0,0,0.2)" }}
          >
            {EMOJI_REACTIONS.map((emoji) => (
              <button
                key={emoji}
                onClick={() => handleEmoji(emoji)}
                className="text-lg hover:scale-125 transition-all active:scale-95"
              >
                {emoji}
              </button>
            ))}
          </div>

          {/* Input */}
          <div
            className="flex gap-2 px-3 py-3 border-t border-white/10"
            style={{ background: "rgba(0,0,0,0.3)" }}
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Message..."
              maxLength={100}
              className="flex-1 px-3 py-2 rounded-xl text-sm text-white placeholder-white/20 outline-none border border-white/10 focus:border-blue-500/50 transition-all"
              style={{ background: "rgba(255,255,255,0.05)" }}
            />
            <button
              onClick={handleSend}
              disabled={!input.trim()}
              className="w-9 h-9 rounded-xl flex items-center justify-center transition-all hover:scale-110 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed"
              style={{ background: "linear-gradient(135deg, #1d4ed8, #2563eb)" }}
            >
              <span className="text-white text-sm">→</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
}