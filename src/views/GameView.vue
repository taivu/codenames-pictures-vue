<script setup lang="ts">
/**
 * GameView - Main game entry point with save/restore prompt and game layout.
 */
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

const savedGamePreview = computed(() => gameStore.getSavedGamePreview(props.mode))

const savedTeamColors = computed((): TeamColor[] => {
  const preview = savedGamePreview.value
  if (!preview) return []
  return preview.mode === 'duet' ? ['green'] : ['red', 'blue']
})

onMounted(() => {
  if (gameStore.hasSavedGame(props.mode)) {
    showRestorePrompt.value = true
  } else {
    gameStore.initializeGame(props.mode)
    trackGameStart(props.mode)
    isReady.value = true
  }
})

function handleRestoreGame(): void {
  gameStore.restoreSavedGame(props.mode)
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
  gameStore.clearSavedGame(props.mode)
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
  <BaseModal
    v-if="showRestorePrompt"
    title="Saved Game Found"
    icon="floppy-disk"
    @close="handleRestoreGame"
  >
    <p class="mb-4 text-gray-600">
      A previously saved game was found. Would you like to continue where you left off?
    </p>

    <!-- Team Preview -->
    <div v-if="savedGamePreview" class="mb-6 grid gap-2 sm:grid-cols-2">
      <div
        v-for="color in savedTeamColors"
        :key="color"
        class="flex items-center justify-between gap-3 rounded-lg bg-gray-50 p-3 sm:flex-col sm:items-start sm:justify-start sm:gap-1"
      >
        <div class="shrink-0 sm:contents">
          <div :class="['font-bold whitespace-nowrap capitalize', teamTextClasses[color]]">
            {{ color }} Team
          </div>
          <div class="text-sm whitespace-nowrap text-gray-600">
            Score: <span class="font-bold">{{ savedGamePreview.teams[color].score }}</span>
          </div>
        </div>
        <div class="text-right text-sm text-gray-500 sm:text-left">
          <template v-if="savedGamePreview.teams[color].players.length > 0">
            {{ savedGamePreview.teams[color].players.join(', ') }}
          </template>
          <template v-else> No players </template>
        </div>
      </div>
    </div>

    <div class="flex justify-end gap-3">
      <button
        class="rounded-lg px-4 py-2.5 font-medium text-gray-700 transition-colors hover:bg-gray-100"
        @click="handleFreshStartClick"
      >
        Start Fresh
      </button>
      <button
        class="flex items-center gap-2 rounded-lg bg-green-500 px-4 py-2.5 font-medium text-white shadow-sm transition-colors hover:bg-green-600"
        @click="handleRestoreGame"
      >
        <FontAwesomeIcon icon="play" />
        Continue Game
      </button>
    </div>
  </BaseModal>

  <!-- Fresh Start Confirmation -->
  <BaseModal
    v-if="showFreshStartConfirm"
    title="Start Fresh?"
    icon="triangle-exclamation"
    @close="handleFreshStartCancel"
  >
    <p class="mb-6 text-gray-600">
      This will discard your saved game including teams and scores. Are you sure?
    </p>
    <div class="flex justify-end gap-3">
      <button
        class="rounded-lg px-4 py-2.5 font-medium text-gray-700 transition-colors hover:bg-gray-100"
        @click="handleFreshStartCancel"
      >
        Cancel
      </button>
      <button
        class="rounded-lg bg-red-500 px-4 py-2.5 font-medium text-white shadow-sm transition-colors hover:bg-red-600"
        @click="handleFreshStartConfirm"
      >
        Start Fresh
      </button>
    </div>
  </BaseModal>

  <GameLayout v-if="isReady" />
</template>
