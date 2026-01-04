import type { Card } from './card'
import type { Team, TeamColor } from './team'

export type GameMode = 'classic' | 'duet'

export interface GameState {
  mode: GameMode
  cards: Card[]
  teams: Record<TeamColor, Team>
  startingTeam: TeamColor | null
  usedCardIds: number[]
}
