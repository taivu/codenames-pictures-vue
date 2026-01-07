<script setup lang="ts">
import { ref } from 'vue'
import { useGameStore, useSettingsStore } from '@/stores'
import { ScoreBoard, TeamSummary } from '@/components/team'
import { AppVersion, BaseModal, IconButton, ToggleSwitch } from '@/components/ui'
import { trackNewGame } from '@/plugins/analytics'

const emit = defineEmits<{
  close: []
  openTeams: []
  openSettings: []
}>()

const gameStore = useGameStore()
const settingsStore = useSettingsStore()

const showNewGameConfirm = ref(false)
const showAutoSaveConfirm = ref(false)

// Tab navigation
type Tab = 'game' | 'menu'
const activeTab = ref<Tab>('game')

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
  // If turning off, show confirmation
  if (settingsStore.autoSaveEnabled) {
    showAutoSaveConfirm.value = true
    return
  }
  // Turning on - just enable and persist
  settingsStore.setAutoSave(true)
  gameStore.persistGame()
}

function confirmDisableAutoSave() {
  settingsStore.setAutoSave(false)
  gameStore.clearSavedGame()
  showAutoSaveConfirm.value = false
}

function cancelDisableAutoSave() {
  showAutoSaveConfirm.value = false
}
</script>

<template>
  <div class="flex h-full flex-col">
    <!-- Header -->
    <div class="flex shrink-0 items-center justify-between border-b border-gray-200 px-4 py-3">
      <h2 class="text-xl font-bold text-gray-800">Menu</h2>

      <!-- Tab icons -->
      <div class="flex gap-1">
        <button
          :class="[
            'flex h-9 w-9 items-center justify-center rounded-lg transition-colors',
            activeTab === 'game'
              ? 'bg-green-100 text-green-600'
              : 'bg-gray-100 text-gray-600 hover:bg-green-100 hover:text-green-600 [@media(hover:none)]:bg-gray-200',
          ]"
          title="Game Info"
          @click="activeTab = 'game'"
        >
          <FontAwesomeIcon icon="dice" />
        </button>
        <button
          :class="[
            'flex h-9 w-9 items-center justify-center rounded-lg transition-colors',
            activeTab === 'menu'
              ? 'bg-blue-100 text-blue-600'
              : 'bg-gray-100 text-gray-600 hover:bg-blue-100 hover:text-blue-600 [@media(hover:none)]:bg-gray-200',
          ]"
          title="Menu"
          @click="activeTab = 'menu'"
        >
          <FontAwesomeIcon icon="compass" />
        </button>
      </div>

      <IconButton
        icon="arrow-right"
        size="sm"
        shape="square"
        variant="subtle"
        label="Close menu"
        @click="emit('close')"
      />
    </div>

    <!-- Scrollable Content Area -->
    <div class="min-h-0 flex-1 overflow-y-auto">
      <!-- Game Info Tab Content -->
      <template v-if="activeTab === 'game'">
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
      </template>

      <!-- Menu Tab Content -->
      <nav v-show="activeTab === 'menu'" class="py-2">
        <button
          class="group flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-gray-100"
          @click="handleNewGameClick"
        >
          <FontAwesomeIcon icon="rotate" class="w-5 text-gray-500 transition-colors group-hover:text-green-600" />
          <span class="font-medium">New Game</span>
        </button>

        <button
          class="group flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-gray-100"
          @click="handleOpenTeams"
        >
          <FontAwesomeIcon icon="users" class="w-5 text-gray-500 transition-colors group-hover:text-orange-500" />
          <span class="font-medium">Teams</span>
        </button>

        <a
          href="/spy-master"
          target="_blank"
          class="group flex items-center gap-3 px-4 py-3 transition-colors hover:bg-gray-100"
        >
          <FontAwesomeIcon icon="user-secret" class="w-5 text-gray-500 transition-colors group-hover:text-blue-600" />
          <span class="flex-1 font-medium">Spy Master</span>
          <FontAwesomeIcon icon="up-right-from-square" class="text-xs text-gray-400" />
        </a>

        <div class="my-2 border-t border-gray-100" />

        <a
          href="/rules"
          target="_blank"
          class="group flex items-center gap-3 px-4 py-3 transition-colors hover:bg-gray-100"
        >
          <FontAwesomeIcon icon="book" class="w-5 text-gray-500 transition-colors group-hover:text-amber-700" />
          <span class="flex-1 font-medium">Rules</span>
          <FontAwesomeIcon icon="up-right-from-square" class="text-xs text-gray-400" />
        </a>

        <a
          href="/about"
          target="_blank"
          class="group flex items-center gap-3 px-4 py-3 transition-colors hover:bg-gray-100"
        >
          <FontAwesomeIcon icon="circle-info" class="w-5 text-gray-500 transition-colors group-hover:text-blue-500" />
          <span class="flex-1 font-medium">About</span>
          <FontAwesomeIcon icon="up-right-from-square" class="text-xs text-gray-400" />
        </a>

        <div class="my-2 border-t border-gray-100" />

        <button
          class="group flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-gray-100"
          @click="handleOpenSettings"
        >
          <FontAwesomeIcon icon="gear" class="w-5 text-gray-500 transition-colors group-hover:text-gray-900" />
          <span class="font-medium">Settings</span>
        </button>

        <div class="my-2 border-t border-gray-100" />
      </nav>

      <!-- Version (always visible at bottom of scroll area) -->
      <AppVersion />
    </div>
    <!-- End Scrollable Content Area -->

    <!-- Footer -->
    <div class="shrink-0 border-t border-gray-200 bg-gray-50">
      <!-- Auto-save toggle -->
      <label class="flex cursor-pointer items-center justify-between px-4 py-3">
        <span class="text-sm text-gray-600">
          <FontAwesomeIcon
            icon="floppy-disk"
            :class="['mr-2', settingsStore.autoSaveEnabled ? 'text-green-500' : 'text-gray-400']"
          />
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

    <!-- Auto-Save Disable Confirmation Modal -->
    <BaseModal
      v-if="showAutoSaveConfirm"
      title="Disable Auto-Save?"
      icon="floppy-disk"
      @close="cancelDisableAutoSave"
    >
      <p class="mb-6 text-gray-600">
        This will delete your saved game data. You won't be able to recover your current game if you
        refresh the page.
      </p>
      <div class="flex justify-end gap-3">
        <button
          class="rounded-lg px-4 py-2.5 font-medium text-gray-700 transition-colors hover:bg-gray-100"
          @click="cancelDisableAutoSave"
        >
          Cancel
        </button>
        <button
          class="rounded-lg bg-red-500 px-4 py-2.5 font-medium text-white shadow-sm transition-colors hover:bg-red-600"
          @click="confirmDisableAutoSave"
        >
          Disable
        </button>
      </div>
    </BaseModal>
  </div>
</template>
