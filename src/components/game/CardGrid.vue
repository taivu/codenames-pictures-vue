<script setup lang="ts">
import { useGameStore } from '@/stores'
import GameCard from './GameCard.vue'

const store = useGameStore()
</script>

<template>
  <div
    class="grid grid-cols-5 gap-[2px] sm:gap-1 lg:gap-2"
    :class="store.isDuetMode ? 'grid-rows-5' : 'grid-rows-4'"
    :style="{
      aspectRatio: store.isDuetMode ? '5/5' : '5/4',
      maxHeight: '100%',
      maxWidth: '100%',
    }"
  >
    <GameCard
      v-for="card in store.cards"
      :key="card.imageId"
      :card="card"
      class="aspect-square min-w-0 min-h-0"
    />
  </div>
</template>
