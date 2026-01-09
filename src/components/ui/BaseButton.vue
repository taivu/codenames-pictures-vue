<script setup lang="ts">
interface Props {
  variant?: 'default' | 'blue' | 'green' | 'red' | 'orange' | 'ghost' | 'link'
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
}

withDefaults(defineProps<Props>(), {
  variant: 'default',
  type: 'button',
  disabled: false,
})

defineEmits<{
  click: [event: MouseEvent]
}>()
</script>

<template>
  <button
    :type="type"
    :disabled="disabled"
    class="flex items-center gap-2 rounded-lg px-4 py-2.5 font-medium transition-colors"
    :class="{
      'bg-blue-500 text-white shadow-sm hover:bg-blue-600': variant === 'blue' || variant === 'default',
      'bg-green-500 text-white shadow-sm hover:bg-green-600': variant === 'green',
      'bg-red-500 text-white shadow-sm hover:bg-red-600': variant === 'red',
      'bg-orange-500 text-white shadow-sm hover:bg-orange-600': variant === 'orange',
      'text-gray-700 hover:bg-gray-100': variant === 'ghost',
      'bg-transparent text-blue-600 shadow-none underline-offset-2 hover:underline':
        variant === 'link',
      'cursor-not-allowed opacity-50': disabled,
    }"
    @click="$emit('click', $event)"
  >
    <slot />
  </button>
</template>
