<script setup lang="ts">
import { computed, ref } from 'vue'
import type { Card, CardColor } from '@/types'
import { useGameStore } from '@/stores'
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

const overlayClasses = computed(() => {
  if (!hasColor.value) return ''

  const colorMap: Record<Exclude<CardColor, ''>, string> = {
    red: 'ring-4 ring-red-500',
    blue: 'ring-4 ring-blue-500',
    green: 'ring-4 ring-green-500',
    neutral: 'ring-4 ring-yellow-400',
    black: 'ring-4 ring-gray-900',
  }
  return colorMap[props.card.color as Exclude<CardColor, ''>] ?? ''
})

const overlayBgClasses = computed(() => {
  if (!hasColor.value) return ''

  const colorMap: Record<Exclude<CardColor, ''>, string> = {
    red: 'bg-red-500/50',
    blue: 'bg-blue-500/50',
    green: 'bg-green-500/50',
    neutral: 'bg-yellow-400/50',
    black: 'bg-gray-900/60',
  }
  return colorMap[props.card.color as Exclude<CardColor, ''>] ?? ''
})

function handleClick(event: MouseEvent): void {
  event.preventDefault()
  // Only show menu if card doesn't have a color yet
  if (!hasColor.value) {
    showMenu.value = true
  }
}

function handleDoubleClick(): void {
  store.resetCardColor(props.card.id)
}

function handleColorSelect(color: CardColor): void {
  store.setCardColor(props.card.id, color)
  showMenu.value = false
}

function handleMenuClose(): void {
  showMenu.value = false
}
</script>

<template>
  <div
    class="relative cursor-pointer rounded-xl border border-gray-400"
    :class="overlayClasses"
    @click="handleClick"
    @contextmenu="handleClick"
    @dblclick="handleDoubleClick"
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
