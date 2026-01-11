<script setup lang="ts">
/**
 * SpyCard - Displays the spymaster key card grid showing team assignments.
 */
import { computed } from 'vue'
import type { SpyCard } from '@/types'
import { spyMasterCellClasses, spyMasterStartingClasses } from '@/utils'

interface Props {
  card: SpyCard
  hideStartingLabel?: boolean
}

const props = defineProps<Props>()

const startingColorClass = computed(() => {
  if (!props.card.startingColor) return 'bg-gray-400'
  return spyMasterStartingClasses[props.card.startingColor] ?? 'bg-gray-400'
})
</script>

<template>
  <div>
    <!-- Starting team label -->
    <div v-if="!hideStartingLabel" class="mb-2 text-center text-lg font-bold">
      Starting team:
      <span :class="startingColorClass" class="rounded px-2 py-1 text-white capitalize">
        {{ card.startingColor || 'None' }}
      </span>
    </div>

    <div class="flex items-stretch gap-0.5 sm:gap-2">
      <!-- Starting color indicator (left) -->
      <div class="w-1.5 rounded sm:w-8" :class="startingColorClass" />

      <!-- Card grid -->
      <div class="grid grid-cols-5 gap-0.5 sm:gap-1">
        <div
          v-for="(cell, index) in card.cells"
          :key="index"
          class="flex h-9 w-12 items-center justify-center rounded border border-black/30 text-xs font-bold text-white sm:h-16 sm:w-20 sm:border-2 sm:text-lg md:h-20 md:w-24"
          :class="spyMasterCellClasses[cell.color] || 'bg-gray-200'"
        >
          {{ index + 1 }}
        </div>
      </div>

      <!-- Starting color indicator (right) -->
      <div class="w-1.5 rounded sm:w-8" :class="startingColorClass" />
    </div>
  </div>
</template>
