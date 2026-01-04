<script setup lang="ts">
import { useSettingsStore } from '@/stores'
import type { CardSet } from '@/config'

const settingsStore = useSettingsStore()

function handleToggle(set: CardSet): void {
  settingsStore.toggleCardSet(set.id)
}

function isEnabled(set: CardSet): boolean {
  return settingsStore.isCardSetEnabled(set.id)
}

function isOnlyEnabled(set: CardSet): boolean {
  return isEnabled(set) && settingsStore.enabledCardSetIds.length === 1
}
</script>

<template>
  <div class="space-y-3">
    <div
      v-for="set in settingsStore.allCardSets"
      :key="set.id"
      class="bg-white border-2 rounded-xl p-4 shadow-sm transition-all"
      :class="[
        isEnabled(set) ? 'border-green-500 bg-green-50' : 'border-gray-300',
        isOnlyEnabled(set) ? 'opacity-75' : 'cursor-pointer hover:border-green-400'
      ]"
      @click="handleToggle(set)"
    >
      <div class="flex items-start gap-4">
        <!-- Checkbox -->
        <div class="flex-shrink-0 pt-1">
          <div
            class="w-6 h-6 rounded border-2 flex items-center justify-center transition-colors"
            :class="isEnabled(set) ? 'bg-green-500 border-green-500' : 'border-gray-400 bg-white'"
          >
            <FontAwesomeIcon
              v-if="isEnabled(set)"
              icon="check"
              class="text-white text-sm"
            />
          </div>
        </div>

        <!-- Content -->
        <div class="flex-1 min-w-0">
          <div class="flex items-center gap-2 mb-1">
            <h3 class="font-bold text-lg">{{ set.name }}</h3>
            <span
              v-if="set.isDefault"
              class="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-medium"
            >
              Default
            </span>
          </div>
          <p class="text-gray-600 text-sm mb-2">{{ set.description }}</p>
          <div class="flex items-center gap-4 text-sm text-gray-500">
            <span>
              <FontAwesomeIcon icon="images" class="mr-1" />
              {{ set.cardCount }} cards
            </span>
          </div>
        </div>
      </div>

      <!-- Disabled notice -->
      <div
        v-if="isOnlyEnabled(set)"
        class="mt-3 text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded px-3 py-2"
      >
        <FontAwesomeIcon icon="circle-info" class="mr-1" />
        At least one card set must be enabled
      </div>
    </div>
  </div>
</template>
