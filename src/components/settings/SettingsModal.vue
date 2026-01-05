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
</script>

<template>
  <BaseModal title="Settings" @close="handleClose">
    <div class="space-y-6">
      <!-- Auto-Save Section -->
      <section>
        <h4 class="font-bold text-lg mb-3 flex items-center gap-2">
          <FontAwesomeIcon icon="floppy-disk" />
          Auto-Save
        </h4>
        <p class="text-sm text-gray-600 mb-3">
          Automatically save your game to recover from accidental page refreshes.
        </p>

        <!-- Toggle -->
        <div class="flex items-center gap-3">
          <button
            class="relative w-12 h-6 rounded-full transition-colors"
            :class="settingsStore.autoSaveEnabled ? 'bg-green-500' : 'bg-gray-300'"
            @click="handleToggleAutoSave"
          >
            <span
              class="absolute top-1 w-4 h-4 bg-white rounded-full transition-transform shadow"
              :class="settingsStore.autoSaveEnabled ? 'left-7' : 'left-1'"
            />
          </button>
          <span class="font-medium">
            {{ settingsStore.autoSaveEnabled ? 'Enabled' : 'Disabled' }}
          </span>
        </div>
      </section>

      <!-- Card Sets Section (Coming Soon) -->
      <section class="opacity-50 pointer-events-none">
        <div class="flex items-center justify-between mb-3">
          <h4 class="font-bold text-lg flex items-center gap-2">
            <FontAwesomeIcon icon="images" />
            Card Sets
            <span class="text-xs bg-gray-200 text-gray-600 px-2 py-0.5 rounded-full font-medium">
              Coming Soon
            </span>
          </h4>
        </div>
        <p class="text-sm text-gray-600 mb-3">
          Choose which card sets to use. Changes apply to new games.
        </p>
        <CardSetSelector />
      </section>
    </div>
  </BaseModal>
</template>
