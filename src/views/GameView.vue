<script setup lang="ts">
/**
 * GameView - Main game entry point with save/restore prompt and game layout.
 */
import { ref, computed, onMounted } from 'vue'
import { onBeforeRouteLeave } from 'vue-router'
import type { GameMode } from '@/types'
import { useGameStore, useSettingsStore } from '@/stores'
import { GameLayout } from '@/components/layout'
import { RestoreGameModal } from '@/components/game'
import { ConfirmModal } from '@/components/ui'
import { trackGameStart } from '@/plugins/analytics'

interface Props {
  mode: GameMode
}

const props = defineProps<Props>()

const gameStore = useGameStore()
const settingsStore = useSettingsStore()

// ===================
// UI State
// ===================

const showRestorePrompt = ref(false)
const showFreshStartConfirm = ref(false)
const showLeaveConfirm = ref(false)
const pendingNavigation = ref<(() => void) | null>(null)
const isReady = ref(false)

// ===================
// Computed
// ===================

const savedGamePreview = computed(() => gameStore.getSavedGamePreview(props.mode))

// ===================
// Lifecycle
// ===================

onMounted(() => {
  if (gameStore.hasSavedGame(props.mode)) {
    showRestorePrompt.value = true
  } else {
    startNewGame()
  }
})

// Warn user before leaving if auto-save is disabled
onBeforeRouteLeave((_to, _from, next) => {
  if (isReady.value && !settingsStore.autoSaveEnabled) {
    showLeaveConfirm.value = true
    pendingNavigation.value = () => next()
    next(false)
  } else {
    next()
  }
})

// ===================
// Actions
// ===================

function startNewGame(): void {
  gameStore.initializeGame(props.mode)
  trackGameStart(props.mode)
  isReady.value = true
}

function handleRestoreGame(): void {
  gameStore.restoreSavedGame(props.mode)
  trackGameStart(gameStore.mode)
  showRestorePrompt.value = false
  isReady.value = true
}

function handleFreshStartConfirm(): void {
  // Reset to defaults: clear saved game and disable auto-save
  gameStore.clearSavedGame(props.mode)
  settingsStore.setAutoSave(false)
  showFreshStartConfirm.value = false
  showRestorePrompt.value = false
  startNewGame()
}

function handleLeaveConfirm(): void {
  showLeaveConfirm.value = false
  if (pendingNavigation.value) {
    pendingNavigation.value()
    pendingNavigation.value = null
  }
}
</script>

<template>
  <main>
    <!-- Restore Game Prompt -->
    <RestoreGameModal
      v-if="showRestorePrompt && savedGamePreview"
      :saved-game="savedGamePreview"
      @restore="handleRestoreGame"
      @fresh-start="showFreshStartConfirm = true"
    />

    <!-- Fresh Start Confirmation -->
    <ConfirmModal
      v-if="showFreshStartConfirm"
      title="Start Fresh?"
      message="This will discard your saved game including teams and scores. Are you sure?"
      confirm-text="Start Fresh"
      @confirm="handleFreshStartConfirm"
      @cancel="showFreshStartConfirm = false"
    />

    <!-- Leave Game Confirmation -->
    <ConfirmModal
      v-if="showLeaveConfirm"
      title="Leave Game?"
      message="Auto-save is off. Your current game will be lost if you leave. Are you sure?"
      confirm-text="Leave Game"
      cancel-text="Stay"
      @confirm="handleLeaveConfirm"
      @cancel="showLeaveConfirm = false; pendingNavigation = null"
    />

    <GameLayout v-if="isReady" />
  </main>
</template>
