import { RANK_VALUES, HAND_RANKS } from "./constants";

function getValues(cards) {
    return cards.map((c) => RANK_VALUES[c.rank]).sort((a, b) => b - a);
}

function getSuits(cards) {
    return cards.map((c) => c.suit);
}

function groupBy(values) {
    const groups = {};
    for (const v of values) {
        groups[v] = (groups[v] || 0) + 1;
    }
    return groups;
}

function isFlush(cards) {
    const suits = getSuits(cards);
    return suits.every((s) => s === suits[0]);
}

function isStraight(values) {
    const unique = [...new Set(values)].sort((a, b) => b - a);
    if (unique.length < 5) return false;
    for (let i = 0; i <= unique.length - 5; i++) {
        if (unique[i] - unique[i + 4] === 4) return true;
    }
    // As-2-3-4-5
    if (
        unique.includes(14) &&
        unique.includes(2) &&
        unique.includes(3) &&
        unique.includes(4) &&
        unique.includes(5)
    )
    return true;
    return false;
}

function getStraightHigh(values) {
    const unique = [...new Set(values)].sort((a, b) => b - a);
    for (let i = 0; i <= unique.length - 5; i++) {
        if (unique[i] - unique[i + 4] === 4) return unique[i];
    }
    if (
        unique.includes(14) &&
        unique.includes(2) &&
        unique.includes(3) &&
        unique.includes(4) &&
        unique.includes(5)
    )
    return 5;
    return 0;
}

export function evaluateHand(holeCards, communityCards) {
    const all = [...holeCards, ...communityCards];
    const values = getValues(all);
    const groups = groupBy(values);
    const counts = Object.values(groups).sort((a, b) => b - a);
    const flush = isFlush(all.length === 5 ? all : getBestFlush(all));
    const straight = isStraight(values);
    const straightHigh = getStraightHigh(values);
    
    const pairs = Object.entries(groups).filter(([, c]) => c === 2).map(([v]) => Number(v)).sort((a, b) => b - a);
    const threes = Object.entries(groups).filter(([, c]) => c === 3).map(([v]) => Number(v));
    const fours = Object.entries(groups).filter(([, c]) => c === 4).map(([v]) => Number(v));
    
    // Royal flush
    if (flush && straight && straightHigh === 14) {
        return { rank: HAND_RANKS.ROYAL_FLUSH, score: 9000 };
    }
    // Straight flush
    if (flush && straight) {
        return { rank: HAND_RANKS.STRAIGHT_FLUSH, score: 8000 + straightHigh };
    }
    // Four of a kind
    if (counts[0] === 4) {
        return { rank: HAND_RANKS.FOUR_OF_A_KIND, score: 7000 + fours[0] * 10 };
    }
    // Full house
    if (counts[0] === 3 && counts[1] === 2) {
        return { rank: HAND_RANKS.FULL_HOUSE, score: 6000 + threes[0] * 10 + pairs[0] };
    }
    // Flush
    if (flush) {
        return { rank: HAND_RANKS.FLUSH, score: 5000 + values[0] };
    }
    // Straight
    if (straight) {
        return { rank: HAND_RANKS.STRAIGHT, score: 4000 + straightHigh };
    }
    // Three of a kind
    if (counts[0] === 3) {
        return { rank: HAND_RANKS.THREE_OF_A_KIND, score: 3000 + threes[0] * 10 };
    }
    // Two pair
    if (counts[0] === 2 && counts[1] === 2) {
        return { rank: HAND_RANKS.TWO_PAIR, score: 2000 + pairs[0] * 10 + pairs[1] };
    }
    // One pair
    if (counts[0] === 2) {
        return { rank: HAND_RANKS.ONE_PAIR, score: 1000 + pairs[0] * 10 };
    }
    // High card
    return { rank: HAND_RANKS.HIGH_CARD, score: values[0] };
}

function getBestFlush(cards) {
    const suitGroups = {};
    for (const card of cards) {
        if (!suitGroups[card.suit]) suitGroups[card.suit] = [];
        suitGroups[card.suit].push(card);
    }
    for (const suit in suitGroups) {
        if (suitGroups[suit].length >= 5) return suitGroups[suit];
    }
    return cards.slice(0, 5);
}

export function findWinner(players, communityCards) {
    let best = null;
    let winner = null;
    
    for (const player of players) {
        if (player.status === "folded") continue;
        const result = evaluateHand(player.hand, communityCards);
        if (!best || result.score > best.score) {
            best = result;
            winner = player;
        }
    }
    
    return { winner, handResult: best };
}

