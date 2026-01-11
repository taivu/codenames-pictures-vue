<script setup lang="ts">
/**
 * BaseBadge - Small colored label for status or counts.
 */
interface Props {
  variant?: 'default' | 'success' | 'warning' | 'danger'
}

withDefaults(defineProps<Props>(), {
  variant: 'default',
})
</script>

<template>
  <span
    class="inline-flex h-6 min-w-6 items-center justify-center rounded-md px-2 text-xs font-bold shadow-sm"
    :class="{
      'bg-white/90 text-gray-700': variant === 'default',
      'bg-green-500 text-white': variant === 'success',
      'bg-yellow-400 text-gray-800': variant === 'warning',
      'bg-red-500 text-white': variant === 'danger',
    }"
  >
    <slot />
  </span>
</template>
