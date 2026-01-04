import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { cardSets, getDefaultCardSetIds, getCardSetById } from '@/config'
import type { CardSet } from '@/config'

const STORAGE_KEY = 'codenames-settings'

interface PersistedSettings {
  enabledCardSetIds: string[]
}

function loadFromStorage(): PersistedSettings | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      return JSON.parse(stored)
    }
  } catch {
    // Ignore parse errors
  }
  return null
}

function saveToStorage(settings: PersistedSettings): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings))
  } catch {
    // Ignore storage errors
  }
}

export const useSettingsStore = defineStore('settings', () => {
  // Load initial state from localStorage or use defaults
  const stored = loadFromStorage()
  const enabledCardSetIds = ref<string[]>(stored?.enabledCardSetIds ?? getDefaultCardSetIds())

  // Computed
  const enabledCardSets = computed<CardSet[]>(() =>
    enabledCardSetIds.value
      .map((id) => getCardSetById(id))
      .filter((set): set is CardSet => set !== undefined)
  )

  const totalEnabledCards = computed<number>(() =>
    enabledCardSets.value.reduce((sum, set) => sum + set.cardCount, 0)
  )

  const allCardSets = computed<CardSet[]>(() => cardSets)

  // Actions
  function toggleCardSet(setId: string): void {
    const index = enabledCardSetIds.value.indexOf(setId)
    if (index === -1) {
      // Enable the set
      enabledCardSetIds.value.push(setId)
    } else {
      // Disable the set (but ensure at least one remains enabled)
      if (enabledCardSetIds.value.length > 1) {
        enabledCardSetIds.value.splice(index, 1)
      }
    }
    persist()
  }

  function setCardSetEnabled(setId: string, enabled: boolean): void {
    const index = enabledCardSetIds.value.indexOf(setId)
    if (enabled && index === -1) {
      enabledCardSetIds.value.push(setId)
      persist()
    } else if (!enabled && index !== -1 && enabledCardSetIds.value.length > 1) {
      enabledCardSetIds.value.splice(index, 1)
      persist()
    }
  }

  function isCardSetEnabled(setId: string): boolean {
    return enabledCardSetIds.value.includes(setId)
  }

  function resetToDefaults(): void {
    enabledCardSetIds.value = getDefaultCardSetIds()
    persist()
  }

  function persist(): void {
    saveToStorage({ enabledCardSetIds: enabledCardSetIds.value })
  }

  return {
    // State
    enabledCardSetIds,
    // Computed
    enabledCardSets,
    totalEnabledCards,
    allCardSets,
    // Actions
    toggleCardSet,
    setCardSetEnabled,
    isCardSetEnabled,
    resetToDefaults,
  }
})
