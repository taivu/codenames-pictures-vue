<script setup lang="ts">
import { ref } from 'vue'
import { useGameStore, useSettingsStore } from '@/stores'
import { ScoreBoard, TeamSummary } from '@/components/team'
import { BaseModal, ToggleSwitch } from '@/components/ui'
import { trackNewGame } from '@/plugins/analytics'
import { appConfig } from '@/config'

const emit = defineEmits<{
  close: []
  openTeams: []
  openSettings: []
}>()

const gameStore = useGameStore()
const settingsStore = useSettingsStore()

const showNewGameConfirm = ref(false)

function handleNewGameClick() {
  // Skip confirmation if no teams are set up - just start new game
  if (!gameStore.teamsAreSetup) {
    gameStore.newGame()
    trackNewGame(gameStore.mode)
    emit('close')
    return
  }
  showNewGameConfirm.value = true
}

function confirmNewGame() {
  gameStore.newGame()
  trackNewGame(gameStore.mode)
  showNewGameConfirm.value = false
  emit('close')
}

function cancelNewGame() {
  showNewGameConfirm.value = false
}

function handleOpenTeams() {
  emit('openTeams')
  emit('close')
}

function handleOpenSettings() {
  emit('openSettings')
  emit('close')
}

function handleAutoSaveToggle() {
  const newValue = !settingsStore.autoSaveEnabled
  settingsStore.setAutoSave(newValue)
  if (newValue) {
    gameStore.persistGame()
  } else {
    gameStore.clearSavedGame()
  }
}
</script>

<template>
  <div class="flex h-full flex-col">
    <!-- Header -->
    <div class="flex shrink-0 items-center justify-between border-b border-gray-200 px-4 py-3">
      <h2 class="text-xl font-bold text-gray-800">Menu</h2>
      <button
        class="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
        @click="emit('close')"
      >
        <FontAwesomeIcon icon="arrow-right" />
      </button>
    </div>

    <!-- Scrollable Content Area -->
    <div class="min-h-0 flex-1 overflow-y-auto">
      <!-- Team Summaries Section -->
      <div class="border-b border-gray-200 px-4 py-3">
        <h3 class="mb-2 text-sm font-bold tracking-wide text-gray-500 uppercase">Teams</h3>
        <div class="space-y-2">
          <TeamSummary v-for="color in gameStore.activeTeamColors" :key="color" :color="color" />
          <div
            v-if="!gameStore.teamsAreSetup"
            class="rounded-lg border border-amber-200 bg-amber-50 p-3 text-center"
          >
            <p class="mb-2 text-xs text-amber-700">No teams set up yet</p>
            <button
              class="rounded bg-amber-500 px-3 py-1 text-sm font-bold text-white hover:bg-amber-600"
              @click="handleOpenTeams"
            >
              Set up teams
            </button>
          </div>
        </div>
      </div>

      <!-- Scores Section (only in classic mode with teams) -->
      <div
        v-if="!gameStore.isDuetMode && gameStore.teamsAreSetup"
        class="border-b border-gray-200 px-4 py-3"
      >
        <h3 class="mb-2 text-sm font-bold tracking-wide text-gray-500 uppercase">Scores</h3>
        <ScoreBoard />
      </div>

      <!-- Actions Section -->
      <nav class="py-2">
        <button
          class="flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-gray-100"
          @click="handleNewGameClick"
        >
          <FontAwesomeIcon icon="rotate" class="w-5 text-gray-500" />
          <span class="font-medium">New Game</span>
        </button>

        <button
          class="flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-gray-100"
          @click="handleOpenTeams"
        >
          <FontAwesomeIcon icon="users" class="w-5 text-gray-500" />
          <span class="font-medium">Teams</span>
        </button>

        <a
          href="/spy-master"
          target="_blank"
          class="flex items-center gap-3 px-4 py-3 transition-colors hover:bg-gray-100"
        >
          <FontAwesomeIcon icon="user-secret" class="w-5 text-gray-500" />
          <span class="flex-1 font-medium">Spy Master</span>
          <FontAwesomeIcon icon="up-right-from-square" class="text-xs text-gray-400" />
        </a>

        <div class="my-2 border-t border-gray-100" />

        <a
          href="/rules"
          target="_blank"
          class="flex items-center gap-3 px-4 py-3 transition-colors hover:bg-gray-100"
        >
          <FontAwesomeIcon icon="book" class="w-5 text-gray-500" />
          <span class="flex-1 font-medium">Rules</span>
          <FontAwesomeIcon icon="up-right-from-square" class="text-xs text-gray-400" />
        </a>

        <a
          href="/about"
          target="_blank"
          class="flex items-center gap-3 px-4 py-3 transition-colors hover:bg-gray-100"
        >
          <FontAwesomeIcon icon="circle-info" class="w-5 text-gray-500" />
          <span class="flex-1 font-medium">About</span>
          <FontAwesomeIcon icon="up-right-from-square" class="text-xs text-gray-400" />
        </a>

        <div class="my-2 border-t border-gray-100" />

        <button
          class="flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-gray-100"
          @click="handleOpenSettings"
        >
          <FontAwesomeIcon icon="gear" class="w-5 text-gray-500" />
          <span class="font-medium">Settings</span>
        </button>

        <!-- Version -->
        <div class="px-4 py-3 text-center text-xs text-gray-400">rev: {{ appConfig.version }}</div>
      </nav>
    </div>
    <!-- End Scrollable Content Area -->

    <!-- Auto-save toggle at bottom -->
    <div class="shrink-0 border-t border-gray-200 bg-gray-50 px-4 py-3">
      <label class="flex cursor-pointer items-center justify-between">
        <span class="text-sm text-gray-600">
          <FontAwesomeIcon icon="floppy-disk" class="mr-2 text-gray-400" />
          Auto-save game
        </span>
        <ToggleSwitch
          :model-value="settingsStore.autoSaveEnabled"
          @update:model-value="handleAutoSaveToggle"
        />
      </label>
    </div>

    <!-- New Game Confirmation Modal -->
    <BaseModal
      v-if="showNewGameConfirm"
      title="Start New Game?"
      icon="rotate"
      @close="cancelNewGame"
    >
      <p class="mb-6 text-gray-600">
        This will shuffle and deal new cards. Teams and scores will be kept.
      </p>
      <div class="flex justify-end gap-3">
        <button
          class="rounded-lg px-4 py-2.5 font-medium text-gray-700 transition-colors hover:bg-gray-100"
          @click="cancelNewGame"
        >
          Cancel
        </button>
        <button
          class="rounded-lg bg-green-500 px-4 py-2.5 font-medium text-white shadow-sm transition-colors hover:bg-green-600"
          @click="confirmNewGame"
        >
          New Game
        </button>
      </div>
    </BaseModal>
  </div>
</template>
