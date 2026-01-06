<script setup lang="ts">
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core'

interface Props {
  icon: string | string[] | IconDefinition
  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'primary' | 'ghost'
  label?: string
  disabled?: boolean
}

withDefaults(defineProps<Props>(), {
  size: 'md',
  variant: 'default',
  disabled: false
})

defineEmits<{
  click: [event: MouseEvent]
}>()

const sizeClasses = {
  sm: 'w-8 h-8 text-sm',
  md: 'w-12 h-12 text-base',
  lg: 'w-14 h-14 text-lg'
}

const variantClasses = {
  default: 'bg-white border-2 border-gray-800 text-gray-800 hover:bg-gray-100 active:bg-gray-200',
  primary: 'bg-white/90 backdrop-blur-md border border-gray-200 text-gray-700 hover:bg-white hover:border-gray-300 active:bg-gray-50',
  ghost: 'bg-transparent text-gray-700 hover:bg-black/10 active:bg-black/20'
}
</script>

<template>
  <button
    type="button"
    :class="[
      'flex items-center justify-center rounded-full transition-all duration-150',
      'shadow-md hover:shadow-lg active:scale-95',
      'focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2',
      sizeClasses[size],
      variantClasses[variant],
      disabled && 'opacity-50 cursor-not-allowed'
    ]"
    :disabled="disabled"
    :aria-label="label"
    @click="$emit('click', $event)"
  >
    <FontAwesomeIcon :icon="icon" />
  </button>
</template>
