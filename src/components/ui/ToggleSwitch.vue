<script setup lang="ts">
interface Props {
  modelValue: boolean
  activeColor?: 'green' | 'orange' | 'blue' | 'purple'
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
  purple: 'bg-purple-500',
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
      'relative h-6 w-11 shrink-0 rounded-full transition-colors',
      modelValue ? colorClasses[activeColor] : 'bg-gray-300',
      disabled && 'cursor-not-allowed opacity-50',
    ]"
    @click="handleClick"
  >
    <span
      :class="[
        'absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform',
        modelValue && 'translate-x-5',
      ]"
    />
  </button>
</template>
