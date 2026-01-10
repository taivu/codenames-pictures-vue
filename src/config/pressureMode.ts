/**
 * Pressure Mode configuration
 * Timer countdown with strike system for added game tension
 */
export const pressureModeConfig = {
  /** Timer durations in seconds for each strike level (5min, 3min, 1min) */
  durations: [300, 180, 60] as const,

  /** Maximum strikes before game over */
  maxStrikes: 3,

  /** Progress threshold for caution state (orange timer) */
  cautionThreshold: 0.5,

  /** Progress threshold for warning state (red timer) */
  warningThreshold: 0.25,

  /** Interval between timer ticks in milliseconds */
  tickInterval: 1000,

  /** Delay before allowing strike modal dismissal in milliseconds */
  strikeModalDelay: 1500,

  /** Messages shown for each strike */
  strikeMessages: [
    "Time's up! You can do better than this.",
    "Struggling, are we? One more and it's over.",
    'This is your final warning...',
  ] as const,
} as const

export type PressureModeConfig = typeof pressureModeConfig
