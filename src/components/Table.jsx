import React from "react";
import Board from "./Board";
import Pot from "./Pot";
import PlayerList from "./PlayerList";
import ActionBar from "./ActionBar";
import RaiseSlider from "./RaiseSlider";
import WinnerModal from "./WinnerModal";
import { PHASES } from "../utils/constants";

export default function Table({
    players,
    communityCards,
    pot,
    phase,
    currentPlayerIndex,
    dealerIndex,
    currentBet,
    winner,
    winnerHand,
    message,
    lastAction,
    raiseAmount,
    onRaiseChange,
    onAction,
    onNewRound,
}) {
    const humanPlayer = players.find((p) => p.isHuman);
    const isShowdown = phase === PHASES.SHOWDOWN;
    const isWaiting = phase === PHASES.WAITING;
    const isHumanTurn = players[currentPlayerIndex]?.isHuman;
    
    return (
        <div className="relative min-h-screen bg-gradient-to-br from-gray-950 via-green-950 to-gray-950 flex flex-col items-center justify-between p-4 gap-4">
        
        {/* Header */}
        <div className="w-full max-w-2xl flex justify-between items-center">
        <h1 className="text-white font-bold text-xl tracking-widest uppercase">
        ♠ Poker
        </h1>
        <div className="text-white/50 text-sm bg-black/30 rounded-full px-3 py-1">
        {phase.toUpperCase()}
        </div>
        </div>
        
        {/* Message */}
        <div className="text-white/70 text-sm text-center bg-black/30 rounded-full px-4 py-2 max-w-md">
        {message}
        </div>
        
        {/* Joueurs */}
        <PlayerList
        players={players}
        currentPlayerIndex={currentPlayerIndex}
        dealerIndex={dealerIndex}
        showAllCards={isShowdown}
        />
        
        {/* Board + Pot */}
        {!isWaiting && (
            <div className="flex flex-col items-center gap-4">
            <Board cards={communityCards} />
            <Pot amount={pot} />
            </div>
        )}
        
        {/* Dernière action IA */}
        {lastAction && !isHumanTurn && (
            <div className="text-white/50 text-xs bg-black/30 rounded-full px-3 py-1">
            {players.find((p) => p.id === lastAction.playerId)?.name} → {lastAction.action}
            </div>
        )}
        
        {/* Actions joueur humain */}
        {!isWaiting && !winner && (
            <div className="flex flex-col items-center gap-3 w-full max-w-xs">
            {isHumanTurn && (
                <RaiseSlider
                player={humanPlayer}
                currentBet={currentBet}
                value={raiseAmount}
                onChange={onRaiseChange}
                />
            )}
            <ActionBar
            player={humanPlayer}
            currentBet={currentBet}
            onAction={onAction}
            raiseAmount={raiseAmount}
            disabled={!isHumanTurn}
            />
            </div>
        )}
        
        {/* Bouton nouvelle partie */}
        {isWaiting && (
            <button
            onClick={onNewRound}
            className="px-10 py-4 bg-yellow-500 hover:bg-yellow-400 text-black font-bold rounded-2xl
transition-all duration-200 hover:scale-105 active:scale-95 shadow-xl text-lg"
            >
            🃏 Nouvelle partie
            </button>
        )}
        
        {/* Modal gagnant */}
        <WinnerModal
        winner={winner}
        handResult={winnerHand}
        pot={pot}
        onNewRound={onNewRound}
        />
        </div>
    );
}

