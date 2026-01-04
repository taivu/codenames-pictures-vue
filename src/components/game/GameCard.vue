<script setup lang="ts">
import { computed, ref } from 'vue'
import type { Card, CardColor } from '@/types'
import { useGameStore } from '@/stores'
import { getCardRingClass, getCardOverlayClass } from '@/utils'
import CardContextMenu from './CardContextMenu.vue'
import { BaseBadge } from '@/components/ui'

interface Props {
  card: Card
}

const props = defineProps<Props>()

const store = useGameStore()
const showMenu = ref(false)

const imagePath = computed(() => `${import.meta.env.BASE_URL}images/cards/card-${props.card.imageId}.jpg`)

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
}

function handleMenuClose(): void {
  showMenu.value = false
  store.colorMenuOpen = false
}
</script>

<template>
  <!-- Dark overlay when menu is open -->
  <Teleport to="body">
    <div
      v-if="showMenu"
      class="fixed inset-0 bg-black/[.42] z-40"
      @click="handleMenuClose"
    />
  </Teleport>

  <div
    class="relative cursor-pointer rounded-xl border border-gray-400"
    :class="[
      overlayClasses,
      showMenu ? 'z-50 ring-4 ring-white' : '',
      (store.colorMenuOpen && hasColor && !showMenu) ? 'z-50' : ''
    ]"
    @click="handleClick"
    @contextmenu="handleClick"
  >
    <BaseBadge class="absolute top-1 left-1 z-10">
      {{ card.id + 1 }}
    </BaseBadge>

    <img
      :src="imagePath"
      :alt="`Card ${card.imageId}`"
      class="w-full h-full object-cover select-none rounded-xl"
    />

    <!-- Color overlay -->
    <div
      v-if="hasColor"
      class="absolute inset-0 pointer-events-none rounded-xl"
      :class="overlayBgClasses"
    />

    <!-- Duet mode neutral marker -->
    <div
      v-if="store.isDuetMode && card.color === 'neutral'"
      class="absolute top-1 right-1 w-6 h-6 flex items-center justify-center bg-yellow-400 border-2 border-black rounded font-bold text-sm"
    >
      x
    </div>

    <CardContextMenu
      v-if="showMenu"
      @select="handleColorSelect"
      @close="handleMenuClose"
    />
  </div>
</template>
