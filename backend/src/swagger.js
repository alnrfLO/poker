import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "♠ Poker Game API",
      version: "1.0.0",
      description: "API REST pour gérer les salles et les parties de poker Texas Hold'em",
      contact: {
        name: "alnrfLO",
        url: "https://github.com/alnrfLO/poker",
      },
    },
    servers: [
      {
        url: "http://localhost:3001",
        description: "Serveur de développement",
      },
    ],
    tags: [
      { name: "Rooms", description: "Gestion des salles de jeu" },
      { name: "Players", description: "Gestion des joueurs" },
      { name: "Game", description: "Actions de jeu" },
    ],
    components: {
      schemas: {
        Player: {
          type: "object",
          properties: {
            id: { type: "integer", example: 0 },
            name: { type: "string", example: "raf" },
            chips: { type: "integer", example: 1000 },
            bet: { type: "integer", example: 0 },
            status: { type: "string", enum: ["active", "folded", "all_in"], example: "active" },
            isHost: { type: "boolean", example: true },
          },
        },
        Room: {
          type: "object",
          properties: {
            id: { type: "string", example: "A1B2C3" },
            phase: { type: "string", enum: ["waiting", "preflop", "flop", "turn", "river", "showdown"], example: "waiting" },
            players: { type: "array", items: { $ref: "#/components/schemas/Player" } },
            pot: { type: "integer", example: 0 },
            currentPlayerIndex: { type: "integer", example: 0 },
            dealerIndex: { type: "integer", example: 0 },
            currentBet: { type: "integer", example: 0 },
            communityCards: { type: "array", items: { type: "object" } },
            winner: { type: "object", nullable: true },
          },
        },
        Error: {
          type: "object",
          properties: {
            success: { type: "boolean", example: false },
            message: { type: "string", example: "Erreur serveur" },
          },
        },
      },
    },
  },
  apis: ["./src/routes/*.js"],
};

export const swaggerSpec = swaggerJsdoc(options);