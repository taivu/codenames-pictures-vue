import type { CardColor } from './card'
import type { TeamColor } from './team'

export interface SpyCardCell {
  color: CardColor
}

export interface SpyCard {
  id: string
  startingColor?: TeamColor
  cells: SpyCardCell[]
}
