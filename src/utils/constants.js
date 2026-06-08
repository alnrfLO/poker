export const PHASES = {
  WAITING: "waiting",
  PREFLOP: "preflop",
  FLOP: "flop",
  TURN: "turn",
  RIVER: "river",
  SHOWDOWN: "showdown",
};

export const ACTIONS = {
  FOLD: "fold",
  CHECK: "check",
  CALL: "call",
  RAISE: "raise",
  ALL_IN: "all_in",
};

export const PLAYER_STATUS = {
  ACTIVE: "active",
  FOLDED: "folded",
  ALL_IN: "all_in",
  WAITING: "waiting",
};

export const SUITS = ["♠", "♥", "♦", "♣"];
export const RANKS = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];

export const RANK_VALUES = {
  "2": 2, "3": 3, "4": 4, "5": 5, "6": 6,
  "7": 7, "8": 8, "9": 9, "10": 10,
  "J": 11, "Q": 12, "K": 13, "A": 14,
};

export const HAND_RANKS = {
  HIGH_CARD: 0,
  ONE_PAIR: 1,
  TWO_PAIR: 2,
  THREE_OF_A_KIND: 3,
  STRAIGHT: 4,
  FLUSH: 5,
  FULL_HOUSE: 6,
  FOUR_OF_A_KIND: 7,
  STRAIGHT_FLUSH: 8,
  ROYAL_FLUSH: 9,
};

export const HAND_NAMES = {
  0: "Carte haute",
  1: "Paire",
  2: "Double paire",
  3: "Brelan",
  4: "Suite",
  5: "Couleur",
  6: "Full house",
  7: "Carré",
  8: "Quinte flush",
  9: "Quinte flush royale",
};

export const CONFIG = {
  STARTING_CHIPS: 1000,
  SMALL_BLIND: 10,
  BIG_BLIND: 20,
  NUM_PLAYERS: 4,
  AI_THINK_DELAY: 1000,
};