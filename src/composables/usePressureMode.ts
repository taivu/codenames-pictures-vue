import { ref, computed, watch } from 'vue'
import { useSettingsStore, useGameStore } from '@/stores'
import { pressureModeConfig } from '@/config'

// Singleton state (shared across all component instances)
const isActive = ref(false)
const isPaused = ref(false)
const timeRemaining = ref<number>(pressureModeConfig.durations[0])
const strikes = ref(0)
const showStrikeModal = ref(false)
const showLossModal = ref(false)

let timerInterval: ReturnType<typeof setInterval> | null = null

function clearTimer(): void {
  if (timerInterval) {
    clearInterval(timerInterval)
    timerInterval = null
  }
}

function startInterval(tickFn: () => void): void {
  clearTimer()
  timerInterval = setInterval(tickFn, pressureModeConfig.tickInterval)
}

/**
 * Composable to manage pressure mode timer and strike system.
 * Singleton pattern - state is shared across all component instances.
 */
export function usePressureMode() {
  const settingsStore = useSettingsStore()
  const gameStore = useGameStore()

  // Current duration based on strikes (10min -> 5min -> 1min)
  const currentDuration = computed(() => {
    const index = Math.min(strikes.value, pressureModeConfig.durations.length - 1)
    return pressureModeConfig.durations[index] ?? pressureModeConfig.durations[0]
  })

  // Progress from 0 to 1 (1 = full, 0 = empty)
  const progress = computed(() => timeRemaining.value / currentDuration.value)

  // Timer turns orange when <= 50% time remaining
  const isCaution = computed(() => progress.value <= pressureModeConfig.cautionThreshold)

  // Timer turns red when <= 25% time remaining
  const isWarning = computed(() => progress.value <= pressureModeConfig.warningThreshold)

  // Format time as M:SS
  const formattedTime = computed(() => {
    const minutes = Math.floor(timeRemaining.value / 60)
    const seconds = timeRemaining.value % 60
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  })

  function formatDuration(seconds: number): string {
    const minutes = Math.floor(seconds / 60)
    return minutes === 1 ? '1 minute' : `${minutes} minutes`
  }

  function tick(): void {
    if (isPaused.value) return

    if (timeRemaining.value > 0) {
      timeRemaining.value--
    } else {
      clearTimer()
      strikes.value++

      if (strikes.value >= pressureModeConfig.maxStrikes) {
        showLossModal.value = true
        isActive.value = false
      } else {
        showStrikeModal.value = true
      }
    }
  }

  function startTimer(): void {
    if (!settingsStore.pressureModeEnabled) return
    strikes.value = 0
    isPaused.value = false
    timeRemaining.value = pressureModeConfig.durations[0]
    isActive.value = true
    startInterval(tick)
  }

  function resetTimer(): void {
    if (!isActive.value || !settingsStore.pressureModeEnabled) return
    timeRemaining.value = currentDuration.value
    startInterval(tick)
  }

  function togglePause(): void {
    if (isActive.value) isPaused.value = !isPaused.value
  }

  function acknowledgeStrike(): void {
    showStrikeModal.value = false
    timeRemaining.value = currentDuration.value
    isActive.value = true
    startInterval(tick)
  }

  function reset(): void {
    clearTimer()
    isActive.value = false
    isPaused.value = false
    strikes.value = 0
    timeRemaining.value = pressureModeConfig.durations[0]
    showStrikeModal.value = false
    showLossModal.value = false
  }

  function handleLoss(): void {
    showLossModal.value = false
    reset()
    gameStore.initializeGame(gameStore.mode)
  }

  function continueAsScrub(): void {
    showLossModal.value = false
    reset()
  }

  // Reset everything when pressure mode is disabled
  watch(
    () => settingsStore.pressureModeEnabled,
    (enabled) => { if (!enabled) reset() }
  )

  return {
    // State
    isActive,
    isPaused,
    strikes,
    showStrikeModal,
    showLossModal,
    // Computed
    currentDuration,
    progress,
    isCaution,
    isWarning,
    formattedTime,
    // Actions
    startTimer,
    resetTimer,
    togglePause,
    acknowledgeStrike,
    reset,
    handleLoss,
    continueAsScrub,
    formatDuration,
    // Config
    config: pressureModeConfig,
  }
}
