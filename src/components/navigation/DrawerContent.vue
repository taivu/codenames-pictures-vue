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
  <div class="flex flex-col h-full">
    <!-- Header -->
    <div class="shrink-0 px-4 py-3 border-b border-gray-200 flex items-center justify-between">
      <h2 class="text-xl font-bold text-gray-800">Menu</h2>
      <button
        class="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
        @click="emit('close')"
      >
        <FontAwesomeIcon icon="arrow-right" />
      </button>
    </div>

    <!-- Scrollable Content Area -->
    <div class="flex-1 overflow-y-auto min-h-0">
      <!-- Team Summaries Section -->
      <div class="px-4 py-3 border-b border-gray-200">
        <h3 class="text-sm font-bold text-gray-500 uppercase tracking-wide mb-2">Teams</h3>
        <div class="space-y-2">
          <TeamSummary
            v-for="color in gameStore.activeTeamColors"
            :key="color"
            :color="color"
          />
          <div
            v-if="!gameStore.teamsAreSetup"
            class="p-3 bg-amber-50 border border-amber-200 rounded-lg text-center"
          >
            <p class="text-xs text-amber-700 mb-2">No teams set up yet</p>
            <button
              class="px-3 py-1 bg-amber-500 hover:bg-amber-600 text-white text-sm font-bold rounded"
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
        class="px-4 py-3 border-b border-gray-200"
      >
        <h3 class="text-sm font-bold text-gray-500 uppercase tracking-wide mb-2">Scores</h3>
        <ScoreBoard />
      </div>

      <!-- Actions Section -->
      <nav class="py-2">
        <button
          class="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-100 transition-colors text-left"
          @click="handleNewGameClick"
        >
          <FontAwesomeIcon icon="rotate" class="text-gray-500 w-5" />
          <span class="font-medium">New Game</span>
        </button>

        <button
          class="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-100 transition-colors text-left"
          @click="handleOpenTeams"
        >
          <FontAwesomeIcon icon="users" class="text-gray-500 w-5" />
          <span class="font-medium">Teams</span>
        </button>

        <a
          href="/spy-master"
          target="_blank"
          class="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 transition-colors"
        >
          <FontAwesomeIcon icon="user-secret" class="text-gray-500 w-5" />
          <span class="font-medium flex-1">Spy Master</span>
          <FontAwesomeIcon icon="up-right-from-square" class="text-gray-400 text-xs" />
        </a>

        <div class="my-2 border-t border-gray-100" />

        <a
          href="/rules"
          target="_blank"
          class="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 transition-colors"
        >
          <FontAwesomeIcon icon="book" class="text-gray-500 w-5" />
          <span class="font-medium flex-1">Rules</span>
          <FontAwesomeIcon icon="up-right-from-square" class="text-gray-400 text-xs" />
        </a>

        <a
          href="/about"
          target="_blank"
          class="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 transition-colors"
        >
          <FontAwesomeIcon icon="circle-info" class="text-gray-500 w-5" />
          <span class="font-medium flex-1">About</span>
          <FontAwesomeIcon icon="up-right-from-square" class="text-gray-400 text-xs" />
        </a>

        <div class="my-2 border-t border-gray-100" />

        <button
          class="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-100 transition-colors text-left"
          @click="handleOpenSettings"
        >
          <FontAwesomeIcon icon="gear" class="text-gray-500 w-5" />
          <span class="font-medium">Settings</span>
        </button>

        <!-- Version -->
        <div class="px-4 py-3 text-center text-xs text-gray-400">
          rev: {{ appConfig.version }}
        </div>
      </nav>
    </div>
    <!-- End Scrollable Content Area -->

    <!-- Auto-save toggle at bottom -->
    <div class="shrink-0 px-4 py-3 border-t border-gray-200 bg-gray-50">
      <label class="flex items-center justify-between cursor-pointer">
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
    <BaseModal v-if="showNewGameConfirm" title="Start New Game?" icon="rotate" @close="cancelNewGame">
      <p class="text-gray-600 mb-6">
        This will shuffle and deal new cards. Teams and scores will be kept.
      </p>
      <div class="flex gap-3 justify-end">
        <button
          class="px-4 py-2.5 text-gray-700 font-medium rounded-lg hover:bg-gray-100 transition-colors"
          @click="cancelNewGame"
        >
          Cancel
        </button>
        <button
          class="px-4 py-2.5 bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg shadow-sm transition-colors"
          @click="confirmNewGame"
        >
          New Game
        </button>
      </div>
    </BaseModal>
  </div>
</template>
