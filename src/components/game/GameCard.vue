<script setup lang="ts">
import { computed, ref } from 'vue'
import type { Card, CardColor } from '@/types'
import { useGameStore } from '@/stores'
import { getCardRingClass, getCardOverlayClass } from '@/utils'
import CardContextMenu from './CardContextMenu.vue'
import CardViewModal from './CardViewModal.vue'
import { trackModalOpened, trackCardMarked } from '@/plugins/analytics'

interface Props {
  card: Card
}

const props = defineProps<Props>()

const store = useGameStore()
const showMenu = ref(false)
const showCardView = ref(false)

const imagePath = computed(() => `${import.meta.env.BASE_URL}images/cards/${props.card.setId}/card-${props.card.imageIndex}.jpg`)

const hasColor = computed(() => props.card.color !== '')
const overlayClasses = computed(() => getCardRingClass(props.card.color))
const overlayBgClasses = computed(() => getCardOverlayClass(props.card.color))

function handleClick(event: MouseEvent): void {
  event.preventDefault()
  if (hasColor.value) {
    // Clear selection if card has a color
    store.resetCardColor(props.card.id)
  } else {
    // Show menu if no color
    showMenu.value = true
    store.colorMenuOpen = true
  }
}

function handleColorSelect(color: CardColor): void {
  store.setCardColor(props.card.id, color)
  showMenu.value = false
  store.colorMenuOpen = false
  if (color) {
    trackCardMarked(color)
  }
}

function handleMenuClose(): void {
  showMenu.value = false
  store.colorMenuOpen = false
}

function handleBadgeClick(event: MouseEvent): void {
  event.stopPropagation()
  event.preventDefault()
  showCardView.value = true
  trackModalOpened('card_view')
}

function handleCardViewClose(): void {
  showCardView.value = false
}
</script>

<template>
  <div
    class="relative cursor-pointer rounded-lg overflow-hidden border border-black"
    :class="[
      overlayClasses,
      showMenu ? 'z-50 ring-4 ring-white scale-105' : '',
      (store.colorMenuOpen && hasColor && !showMenu) ? 'z-50' : ''
    ]"
    @click="handleClick"
    @contextmenu="handleClick"
  >
    <!-- Dark overlay when menu is open -->
    <Teleport to="body">
      <Transition name="fade">
        <div
          v-if="showMenu"
          class="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          @click="handleMenuClose"
        />
      </Transition>
    </Teleport>

    <!-- Card number badge -->
    <button
      class="absolute top-1 left-1 z-10 min-w-6 h-6 px-1.5 flex items-center justify-center text-sm font-bold rounded bg-white/90 backdrop-blur-sm text-gray-700 border border-gray-300 hover:bg-white hover:scale-110 transition-all"
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
      :class="overlayBgClasses"
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
      @close="handleMenuClose"
    />

    <!-- Full screen card view modal -->
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
