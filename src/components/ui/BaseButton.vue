<script setup lang="ts">
/**
 * BaseButton - Reusable button with color and variant styles.
 */
import { computed } from 'vue'
import type { RouteLocationRaw } from 'vue-router'

export type ButtonColor = 'blue' | 'green' | 'red' | 'orange' | 'amber' | 'purple' | 'rose' | 'gray'
export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'subtle' | 'outline' | 'glass'
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg'
export type ButtonRounded = 'lg' | 'full'

interface Props {
  color?: ButtonColor
  variant?: ButtonVariant
  size?: ButtonSize
  rounded?: ButtonRounded
  type?: 'button' | 'submit' | 'reset'
  to?: RouteLocationRaw
  disabled?: boolean
  touchHover?: boolean
  iconOnly?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  color: 'gray',
  variant: 'primary',
  size: 'md',
  rounded: 'lg',
  type: 'button',
  disabled: false,
  touchHover: false,
  iconOnly: false,
})

defineEmits<{
  click: [event: MouseEvent]
}>()

// ===================
// Style Maps
// ===================

// Primary variant: solid background
const primaryClasses: Record<ButtonColor, string> = {
  blue: 'bg-blue-500 text-white shadow-sm hover:bg-blue-600',
  green: 'bg-green-500 text-white shadow-sm hover:bg-green-600',
  red: 'bg-red-500 text-white shadow-sm hover:bg-red-600',
  orange: 'bg-orange-500 text-white shadow-sm hover:bg-orange-600',
  amber: 'bg-amber-500 text-white shadow-sm hover:bg-amber-600',
  purple: 'bg-purple-500 text-white shadow-sm hover:bg-purple-600',
  rose: 'bg-rose-500 text-white shadow-sm hover:bg-rose-600',
  gray: 'bg-gray-500 text-white shadow-sm hover:bg-gray-600',
}

// Secondary variant: colored tint background, darkens on hover
const secondaryClasses: Record<ButtonColor, string> = {
  blue: 'bg-blue-100 text-blue-600 hover:bg-blue-200',
  green: 'bg-green-100 text-green-600 hover:bg-green-200',
  red: 'bg-red-100 text-red-600 hover:bg-red-200',
  orange: 'bg-orange-100 text-orange-600 hover:bg-orange-200',
  amber: 'bg-amber-100 text-amber-600 hover:bg-amber-200',
  purple: 'bg-purple-100 text-purple-600 hover:bg-purple-200',
  rose: 'bg-rose-100 text-rose-600 hover:bg-rose-200',
  gray: 'bg-gray-100 text-gray-600 hover:bg-gray-200',
}

// Ghost variant: transparent, colored on hover
const ghostClasses: Record<ButtonColor, string> = {
  blue: 'text-gray-600 hover:bg-blue-100 hover:text-blue-600',
  green: 'text-gray-600 hover:bg-green-100 hover:text-green-600',
  red: 'text-gray-600 hover:bg-red-100 hover:text-red-600',
  orange: 'text-gray-600 hover:bg-orange-100 hover:text-orange-600',
  amber: 'text-gray-600 hover:bg-amber-100 hover:text-amber-600',
  purple: 'text-gray-600 hover:bg-purple-100 hover:text-purple-600',
  rose: 'text-gray-600 hover:bg-rose-100 hover:text-rose-600',
  gray: 'text-gray-400 hover:bg-gray-100 hover:text-gray-600',
}

// Subtle variant: minimal, just text color change
const subtleClasses: Record<ButtonColor, string> = {
  blue: 'text-gray-400 hover:text-blue-600',
  green: 'text-gray-400 hover:text-green-600',
  red: 'text-gray-400 hover:text-red-600',
  orange: 'text-gray-400 hover:text-orange-600',
  amber: 'text-gray-400 hover:text-amber-600',
  purple: 'text-gray-400 hover:text-purple-600',
  rose: 'text-gray-400 hover:text-rose-600',
  gray: 'text-gray-400 hover:text-gray-600',
}

