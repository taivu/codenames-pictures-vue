<script setup lang="ts">
/**
 * ToggleSwitch - Boolean toggle with sliding knob and color variants.
 * Supports v-model or uncontrolled mode with internal state.
 */
import { ref, computed } from 'vue'

interface Props {
  modelValue?: boolean
  defaultValue?: boolean
  activeColor?: 'green' | 'orange' | 'blue' | 'purple'
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: undefined,
  defaultValue: false,
  activeColor: 'green',
  disabled: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

// Internal state for uncontrolled mode
const internalValue = ref(props.defaultValue)

// Use modelValue if provided (controlled), otherwise use internal state
const isOn = computed(() => props.modelValue ?? internalValue.value)

const colorClasses: Record<string, string> = {
  green: 'bg-green-500',
  orange: 'bg-orange-500',
  blue: 'bg-blue-500',
  purple: 'bg-purple-500',
}

function handleClick(): void {
  if (props.disabled) return

  const newValue = !isOn.value

  // Always emit for v-model support
  emit('update:modelValue', newValue)

  // Update internal state for uncontrolled mode
  if (props.modelValue === undefined) {
    internalValue.value = newValue
  }
}
</script>

<template>
  <button
    type="button"
    role="switch"
    :aria-checked="isOn"
    :disabled="disabled"
    :class="[
      'relative h-6 w-11 shrink-0 rounded-full transition-colors',
      isOn ? colorClasses[activeColor] : 'bg-gray-300',
      disabled && 'cursor-not-allowed opacity-50',
    ]"
    @click="handleClick"
  >
    <span
      :class="[
        'absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform',
        isOn && 'translate-x-5',
      ]"
    />
  </button>
</template>
