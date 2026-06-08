import { useState } from "react";
import { PHASES, PLAYER_STATUS, CONFIG } from "../utils/constants";
import { createDeck, shuffleDeck, dealCards } from "../utils/deck";

function createPlayers() {
    return [
        { id: 0, name: "Toi", chips: CONFIG.STARTING_CHIPS, hand: [], bet: 0, status: PLAYER_STATUS.ACTIVE, isHuman: true },
        { id: 1, name: "Alice", chips: CONFIG.STARTING_CHIPS, hand: [], bet: 0, status: PLAYER_STATUS.ACTIVE, isHuman: false },
        { id: 2, name: "Bob", chips: CONFIG.STARTING_CHIPS, hand: [], bet: 0, status: PLAYER_STATUS.ACTIVE, isHuman: false },
        { id: 3, name: "Carol", chips: CONFIG.STARTING_CHIPS, hand: [], bet: 0, status: PLAYER_STATUS.ACTIVE, isHuman: false },
    ];
}

export function useGameState() {
    const [players, setPlayers] = useState(createPlayers());
    const [deck, setDeck] = useState([]);
    const [communityCards, setCommunityCards] = useState([]);
    const [pot, setPot] = useState(0);
    const [phase, setPhase] = useState(PHASES.WAITING);
    const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
    const [dealerIndex, setDealerIndex] = useState(0);
    const [currentBet, setCurrentBet] = useState(0);
    const [winner, setWinner] = useState(null);
    const [winnerHand, setWinnerHand] = useState(null);
    const [message, setMessage] = useState("Bienvenue ! Clique sur Nouvelle partie.");
    const [lastAction, setLastAction] = useState(null);
    
    function startNewRound() {
        const shuffled = shuffleDeck(createDeck());
        let remaining = shuffled;
        
        const newPlayers = createPlayers().map((p, i) => ({
            ...p,
            chips: players[i]?.chips > 0 ? players[i].chips : CONFIG.STARTING_CHIPS,
        }));
        
        // Deal 2 cards to each player
        const updatedPlayers = newPlayers.map((p) => {
            const { cards, remainingDeck } = dealCards(remaining, 2);
            remaining = remainingDeck;
            return { ...p, hand: cards, bet: 0, status: PLAYER_STATUS.ACTIVE };
        });
        
        // Blinds
        const smallIdx = (dealerIndex + 1) % updatedPlayers.length;
        const bigIdx = (dealerIndex + 2) % updatedPlayers.length;
        updatedPlayers[smallIdx].chips -= CONFIG.SMALL_BLIND;
        updatedPlayers[smallIdx].bet = CONFIG.SMALL_BLIND;
        updatedPlayers[bigIdx].chips -= CONFIG.BIG_BLIND;
        updatedPlayers[bigIdx].bet = CONFIG.BIG_BLIND;
        
        const firstToAct = (dealerIndex + 3) % updatedPlayers.length;
        
        setDeck(remaining);
        setPlayers(updatedPlayers);
        setCommunityCards([]);
        setPot(CONFIG.SMALL_BLIND + CONFIG.BIG_BLIND);
        setPhase(PHASES.PREFLOP);
        setCurrentBet(CONFIG.BIG_BLIND);
        setCurrentPlayerIndex(firstToAct);
        setWinner(null);
        setWinnerHand(null);
        setLastAction(null);
        setMessage(`Phase : Preflop — Small blind: ${CONFIG.SMALL_BLIND} / Big blind: ${CONFIG.BIG_BLIND}`);
    }
    
    function nextPhase(currentDeck, currentPlayers, currentPot) {
        const activePlayers = currentPlayers.filter((p) => p.status !== PLAYER_STATUS.FOLDED);
        
        if (activePlayers.length === 1) {
            return { shouldShowdown: true };
        }
        
        setCurrentBet(0);
        const resetPlayers = currentPlayers.map((p) => ({ ...p, bet: 0 }));
        setPlayers(resetPlayers);
        
        if (phase === PHASES.PREFLOP) {
            const { cards, remainingDeck } = dealCards(currentDeck, 3);
            setCommunityCards(cards);
            setDeck(remainingDeck);
            setPhase(PHASES.FLOP);
            setMessage("Phase : Flop");
        } else if (phase === PHASES.FLOP) {
            const { cards, remainingDeck } = dealCards(currentDeck, 1);
            setCommunityCards((prev) => [...prev, ...cards]);
            setDeck(remainingDeck);
            setPhase(PHASES.TURN);
            setMessage("Phase : Turn");
        } else if (phase === PHASES.TURN) {
            const { cards, remainingDeck } = dealCards(currentDeck, 1);
            setCommunityCards((prev) => [...prev, ...cards]);
            setDeck(remainingDeck);
            setPhase(PHASES.RIVER);
            setMessage("Phase : River");
        } else if (phase === PHASES.RIVER) {
            setPhase(PHASES.SHOWDOWN);
            return { shouldShowdown: true };
        }
        
        const firstActive = resetPlayers.findIndex(
            (p) => p.status === PLAYER_STATUS.ACTIVE
        );
        setCurrentPlayerIndex(firstActive);
        return { shouldShowdown: false };
    }
    
    return {
        players, setPlayers,
        deck, setDeck,
        communityCards, setCommunityCards,
        pot, setPot,
        phase, setPhase,
        currentPlayerIndex, setCurrentPlayerIndex,
        dealerIndex, setDealerIndex,
        currentBet, setCurrentBet,
        winner, setWinner,
        winnerHand, setWinnerHand,
        message, setMessage,
        lastAction, setLastAction,
        startNewRound,
        nextPhase,
    };
}
