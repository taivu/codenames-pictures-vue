export type CardColor = '' | 'red' | 'blue' | 'green' | 'neutral' | 'black'

export interface Card {
  id: number
  setId: string
  imageIndex: number
  color: CardColor
}

export interface CardColorOption {
  value: CardColor
  label: string
}
