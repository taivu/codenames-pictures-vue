import type { Card } from '@/types'

/**
 * Generates the image path for a card based on its set and index
 */
export function getCardImagePath(card: Pick<Card, 'setId' | 'imageIndex'>): string {
  return `${import.meta.env.BASE_URL}images/cards/${card.setId}/card-${card.imageIndex}.jpg`
}
