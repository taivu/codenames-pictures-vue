<script setup lang="ts">
import { onMounted } from 'vue'
import type { GameMode } from '@/types'
import { useGameStore } from '@/stores'
import { GameBoard } from '@/components/game'

interface Props {
  mode: GameMode
}

const props = defineProps<Props>()

const store = useGameStore()

onMounted(() => {
  store.initializeGame(props.mode)
})
</script>

<template>
  <GameBoard />
</template>
