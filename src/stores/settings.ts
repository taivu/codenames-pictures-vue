/**
 * Settings Store - User preferences persisted to localStorage.
 * Manages card set selection, auto-save, and pressure mode settings.
 */
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { cardSets, getDefaultCardSetIds, getCardSetById } from '@/config'
import type { CardSet } from '@/config'
import { loadFromStorage, saveToStorage } from '@/utils'

const STORAGE_KEY = 'codenames-settings'

interface PersistedSettings {
  enabledCardSetIds: string[]
  autoSaveEnabled?: boolean
  pressureModeEnabled?: boolean
}

export const useSettingsStore = defineStore('settings', () => {
  // ===================
  // State
  // ===================

  const stored = loadFromStorage<PersistedSettings>(STORAGE_KEY)
  const enabledCardSetIds = ref<string[]>(stored?.enabledCardSetIds ?? getDefaultCardSetIds())
  const autoSaveEnabled = ref<boolean>(stored?.autoSaveEnabled ?? false)
  const pressureModeEnabled = ref<boolean>(stored?.pressureModeEnabled ?? false)

  // ===================
  // Computed
  // ===================

  const enabledCardSets = computed<CardSet[]>(() =>
    enabledCardSetIds.value
      .map((id) => getCardSetById(id))
      .filter((set): set is CardSet => set !== undefined)
  )

  const totalEnabledCards = computed<number>(() =>
    enabledCardSets.value.reduce((sum, set) => sum + set.cardCount, 0)
  )

  const allCardSets = computed<CardSet[]>(() => cardSets)

  // ===================
  // Actions
  // ===================

  function isCardSetEnabled(setId: string): boolean {
    return enabledCardSetIds.value.includes(setId)
  }

  /**
   * Enable or disable a card set.
   * At least one card set must remain enabled to play the game.
   */
  function setCardSetEnabled(setId: string, enabled: boolean): void {
    const currentIndex = enabledCardSetIds.value.indexOf(setId)
    const isCurrentlyEnabled = currentIndex !== -1
    const isLastEnabled = enabledCardSetIds.value.length === 1

    if (enabled && !isCurrentlyEnabled) {
      enabledCardSetIds.value.push(setId)
      persist()
    }

    if (!enabled && isCurrentlyEnabled && !isLastEnabled) {
      enabledCardSetIds.value.splice(currentIndex, 1)
      persist()
    }
    // Silently ignore: trying to disable the last remaining set
  }

  function toggleCardSet(setId: string): void {
    setCardSetEnabled(setId, !isCardSetEnabled(setId))
  }

  function setAutoSave(enabled: boolean): void {
    autoSaveEnabled.value = enabled
    persist()
  }

  function setPressureMode(enabled: boolean): void {
    pressureModeEnabled.value = enabled
    persist()
  }

  function resetToDefaults(): void {
    enabledCardSetIds.value = getDefaultCardSetIds()
    autoSaveEnabled.value = false
    pressureModeEnabled.value = false
    persist()
  }

  // ===================
  // Persistence
  // ===================

  function persist(): void {
    saveToStorage<PersistedSettings>(STORAGE_KEY, {
      enabledCardSetIds: enabledCardSetIds.value,
      autoSaveEnabled: autoSaveEnabled.value,
      pressureModeEnabled: pressureModeEnabled.value,
    })
  }

  return {
    // State
    enabledCardSetIds,
    autoSaveEnabled,
    pressureModeEnabled,
    // Computed
    enabledCardSets,
    totalEnabledCards,
    allCardSets,
    // Actions
    isCardSetEnabled,
    setCardSetEnabled,
    toggleCardSet,
    setAutoSave,
    setPressureMode,
    resetToDefaults,
  }
})
