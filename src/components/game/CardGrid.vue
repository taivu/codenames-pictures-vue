<script setup lang="ts">
/**
 * CardGrid - Responsive grid layout for the game board cards.
 */
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
      :key="`${card.setId}-${card.imageIndex}`"
      :card="card"
      class="aspect-square min-h-0 min-w-0"
    />
  </div>
</template>
