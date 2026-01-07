import type { App } from 'vue'
import type { Router } from 'vue-router'
import { createGtag, event } from 'vue-gtag'
import { appConfig } from '@/config'
import type { GameMode, CardColor, TeamColor } from '@/types'

// ===================
// Setup
// ===================

export function setupAnalytics(app: App, router: Router): void {
  const trackingId = appConfig.gaTrackingId

  if (!trackingId) {
    if (appConfig.isDevelopment) {
      console.log('[Analytics] No GA tracking ID configured, skipping setup')
    }
    return
  }

  const gtag = createGtag({
    tagId: trackingId,
    pageTracker: { router },
  })

  app.use(gtag)

  if (appConfig.isDevelopment) {
    console.log('[Analytics] Initialized with tracking ID:', trackingId)
  }
}

// ===================
// Internal helper
// ===================

function track(eventName: string, params?: Record<string, unknown>): void {
  if (!appConfig.gaTrackingId) return

  event(eventName, params)

  if (appConfig.isDevelopment) {
    console.log('[Analytics]', eventName, params ?? '')
  }
}

// ===================
// Game Events
// ===================

export const trackGameStart = (mode: GameMode) => track('game_start', { game_mode: mode })

export const trackNewGame = (mode: GameMode) => track('new_game', { game_mode: mode })

export const trackCardMarked = (color: CardColor) => track('card_marked', { card_color: color })

export const trackStartingTeamSet = (color: TeamColor) =>
  track('starting_team_set', { team_color: color })

// ===================
// Team Events
// ===================

export const trackPlayerAdded = (teamColor: TeamColor, playerName: string) =>
  track('player_added', { team_color: teamColor, player_name: playerName })

export const trackTeamsShuffled = (teams: Record<string, string[]>) =>
  track('teams_shuffled', {
    player_count: Object.values(teams).flat().length,
    teams,
  })

export const trackSpymastersPicked = () => track('spymasters_picked')

// ===================
// Settings Events
// ===================

export const trackAutoSaveToggled = (enabled: boolean) => track('auto_save_toggled', { enabled })

// ===================
// UI Events
// ===================

export type ModalName = 'teams' | 'settings' | 'card_view'

export const trackModalOpened = (modalName: ModalName) =>
  track('modal_opened', { modal_name: modalName })
