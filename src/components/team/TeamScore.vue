<script setup lang="ts">
/**
 * TeamScore - Single team score with increment/decrement controls.
 */
import type { TeamColor } from '@/types'
import { useGameStore } from '@/stores'
import { teamTextClasses } from '@/utils'
import { IconButton } from '@/components/ui'

interface Props {
  color: TeamColor
}

const props = defineProps<Props>()

const store = useGameStore()

function handleIncrement(): void {
  store.incrementScore(props.color)
}

function handleDecrement(): void {
  store.decrementScore(props.color)
}
</script>

<template>
  <div class="flex flex-col items-center gap-1">
    <!-- Score number -->
    <div class="flex flex-col items-center">
      <span class="text-xs font-bold uppercase" :class="teamTextClasses[color]">{{ color }}</span>
      <div class="min-w-[2ch] text-center text-2xl font-bold" :class="teamTextClasses[color]">
        {{ store.teams[color].score }}
      </div>
    </div>
    <!-- Buttons -->
    <div class="flex gap-3">
      <IconButton
        icon="minus"
        size="xs"
        variant="secondary"
        label="Decrease score"
        @click="handleDecrement"
      />
      <IconButton
        icon="plus"
        size="xs"
        variant="secondary"
        label="Increase score"
        @click="handleIncrement"
      />
    </div>
  </div>
</template>
