<script setup lang="ts">
import type { TeamColor } from '@/types'
import { useGameStore } from '@/stores'
import { BaseButton } from '@/components/ui'

interface Props {
  color: TeamColor
}

const props = defineProps<Props>()

const store = useGameStore()

const textColorClass: Record<TeamColor, string> = {
  red: 'text-red-500',
  blue: 'text-blue-500',
  green: 'text-green-500',
}

function handleScore(): void {
  store.incrementScore(props.color)
}
</script>

<template>
  <div class="flex flex-col items-center gap-2">
    <h1
      class="text-4xl font-bold"
      :class="textColorClass[color]"
    >
      {{ store.teams[color].score }}
    </h1>
    <BaseButton @click="handleScore">
      Score
    </BaseButton>
  </div>
</template>
