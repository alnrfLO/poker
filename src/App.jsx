import React, { useState } from "react";
import MenuPage from "./pages/MenuPage";
import RulesPage from "./pages/RulesPage";
import SuitsPage from "./pages/SuitsPage";
import LobbyPage from "./pages/LobbyPage";
import GamePage from "./pages/GamePage";

const SCREENS = {
  MENU: "menu",
  RULES: "rules",
  SUITS: "suits",
  LOBBY: "lobby",
  GAME: "game",
};

export default function App() {
  const [screen, setScreen] = useState(SCREENS.MENU);
  const [roomId, setRoomId] = useState(null);
  const [playerId, setPlayerId] = useState(null);

  function handleJoinRoom(id, pId) {
    setRoomId(id);
    setPlayerId(pId);
    setScreen(SCREENS.GAME);
  }

  function handleLeaveGame() {
    setRoomId(null);
    setPlayerId(null);
    setScreen(SCREENS.MENU);
  }

  return (
    <>
      {screen === SCREENS.MENU && (
        <MenuPage
          onPlay={() => setScreen(SCREENS.LOBBY)}
          onRules={() => setScreen(SCREENS.RULES)}
          onSuits={() => setScreen(SCREENS.SUITS)}
        />
      )}
      {screen === SCREENS.RULES && (
        <RulesPage onBack={() => setScreen(SCREENS.MENU)} />
      )}
      {screen === SCREENS.SUITS && (
        <SuitsPage onBack={() => setScreen(SCREENS.MENU)} />
      )}
      {screen === SCREENS.LOBBY && (
        <LobbyPage
          onJoin={handleJoinRoom}
          onBack={() => setScreen(SCREENS.MENU)}
        />
      )}
      {screen === SCREENS.GAME && (
        <GamePage
          roomId={roomId}
          playerId={playerId}
          onLeave={handleLeaveGame}
        />
      )}
    </>
  );
}