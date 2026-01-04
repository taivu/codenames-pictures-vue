import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Card, CardColor, TeamColor, GameMode, Team, CardColorOption } from '@/types'
import { gameConfig } from '@/config'
import { shuffle, chunk, capitalize } from '@/utils'

export const useGameStore = defineStore('game', () => {
  // ===================
  // State
  // ===================
  const mode = ref<GameMode>('classic')
  const cards = ref<Card[]>([])
  const usedCardIds = ref<number[]>([])
  const startingTeam = ref<TeamColor | null>(null)
  const colorMenuOpen = ref(false)

  const teams = ref<Record<TeamColor, Team>>({
    red: { color: 'red', players: [], score: 0 },
    blue: { color: 'blue', players: [], score: 0 },
    green: { color: 'green', players: [], score: 0 },
  })

  // ===================
  // Computed
  // ===================
  const isDuetMode = computed(() => mode.value === 'duet')

  const activeTeamColors = computed<TeamColor[]>(() =>
    isDuetMode.value
      ? [...gameConfig.teamColors.duet]
      : [...gameConfig.teamColors.classic]
  )

  const gridSize = computed(() =>
    isDuetMode.value ? gameConfig.grid.duet.size : gameConfig.grid.classic.size
  )

  const cardColorOptions = computed<CardColorOption[]>(() => {
    const teamOptions = activeTeamColors.value.map((color) => ({
      value: color as CardColor,
      label: capitalize(color),
    }))
    return [
      ...teamOptions,
      { value: 'neutral' as CardColor, label: 'Neutral' },
      { value: 'black' as CardColor, label: 'Game Over' },
    ]
  })

  const teamsAreSetup = computed(() =>
    activeTeamColors.value.every((color) => teams.value[color].players.length > 0)
  )

  // ===================
  // Actions
  // ===================
  function initializeGame(gameMode: GameMode): void {
    mode.value = gameMode
    startingTeam.value = null
    resetScores()
    generateCards()
  }

  function generateCards(): void {
    // First, mark current game's cards as used (if any exist)
    if (cards.value.length > 0) {
      const currentCardIds = cards.value.map((c) => c.imageId)
      const newUsedIds = currentCardIds.filter((id) => !usedCardIds.value.includes(id))
      usedCardIds.value.push(...newUsedIds)
    }

    // Reset used cards if we've used them all (or close to it)
    if (usedCardIds.value.length > gameConfig.totalCards - gridSize.value) {
      usedCardIds.value = []
    }

    // Get available card IDs (not recently used)
    const availableIds = Array.from({ length: gameConfig.totalCards }, (_, i) => i).filter(
      (id) => !usedCardIds.value.includes(id)
    )

    // Select random cards from available pool
    const selectedIds = shuffle(availableIds).slice(0, gridSize.value)

    // Create card objects
    cards.value = selectedIds.map((imageId, index) => ({
      id: index,
      imageId,
      color: '' as CardColor,
    }))
  }

  function setCardColor(cardId: number, color: CardColor): void {
    const card = cards.value.find((c) => c.id === cardId)
    if (card) {
      card.color = color
    }
  }

  function resetCardColor(cardId: number): void {
    setCardColor(cardId, '')
  }

  function getGuessedCount(teamColor: TeamColor): number {
    return cards.value.filter((card) => card.color === teamColor).length
  }

  function getTotalCards(teamColor: TeamColor): number {
    if (isDuetMode.value) {
      return gameConfig.duetCardsPerTeam
    }
    return startingTeam.value === teamColor
      ? gameConfig.startingTeamCards.starter
      : gameConfig.startingTeamCards.other
  }

  // Team Management
  function addPlayer(teamColor: TeamColor, name: string): void {
    if (name.trim()) {
      teams.value[teamColor].players.push(name.trim())
    }
  }

  function updatePlayer(teamColor: TeamColor, index: number, name: string): void {
    teams.value[teamColor].players[index] = name
  }

  function removePlayer(teamColor: TeamColor, index: number): void {
    teams.value[teamColor].players.splice(index, 1)
  }

  function shuffleTeams(): void {
    const allPlayers = activeTeamColors.value.flatMap((color) => teams.value[color].players)
    const shuffled = shuffle(allPlayers)
    const chunkedPlayers = chunk(shuffled, activeTeamColors.value.length)

    activeTeamColors.value.forEach((color, i) => {
      teams.value[color].players = chunkedPlayers[i] || []
    })
    resetScores()
  }

  function pickSpyMasters(): void {
    activeTeamColors.value.forEach((color) => {
      teams.value[color].players = shuffle(teams.value[color].players)
    })
  }

  function setStartingTeam(color: TeamColor): void {
    startingTeam.value = color
  }

  function incrementScore(teamColor: TeamColor): void {
    teams.value[teamColor].score++
  }

  function decrementScore(teamColor: TeamColor): void {
    const team = teams.value[teamColor]
    if (team.score > 0) {
      team.score = team.score - 1
    }
  }

  function resetScores(): void {
    activeTeamColors.value.forEach((color) => {
      teams.value[color].score = 0
    })
  }

  function newGame(): void {
    generateCards()
    startingTeam.value = null
  }

  return {
    // State
    mode,
    cards,
    teams,
    startingTeam,
    usedCardIds,
    colorMenuOpen,
    // Computed
    isDuetMode,
    activeTeamColors,
    gridSize,
    cardColorOptions,
    teamsAreSetup,
    // Actions
    initializeGame,
    generateCards,
    setCardColor,
    resetCardColor,
    getGuessedCount,
    getTotalCards,
    addPlayer,
    updatePlayer,
    removePlayer,
    shuffleTeams,
    pickSpyMasters,
    setStartingTeam,
    incrementScore,
    decrementScore,
    resetScores,
    newGame,
  }
})
