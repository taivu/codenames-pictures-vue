<script setup lang="ts">
/**
 * SpyMasterView - Displays the key card for spy masters.
 * Features a lock mode to prevent accidental reveals with peek-to-view.
 */
import { ref, computed, onMounted, watch } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { useSpyMasterStore } from '@/stores'
import { useSpyMasterLock } from '@/composables'
import { SpyCard, CardSearch } from '@/components/game'
import { BaseButton } from '@/components/ui'
import SiteLayout from '@/components/layout/SiteLayout.vue'

interface Props {
  cardId?: string
}

const props = defineProps<Props>()
const router = useRouter()
const store = useSpyMasterStore()
const lock = useSpyMasterLock()

// Shorthand for lock state (used frequently in template)
const isLocked = computed(() => lock.isLocked.value)
const isPeeking = computed(() => lock.isPeeking.value)

// Header visibility: hide when no card loaded, or when peeking in lock mode
const showHeader = computed(() => {
  if (!store.currentCard) return false
  if (isLocked.value && isPeeking.value) return false
  return true
})

const copied = ref(false)

const shareableUrl = computed(() => {
  if (!store.currentCardId) return ''
  return `${window.location.origin}/spy-master/${store.currentCardId}`
})

onMounted(async () => {
  await Promise.all([store.fetchCards(), lock.loadPhrases()])

  if (props.cardId) {
    store.selectCard(Number(props.cardId))
  } else {
    store.selectRandomCard()
  }
})

// Sync URL with selected card
watch(
  () => store.currentCardId,
  (newId, oldId) => {
    if (oldId !== undefined && newId) {
      router.replace({ name: 'spy-master', params: { cardId: newId } })
    }
  }
)

function handleSearch(cardId: number): void {
  store.selectCard(cardId)
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
</script>

<template>
  <SiteLayout
    :show-header="showHeader"
    :show-footer="!isLocked"
    :fixed-header="isLocked"
  >
    <!-- Custom header: Home | Lock | New Card -->
    <template #action-buttons>
      <div class="flex items-center" :class="isLocked ? 'justify-center' : ''">
        <!-- Left: Home (hidden when locked) -->
        <div v-if="!isLocked" class="flex flex-1 justify-start">
          <RouterLink
            to="/"
            class="flex items-center justify-center rounded-full bg-white p-2 text-sm text-gray-600 shadow-sm transition-colors hover:bg-gray-100 sm:gap-1.5 sm:px-3"
          >
            <FontAwesomeIcon icon="arrow-left" />
            <span class="hidden sm:inline">Home</span>
          </RouterLink>
        </div>

        <!-- Center: Lock toggle -->
        <button
          class="flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium shadow-sm transition-colors"
          :class="isLocked
            ? 'bg-green-500 text-white hover:bg-green-600'
            : 'bg-white text-gray-600 hover:bg-gray-100'"
          @click.stop="lock.toggle"
        >
          <FontAwesomeIcon :icon="isLocked ? 'lock' : 'lock-open'" />
          <span>{{ isLocked ? 'Unlock' : 'Lock' }}</span>
        </button>

        <!-- Right: New Card (hidden when locked) -->
        <div v-if="!isLocked" class="flex flex-1 justify-end">
          <button
            class="flex items-center gap-1.5 rounded-full bg-green-100 px-3 py-2 text-sm font-medium text-green-600 shadow-sm transition-colors hover:bg-green-500 hover:text-white"
            @click="handleRandomCard"
          >
            <FontAwesomeIcon icon="shuffle" />
            <span class="hidden sm:inline">New Card</span>
          </button>
        </div>
      </div>
    </template>

    <!--
      Lock mode overlay system (z-index layering):
      - z-30: Main content (card display)
      - z-40: Black overlay with phrase
      - z-50: Invisible touch capture layer
      - z-60: Header with unlock button (set by SiteLayout fixedHeader)
    -->
    <template v-if="isLocked">
      <!-- Touch capture: intercepts all touches for peek behavior -->
      <div
        class="fixed inset-0 z-50 select-none touch-none [-webkit-touch-callout:none] [-webkit-user-select:none]"
        @mousedown="lock.startPeek"
        @mouseup="lock.endPeek"
        @mouseleave="lock.endPeek"
        @touchstart.prevent="lock.startPeek"
        @touchend.prevent="lock.endPeek"
        @touchcancel.prevent="lock.endPeek"
        @contextmenu.prevent
      />

      <!-- Black overlay with trash talk (hidden when peeking) -->
      <div
        v-if="!isPeeking"
        class="pointer-events-none fixed inset-0 z-40 flex flex-col items-center justify-center bg-black px-8 select-none"
      >
        <span class="mb-6 text-xl font-medium text-white">Hold anywhere to reveal</span>
        <div v-if="lock.currentPhrase.value" class="flex max-w-md flex-col items-center gap-3">
          <FontAwesomeIcon
            v-if="lock.currentIcon.value"
            :icon="lock.currentIcon.value"
            class="text-3xl text-yellow-400 sm:text-4xl"
          />
          <p class="text-center text-sm text-gray-400 italic sm:text-base">
            "{{ lock.currentPhrase.value }}"
          </p>
        </div>
      </div>
    </template>

    <!-- Main content -->
    <div
      class="flex flex-col items-center justify-center px-4 pb-4 sm:px-8 sm:pb-8"
      :class="isLocked ? 'fixed inset-0 z-30' : 'flex-1'"
    >
      <!-- Loading -->
      <div v-if="store.isLoading" class="text-xl">Loading...</div>

      <!-- Error -->
      <div v-else-if="store.error" class="text-xl text-red-600">{{ store.error }}</div>

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
        <BaseButton variant="green" @click="handleRandomCard">
          <FontAwesomeIcon icon="shuffle" />New Card
        </BaseButton>
      </div>

      <!-- Card display -->
      <template v-else-if="store.currentCard">
        <!-- Card info header -->
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
          <h1 class="text-lg font-bold sm:text-xl">Key Card #{{ store.currentCardId }}</h1>
        </div>

        <SpyCard :card="store.currentCard" hide-starting-label />

        <!-- Card search (hidden when locked) -->
        <div
          v-if="!isLocked"
          class="mt-6 flex flex-wrap items-center justify-center gap-2 sm:gap-3"
        >
          <CardSearch @search="handleSearch" />
        </div>

        <!-- Share section (hidden when locked) -->
        <div
          v-if="!isLocked"
          class="mx-4 mt-6 w-full max-w-md rounded-lg border border-gray-200 bg-white/80 px-4 py-3 text-center"
        >
          <p class="mb-2 text-xs font-medium tracking-wide text-gray-500 uppercase">
            Share with other spymaster
          </p>
          <div class="flex flex-col items-center justify-center gap-2 sm:flex-row">
            <code class="rounded bg-gray-100 px-2 py-1 text-xs text-gray-700 sm:text-sm">
              {{ shareableUrl }}
            </code>
            <button
              class="rounded-md px-3 py-1.5 text-sm font-medium transition-colors"
              :class="
                copied ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
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
