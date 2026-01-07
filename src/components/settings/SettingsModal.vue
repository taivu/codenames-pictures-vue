<script setup lang="ts">
import { useGameStore, useSettingsStore } from '@/stores'
import { BaseModal } from '@/components/ui'
import CardSetSelector from './CardSetSelector.vue'
import { trackAutoSaveToggled } from '@/plugins/analytics'

const emit = defineEmits<{
  close: []
}>()

const gameStore = useGameStore()
const settingsStore = useSettingsStore()

function handleClose(): void {
  emit('close')
}

function handleToggleAutoSave(): void {
  const newValue = !settingsStore.autoSaveEnabled
  // If disabling, clear the saved game
  if (!newValue) {
    gameStore.clearSavedGame()
  }
  settingsStore.setAutoSave(newValue)
  trackAutoSaveToggled(newValue)
}

function handleTogglePressureMode(): void {
  settingsStore.setPressureMode(!settingsStore.pressureModeEnabled)
}
</script>

<template>
  <BaseModal title="Settings" icon="gear" size="md" @close="handleClose">
    <div class="space-y-6">
      <!-- Auto-Save Section -->
      <section class="p-4 bg-gray-50 rounded-xl">
        <div class="flex items-start justify-between gap-4">
          <div>
            <h4 class="font-semibold text-gray-800 flex items-center gap-2 mb-1">
              <FontAwesomeIcon icon="floppy-disk" class="text-gray-500" />
              Auto-Save
            </h4>
            <p class="text-sm text-gray-500">
              Save your game automatically to recover from accidental refreshes.
            </p>
          </div>
          <button
            class="relative shrink-0 w-11 h-6 rounded-full transition-colors"
            :class="settingsStore.autoSaveEnabled ? 'bg-green-500' : 'bg-gray-300'"
            role="switch"
            :aria-checked="settingsStore.autoSaveEnabled"
            @click="handleToggleAutoSave"
          >
            <span
              :class="[
                'absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform',
                settingsStore.autoSaveEnabled && 'translate-x-5'
              ]"
            />
          </button>
        </div>
      </section>

      <!-- Pressure Mode Section -->
      <section class="p-4 bg-gray-50 rounded-xl">
        <div class="flex items-start justify-between gap-4">
          <div>
            <h4 class="font-semibold text-gray-800 flex items-center gap-2 mb-1">
              <FontAwesomeIcon icon="stopwatch" class="text-gray-500" />
              Pressure Mode
            </h4>
            <p class="text-sm text-gray-500">
              Add a countdown timer. Time runs out = strike. 3 strikes = you lose!
            </p>
          </div>
          <button
            class="relative shrink-0 w-11 h-6 rounded-full transition-colors"
            :class="settingsStore.pressureModeEnabled ? 'bg-orange-500' : 'bg-gray-300'"
            role="switch"
            :aria-checked="settingsStore.pressureModeEnabled"
            @click="handleTogglePressureMode"
          >
            <span
              :class="[
                'absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform',
                settingsStore.pressureModeEnabled && 'translate-x-5'
              ]"
            />
          </button>
        </div>
      </section>

      <!-- Coming Soon Divider -->
      <div class="flex items-center gap-3 text-gray-400">
        <div class="flex-1 border-t border-gray-200" />
        <span class="text-xs font-medium uppercase tracking-wide">Coming Soon</span>
        <div class="flex-1 border-t border-gray-200" />
      </div>

      <!-- Card Sets Section -->
      <section class="p-4 bg-gray-50 rounded-xl opacity-50 pointer-events-none">
        <div class="flex items-start justify-between gap-4 mb-3">
          <div>
            <h4 class="font-semibold text-gray-800 flex items-center gap-2 mb-1">
              <FontAwesomeIcon icon="images" class="text-gray-500" />
              Card Sets
            </h4>
            <p class="text-sm text-gray-500">
              Choose which card sets to use. Changes apply to new games.
            </p>
          </div>
        </div>
        <CardSetSelector />
      </section>
    </div>
  </BaseModal>
</template>
