<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { GameMode } from '@/types'
import { useGameStore, useSettingsStore } from '@/stores'
import { GameBoard } from '@/components/game'
import { BaseModal } from '@/components/ui'

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
    isReady.value = true
  }
})

function handleRestoreGame(): void {
  gameStore.restoreSavedGame()
  showRestorePrompt.value = false
  isReady.value = true
}

function handleNewGame(): void {
  // Reset to defaults: clear saved game and disable auto-save
  gameStore.clearSavedGame()
  settingsStore.setAutoSave(false)
  gameStore.initializeGame(props.mode)
  showRestorePrompt.value = false
  isReady.value = true
}
</script>

<template>
  <!-- Restore Game Prompt -->
  <BaseModal v-if="showRestorePrompt" title="Saved Game Found">
    <p class="text-gray-700 mb-6">
      A previously saved game was found. Would you like to continue where you left off?
    </p>
    <div class="flex gap-3 justify-end">
      <button
        class="px-4 py-2 bg-gray-200 hover:bg-gray-300 font-bold rounded border-2 border-gray-400"
        @click="handleNewGame"
      >
        Start Fresh
      </button>
      <button
        class="px-4 py-2 bg-green-500 hover:bg-green-600 text-white font-bold rounded border-2 border-green-700"
        @click="handleRestoreGame"
      >
        Continue Game
      </button>
    </div>
  </BaseModal>

  <GameBoard v-if="isReady" />
</template>
