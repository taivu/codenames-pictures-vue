export type CardColor = '' | 'red' | 'blue' | 'green' | 'neutral' | 'black'

export interface Card {
  id: number
  imageId: number
  color: CardColor
}

export interface CardColorOption {
  value: CardColor
  label: string
}

export const CARD_COLOR_OPTIONS: CardColorOption[] = [
  { value: 'red', label: 'Red' },
  { value: 'blue', label: 'Blue' },
  { value: 'green', label: 'Green' },
  { value: 'neutral', label: 'Neutral' },
  { value: 'black', label: 'Game Over' },
]
