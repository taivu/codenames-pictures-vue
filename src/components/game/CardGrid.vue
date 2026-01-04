<script setup lang="ts">
import { useGameStore } from '@/stores'
import GameCard from './GameCard.vue'

const store = useGameStore()
</script>

<template>
  <div
    class="card-grid grid gap-1 sm:gap-2"
    :class="[
      'grid-cols-5',
      store.isDuetMode ? 'grid-rows-5' : 'grid-rows-4',
    ]"
  >
    <GameCard
      v-for="card in store.cards"
      :key="card.imageId"
      :card="card"
      class="aspect-square"
    />
  </div>
</template>

<style scoped>
.card-grid {
  --columns: 5;
  --gap: 0.5rem;
  width: 100%;
  max-width: calc(var(--columns) * 220px + (var(--columns) - 1) * var(--gap));
}

.card-grid > * {
  width: 100%;
  height: auto;
  aspect-ratio: 1;
}

/* On smaller screens, limit max width based on viewport */
@media (max-width: 1280px) {
  .card-grid {
    max-width: calc(100vw - 2rem);
  }
}

/* When sidebar is visible (lg+), account for it */
@media (min-width: 1024px) {
  .card-grid {
    max-width: min(calc(100vw - 200px), calc(var(--columns) * 220px + (var(--columns) - 1) * var(--gap)));
  }
}

@media (min-width: 1400px) {
  .card-grid {
    max-width: calc(var(--columns) * 220px + (var(--columns) - 1) * var(--gap));
  }
}
</style>