// Outline variant: bordered with light background
const outlineClasses: Record<ButtonColor, string> = {
  blue: 'border border-blue-200 bg-blue-50 text-blue-700 hover:border-blue-300 hover:bg-blue-100',
  green: 'border border-green-200 bg-green-50 text-green-700 hover:border-green-300 hover:bg-green-100',
  red: 'border border-red-200 bg-red-50 text-red-700 hover:border-red-300 hover:bg-red-100',
  orange: 'border border-orange-200 bg-orange-50 text-orange-700 hover:border-orange-300 hover:bg-orange-100',
  amber: 'border border-amber-200 bg-amber-50 text-amber-700 hover:border-amber-300 hover:bg-amber-100',
  purple: 'border border-purple-200 bg-purple-50 text-purple-700 hover:border-purple-300 hover:bg-purple-100',
  rose: 'border border-rose-200 bg-rose-50 text-rose-700 hover:border-rose-300 hover:bg-rose-100',
  gray: 'border border-gray-300 bg-gray-100 text-gray-800 hover:bg-gray-200',
}

// Glass variant: frosted glass with border
const glassClasses: Record<ButtonColor, string> = {
  blue: 'bg-white/90 backdrop-blur-md border border-gray-200 text-blue-600 hover:bg-white hover:border-blue-300',
  green: 'bg-white/90 backdrop-blur-md border border-gray-200 text-green-600 hover:bg-white hover:border-green-300',
  red: 'bg-white/90 backdrop-blur-md border border-gray-200 text-red-600 hover:bg-white hover:border-red-300',
  orange: 'bg-white/90 backdrop-blur-md border border-gray-200 text-orange-600 hover:bg-white hover:border-orange-300',
  amber: 'bg-white/90 backdrop-blur-md border border-gray-200 text-amber-600 hover:bg-white hover:border-amber-300',
  purple: 'bg-white/90 backdrop-blur-md border border-gray-200 text-purple-600 hover:bg-white hover:border-purple-300',
  rose: 'bg-white/90 backdrop-blur-md border border-gray-200 text-rose-600 hover:bg-white hover:border-rose-300',
  gray: 'bg-white/90 backdrop-blur-md border border-gray-200 text-gray-700 hover:bg-white hover:border-gray-300',
}

// Variant to class map lookup
const variantClassMaps: Record<ButtonVariant, Record<ButtonColor, string>> = {
  primary: primaryClasses,
  secondary: secondaryClasses,
  ghost: ghostClasses,
  subtle: subtleClasses,
  outline: outlineClasses,
  glass: glassClasses,
}

// Size classes for regular buttons (padding-based)
const sizeClasses: Record<ButtonSize, string> = {
  xs: 'px-2 py-1.5 text-xs gap-1',
  sm: 'px-3 py-2 text-sm gap-1.5',
  md: 'px-4 py-2.5 gap-2',
  lg: 'px-5 py-3 text-lg gap-2.5',
}

// Size classes for icon-only buttons (fixed dimensions)
const iconSizeClasses: Record<ButtonSize, string> = {
  xs: 'w-7 h-7 text-xs',
  sm: 'w-8 h-8 text-sm',
  md: 'w-10 h-10 text-base',
  lg: 'w-12 h-12 text-lg',
}

// Rounded classes
const roundedClasses: Record<ButtonRounded, string> = {
  lg: 'rounded-lg',
  full: 'rounded-full',
}

// Touch hover classes (show hover state on touch devices)
const primaryTouchClasses: Record<ButtonColor, string> = {
  blue: '[@media(hover:none)]:bg-blue-600',
  green: '[@media(hover:none)]:bg-green-600',
  red: '[@media(hover:none)]:bg-red-600',
  orange: '[@media(hover:none)]:bg-orange-600',
  amber: '[@media(hover:none)]:bg-amber-600',
  purple: '[@media(hover:none)]:bg-purple-600',
  rose: '[@media(hover:none)]:bg-rose-600',
  gray: '[@media(hover:none)]:bg-gray-600',
}

const secondaryTouchClasses: Record<ButtonColor, string> = {
  blue: '[@media(hover:none)]:bg-blue-200',
  green: '[@media(hover:none)]:bg-green-200',
  red: '[@media(hover:none)]:bg-red-200',
  orange: '[@media(hover:none)]:bg-orange-200',
  amber: '[@media(hover:none)]:bg-amber-200',
  purple: '[@media(hover:none)]:bg-purple-200',
  rose: '[@media(hover:none)]:bg-rose-200',
  gray: '[@media(hover:none)]:bg-gray-200',
}

