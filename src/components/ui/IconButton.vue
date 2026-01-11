<script setup lang="ts">
/**
 * IconButton - Icon button that extends BaseButton, with optional text.
 */
import { useSlots } from 'vue'
import type { RouteLocationRaw } from 'vue-router'
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import BaseButton, { type ButtonColor, type ButtonSize, type ButtonVariant, type ButtonRounded } from './BaseButton.vue'

interface Props {
  icon: string | string[] | IconDefinition
  color?: ButtonColor
  variant?: ButtonVariant
  size?: ButtonSize
  rounded?: ButtonRounded
  to?: RouteLocationRaw
  label?: string
  disabled?: boolean
  touchHover?: boolean
}

withDefaults(defineProps<Props>(), {
  color: 'gray',
  variant: 'primary',
  size: 'md',
  rounded: 'lg',
  disabled: false,
  touchHover: false,
})

defineEmits<{
  click: [event: MouseEvent]
}>()

const slots = useSlots()
const hasText = () => !!slots.default
</script>

<template>
  <BaseButton
    :color="color"
    :variant="variant"
    :size="size"
    :rounded="rounded"
    :to="to"
    :disabled="disabled"
    :touch-hover="touchHover"
    :aria-label="label"
    :icon-only="!hasText()"
    @click="$emit('click', $event)"
  >
    <FontAwesomeIcon :icon="icon" />
    <span v-if="hasText()" class="hidden sm:inline"><slot /></span>
  </BaseButton>
</template>
