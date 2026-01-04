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
  <div class="flex flex-col items-center gap-1">
    <h1
      class="text-3xl md:text-4xl font-bold"
      :class="teamTextClasses[color]"
    >
      {{ store.teams[color].score }}
    </h1>
    <div class="flex gap-1">
      <button
        type="button"
        class="w-8 h-8 flex items-center justify-center bg-gray-200 hover:bg-gray-300 rounded font-bold text-lg"
        @click="handleDecrement"
      >
        -
      </button>
      <button
        type="button"
        class="w-8 h-8 flex items-center justify-center bg-gray-200 hover:bg-gray-300 rounded font-bold text-lg"
        @click="handleIncrement"
      >
        +
      </button>
    </div>
  </div>
</template>
