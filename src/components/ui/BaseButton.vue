<script setup lang="ts">
interface Props {
  variant?: 'default' | 'blue' | 'green' | 'red' | 'link'
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
    class="btn"
    :class="{
      'btn-blue': variant === 'blue',
      'btn-green': variant === 'green',
      'btn-red': variant === 'red',
      'bg-transparent border-0 text-blue-600 underline-offset-2 hover:underline':
        variant === 'link',
      'opacity-50 cursor-not-allowed': disabled,
    }"
    @click="$emit('click', $event)"
  >
    <slot />
  </button>
</template>
