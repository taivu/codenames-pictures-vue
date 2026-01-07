import { teamTextClasses, teamBgClasses, teamBgLightClasses, teamBorderClasses } from '@/utils'

/**
 * Composable for team color styling.
 * Returns class maps for direct template usage.
 */
export function useTeamColors() {
  return {
    teamTextClasses,
    teamBgClasses,
    teamBgLightClasses,
    teamBorderClasses,
  }
}
