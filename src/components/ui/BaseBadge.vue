<script setup lang="ts">
interface Props {
  variant?: 'default' | 'success' | 'warning' | 'danger'
}

withDefaults(defineProps<Props>(), {
  variant: 'default',
})
</script>

<template>
  <span
    class="inline-flex items-center justify-center min-w-6 h-6 px-2 text-xs font-bold rounded-md shadow-sm"
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
