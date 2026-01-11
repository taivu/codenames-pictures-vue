<script setup lang="ts">
/**
 * CardSetSelector - Toggle list for enabling/disabling card image sets.
 */
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
      class="rounded-xl border-2 bg-white p-4 shadow-sm transition-all"
      :class="[
        isEnabled(set) ? 'border-green-500 bg-green-50' : 'border-gray-300',
        isOnlyEnabled(set) ? 'opacity-75' : 'cursor-pointer hover:border-green-400',
      ]"
      @click="handleToggle(set)"
    >
      <div class="flex items-start gap-4">
        <!-- Checkbox -->
        <div class="flex-shrink-0 pt-1">
          <div
            class="flex h-6 w-6 items-center justify-center rounded border-2 transition-colors"
            :class="isEnabled(set) ? 'border-green-500 bg-green-500' : 'border-gray-400 bg-white'"
          >
            <FontAwesomeIcon v-if="isEnabled(set)" icon="check" class="text-sm text-white" />
          </div>
        </div>

        <!-- Content -->
        <div class="min-w-0 flex-1">
          <div class="mb-1 flex items-center gap-2">
            <h3 class="text-lg font-bold">{{ set.name }}</h3>
            <span
              v-if="set.isDefault"
              class="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-700"
            >
              Default
            </span>
          </div>
          <p class="mb-2 text-sm text-gray-600">{{ set.description }}</p>
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
        class="mt-3 rounded border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-700"
      >
        <FontAwesomeIcon icon="circle-info" class="mr-1" />
        At least one card set must be enabled
      </div>
    </div>
  </div>
</template>
