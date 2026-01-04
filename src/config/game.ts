export const gameConfig = {
  totalCards: Number(import.meta.env.VITE_TOTAL_CARDS) || 280,

  grid: {
    columns: Number(import.meta.env.VITE_GRID_COLUMNS) || 5,
    classic: {
      size: Number(import.meta.env.VITE_CLASSIC_GRID_SIZE) || 20,
      rows: 4,
    },
    duet: {
      size: Number(import.meta.env.VITE_DUET_GRID_SIZE) || 25,
      rows: 5,
    },
  },

  teamColors: {
    classic: ['red', 'blue'] as const,
    duet: ['green'] as const,
  },

  cardColors: ['red', 'blue', 'green', 'neutral', 'black'] as const,

  startingTeamCards: {
    starter: 8,
    other: 7,
  },

  duetCardsPerTeam: 15,
} as const

export type GameConfig = typeof gameConfig
