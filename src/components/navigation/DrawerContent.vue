<script setup lang="ts">
/**
 * DrawerContent - Tabbed drawer panel with team info and navigation links.
 */
import { ref, computed } from 'vue'
import { useGameStore, useSettingsStore } from '@/stores'
import { ScoreBoard, TeamSummary } from '@/components/team'
import { AppVersion, BaseButton, ConfirmModal, IconButton, ToggleSwitch } from '@/components/ui'
import { trackNewGame } from '@/plugins/analytics'

type Tab = 'teams' | 'nav'

const props = withDefaults(
  defineProps<{
    activeTab?: Tab
  }>(),
  {
    activeTab: 'teams',
  }
)

const emit = defineEmits<{
  close: []
  openTeams: []
  openSettings: []
  'update:activeTab': [Tab]
}>()

const gameStore = useGameStore()
const settingsStore = useSettingsStore()

const showNewGameConfirm = ref(false)
const showAutoSaveConfirm = ref(false)

const currentTab = computed({
  get: () => props.activeTab,
  set: (value: Tab) => emit('update:activeTab', value),
})

function handleNewGameClick() {
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
</script>

<template>
  <div class="flex h-full flex-col">
    <!-- Header -->
    <div class="flex shrink-0 items-center justify-between border-b border-gray-200 px-4 py-3">
      <h2 class="text-xl font-bold text-gray-800">Menu</h2>

      <!-- Tab icons: Teams | App Nav -->
      <div class="flex gap-1">
        <button
          title="Teams"
          class="flex h-9 w-9 items-center justify-center rounded-lg transition-colors"
          :class="
            currentTab === 'teams'
              ? 'bg-amber-100 text-amber-600'
              : 'bg-gray-100 text-gray-600 hover:bg-amber-100 hover:text-amber-600 [@media(hover:none)]:bg-gray-200'
          "
          @click="currentTab = 'teams'"
        >
          <FontAwesomeIcon icon="users" />
        </button>
        <button
          title="App Nav"
          class="flex h-9 w-9 items-center justify-center rounded-lg transition-colors"
          :class="
            currentTab === 'nav'
              ? 'bg-rose-100 text-rose-600'
              : 'bg-gray-100 text-gray-600 hover:bg-rose-100 hover:text-rose-600 [@media(hover:none)]:bg-gray-200'
          "
          @click="currentTab = 'nav'"
        >
          <FontAwesomeIcon icon="sliders" />
        </button>
      </div>

      <IconButton
        icon="arrow-right"
        size="sm"
        variant="ghost"
        label="Close menu"
        @click="emit('close')"
      />
    </div>

    <!-- Scrollable Content Area -->
    <div class="min-h-0 flex-1 overflow-y-auto">
      <!-- Teams Tab Content -->
      <template v-if="currentTab === 'teams'">
        <!-- Team Summaries Section -->
        <div class="border-b border-gray-200 px-4 py-3">
          <div class="mb-2 flex items-center justify-between">
            <button
              class="text-sm font-bold tracking-wide text-gray-500 uppercase transition-colors hover:text-orange-500"
              @click="handleOpenTeams"
            >
              Teams
            </button>
            <button
              class="text-xs text-gray-400 transition-colors hover:text-orange-500"
              title="Edit teams"
              @click="handleOpenTeams"
            >
              <FontAwesomeIcon icon="gear" />
            </button>
          </div>
          <div class="space-y-2">
            <TeamSummary v-for="color in gameStore.activeTeamColors" :key="color" :color="color" />
            <div
              v-if="!gameStore.teamsAreSetup"
              class="flex flex-col items-center rounded-lg border border-amber-200 bg-amber-50 p-3"
            >
              <p class="mb-2 text-xs text-amber-700">No teams set up yet</p>
              <BaseButton color="amber" size="sm" @click="handleOpenTeams">
                Set up teams
              </BaseButton>
            </div>
          </div>
        </div>

        <!-- Scores Section -->
        <div
          v-if="!gameStore.isDuetMode && gameStore.teamsAreSetup"
          class="border-b border-gray-200 px-4 py-3"
        >
          <h3 class="mb-2 text-sm font-bold tracking-wide text-gray-500 uppercase">Scores</h3>
          <ScoreBoard />
        </div>
      </template>

      <!-- App Nav Tab Content -->
      <nav v-show="currentTab === 'nav'" class="py-2">
        <button
          class="group flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-gray-100"
          @click="handleNewGameClick"
        >
          <FontAwesomeIcon
            icon="rotate-right"
            class="w-5 text-gray-500 transition-colors group-hover:text-green-600 [@media(hover:none)]:text-green-600"
          />
          <span class="font-medium">New Game</span>
        </button>

        <button
          class="group flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-gray-100"
          @click="handleOpenSettings"
        >
          <FontAwesomeIcon
            icon="sliders"
            class="w-5 text-gray-500 transition-colors group-hover:text-rose-500 [@media(hover:none)]:text-rose-500"
          />
          <span class="font-medium">Settings</span>
        </button>

        <div class="my-2 border-t border-gray-200" />

        <a
          href="/spy-master"
          target="_blank"
          class="group flex items-center gap-3 px-4 py-3 transition-colors hover:bg-gray-100"
        >
          <FontAwesomeIcon
            icon="user-secret"
            class="w-5 text-gray-500 transition-colors group-hover:text-blue-600 [@media(hover:none)]:text-blue-600"
          />
          <span class="flex-1 font-medium">Spy Master</span>
          <FontAwesomeIcon icon="up-right-from-square" class="text-xs text-gray-400" />
        </a>

        <a
          href="/rules"
          target="_blank"
          class="group flex items-center gap-3 px-4 py-3 transition-colors hover:bg-gray-100"
        >
          <FontAwesomeIcon
            icon="book"
            class="w-5 text-gray-500 transition-colors group-hover:text-amber-700 [@media(hover:none)]:text-amber-700"
          />
          <span class="flex-1 font-medium">Rules</span>
          <FontAwesomeIcon icon="up-right-from-square" class="text-xs text-gray-400" />
        </a>

        <a
          href="/about"
          target="_blank"
          class="group flex items-center gap-3 px-4 py-3 transition-colors hover:bg-gray-100"
        >
          <FontAwesomeIcon
            icon="circle-info"
            class="w-5 text-gray-500 transition-colors group-hover:text-blue-400 [@media(hover:none)]:text-blue-400"
          />
          <span class="flex-1 font-medium">About</span>
          <FontAwesomeIcon icon="up-right-from-square" class="text-xs text-gray-400" />
        </a>

        <div class="my-2 border-t border-gray-200" />
      </nav>

      <AppVersion />
    </div>
    <!-- End Scrollable Content Area -->

    <!-- Footer -->
    <div class="shrink-0 border-t border-gray-200 bg-gray-50">
      <label class="flex cursor-pointer items-center justify-between px-4 py-3">
        <span class="text-sm text-gray-600">
          <FontAwesomeIcon
            icon="floppy-disk"
            class="mr-2"
            :class="settingsStore.autoSaveEnabled ? 'text-green-500' : 'text-gray-400'"
          />
          Auto-save game
        </span>
        <ToggleSwitch
          :model-value="settingsStore.autoSaveEnabled"
          @update:model-value="handleAutoSaveToggle"
        />
      </label>
    </div>

    <!-- New Game Confirmation -->
    <ConfirmModal
      v-if="showNewGameConfirm"
      title="Start New Game?"
      message="This will shuffle and deal new cards. Teams and scores will be kept."
      icon="rotate-right"
      confirm-text="New Game"
      confirm-color="green"
      @confirm="confirmNewGame"
      @cancel="showNewGameConfirm = false"
    />

    <!-- Auto-Save Confirmation -->
    <ConfirmModal
      v-if="showAutoSaveConfirm"
      title="Disable Auto-Save?"
      message="This will delete your saved game data. You won't be able to recover your current game if you refresh the page."
      icon="floppy-disk"
      confirm-text="Disable"
      @confirm="confirmDisableAutoSave"
      @cancel="showAutoSaveConfirm = false"
    />
  </div>
</template>
