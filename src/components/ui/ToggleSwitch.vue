<script setup lang="ts">
interface Props {
  modelValue: boolean
  activeColor?: 'green' | 'orange' | 'blue'
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  activeColor: 'green',
  disabled: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

const colorClasses: Record<string, string> = {
  green: 'bg-green-500',
  orange: 'bg-orange-500',
  blue: 'bg-blue-500',
}

function handleClick(): void {
  if (!props.disabled) {
    emit('update:modelValue', !props.modelValue)
  }
}
</script>

<template>
  <button
    type="button"
    role="switch"
    :aria-checked="modelValue"
    :disabled="disabled"
    :class="[
      'relative shrink-0 w-11 h-6 rounded-full transition-colors',
      modelValue ? colorClasses[activeColor] : 'bg-gray-300',
      disabled && 'opacity-50 cursor-not-allowed'
    ]"
    @click="handleClick"
  >
    <span
      :class="[
        'absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform',
        modelValue && 'translate-x-5'
      ]"
    />
  </button>
</template>
