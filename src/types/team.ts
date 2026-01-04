export type TeamColor = 'red' | 'blue' | 'green'

export interface Team {
  color: TeamColor
  players: string[]
  score: number
}
