/**
 * Game Store - Central state management for gameplay.
 * Handles cards, teams, scoring, and game persistence.
 */
import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import type { Card, CardColor, TeamColor, GameMode, Team, CardColorOption } from '@/types'
import { gameConfig } from '@/config'
import {
  shuffle,
  chunk,
  capitalize,
  loadFromStorage,
  saveToStorage,
  removeFromStorage,
} from '@/utils'
import { useSettingsStore } from './settings'

interface CardPoolItem {
  setId: string
  imageIndex: number
}

const GAME_STORAGE_KEY_PREFIX = 'codenames-game-'

function getStorageKey(gameMode: GameMode): string {
  return `${GAME_STORAGE_KEY_PREFIX}${gameMode}`
}

interface PersistedGameState {
  mode: GameMode
  cards: Card[]
  teams: Record<TeamColor, Team>
  startingTeam: TeamColor | null
  usedCards: Record<string, number[]>
}

export const useGameStore = defineStore('game', () => {
  // ===================
  // State
  // ===================
  const mode = ref<GameMode>('classic')
  const cards = ref<Card[]>([])
  const usedCards = ref<Record<string, number[]>>({}) // Track used cards per set
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
    isDuetMode.value ? [...gameConfig.teamColors.duet] : [...gameConfig.teamColors.classic]
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
    const settingsStore = useSettingsStore()
    const enabledSets = settingsStore.enabledCardSets

    // First, mark current game's cards as used (if any exist)
    if (cards.value.length > 0) {
      cards.value.forEach((card) => {
        const setUsedCards = usedCards.value[card.setId] ?? []
        if (!setUsedCards.includes(card.imageIndex)) {
          setUsedCards.push(card.imageIndex)
          usedCards.value[card.setId] = setUsedCards
        }
      })
    }

    // Build pool of available cards from all enabled sets
    const cardPool: CardPoolItem[] = []
    enabledSets.forEach((set) => {
      // Get or initialize used tracking for this set
      let setUsedCards = usedCards.value[set.id] ?? []

      // Reset used cards for this set if we've used most of them
      if (setUsedCards.length > set.cardCount - gridSize.value) {
        setUsedCards = []
        usedCards.value[set.id] = setUsedCards
      }

      // Add available cards from this set to the pool
      for (let i = 0; i < set.cardCount; i++) {
        if (!setUsedCards.includes(i)) {
          cardPool.push({ setId: set.id, imageIndex: i })
        }
      }
    })

    // Select random cards from the pool
    const selectedCards = shuffle(cardPool).slice(0, gridSize.value)

    // Create card objects
    cards.value = selectedCards.map((poolItem, index) => ({
      id: index,
      setId: poolItem.setId,
      imageIndex: poolItem.imageIndex,
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
    teams.value[teamColor].players[index] = name.trim()
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
    if (teamsAreSetup.value) {
      startingTeam.value = null
    }
    generateCards()
  }

  // ===================
  // Persistence
  // ===================
  function hasSavedGame(gameMode: GameMode): boolean {
    return loadFromStorage<PersistedGameState>(getStorageKey(gameMode)) !== null
  }

  function getSavedGamePreview(gameMode: GameMode): PersistedGameState | null {
    return loadFromStorage<PersistedGameState>(getStorageKey(gameMode))
  }

  function persistGame(): void {
    saveToStorage<PersistedGameState>(getStorageKey(mode.value), {
      mode: mode.value,
      cards: cards.value,
      teams: teams.value,
      startingTeam: startingTeam.value,
      usedCards: usedCards.value,
    })
  }

  function restoreSavedGame(gameMode: GameMode): boolean {
    const saved = loadFromStorage<PersistedGameState>(getStorageKey(gameMode))
    if (saved) {
      mode.value = saved.mode
      cards.value = saved.cards
      teams.value = saved.teams
      startingTeam.value = saved.startingTeam
      usedCards.value = saved.usedCards
      return true
    }
    return false
  }

  function clearSavedGame(gameMode: GameMode = mode.value): void {
    removeFromStorage(getStorageKey(gameMode))
  }

  // Watch for changes and auto-save (when enabled)
  watch(
    [mode, cards, teams, startingTeam, usedCards],
    () => {
      const settingsStore = useSettingsStore()
      if (settingsStore.autoSaveEnabled && cards.value.length > 0) {
        persistGame()
      }
    },
    { deep: true }
  )

  return {
    // State
    mode,
    cards,
    teams,
    startingTeam,
    usedCards,
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
    // Persistence
    hasSavedGame,
    getSavedGamePreview,
    persistGame,
    restoreSavedGame,
    clearSavedGame,
  }
})
