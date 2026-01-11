<script setup lang="ts">
/**
 * TeamScore - Single team score with increment/decrement controls.
 */
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
  <div
    class="flex flex-col items-center gap-1 sm:flex-row sm:gap-2"
  >
    <!-- Score number -->
    <div class="order-first flex flex-col items-center sm:order-none">
      <span class="text-xs font-bold uppercase" :class="teamTextClasses[color]">{{ color }}</span>
      <div
        class="min-w-[2ch] text-center text-2xl font-bold"
        :class="teamTextClasses[color]"
      >
        {{ store.teams[color].score }}
      </div>
    </div>
    <!-- Buttons: below on mobile, sides on tablet+ -->
    <div class="flex gap-3 sm:contents">
      <button
        type="button"
        class="flex h-7 w-7 items-center justify-center rounded-lg bg-white font-bold text-gray-600 shadow-sm transition-colors hover:bg-gray-100 sm:order-first"
        @click="handleDecrement"
      >
        -
      </button>
      <button
        type="button"
        class="flex h-7 w-7 items-center justify-center rounded-lg bg-white font-bold text-gray-600 shadow-sm transition-colors hover:bg-gray-100"
        @click="handleIncrement"
      >
        +
      </button>
    </div>
  </div>
</template>
