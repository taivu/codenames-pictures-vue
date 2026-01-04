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
      class="absolute left-0 right-0 bottom-full mb-0 bg-white border-2 border-b-0 border-green-600 rounded-t z-50"
    >
      <slot />
    </div>

    <!-- Menu trigger button -->
    <button
      type="button"
      class="btn border-2 border-green-600 bg-white min-w-28 w-full"
      :class="expanded ? 'rounded-b rounded-t-none' : ''"
      @click="toggle"
    >
      Menu
      <span class="ml-2">{{ expanded ? '⋁' : '⋀' }}</span>
    </button>
  </div>
</template>
