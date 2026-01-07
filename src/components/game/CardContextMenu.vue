<script setup lang="ts">
import { ref } from 'vue'
import type { CardColor } from '@/types'
import { useGameStore } from '@/stores'
import { useClickOutside, usePositionedMenu } from '@/composables'
import { getCardButtonClass } from '@/utils'

const emit = defineEmits<{
  select: [color: CardColor]
  close: []
}>()

const store = useGameStore()
const menuRef = ref<HTMLElement | null>(null)
const anchorRef = ref<HTMLElement | null>(null)

const { positionStyle, arrowPosition, arrowStyle } = usePositionedMenu(menuRef, anchorRef)

useClickOutside(menuRef, () => emit('close'))

function handleSelect(color: CardColor): void {
  emit('select', color)
}

function getButtonClasses(color: CardColor): string {
  const baseClasses =
    'w-full px-4 py-2.5 text-left text-base font-semibold transition-all cursor-pointer block'
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
          class="absolute h-0 w-0 border-[10px] border-transparent"
          :class="{
            'border-r-white': arrowPosition === 'left',
            'border-l-white': arrowPosition === 'right',
            'border-b-white': arrowPosition === 'top',
            'border-t-white': arrowPosition === 'bottom',
          }"
          :style="arrowStyle"
        />

        <!-- Menu content -->
        <div class="min-w-[140px] overflow-hidden rounded-lg border-2 border-white bg-white">
          <button
            v-for="(option, index) in store.cardColorOptions"
            :key="option.value"
            type="button"
            :class="[getButtonClasses(option.value), index > 0 && 'border-t border-gray-100']"
            @click="handleSelect(option.value)"
          >
            {{ option.label }}
            <FontAwesomeIcon
              v-if="option.value === 'black'"
              icon="skull-crossbones"
              class="ml-1.5 text-sm"
            />
          </button>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.menu-enter-active,
.menu-leave-active {
  transition:
    opacity 0.15s ease,
    transform 0.15s ease;
}

.menu-enter-from,
.menu-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>
