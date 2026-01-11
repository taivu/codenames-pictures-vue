/**
 * Color Schemes - Tailwind class mappings for cards and teams.
 * Just simple lookup tables. No magic.
 */
import type { CardColor, TeamColor } from '@/types'

// ===================
// Card Colors
// ===================

// Empty string key ('') lets us do direct lookups like cardRingClasses[card.color]
// without needing wrapper functions to handle the "no color" case.
export const cardRingClasses: Record<CardColor, string> = {
  '': '',
  red: 'ring-4 ring-red-500',
  blue: 'ring-4 ring-blue-500',
  green: 'ring-4 ring-green-500',
  neutral: 'ring-4 ring-yellow-400',
  black: 'ring-4 ring-gray-900',
}

export const cardOverlayClasses: Record<CardColor, string> = {
  '': '',
  red: 'bg-red-500/50',
  blue: 'bg-blue-500/50',
  green: 'bg-green-500/50',
  neutral: 'bg-yellow-400/50',
  black: 'bg-gray-900/60',
}

// Button styles for card color selection menu
export const cardButtonClasses: Record<CardColor, string> = {
  '': '',
  red: 'bg-red-500 hover:bg-red-600 text-white',
  blue: 'bg-blue-500 hover:bg-blue-600 text-white',
  green: 'bg-green-500 hover:bg-green-600 text-white',
  neutral: 'bg-yellow-400 hover:bg-yellow-500 text-gray-800',
  black: 'bg-gray-800 hover:bg-gray-900 text-white',
}

// Spy Master card cell styles (radial gradient)
export const spyMasterCellClasses: Record<string, string> = {
  red: 'bg-radial-red',
  blue: 'bg-radial-blue',
  green: 'bg-radial-green',
  neutral: 'bg-radial-neutral text-gray-800',
  black: 'bg-radial-black',
  '': 'bg-gray-200',
}

// ===================
// Team Color Classes
// ===================

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

// Spy Master starting team indicator
export const spyMasterStartingClasses: Record<string, string> = {
  red: 'bg-red-500',
  blue: 'bg-blue-500',
  green: 'bg-green-500',
}
