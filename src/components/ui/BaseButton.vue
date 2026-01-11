<script setup lang="ts">
/**
 * BaseButton - Reusable button with variant styles.
 */
import { computed } from 'vue'

type ButtonVariant = 'default' | 'blue' | 'green' | 'red' | 'orange' | 'ghost' | 'link'

interface Props {
  variant?: ButtonVariant
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  type: 'button',
  disabled: false,
})

defineEmits<{
  click: [event: MouseEvent]
}>()

// Variant styles as a lookup map
const variantClasses: Record<ButtonVariant, string> = {
  default: 'bg-blue-500 text-white shadow-sm hover:bg-blue-600',
  blue: 'bg-blue-500 text-white shadow-sm hover:bg-blue-600',
  green: 'bg-green-500 text-white shadow-sm hover:bg-green-600',
  red: 'bg-red-500 text-white shadow-sm hover:bg-red-600',
  orange: 'bg-orange-500 text-white shadow-sm hover:bg-orange-600',
  ghost: 'text-gray-700 hover:bg-gray-100',
  link: 'bg-transparent text-blue-600 underline-offset-2 shadow-none hover:underline',
}

const buttonClasses = computed(() => [
  variantClasses[props.variant],
  props.disabled && 'cursor-not-allowed opacity-50',
])
</script>

<template>
  <button
    :type="type"
    :disabled="disabled"
    class="flex items-center gap-2 rounded-lg px-4 py-2.5 font-medium transition-colors"
    :class="buttonClasses"
    @click="$emit('click', $event)"
  >
    <slot />
  </button>
</template>
