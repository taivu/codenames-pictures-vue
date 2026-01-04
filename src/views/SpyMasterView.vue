<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useSpyMasterStore } from '@/stores'
import { SpyCard } from '@/components/game'
import { BaseButton } from '@/components/ui'

const store = useSpyMasterStore()
const searchCardId = ref('')

onMounted(async () => {
  await store.fetchCards()
  store.selectRandomCard()
})

function handleSearch(event: Event): void {
  event.preventDefault()
  const cardId = Number(searchCardId.value)
  if (!isNaN(cardId)) {
    store.selectCard(cardId)
  }
}

function handleRandomCard(): void {
  store.selectRandomCard()
}
</script>

<template>
  <div class="min-h-screen p-8">
    <!-- Search form -->
    <div class="max-w-md mx-auto mb-8">
      <form class="flex gap-2" @submit="handleSearch">
        <label for="card-id" class="sr-only">Looking for a card?</label>
        <input
          id="card-id"
          v-model="searchCardId"
          class="input flex-1"
          placeholder="Insert card id"
          name="card-id"
        />
        <BaseButton type="submit" variant="blue">
          Search
        </BaseButton>
      </form>
    </div>

    <!-- Random button -->
    <div class="text-center mb-8">
      <BaseButton variant="blue" @click="handleRandomCard">
        Random Spy Master Card
      </BaseButton>
    </div>

    <!-- Card display -->
    <div class="flex flex-col items-center">
      <div v-if="store.isLoading" class="text-xl">
        Loading...
      </div>

      <div v-else-if="store.error" class="text-xl text-red-600">
        {{ store.error }}
      </div>

      <template v-else-if="store.currentCard">
        <h1 class="text-3xl font-bold mb-6">
          Spy master card: {{ store.currentCardId }}
        </h1>
        <SpyCard :card="store.currentCard" />
      </template>

      <div v-else-if="store.isLoaded && !store.currentCard" class="text-xl text-center">
        Spy master card "{{ store.currentCardId }}"
        <br />
        does not exist.
      </div>
    </div>
  </div>
</template>
