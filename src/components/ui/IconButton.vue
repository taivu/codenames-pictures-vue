<script setup lang="ts">
/**
 * IconButton - Circular or square button with FontAwesome icon.
 */
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core'

interface Props {
  icon: string | string[] | IconDefinition
  size?: 'xs' | 'sm' | 'md' | 'lg'
  shape?: 'round' | 'square'
  variant?: 'default' | 'primary' | 'ghost' | 'subtle'
  label?: string
  disabled?: boolean
}

withDefaults(defineProps<Props>(), {
  size: 'md',
  shape: 'round',
  variant: 'default',
  disabled: false,
})

defineEmits<{
  click: [event: MouseEvent]
}>()

const sizeClasses = {
  xs: 'w-7 h-7 text-xs',
  sm: 'w-8 h-8 text-sm',
  md: 'w-10 h-10 text-base',
  lg: 'w-12 h-12 text-lg',
}

const shapeClasses = {
  round: 'rounded-full',
  square: 'rounded-lg',
}

const variantClasses = {
  default: 'bg-white border-2 border-gray-800 text-gray-800 hover:bg-gray-100 active:bg-gray-200',
  primary:
    'bg-white/90 backdrop-blur-md border border-gray-200 text-gray-700 hover:bg-white hover:border-gray-300 active:bg-gray-50',
  ghost: 'bg-transparent text-gray-700 hover:bg-black/10 active:bg-black/20',
  subtle: 'bg-transparent text-gray-400 hover:bg-gray-100 hover:text-gray-600',
}
</script>

<template>
  <button
    type="button"
    :class="[
      'flex items-center justify-center transition-all duration-150',
      variant !== 'subtle' && 'shadow-md hover:shadow-lg',
      'active:scale-95',
      'focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:outline-none',
      sizeClasses[size],
      shapeClasses[shape],
      variantClasses[variant],
      disabled && 'cursor-not-allowed opacity-50',
    ]"
    :disabled="disabled"
    :aria-label="label"
    @click="$emit('click', $event)"
  >
    <FontAwesomeIcon :icon="icon" />
  </button>
</template>
