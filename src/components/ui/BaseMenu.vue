<script setup lang="ts">
/**
 * BaseMenu - Expandable dropdown menu with trigger button.
 */
import { ref } from 'vue'
import { useClickOutside } from '@/composables'

const expanded = ref(false)
const menuRef = ref<HTMLElement | null>(null)

function toggle(): void {
  expanded.value = !expanded.value
}

function close(): void {
  expanded.value = false
}

useClickOutside(menuRef, close)
</script>

<template>
  <div ref="menuRef" class="relative">
    <!-- Dropdown content (above button) -->
    <div
      v-if="expanded"
      class="absolute right-0 bottom-full left-0 z-50 w-full overflow-hidden rounded-t border-2 border-b-0 border-green-600 bg-white"
      @click="close"
    >
      <div class="overflow-hidden text-ellipsis whitespace-nowrap">
        <slot />
      </div>
    </div>

    <!-- Menu trigger button -->
    <button
      type="button"
      class="btn w-full min-w-20 border-2 border-green-600 bg-white py-1 text-sm md:min-w-28 md:py-2 md:text-base"
      :class="expanded ? 'rounded-t-none rounded-b' : ''"
      @click="toggle"
    >
      Main Menu
      <FontAwesomeIcon :icon="expanded ? 'chevron-down' : 'chevron-up'" class="ml-1 md:ml-2" />
    </button>
  </div>
</template>
