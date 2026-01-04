<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { useSpyMasterStore } from '@/stores'
import { SpyCard } from '@/components/game'
import { BaseButton } from '@/components/ui'

interface Props {
  cardId?: string
}

const props = defineProps<Props>()
const router = useRouter()
const store = useSpyMasterStore()
const searchCardId = ref('')
const copied = ref(false)
const lockedIn = ref(false)
const peeking = ref(false)
const wakeLock = ref<WakeLockSentinel | null>(null)
const humblePhrases = ref<string[]>([])
const currentPhrase = ref('')

const shareableUrl = computed(() => {
  if (!store.currentCardId) return ''
  const baseUrl = window.location.origin + window.location.pathname
  return `${baseUrl}#/spy-master/${store.currentCardId}`
})

function pickRandomPhrase(): void {
  if (humblePhrases.value.length > 0) {
    const randomIndex = Math.floor(Math.random() * humblePhrases.value.length)
    currentPhrase.value = humblePhrases.value[randomIndex] ?? ''
  }
}

onMounted(async () => {
  await store.fetchCards()
  if (props.cardId) {
    store.selectCard(Number(props.cardId))
  } else {
    store.selectRandomCard()
  }

  // Load humble phrases
  try {
    const response = await fetch(`${import.meta.env.BASE_URL}data/humble-phrases.json`)
    humblePhrases.value = await response.json()
  } catch {
    // Phrases are optional
  }
})


// Update URL when card changes (but not on initial load from URL)
watch(() => store.currentCardId, (newId, oldId) => {
  if (oldId !== undefined && newId) {
    router.replace({ name: 'spy-master', params: { cardId: newId } })
  }
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

function copyShareableUrl(): void {
  navigator.clipboard.writeText(shareableUrl.value)
  copied.value = true
  setTimeout(() => {
    copied.value = false
  }, 2000)
}

async function toggleLockIn(): Promise<void> {
  if (lockedIn.value) {
    // Unlock
    lockedIn.value = false
    peeking.value = false
    if (wakeLock.value) {
      await wakeLock.value.release()
      wakeLock.value = null
    }
  } else {
    // Lock in
    lockedIn.value = true
    pickRandomPhrase()
    // Try to keep screen awake
    if ('wakeLock' in navigator) {
      try {
        wakeLock.value = await navigator.wakeLock.request('screen')
      } catch {
        // Wake lock not available or denied
      }
    }
  }
}

function startPeek(): void {
  if (lockedIn.value) {
    peeking.value = true
  }
}

function endPeek(): void {
  if (peeking.value) {
    peeking.value = false
    pickRandomPhrase()
  }
}
</script>

<template>
  <div
    class="min-h-screen p-4 sm:p-8 relative"
    @mousedown="startPeek"
    @mouseup="endPeek"
    @mouseleave="endPeek"
    @touchstart="startPeek"
    @touchend="endPeek"
    @touchcancel="endPeek"
  >
    <!-- Lock toggle switch (sticky, compact, above overlay) -->
    <div v-if="store.currentCard" class="sticky top-2 z-20 flex justify-end mb-2">
      <button
        class="flex items-center gap-1.5 px-2 py-1 rounded-full shadow text-xs transition-colors"
        :class="lockedIn ? 'bg-green-500 text-white' : 'bg-white/90 text-gray-600'"
        @click.stop="toggleLockIn"
      >
        <FontAwesomeIcon :icon="lockedIn ? 'lock' : 'lock-open'" />
        <span>{{ lockedIn ? 'Locked' : 'Lock' }}</span>
      </button>
    </div>

    <!-- Full screen black overlay (when locked and not peeking) -->
    <div
      v-if="lockedIn && !peeking"
      class="fixed inset-0 bg-black z-10 flex flex-col items-center justify-center select-none px-8"
    >
      <span class="text-white text-xl font-medium mb-6">Hold anywhere to reveal</span>
      <p v-if="currentPhrase" class="text-gray-400 text-center text-sm sm:text-base max-w-md italic">
        "{{ currentPhrase }}"
      </p>
    </div>

    <!-- Search form (hidden when locked) -->
    <div v-if="!lockedIn" class="max-w-md mx-auto mb-4 sm:mb-8">
      <form class="flex gap-2" @submit="handleSearch">
        <label for="card-id" class="sr-only">Looking for a card?</label>
        <input
          id="card-id"
          v-model="searchCardId"
          class="input flex-1 min-w-0"
          placeholder="Enter card ID"
          name="card-id"
        />
        <BaseButton type="submit" variant="green">
          <FontAwesomeIcon icon="magnifying-glass" class="mr-1" /> Search
        </BaseButton>
      </form>
    </div>

    <!-- Random button (hidden when locked) -->
    <div v-if="!lockedIn" class="text-center mb-4 sm:mb-8">
      <BaseButton variant="green" @click="handleRandomCard">
        <FontAwesomeIcon icon="dice" class="mr-1" /> Random Spy Master Card
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
        <h1 class="text-xl sm:text-3xl font-bold mb-4 sm:mb-6">
          Spy master card: {{ store.currentCardId }}
        </h1>

        <SpyCard :card="store.currentCard" />

        <!-- Shareable URL (hidden when locked) -->
        <div v-if="!lockedIn" class="mt-6 text-center">
          <p class="text-sm text-gray-600 mb-2">Share this card with your team leader:</p>
          <div class="flex items-center justify-center gap-2 flex-wrap">
            <code class="text-xs sm:text-sm bg-white px-3 py-1 rounded border break-all">
              {{ shareableUrl }}
            </code>
            <button
              class="px-3 py-1 text-sm rounded transition-colors"
              :class="copied ? 'bg-green-500 text-white' : 'bg-gray-200 hover:bg-gray-300'"
              @click="copyShareableUrl"
            >
              {{ copied ? 'Copied!' : 'Copy' }}
            </button>
          </div>
        </div>
      </template>

      <div v-else-if="store.isLoaded && !store.currentCard" class="text-xl text-center">
        Spy master card "{{ store.currentCardId }}"
        <br />
        does not exist.
      </div>
    </div>

    <!-- Return to rules link (hidden when locked) -->
    <div v-if="!lockedIn" class="text-center mt-8 pt-4 border-t border-gray-300">
      <RouterLink to="/" class="text-sm text-gray-600 hover:text-gray-900 underline">
        ← Return to rules
      </RouterLink>
    </div>
  </div>
</template>
