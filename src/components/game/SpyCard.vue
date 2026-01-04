<script setup lang="ts">
import { computed } from 'vue'
import type { SpyCard } from '@/types'
import { spyCellClasses, startingColorClasses } from '@/utils'

interface Props {
  card: SpyCard
}

const props = defineProps<Props>()

const startingColorClass = computed(() => {
  if (!props.card.startingColor) return 'bg-gray-400'
  return startingColorClasses[props.card.startingColor] ?? 'bg-gray-400'
})
</script>

<template>
  <div>
    <!-- Starting team label -->
    <div class="text-center mb-2 font-bold text-lg">
      Starting team:
      <span :class="startingColorClass" class="px-2 py-1 rounded text-white capitalize">
        {{ card.startingColor || 'None' }}
      </span>
    </div>

    <div class="flex items-stretch gap-1 sm:gap-2">
      <!-- Starting color indicator (left) -->
      <div
        class="w-4 sm:w-8 rounded"
        :class="startingColorClass"
      />

      <!-- Card grid -->
      <div class="grid grid-cols-5 gap-0.5 sm:gap-1">
        <div
          v-for="(cell, index) in card.cells"
          :key="index"
          class="w-12 h-10 sm:w-20 sm:h-16 md:w-24 md:h-20 flex items-center justify-center rounded border border-black/30 sm:border-2 text-white font-bold text-sm sm:text-lg"
          :class="spyCellClasses[cell.color] || 'bg-gray-200'"
        >
          {{ index + 1 }}
        </div>
      </div>

      <!-- Starting color indicator (right) -->
      <div
        class="w-4 sm:w-8 rounded"
        :class="startingColorClass"
      />
    </div>
  </div>
</template>

<style scoped>
.bg-gradient-radial {
  background: radial-gradient(circle, var(--tw-gradient-from), var(--tw-gradient-to));
}
</style>
