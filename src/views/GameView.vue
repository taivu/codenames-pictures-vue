<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { GameMode } from '@/types'
import { useGameStore, useSettingsStore } from '@/stores'
import { GameLayout } from '@/components/layout'
import { BaseModal } from '@/components/ui'
import { trackGameStart } from '@/plugins/analytics'

interface Props {
  mode: GameMode
}

const props = defineProps<Props>()

const gameStore = useGameStore()
const settingsStore = useSettingsStore()
const showRestorePrompt = ref(false)
const isReady = ref(false)

onMounted(() => {
  if (gameStore.hasSavedGame) {
    showRestorePrompt.value = true
  } else {
    gameStore.initializeGame(props.mode)
    trackGameStart(props.mode)
    isReady.value = true
  }
})

function handleRestoreGame(): void {
  gameStore.restoreSavedGame()
  trackGameStart(gameStore.mode)
  showRestorePrompt.value = false
  isReady.value = true
}

function handleNewGame(): void {
  // Reset to defaults: clear saved game and disable auto-save
  gameStore.clearSavedGame()
  settingsStore.setAutoSave(false)
  gameStore.initializeGame(props.mode)
  trackGameStart(props.mode)
  showRestorePrompt.value = false
  isReady.value = true
}
</script>

<template>
  <!-- Restore Game Prompt -->
  <BaseModal v-if="showRestorePrompt" title="Saved Game Found">
    <p class="text-gray-600 mb-6">
      A previously saved game was found. Would you like to continue where you left off?
    </p>
    <div class="flex gap-3 justify-end">
      <button
        class="px-4 py-2.5 text-gray-700 font-medium rounded-lg hover:bg-gray-100 transition-colors"
        @click="handleNewGame"
      >
        Start Fresh
      </button>
      <button
        class="px-4 py-2.5 bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg shadow-sm transition-colors"
        @click="handleRestoreGame"
      >
        Continue Game
      </button>
    </div>
  </BaseModal>

  <GameLayout v-if="isReady" />
</template>
