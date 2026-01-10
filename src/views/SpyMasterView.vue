<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
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

const copied = ref(false)

const shareableUrl = computed(() => {
  if (!store.currentCardId) return ''
  return `${window.location.origin}/spy-master/${store.currentCardId}`
})

const showHeader = computed(() => store.currentCard && !(lock.isLocked.value && lock.isPeeking.value))

onMounted(async () => {
  await Promise.all([store.fetchCards(), lock.loadPhrases()])

  if (props.cardId) {
    store.selectCard(Number(props.cardId))
  } else {
    store.selectRandomCard()
  }
})

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
  <SiteLayout hide-action-buttons :hide-footer="lock.isLocked.value">
    <!-- Header row: Home | Lock | New Card -->
    <div
      v-if="showHeader"
      class="z-60 flex items-center px-4"
      :class="lock.isLocked.value ? 'fixed top-4 right-0 left-0 justify-center' : 'justify-between py-4'"
    >
      <!-- Left: Home button -->
      <a
        v-if="!lock.isLocked.value"
        href="/"
        class="flex items-center gap-1.5 rounded-full bg-white px-3 py-2 text-sm font-medium text-gray-600 shadow-sm transition-colors hover:bg-gray-100"
      >
        <FontAwesomeIcon icon="arrow-left" />
        <span class="hidden sm:inline">Home</span>
      </a>

      <!-- Center: Lock button -->
      <button
        class="flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium shadow-sm transition-colors"
        :class="
          lock.isLocked.value
            ? 'bg-green-500 text-white hover:bg-green-600'
            : 'bg-white text-gray-600 hover:bg-gray-100'
        "
        @click.stop="lock.toggle"
      >
        <FontAwesomeIcon :icon="lock.isLocked.value ? 'lock' : 'lock-open'" />
        <span>{{ lock.isLocked.value ? 'Unlock' : 'Lock' }}</span>
      </button>

      <!-- Right: New Card button -->
      <button
        v-if="!lock.isLocked.value"
        class="flex items-center gap-1.5 rounded-full bg-green-100 px-3 py-2 text-sm font-medium text-green-600 shadow-sm transition-colors hover:bg-green-500 hover:text-white"
        @click="handleRandomCard"
      >
        <FontAwesomeIcon icon="dice" />
        <span>New Card</span>
      </button>
    </div>

    <!-- Lock mode overlays -->
    <template v-if="lock.isLocked.value">
      <!-- Touch capture (z-50) -->
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

      <!-- Black overlay with phrase (z-40, hidden when peeking) -->
      <div
        v-if="!lock.isPeeking.value"
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
      :class="lock.isLocked.value ? 'fixed inset-0 z-30' : 'flex-1'"
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
          <FontAwesomeIcon icon="dice" />New Card
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
          <h1 class="text-lg font-bold sm:text-xl">Card #{{ store.currentCardId }}</h1>
        </div>

        <SpyCard :card="store.currentCard" hide-starting-label />

        <!-- Card search (hidden when locked) -->
        <div
          v-if="!lock.isLocked.value"
          class="mt-6 flex flex-wrap items-center justify-center gap-2 sm:gap-3"
        >
          <CardSearch @search="handleSearch" />
        </div>

        <!-- Share section (hidden when locked) -->
        <div
          v-if="!lock.isLocked.value"
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
