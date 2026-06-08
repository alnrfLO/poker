import React from "react";
import { ACTIONS, PLAYER_STATUS } from "../utils/constants";

export default function ActionBar({
    player,
    currentBet,
    onAction,
    raiseAmount,
    disabled = false,
}) {
    if (!player || !player.isHuman || player.status !== PLAYER_STATUS.ACTIVE) {
        return null;
    }
    
    const toCall = Math.max(0, currentBet - player.bet);
    const canCheck = toCall === 0;
    const canCall = toCall > 0 && player.chips >= toCall;
    const canRaise = player.chips > toCall;
    
    return (
        <div className="flex gap-3 items-center justify-center flex-wrap">
        {/* Fold */}
        <button
        onClick={() => onAction(ACTIONS.FOLD)}
        disabled={disabled}
        className="px-6 py-3 rounded-xl font-bold text-white bg-red-700 hover:bg-red-600
disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200
border border-red-500 shadow-lg hover:scale-105 active:scale-95"
        >
        Fold
        </button>
        
        {/* Check ou Call */}
        {canCheck ? (
            <button
            onClick={() => onAction(ACTIONS.CHECK)}
            disabled={disabled}
            className="px-6 py-3 rounded-xl font-bold text-white bg-blue-700 hover:bg-blue-600
disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200
border border-blue-500 shadow-lg hover:scale-105 active:scale-95"
            >
            Check
            </button>
        ) : (
            <button
            onClick={() => onAction(ACTIONS.CALL)}
            disabled={disabled || !canCall}
            className="px-6 py-3 rounded-xl font-bold text-white bg-blue-700 hover:bg-blue-600
disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200
border border-blue-500 shadow-lg hover:scale-105 active:scale-95"
            >
            Call {toCall}
            </button>
        )}
        
        {/* Raise */}
        {canRaise && (
            <button
            onClick={() => onAction(ACTIONS.RAISE, raiseAmount)}
            disabled={disabled}
            className="px-6 py-3 rounded-xl font-bold text-white bg-green-700 hover:bg-green-600
disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200
border border-green-500 shadow-lg hover:scale-105 active:scale-95"
            >
            Raise {raiseAmount}
            </button>
        )}
        </div>
    );
}

