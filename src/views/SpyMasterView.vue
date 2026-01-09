<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useSpyMasterStore } from '@/stores'
import { SpyCard } from '@/components/game'
import { BaseButton } from '@/components/ui'
import SiteLayout from '@/components/layout/SiteLayout.vue'

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
  return `${window.location.origin}/spy-master/${store.currentCardId}`
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
watch(
  () => store.currentCardId,
  (newId, oldId) => {
    if (oldId !== undefined && newId) {
      router.replace({ name: 'spy-master', params: { cardId: newId } })
    }
  }
)

function handleSearch(event: Event): void {
  event.preventDefault()
  const cardId = Number(searchCardId.value)
  if (!isNaN(cardId)) {
    store.selectCard(cardId)
  }
}

function handleRandomCard(): void {
  store.selectRandomCard()
  searchCardId.value = ''
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
  <SiteLayout hide-action-buttons :hide-footer="lockedIn">
    <!-- Lock toggle (fixed only when locked, hidden when peeking) -->
    <div
      v-if="store.currentCard && !(lockedIn && peeking)"
      class="z-60 flex justify-center"
      :class="lockedIn ? 'fixed left-0 right-0 top-4' : 'py-4'"
    >
      <button
        class="flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium shadow-sm transition-colors"
        :class="
          lockedIn
            ? 'bg-green-500 text-white hover:bg-green-600'
            : 'bg-white text-gray-600 hover:bg-gray-100'
        "
        @click.stop="toggleLockIn"
      >
        <FontAwesomeIcon :icon="lockedIn ? 'lock' : 'lock-open'" />
        <span>{{ lockedIn ? 'Unlock' : 'Lock' }}</span>
      </button>
    </div>

    <!-- Transparent touch capture overlay (when locked) -->
    <div
      v-if="lockedIn"
      class="fixed inset-0 z-50"
      @mousedown="startPeek"
      @mouseup="endPeek"
      @mouseleave="endPeek"
      @touchstart="startPeek"
      @touchend="endPeek"
      @touchcancel="endPeek"
    />

    <!-- Full screen black overlay (when locked and not peeking) -->
    <div
      v-if="lockedIn && !peeking"
      class="pointer-events-none fixed inset-0 z-40 flex flex-col items-center justify-center bg-black px-8 select-none"
    >
      <span class="mb-6 text-xl font-medium text-white">Hold anywhere to reveal</span>
      <p
        v-if="currentPhrase"
        class="max-w-md text-center text-sm text-gray-400 italic sm:text-base"
      >
        "{{ currentPhrase }}"
      </p>
    </div>

    <!-- Main content area -->
    <div
      class="flex flex-col items-center justify-center px-4 pb-4 sm:px-8 sm:pb-8"
      :class="lockedIn ? 'fixed inset-0 z-30' : 'flex-1'"
    >
      <!-- Loading state -->
      <div v-if="store.isLoading" class="text-xl">Loading...</div>

      <!-- Error state -->
      <div v-else-if="store.error" class="text-xl text-red-600">
        {{ store.error }}
      </div>

      <!-- Card not found -->
      <div
        v-else-if="store.isLoaded && !store.currentCard"
        class="fixed inset-0 flex flex-col items-center justify-center text-center"
      >
        <p class="mb-6 text-xl">
          Spy master card "{{ store.currentCardId }}"
          <br />
          does not exist.
        </p>
        <div class="flex items-center gap-2">
          <BaseButton variant="green" @click="handleRandomCard">
            <FontAwesomeIcon icon="dice" />New Card
          </BaseButton>
          <form class="flex" @submit="handleSearch">
            <label for="card-id-notfound" class="sr-only">Card ID</label>
            <input
              id="card-id-notfound"
              v-model="searchCardId"
              type="tel"
              class="h-11 w-20 rounded-l-lg rounded-r-none border border-r-0 border-gray-200 bg-white text-center text-lg focus:border-green-500 focus:outline-none"
              placeholder="Card #"
              name="card-id"
              maxlength="3"
            />
            <button
              type="submit"
              class="h-11 rounded-l-none rounded-r-lg bg-green-500 px-3 text-white transition-colors hover:bg-green-600"
            >
              <FontAwesomeIcon icon="magnifying-glass" />
            </button>
          </form>
        </div>
      </div>

      <!-- Card display -->
      <template v-else-if="store.currentCard">
        <!-- Header: Starting team (left) + Card number (right) -->
        <div class="mb-2 flex w-full max-w-md items-center justify-between px-2">
          <div class="flex items-center gap-2">
            <span class="text-sm font-medium text-gray-600">Starting:</span>
            <span
              class="rounded px-2 py-1 text-sm font-bold text-white capitalize"
              :class="store.currentCard.startingColor === 'red' ? 'bg-red-500' : 'bg-blue-500'"
            >
              {{ store.currentCard.startingColor }}
            </span>
          </div>
          <h1 class="text-lg font-bold sm:text-xl">Card #{{ store.currentCardId }}</h1>
        </div>

        <!-- The spy card -->
        <SpyCard :card="store.currentCard" hide-starting-label />


        <!-- Controls toolbar (hidden when locked) -->
        <div
          v-if="!lockedIn"
          class="mt-6 flex flex-wrap items-center justify-center gap-2 sm:gap-3"
        >
          <BaseButton variant="green" @click="handleRandomCard">
            <FontAwesomeIcon icon="dice" />New Card
          </BaseButton>
          <form class="flex" @submit="handleSearch">
            <label for="card-id" class="sr-only">Card ID</label>
            <input
              id="card-id"
              v-model="searchCardId"
              type="tel"
              class="h-11 w-20 rounded-l-lg rounded-r-none border border-r-0 border-gray-200 bg-white text-center text-lg focus:border-green-500 focus:outline-none"
              placeholder="Card #"
              name="card-id"
              maxlength="3"
            />
            <button
              type="submit"
              class="h-11 rounded-l-none rounded-r-lg bg-green-500 px-3 text-white transition-colors hover:bg-green-600"
            >
              <FontAwesomeIcon icon="magnifying-glass" />
            </button>
          </form>
        </div>

        <!-- Share section (hidden when locked) -->
        <div
          v-if="!lockedIn"
          class="mx-4 mt-6 w-full max-w-md rounded-lg border border-gray-200 bg-white/80 px-4 py-3 text-center"
        >
          <p class="mb-2 text-xs font-medium text-gray-500 uppercase tracking-wide">
            Share with other spymaster
          </p>
          <div class="flex flex-col items-center justify-center gap-2 sm:flex-row">
            <code class="rounded bg-gray-100 px-2 py-1 text-xs text-gray-700 sm:text-sm">
              {{ shareableUrl }}
            </code>
            <button
              class="rounded-md px-3 py-1.5 text-sm font-medium transition-colors"
              :class="
                copied
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              "
              @click="copyShareableUrl"
            >
              {{ copied ? 'Copied!' : 'Copy' }}
            </button>
          </div>
        </div>
      </template>
    </div>

  </SiteLayout>
</template>
