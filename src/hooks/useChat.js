import { useState, useEffect, useRef } from "react";
import { db } from "../firebase";
import { ref, push, onValue, serverTimestamp } from "firebase/database";

export function useChat(roomId) {
  const [messages, setMessages] = useState([]);
  const bottomRef = useRef(null);

  useEffect(() => {
    if (!roomId) return;
    const chatRef = ref(db, `rooms/${roomId}/chat`);
    const unsub = onValue(chatRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const list = Object.values(data).sort((a, b) => a.timestamp - b.timestamp);
        setMessages(list);
      } else {
        setMessages([]);
      }
    });
    return () => unsub();
  }, [roomId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function sendMessage(playerName, text) {
    if (!text.trim() || !roomId) return;
    const chatRef = ref(db, `rooms/${roomId}/chat`);
    await push(chatRef, {
      playerName,
      text: text.trim(),
      timestamp: Date.now(),
    });
  }

  return { messages, sendMessage, bottomRef };
}