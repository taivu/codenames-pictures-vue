import type { TeamColor } from '@/types'
import { teamTextClasses, teamBgClasses, teamBgLightClasses, teamBorderClasses } from '@/utils'

/**
 * Composable for team color styling
 */
export function useTeamColors() {
  function getTextClass(color: TeamColor): string {
    return teamTextClasses[color] ?? ''
  }

  function getBgClass(color: TeamColor): string {
    return teamBgClasses[color] ?? ''
  }

  function getBorderClass(color: TeamColor): string {
    return teamBorderClasses[color] ?? ''
  }

  return {
    teamTextClasses,
    teamBgClasses,
    teamBgLightClasses,
    teamBorderClasses,
    getTextClass,
    getBgClass,
    getBorderClass,
  }
}
