import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { SpyCard } from '@/types'

export const useSpyMasterStore = defineStore('spyMaster', () => {
  const cards = ref<SpyCard[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)
  const currentCardId = ref<string | null>(null)

  const currentCard = computed(() => {
    if (currentCardId.value === null) return null
    return cards.value.find((c) => c.id === currentCardId.value) ?? null
  })

  const isLoaded = computed(() => cards.value.length > 0)

  async function fetchCards(): Promise<void> {
    if (isLoaded.value) return

    isLoading.value = true
    error.value = null

    try {
      const response = await fetch(`${import.meta.env.BASE_URL}spy-master-cards.json`)
      if (!response.ok) {
        throw new Error('Failed to load spy master cards')
      }
      cards.value = await response.json()
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Unknown error'
    } finally {
      isLoading.value = false
    }
  }

  function selectCard(id: string | number): void {
    currentCardId.value = String(id)
  }

  function selectRandomCard(): void {
    if (cards.value.length === 0) return
    const randomIndex = Math.floor(Math.random() * cards.value.length)
    const card = cards.value[randomIndex]
    if (card) {
      currentCardId.value = card.id
    }
  }

  return {
    cards,
    isLoading,
    error,
    currentCardId,
    currentCard,
    isLoaded,
    fetchCards,
    selectCard,
    selectRandomCard,
  }
})
