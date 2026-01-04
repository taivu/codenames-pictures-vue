import type { CardColor, TeamColor } from '@/types'

/**
 * Centralized color scheme definitions for consistent styling across components
 */

// Ring/border styles for selected cards
export const cardRingClasses: Record<Exclude<CardColor, ''>, string> = {
  red: 'ring-4 ring-red-500',
  blue: 'ring-4 ring-blue-500',
  green: 'ring-4 ring-green-500',
  neutral: 'ring-4 ring-yellow-400',
  black: 'ring-4 ring-gray-900',
}

// Background overlay styles for selected cards
export const cardOverlayClasses: Record<Exclude<CardColor, ''>, string> = {
  red: 'bg-red-500/50',
  blue: 'bg-blue-500/50',
  green: 'bg-green-500/50',
  neutral: 'bg-yellow-400/50',
  black: 'bg-gray-900/60',
}

// Button styles for card color selection menu
export const cardButtonClasses: Record<CardColor, string> = {
  '': '',
  red: 'bg-red-500 text-white',
  blue: 'bg-blue-500 text-white',
  green: 'bg-green-500 text-white',
  neutral: 'bg-yellow-400 text-black',
  black: 'bg-gray-900 text-white',
}

// SpyCard cell gradient styles
export const spyCellClasses: Record<string, string> = {
  red: 'bg-gradient-radial from-red-400 to-red-600',
  blue: 'bg-gradient-radial from-blue-400 to-blue-600',
  green: 'bg-gradient-radial from-green-400 to-green-600',
  neutral: 'bg-amber-200',
  black: 'bg-gradient-radial from-gray-600 to-gray-900',
  '': 'bg-gray-200',
}

// Team text colors
export const teamTextClasses: Record<TeamColor, string> = {
  red: 'text-red-500',
  blue: 'text-blue-500',
  green: 'text-green-500',
}

// Team background colors
export const teamBgClasses: Record<TeamColor, string> = {
  red: 'bg-red-500',
  blue: 'bg-blue-500',
  green: 'bg-green-500',
}

// Team light background colors (for cards/containers)
export const teamBgLightClasses: Record<TeamColor, string> = {
  red: 'bg-red-50',
  blue: 'bg-blue-50',
  green: 'bg-green-50',
}

// Team border colors
export const teamBorderClasses: Record<TeamColor, string> = {
  red: 'border-red-500',
  blue: 'border-blue-500',
  green: 'border-green-500',
}

// Starting color indicator for SpyCard
export const startingColorClasses: Record<string, string> = {
  red: 'bg-red-500',
  blue: 'bg-blue-500',
  green: 'bg-green-500',
}

/**
 * Get ring class for a card color
 */
export function getCardRingClass(color: CardColor): string {
  if (color === '') return ''
  return cardRingClasses[color] ?? ''
}

/**
 * Get overlay class for a card color
 */
export function getCardOverlayClass(color: CardColor): string {
  if (color === '') return ''
  return cardOverlayClasses[color] ?? ''
}

/**
 * Get button class for a card color
 */
export function getCardButtonClass(color: CardColor): string {
  return cardButtonClasses[color] ?? ''
}
