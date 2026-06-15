import { useCallback } from "react";
import { ACTIONS, PLAYER_STATUS } from "../utils/constants";
import { findWinner } from "../utils/handEvaluator";

export function usePokerLogic({ roomId, gameState, updateState, nextPhase, playerId }) {
  function getNextActiveIndex(players, fromIndex) {
    let next = (fromIndex + 1) % players.length;
    let tries = 0;
    while (players[next]?.status !== PLAYER_STATUS.ACTIVE && tries < players.length) {
      next = (next + 1) % players.length;
      tries++;
    }
    return next;
  }

  async function triggerShowdown(players, pot, communityCards) {
    const { winner, handResult } = findWinner(players, communityCards);
    if (!winner) return;

    const updatedPlayers = players.map((p) =>
      p.id === winner.id ? { ...p, chips: p.chips + pot } : p
    );

    await updateState({
      phase: "showdown",
      players: updatedPlayers,
      winner: { ...winner, handRank: handResult.rank },
      winnerHandResult: handResult,
    });
  }

  const handleAction = useCallback(async (action, raiseAmount = 0) => {
    if (!gameState) return;

    let { players, pot, currentBet, currentPlayerIndex, communityCards, phase } = gameState;
    players = [...players.map((p) => ({ ...p }))];
    const player = players[currentPlayerIndex];

    if (action === ACTIONS.FOLD) {
      players[currentPlayerIndex].status = PLAYER_STATUS.FOLDED;

      const active = players.filter((p) => p.status === PLAYER_STATUS.ACTIVE);
      if (active.length === 1) {
        await updateState({ players });
        await triggerShowdown(players, pot, communityCards || []);
        return;
      }
    } else if (action === ACTIONS.CHECK) {
      // rien
    } else if (action === ACTIONS.CALL) {
      const toCall = Math.min(currentBet - player.bet, player.chips);
      players[currentPlayerIndex].chips -= toCall;
      players[currentPlayerIndex].bet += toCall;
      pot += toCall;
    } else if (action === ACTIONS.RAISE) {
      const toCall = currentBet - player.bet;
      const total = Math.min(toCall + raiseAmount, player.chips);
      players[currentPlayerIndex].chips -= total;
      players[currentPlayerIndex].bet += total;
      currentBet = players[currentPlayerIndex].bet;
      pot += total;
    }

    // Vérifie si tout le monde a misé pareil
    const activePlayers = players.filter((p) => p.status === PLAYER_STATUS.ACTIVE);
    const allCalled = activePlayers.every((p) => p.bet === currentBet);

    if (allCalled) {
      await updateState({ players, pot, currentBet });
      const isShowdown = await nextPhase({ ...gameState, players, pot, currentBet });
      if (isShowdown) {
        await triggerShowdown(players, pot, communityCards || []);
      }
      return;
    }

    const next = getNextActiveIndex(players, currentPlayerIndex);
    await updateState({
      players,
      pot,
      currentBet,
      currentPlayerIndex: next,
    });
  }, [gameState]);

  return { handleAction };
}