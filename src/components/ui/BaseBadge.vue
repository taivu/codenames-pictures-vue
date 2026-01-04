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
    class="inline-flex items-center justify-center min-w-6 h-6 px-1.5 text-sm font-bold rounded bg-white border-2 border-black"
    :class="{
      'bg-white': variant === 'default',
      'bg-green-500 text-white': variant === 'success',
      'bg-yellow-400': variant === 'warning',
      'bg-red-500 text-white': variant === 'danger',
    }"
  >
    <slot />
  </span>
</template>