const ghostTouchClasses: Record<ButtonColor, string> = {
  blue: '[@media(hover:none)]:bg-blue-100 [@media(hover:none)]:text-blue-600',
  green: '[@media(hover:none)]:bg-green-100 [@media(hover:none)]:text-green-600',
  red: '[@media(hover:none)]:bg-red-100 [@media(hover:none)]:text-red-600',
  orange: '[@media(hover:none)]:bg-orange-100 [@media(hover:none)]:text-orange-600',
  amber: '[@media(hover:none)]:bg-amber-100 [@media(hover:none)]:text-amber-600',
  purple: '[@media(hover:none)]:bg-purple-100 [@media(hover:none)]:text-purple-600',
  rose: '[@media(hover:none)]:bg-rose-100 [@media(hover:none)]:text-rose-600',
  gray: '[@media(hover:none)]:bg-gray-100 [@media(hover:none)]:text-gray-600',
}

const subtleTouchClasses: Record<ButtonColor, string> = {
  blue: '[@media(hover:none)]:text-blue-600',
  green: '[@media(hover:none)]:text-green-600',
  red: '[@media(hover:none)]:text-red-600',
  orange: '[@media(hover:none)]:text-orange-600',
  amber: '[@media(hover:none)]:text-amber-600',
  purple: '[@media(hover:none)]:text-purple-600',
  rose: '[@media(hover:none)]:text-rose-600',
  gray: '[@media(hover:none)]:text-gray-600',
}

const outlineTouchClasses: Record<ButtonColor, string> = {
  blue: '[@media(hover:none)]:border-blue-300 [@media(hover:none)]:bg-blue-100',
  green: '[@media(hover:none)]:border-green-300 [@media(hover:none)]:bg-green-100',
  red: '[@media(hover:none)]:border-red-300 [@media(hover:none)]:bg-red-100',
  orange: '[@media(hover:none)]:border-orange-300 [@media(hover:none)]:bg-orange-100',
  amber: '[@media(hover:none)]:border-amber-300 [@media(hover:none)]:bg-amber-100',
  purple: '[@media(hover:none)]:border-purple-300 [@media(hover:none)]:bg-purple-100',
  rose: '[@media(hover:none)]:border-rose-300 [@media(hover:none)]:bg-rose-100',
  gray: '[@media(hover:none)]:bg-gray-200',
}

const glassTouchClasses: Record<ButtonColor, string> = {
  blue: '[@media(hover:none)]:bg-white [@media(hover:none)]:border-blue-300',
  green: '[@media(hover:none)]:bg-white [@media(hover:none)]:border-green-300',
  red: '[@media(hover:none)]:bg-white [@media(hover:none)]:border-red-300',
  orange: '[@media(hover:none)]:bg-white [@media(hover:none)]:border-orange-300',
  amber: '[@media(hover:none)]:bg-white [@media(hover:none)]:border-amber-300',
  purple: '[@media(hover:none)]:bg-white [@media(hover:none)]:border-purple-300',
  rose: '[@media(hover:none)]:bg-white [@media(hover:none)]:border-rose-300',
  gray: '[@media(hover:none)]:bg-white [@media(hover:none)]:border-gray-300',
}

const touchHoverClassMaps: Record<ButtonVariant, Record<ButtonColor, string>> = {
  primary: primaryTouchClasses,
  secondary: secondaryTouchClasses,
  ghost: ghostTouchClasses,
  subtle: subtleTouchClasses,
  outline: outlineTouchClasses,
  glass: glassTouchClasses,
}

const buttonClasses = computed(() => [
  variantClassMaps[props.variant][props.color],
  props.iconOnly ? iconSizeClasses[props.size] : sizeClasses[props.size],
  roundedClasses[props.rounded],
  props.iconOnly && 'justify-center',
  props.touchHover && touchHoverClassMaps[props.variant][props.color],
  props.disabled && 'cursor-not-allowed opacity-50',
])
</script>

<template>
  <RouterLink
    v-if="to"
    :to="to"
    class="flex items-center font-medium transition-colors"
    :class="buttonClasses"
  >
    <slot />
  </RouterLink>
  <button
    v-else
    :type="type"
    :disabled="disabled"
    class="flex items-center font-medium transition-colors"
    :class="buttonClasses"
    @click="$emit('click', $event)"
  >
    <slot />
  </button>
</template>
