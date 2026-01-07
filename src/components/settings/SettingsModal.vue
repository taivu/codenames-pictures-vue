<script setup lang="ts">
import { useGameStore, useSettingsStore } from '@/stores'
import { BaseModal, ToggleSwitch } from '@/components/ui'
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
      <section class="rounded-xl bg-gray-50 p-4">
        <div class="flex items-start justify-between gap-4">
          <div>
            <h4 class="mb-1 flex items-center gap-2 font-semibold text-gray-800">
              <FontAwesomeIcon icon="floppy-disk" class="text-gray-500" />
              Auto-Save
            </h4>
            <p class="text-sm text-gray-500">
              Save your game automatically to recover from accidental refreshes.
            </p>
          </div>
          <ToggleSwitch
            :model-value="settingsStore.autoSaveEnabled"
            @update:model-value="handleToggleAutoSave"
          />
        </div>
      </section>

      <!-- Pressure Mode Section -->
      <section class="rounded-xl bg-gray-50 p-4">
        <div class="flex items-start justify-between gap-4">
          <div>
            <h4 class="mb-1 flex items-center gap-2 font-semibold text-gray-800">
              <FontAwesomeIcon icon="stopwatch" class="text-gray-500" />
              Pressure Mode
            </h4>
            <p class="text-sm text-gray-500">
              Add a countdown timer. Time runs out = strike. 3 strikes = you lose!
            </p>
          </div>
          <ToggleSwitch
            :model-value="settingsStore.pressureModeEnabled"
            active-color="orange"
            @update:model-value="handleTogglePressureMode"
          />
        </div>
      </section>

      <!-- Coming Soon Divider -->
      <div class="flex items-center gap-3 text-gray-400">
        <div class="flex-1 border-t border-gray-200" />
        <span class="text-xs font-medium tracking-wide uppercase">Coming Soon</span>
        <div class="flex-1 border-t border-gray-200" />
      </div>

      <!-- Card Sets Section -->
      <section class="pointer-events-none rounded-xl bg-gray-50 p-4 opacity-50">
        <div class="mb-3 flex items-start justify-between gap-4">
          <div>
            <h4 class="mb-1 flex items-center gap-2 font-semibold text-gray-800">
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
