import { useCallback } from "react";
import { ACTIONS, PLAYER_STATUS, CONFIG } from "../utils/constants";
import { findWinner } from "../utils/handEvaluator";

export function usePokerLogic({
    players, setPlayers,
    deck,
    communityCards,
    pot, setPot,
    currentPlayerIndex, setCurrentPlayerIndex,
    currentBet, setCurrentBet,
    dealerIndex, setDealerIndex,
    setWinner, setWinnerHand,
    setMessage, setLastAction,
    phase,
    nextPhase,
    startNewRound,
}) {
    // Vérifie si tout le monde a misé pareil → passe à la phase suivante
    function checkRoundEnd(updatedPlayers, updatedPot, updatedBet) {
        const activePlayers = updatedPlayers.filter(
            (p) => p.status === PLAYER_STATUS.ACTIVE
        );
        
        const allCalled = activePlayers.every((p) => p.bet === updatedBet);
        
        if (allCalled) {
            const result = nextPhase(deck, updatedPlayers, updatedPot);
            if (result?.shouldShowdown) {
                triggerShowdown(updatedPlayers, updatedPot);
            }
            return true;
        }
        return false;
    }
    
    function getNextActiveIndex(currentPlayers, fromIndex) {
        let next = (fromIndex + 1) % currentPlayers.length;
        let tries = 0;
        while (
            currentPlayers[next].status !== PLAYER_STATUS.ACTIVE &&
            tries < currentPlayers.length
        ) {
            next = (next + 1) % currentPlayers.length;
            tries++;
        }
        return next;
    }
    
    function triggerShowdown(finalPlayers, finalPot) {
        const { winner, handResult } = findWinner(finalPlayers, communityCards);
        if (winner) {
            const updatedPlayers = finalPlayers.map((p) =>
                p.id === winner.id ? { ...p, chips: p.chips + finalPot } : p
        );
        setPlayers(updatedPlayers);
        setWinner(winner);
        setWinnerHand(handResult);
        setMessage(`🏆 ${winner.name} gagne ${finalPot} jetons !`);
        setDealerIndex((prev) => (prev + 1) % finalPlayers.length);
    }
}

const handleAction = useCallback(
    (action, raiseAmount = 0) => {
        let updatedPlayers = [...players];
        let updatedPot = pot;
        let updatedBet = currentBet;
        const player = updatedPlayers[currentPlayerIndex];
        
        if (action === ACTIONS.FOLD) {
            updatedPlayers[currentPlayerIndex] = {
                ...player,
                status: PLAYER_STATUS.FOLDED,
            };
            setLastAction({ playerId: player.id, action: "Fold" });
            
            const stillActive = updatedPlayers.filter(
                (p) => p.status === PLAYER_STATUS.ACTIVE
            );
            if (stillActive.length === 1) {
                const finalPot = updatedPot;
                triggerShowdown(updatedPlayers, finalPot);
                setPlayers(updatedPlayers);
                return;
            }
        } else if (action === ACTIONS.CHECK) {
            setLastAction({ playerId: player.id, action: "Check" });
        } else if (action === ACTIONS.CALL) {
            const toCall = updatedBet - player.bet;
            const actual = Math.min(toCall, player.chips);
            updatedPlayers[currentPlayerIndex] = {
                ...player,
                chips: player.chips - actual,
                bet: player.bet + actual,
            };
            updatedPot += actual;
            setLastAction({ playerId: player.id, action: `Call ${actual}` });
        } else if (action === ACTIONS.RAISE) {
            const toCall = updatedBet - player.bet;
            const total = toCall + raiseAmount;
            const actual = Math.min(total, player.chips);
            updatedPlayers[currentPlayerIndex] = {
                ...player,
                chips: player.chips - actual,
                bet: player.bet + actual,
            };
            updatedBet = player.bet + actual;
            updatedPot += actual;
            setCurrentBet(updatedBet);
            setLastAction({ playerId: player.id, action: `Raise ${actual}` });
        }
        
        setPlayers(updatedPlayers);
        setPot(updatedPot);
        
        const ended = checkRoundEnd(updatedPlayers, updatedPot, updatedBet);
        if (!ended) {
            const next = getNextActiveIndex(updatedPlayers, currentPlayerIndex);
            setCurrentPlayerIndex(next);
        }
    },
    [players, pot, currentBet, currentPlayerIndex, deck, communityCards, phase]
);

// IA simple
const runAI = useCallback(
    (playerIndex) => {
        const player = players[playerIndex];
        if (!player || player.isHuman || player.status !== PLAYER_STATUS.ACTIVE) return;
        
        setTimeout(() => {
            const toCall = currentBet - player.bet;
            const rand = Math.random();
            
            if (toCall === 0) {
                // Check ou raise
                if (rand < 0.7) {
                    handleAction(ACTIONS.CHECK);
                } else {
                    handleAction(ACTIONS.RAISE, CONFIG.BIG_BLIND * 2);
                }
            } else if (rand < 0.3) {
                handleAction(ACTIONS.FOLD);
            } else if (rand < 0.7) {
                handleAction(ACTIONS.CALL);
            } else {
                handleAction(ACTIONS.RAISE, CONFIG.BIG_BLIND * 2);
            }
        }, CONFIG.AI_THINK_DELAY);
    },
    [players, currentBet, handleAction]
);

return { handleAction, runAI };
}
