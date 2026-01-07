<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import type { GameMode, TeamColor } from '@/types'
import { useGameStore, useSettingsStore } from '@/stores'
import { useTeamColors } from '@/composables'
import { GameLayout } from '@/components/layout'
import { BaseModal } from '@/components/ui'
import { trackGameStart } from '@/plugins/analytics'

interface Props {
  mode: GameMode
}

const props = defineProps<Props>()

const gameStore = useGameStore()
const settingsStore = useSettingsStore()
const { teamTextClasses } = useTeamColors()
const showRestorePrompt = ref(false)
const showFreshStartConfirm = ref(false)
const isReady = ref(false)

const savedGamePreview = computed(() => gameStore.getSavedGamePreview())

const savedTeamColors = computed((): TeamColor[] => {
  const preview = savedGamePreview.value
  if (!preview) return []
  return preview.mode === 'duet' ? ['green'] : ['red', 'blue']
})

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

function handleFreshStartClick(): void {
  showFreshStartConfirm.value = true
}

function handleFreshStartCancel(): void {
  showFreshStartConfirm.value = false
}

function handleFreshStartConfirm(): void {
  // Reset to defaults: clear saved game and disable auto-save
  gameStore.clearSavedGame()
  settingsStore.setAutoSave(false)
  gameStore.initializeGame(props.mode)
  trackGameStart(props.mode)
  showFreshStartConfirm.value = false
  showRestorePrompt.value = false
  isReady.value = true
}
</script>

<template>
  <!-- Restore Game Prompt -->
  <BaseModal v-if="showRestorePrompt" title="Saved Game Found" icon="floppy-disk" @close="handleRestoreGame">
    <p class="text-gray-600 mb-4">
      A previously saved game was found. Would you like to continue where you left off?
    </p>

    <!-- Team Preview -->
    <div v-if="savedGamePreview" class="mb-6 grid gap-2 sm:grid-cols-2">
      <div
        v-for="color in savedTeamColors"
        :key="color"
        class="flex sm:flex-col justify-between sm:justify-start items-center sm:items-start gap-3 sm:gap-1 p-3 rounded-lg bg-gray-50"
      >
        <div class="shrink-0 sm:contents">
          <div :class="['font-bold capitalize whitespace-nowrap', teamTextClasses[color]]">{{ color }} Team</div>
          <div class="text-sm text-gray-600 whitespace-nowrap">
            Score: <span class="font-bold">{{ savedGamePreview.teams[color].score }}</span>
          </div>
        </div>
        <div class="text-sm text-gray-500 text-right sm:text-left">
          <template v-if="savedGamePreview.teams[color].players.length > 0">
            {{ savedGamePreview.teams[color].players.join(', ') }}
          </template>
          <template v-else>
            No players
          </template>
        </div>
      </div>
    </div>

    <div class="flex gap-3 justify-end">
      <button
        class="px-4 py-2.5 text-gray-700 font-medium rounded-lg hover:bg-gray-100 transition-colors"
        @click="handleFreshStartClick"
      >
        Start Fresh
      </button>
      <button
        class="px-4 py-2.5 bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg shadow-sm transition-colors flex items-center gap-2"
        @click="handleRestoreGame"
      >
        <FontAwesomeIcon icon="play" />
        Continue Game
      </button>
    </div>
  </BaseModal>

  <!-- Fresh Start Confirmation -->
  <BaseModal v-if="showFreshStartConfirm" title="Start Fresh?" icon="triangle-exclamation" @close="handleFreshStartCancel">
    <p class="text-gray-600 mb-6">
      This will discard your saved game including teams and scores. Are you sure?
    </p>
    <div class="flex gap-3 justify-end">
      <button
        class="px-4 py-2.5 text-gray-700 font-medium rounded-lg hover:bg-gray-100 transition-colors"
        @click="handleFreshStartCancel"
      >
        Cancel
      </button>
      <button
        class="px-4 py-2.5 bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg shadow-sm transition-colors"
        @click="handleFreshStartConfirm"
      >
        Start Fresh
      </button>
    </div>
  </BaseModal>

  <GameLayout v-if="isReady" />
</template>
