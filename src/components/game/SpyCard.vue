<script setup lang="ts">
import { computed } from 'vue'
import type { SpyCard } from '@/types'

interface Props {
  card: SpyCard
}

const props = defineProps<Props>()

const cellColorClasses: Record<string, string> = {
  red: 'bg-gradient-radial from-red-400 to-red-600',
  blue: 'bg-gradient-radial from-blue-400 to-blue-600',
  green: 'bg-gradient-radial from-green-400 to-green-600',
  neutral: 'bg-amber-200',
  black: 'bg-gradient-radial from-gray-600 to-gray-900',
  '': 'bg-gray-200',
}

const startingColorClass = computed(() => {
  if (!props.card.startingColor) return 'bg-gray-400'

  const colorMap: Record<string, string> = {
    red: 'bg-red-500',
    blue: 'bg-blue-500',
    green: 'bg-green-500',
  }
  return colorMap[props.card.startingColor] ?? 'bg-gray-400'
})
</script>

<template>
  <div class="flex items-stretch gap-2">
    <!-- Starting color indicator (left) -->
    <div
      class="w-8 rounded"
      :class="startingColorClass"
    />

    <!-- Card grid -->
    <div class="grid grid-cols-5 gap-1">
      <div
        v-for="(cell, index) in card.cells"
        :key="index"
        class="w-20 h-16 sm:w-24 sm:h-20 flex items-center justify-center rounded text-white font-bold text-lg"
        :class="cellColorClasses[cell.color] || 'bg-gray-200'"
      >
        {{ index + 1 }}
      </div>
    </div>

    <!-- Starting color indicator (right) -->
    <div
      class="w-8 rounded"
      :class="startingColorClass"
    />
  </div>
</template>

<style scoped>
.bg-gradient-radial {
  background: radial-gradient(circle, var(--tw-gradient-from), var(--tw-gradient-to));
}
</style>
