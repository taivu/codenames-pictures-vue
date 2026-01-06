<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import type { CardColor } from '@/types'
import { useGameStore } from '@/stores'
import { useClickOutside } from '@/composables'
import { getCardButtonClass } from '@/utils'

const emit = defineEmits<{
  select: [color: CardColor]
  close: []
}>()

const store = useGameStore()
const menuRef = ref<HTMLElement | null>(null)
const anchorRef = ref<HTMLElement | null>(null)
const positionStyle = ref<Record<string, string>>({})
const arrowPosition = ref<'left' | 'right' | 'top' | 'bottom'>('left')
const arrowOffset = ref(0)
const arrowStyle = ref<Record<string, string>>({})

useClickOutside(menuRef, () => emit('close'))

onMounted(async () => {
  await nextTick()
  if (menuRef.value && anchorRef.value) {
    const cardRect = anchorRef.value.getBoundingClientRect()
    const menuRect = menuRef.value.getBoundingClientRect()
    const menuHeight = menuRect.height
    const menuWidth = menuRect.width
    const viewportHeight = window.innerHeight
    const viewportWidth = window.innerWidth
    const gap = 12 // Gap between card and menu
    const padding = 8

    let top = 0
    let left = 0

    // Try positioning to the right of the card
    if (cardRect.right + gap + menuWidth < viewportWidth - padding) {
      left = cardRect.right + gap
      top = cardRect.top + (cardRect.height - menuHeight) / 2
      arrowPosition.value = 'left'
    }
    // Try positioning to the left of the card
    else if (cardRect.left - gap - menuWidth > padding) {
      left = cardRect.left - gap - menuWidth
      top = cardRect.top + (cardRect.height - menuHeight) / 2
      arrowPosition.value = 'right'
    }
    // Try positioning below the card
    else if (cardRect.bottom + gap + menuHeight < viewportHeight - padding) {
      top = cardRect.bottom + gap
      left = cardRect.left + (cardRect.width - menuWidth) / 2
      arrowPosition.value = 'top'
    }
    // Position above the card
    else {
      top = cardRect.top - gap - menuHeight
      left = cardRect.left + (cardRect.width - menuWidth) / 2
      arrowPosition.value = 'bottom'
    }

    // Keep menu within viewport bounds
    if (top < padding) top = padding
    if (top + menuHeight > viewportHeight - padding) top = viewportHeight - padding - menuHeight
    if (left < padding) left = padding
    if (left + menuWidth > viewportWidth - padding) left = viewportWidth - padding - menuWidth

    // Calculate arrow offset to point to card center
    if (arrowPosition.value === 'left' || arrowPosition.value === 'right') {
      const cardCenterY = cardRect.top + cardRect.height / 2
      arrowOffset.value = Math.max(12, Math.min(menuHeight - 12, cardCenterY - top))
    } else {
      const cardCenterX = cardRect.left + cardRect.width / 2
      arrowOffset.value = Math.max(12, Math.min(menuWidth - 12, cardCenterX - left))
    }

    positionStyle.value = {
      top: `${top}px`,
      left: `${left}px`,
    }

    // Set arrow style based on position
    if (arrowPosition.value === 'left') {
      arrowStyle.value = {
        left: '-18px',
        top: `${arrowOffset.value - 10}px`,
      }
    } else if (arrowPosition.value === 'right') {
      arrowStyle.value = {
        right: '-18px',
        top: `${arrowOffset.value - 10}px`,
      }
    } else if (arrowPosition.value === 'top') {
      arrowStyle.value = {
        top: '-18px',
        left: `${arrowOffset.value - 10}px`,
      }
    } else {
      arrowStyle.value = {
        bottom: '-18px',
        left: `${arrowOffset.value - 10}px`,
      }
    }
  }
})

function handleSelect(color: CardColor): void {
  emit('select', color)
}

function getButtonClasses(color: CardColor): string {
  const baseClasses = 'w-full px-4 py-2.5 text-left text-base font-semibold transition-all cursor-pointer block'
  return `${baseClasses} ${getCardButtonClass(color)}`
}
</script>

<template>
  <!-- Invisible anchor to get card position (full card size) -->
  <div ref="anchorRef" class="absolute inset-0" />

  <!-- Menu teleported to body for proper z-index -->
  <Teleport to="body">
    <Transition name="menu">
      <div
        ref="menuRef"
        class="fixed z-[60] w-fit drop-shadow-[0_12px_35px_rgba(0,0,0,0.75)]"
        :style="positionStyle"
        @click.stop
      >
        <!-- Arrow pointing to card -->
        <div
          class="absolute w-0 h-0 border-[10px] border-transparent"
          :class="{
            'border-r-white': arrowPosition === 'left',
            'border-l-white': arrowPosition === 'right',
            'border-b-white': arrowPosition === 'top',
            'border-t-white': arrowPosition === 'bottom',
          }"
          :style="arrowStyle"
        />

        <!-- Menu content -->
        <div class="bg-white rounded-lg overflow-hidden border-2 border-white min-w-[140px]">
          <button
            v-for="(option, index) in store.cardColorOptions"
            :key="option.value"
            type="button"
            :class="[
              getButtonClasses(option.value),
              index > 0 && 'border-t border-gray-100'
            ]"
            @click="handleSelect(option.value)"
          >
            {{ option.label }}
            <FontAwesomeIcon v-if="option.value === 'black'" icon="skull-crossbones" class="ml-1.5 text-sm" />
          </button>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.menu-enter-active,
.menu-leave-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
}

.menu-enter-from,
.menu-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>
