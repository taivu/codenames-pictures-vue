<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import type { CardColor } from '@/types'
import { useGameStore } from '@/stores'
import { useClickOutside } from '@/composables'

const emit = defineEmits<{
  select: [color: CardColor]
  close: []
}>()

const store = useGameStore()
const menuRef = ref<HTMLElement | null>(null)
const openUpward = ref(false)

useClickOutside(menuRef, () => emit('close'))

onMounted(async () => {
  await nextTick()
  if (menuRef.value) {
    const rect = menuRef.value.getBoundingClientRect()
    const viewportHeight = window.innerHeight
    // If menu bottom exceeds viewport, open upward
    if (rect.bottom > viewportHeight) {
      openUpward.value = true
    }
  }
})

function handleSelect(color: CardColor): void {
  emit('select', color)
}

function getButtonClasses(color: CardColor): string {
  const baseClasses = 'w-full px-4 py-2 text-left font-bold hover:opacity-80 transition-opacity cursor-pointer'

  const colorMap: Record<CardColor, string> = {
    '': '',
    red: 'bg-red-500 text-white',
    blue: 'bg-blue-500 text-white',
    green: 'bg-green-500 text-white',
    neutral: 'bg-yellow-400 text-black',
    black: 'bg-gray-900 text-white',
  }

  return `${baseClasses} ${colorMap[color]}`
}
</script>

<template>
  <div
    ref="menuRef"
    class="absolute left-1/4 z-20 bg-white border-2 border-black rounded overflow-hidden min-w-32 shadow-lg"
    :class="openUpward ? 'bottom-1/4' : 'top-1/4'"
    @click.stop
  >
    <button
      v-for="option in store.cardColorOptions"
      :key="option.value"
      type="button"
      :class="getButtonClasses(option.value)"
      @click="handleSelect(option.value)"
    >
      {{ option.label }}
    </button>
  </div>
</template>
