<script setup lang="ts">
import type { TeamColor } from '@/types'
import { useGameStore } from '@/stores'
import { useTeamColors } from '@/composables'

interface Props {
  color: TeamColor
}

const props = defineProps<Props>()

const store = useGameStore()
const { teamTextClasses } = useTeamColors()

function handleIncrement(): void {
  store.incrementScore(props.color)
}

function handleDecrement(): void {
  store.decrementScore(props.color)
}

</script>

<template>
  <div class="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 bg-gray-50 rounded-xl px-3 py-2">
    <!-- Score number -->
    <div
      class="text-2xl font-bold min-w-[2ch] text-center order-first sm:order-none"
      :class="teamTextClasses[color]"
    >
      {{ store.teams[color].score }}
    </div>
    <!-- Buttons: below on mobile, sides on tablet+ -->
    <div class="flex sm:contents gap-3">
      <button
        type="button"
        class="w-7 h-7 flex items-center justify-center bg-white hover:bg-gray-100 rounded-lg font-bold text-gray-600 shadow-sm transition-colors sm:order-first"
        @click="handleDecrement"
      >
        -
      </button>
      <button
        type="button"
        class="w-7 h-7 flex items-center justify-center bg-white hover:bg-gray-100 rounded-lg font-bold text-gray-600 shadow-sm transition-colors"
        @click="handleIncrement"
      >
        +
      </button>
    </div>
  </div>
</template>
