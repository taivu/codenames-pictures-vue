<script setup lang="ts">
/**
 * SettingsModal - Game settings dialog for auto-save, pressure mode, and card sets.
 */
import { ref } from 'vue'
import { useGameStore, useSettingsStore } from '@/stores'
import { BaseModal, ToggleSwitch, BaseButton } from '@/components/ui'
import CardSetSelector from './CardSetSelector.vue'
import { trackAutoSaveToggled } from '@/plugins/analytics'

const emit = defineEmits<{
  close: []
}>()

const gameStore = useGameStore()
const settingsStore = useSettingsStore()

const showAutoSaveConfirm = ref(false)

function handleClose(): void {
  emit('close')
}

function handleToggleAutoSave(): void {
  // If turning off, show confirmation
  if (settingsStore.autoSaveEnabled) {
    showAutoSaveConfirm.value = true
    return
  }
  // Turning on - just enable and persist
  settingsStore.setAutoSave(true)
  gameStore.persistGame()
  trackAutoSaveToggled(true)
}

function confirmDisableAutoSave(): void {
  settingsStore.setAutoSave(false)
  gameStore.clearSavedGame()
  trackAutoSaveToggled(false)
  showAutoSaveConfirm.value = false
}

function cancelDisableAutoSave(): void {
  showAutoSaveConfirm.value = false
}

function handleTogglePressureMode(): void {
  settingsStore.setPressureMode(!settingsStore.pressureModeEnabled)
}
</script>

<template>
  <BaseModal title="Settings" icon="sliders" size="md" @close="handleClose">
    <div class="space-y-6">
      <!-- Auto-Save Section -->
      <section class="rounded-xl bg-gray-50 p-4">
        <div class="flex items-start justify-between gap-4">
          <div>
            <h4 class="mb-1 flex items-center gap-2 font-semibold text-gray-800">
              <FontAwesomeIcon
                icon="floppy-disk"
                :class="settingsStore.autoSaveEnabled ? 'text-green-500' : 'text-gray-500'"
              />
              Auto-Save
            </h4>
            <p class="text-sm text-gray-500">
              Save your game automatically to recover from accidental refreshes. Saves teams,
              scores, cards, and markings.
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
              <FontAwesomeIcon
                icon="stopwatch"
                :class="settingsStore.pressureModeEnabled ? 'text-purple-500' : 'text-gray-500'"
              />
              Pressure Mode
            </h4>
            <p class="text-sm text-gray-500">
              Add a countdown timer. Running out of time earns a strike. 3 strikes and you lose!
            </p>
          </div>
          <ToggleSwitch
            :model-value="settingsStore.pressureModeEnabled"
            active-color="purple"
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

    <!-- Auto-Save Disable Confirmation -->
    <template v-if="showAutoSaveConfirm">
      <div class="fixed inset-0 z-[60] flex items-center justify-center bg-black/50">
        <div class="mx-4 max-w-sm rounded-xl bg-white p-6 shadow-2xl">
          <h3 class="mb-2 text-lg font-bold text-gray-800">Disable Auto-Save?</h3>
          <p class="mb-6 text-gray-600">
            This will delete your saved game data. You won't be able to recover your current game if
            you refresh the page.
          </p>
          <div class="flex justify-end gap-3">
            <BaseButton variant="ghost" @click="cancelDisableAutoSave"> Cancel </BaseButton>
            <BaseButton variant="red" @click="confirmDisableAutoSave"> Disable </BaseButton>
          </div>
        </div>
      </div>
    </template>
  </BaseModal>
</template>
