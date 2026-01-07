<script setup lang="ts">
import { computed, ref } from 'vue'
import type { Card, CardColor } from '@/types'
import { useGameStore } from '@/stores'
import { usePressureMode } from '@/composables'
import { getCardRingClass, getCardOverlayClass, getCardImagePath } from '@/utils'
import CardContextMenu from './CardContextMenu.vue'
import CardViewModal from './CardViewModal.vue'
import { trackModalOpened, trackCardMarked } from '@/plugins/analytics'

const props = defineProps<{ card: Card }>()

const store = useGameStore()
const pressureMode = usePressureMode()

// UI state
const showMenu = ref(false)
const showCardView = ref(false)
const restoreMenuAfterCardView = ref(false)

// Computed
const imagePath = computed(() => getCardImagePath(props.card))
const hasColor = computed(() => props.card.color !== '')
const isMenuActive = computed(() => showMenu.value || restoreMenuAfterCardView.value)
const isElevated = computed(() =>
  isMenuActive.value || (store.colorMenuOpen && hasColor.value)
)

// Handlers
function handleCardClick(event: MouseEvent) {
  event.preventDefault()
  if (hasColor.value) {
    store.resetCardColor(props.card.id)
  } else {
    showMenu.value = true
    store.colorMenuOpen = true
  }
}

function handleColorSelect(color: CardColor) {
  store.setCardColor(props.card.id, color)
  closeMenu()
  if (color) {
    trackCardMarked(color)
    pressureMode.resetTimer()
  }
}

function closeMenu() {
  showMenu.value = false
  restoreMenuAfterCardView.value = false
  store.colorMenuOpen = false
}

function handleBadgeClick(event: MouseEvent) {
  event.stopPropagation()
  event.preventDefault()
  restoreMenuAfterCardView.value = showMenu.value
  showMenu.value = false
  showCardView.value = true
  trackModalOpened('card_view')
}

function handleCardViewClose() {
  showCardView.value = false
  if (restoreMenuAfterCardView.value) {
    showMenu.value = true
    restoreMenuAfterCardView.value = false
  }
}
</script>

<template>
  <div
    class="relative cursor-pointer rounded-lg overflow-hidden border border-black"
    :class="[
      getCardRingClass(card.color),
      isMenuActive && 'z-50 ring-4 ring-white scale-105',
      isElevated && !isMenuActive && 'z-50'
    ]"
    @click="handleCardClick"
    @contextmenu="handleCardClick"
  >
    <!-- Backdrop -->
    <Teleport to="body">
      <Transition name="fade">
        <div
          v-if="isMenuActive"
          class="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          @click="closeMenu"
        />
      </Transition>
    </Teleport>

    <!-- Card number badge -->
    <button
      class="absolute top-1 left-1 z-10 min-w-6 h-6 px-1.5 flex items-center justify-center text-sm font-bold rounded bg-white/90 backdrop-blur-sm text-gray-700 border border-gray-300 hover:bg-white hover:scale-110 transition-all"
      @mousedown.stop
      @click="handleBadgeClick"
    >
      {{ card.id + 1 }}
    </button>

    <img
      :src="imagePath"
      :alt="`Card ${card.setId}-${card.imageIndex}`"
      class="w-full h-full object-cover select-none"
    />

    <!-- Color overlay -->
    <div
      v-if="hasColor"
      class="absolute inset-0 pointer-events-none"
      :class="getCardOverlayClass(card.color)"
    />

    <!-- Duet mode neutral marker -->
    <div
      v-if="store.isDuetMode && card.color === 'neutral'"
      class="absolute top-1 right-1 w-5 h-5 flex items-center justify-center bg-yellow-400 rounded border border-yellow-500 font-bold text-xs"
    >
      x
    </div>

    <CardContextMenu
      v-if="showMenu"
      @select="handleColorSelect"
      @close="closeMenu"
    />

    <CardViewModal
      v-if="showCardView"
      :card="card"
      @close="handleCardViewClose"
    />
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
