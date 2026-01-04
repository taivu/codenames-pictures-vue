<script setup lang="ts">
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
      class="absolute left-0 right-0 bottom-full w-full bg-white border-2 border-green-600 border-b-0 rounded-t z-50 overflow-hidden"
      @click="close"
    >
      <div class="whitespace-nowrap overflow-hidden text-ellipsis">
        <slot />
      </div>
    </div>

    <!-- Menu trigger button -->
    <button
      type="button"
      class="btn border-2 border-green-600 bg-white min-w-20 md:min-w-28 w-full text-sm md:text-base py-1 md:py-2"
      :class="expanded ? 'rounded-b rounded-t-none' : ''"
      @click="toggle"
    >
      Main Menu
      <FontAwesomeIcon :icon="expanded ? 'chevron-down' : 'chevron-up'" class="ml-1 md:ml-2" />
    </button>
  </div>
</template>
