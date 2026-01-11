<script setup lang="ts">
/**
 * HUDExpanded - Full team panel with players, scores, and pressure mode controls.
 */
import type { TeamColor } from '@/types'
import { useGameStore, useSettingsStore } from '@/stores'
import { useTeamColors, usePressureMode } from '@/composables'
import { pressureModeConfig } from '@/config'
import { CircularTimer } from '@/components/ui'
import { trackStartingTeamSet } from '@/plugins/analytics'

const store = useGameStore()
const settingsStore = useSettingsStore()
const { teamBgClasses, teamTextClasses } = useTeamColors()
const pressureMode = usePressureMode()

function handleSetStartingTeam(color: TeamColor): void {
  if (!store.isDuetMode) {
    store.setStartingTeam(color)
    trackStartingTeamSet(color)
  }
}

function getTimerColorClass(): string {
  if (pressureMode.isPaused.value) return 'text-gray-400'
  return 'text-gray-900'
}
</script>

<template>
  <div
    class="flex max-h-[calc(100dvh-1rem)] max-w-[280px] min-w-[200px] cursor-pointer flex-col overflow-hidden rounded-xl border border-gray-200 bg-white/90 shadow-xl backdrop-blur-md"
  >
    <!-- Scrollable Content -->
    <div class="min-h-0 flex-1 overflow-y-auto">
      <!-- Team Sections -->
      <div
        v-for="(color, index) in store.activeTeamColors"
        :key="color"
        :class="['p-3', index > 0 && 'border-t border-gray-200']"
      >
        <!-- Team Header -->
        <div class="mb-1 flex items-center justify-between gap-2">
          <h4 class="flex items-center gap-1 font-bold capitalize" :class="teamTextClasses[color]">
            <FontAwesomeIcon
              v-if="store.startingTeam === color"
              icon="star"
              class="text-xs text-yellow-500"
            />
            {{ color }} Team
          </h4>
          <button
            :class="[
              'rounded px-2 py-0.5 text-xs font-bold text-white',
              'transition-opacity hover:opacity-80',
              teamBgClasses[color],
            ]"
            :title="!store.isDuetMode ? 'Click to set as starting team' : ''"
            @click.stop="handleSetStartingTeam(color)"
          >
            {{ store.getGuessedCount(color) }}/{{ store.getTotalCards(color) }}
          </button>
        </div>

        <!-- Players List -->
        <ul v-if="store.teams[color].players.length > 0" class="space-y-0.5 text-xs">
          <li
            v-for="(player, playerIndex) in store.teams[color].players"
            :key="playerIndex"
            class="truncate"
            :class="[
              playerIndex === 0 && !store.isDuetMode
                ? ['font-bold', teamTextClasses[color]]
                : 'text-gray-600',
            ]"
          >
            <template v-if="playerIndex === 0 && !store.isDuetMode">&gt; </template>
            {{ player }}
          </li>
        </ul>
        <p v-else class="text-xs text-gray-400 italic">No players yet</p>
      </div>
    </div>

    <!-- Pressure Mode Controls -->
    <div class="shrink-0 border-t border-gray-200 px-3 py-2" @click.stop>
      <!-- Enable Pressure Mode Button -->
      <button
        v-if="!settingsStore.pressureModeEnabled"
        class="flex w-full items-center justify-center gap-2 rounded-lg bg-purple-100 px-3 py-2 text-sm font-medium text-purple-700 transition-colors hover:bg-purple-200"
        @click="settingsStore.setPressureMode(true)"
      >
        <FontAwesomeIcon icon="stopwatch" />
        Pressure Mode
      </button>

      <!-- Start Timer Button -->
      <button
        v-else-if="!pressureMode.isActive.value"
        class="flex w-full items-center justify-center gap-2 rounded-lg bg-purple-100 px-3 py-2 text-sm font-medium text-purple-700 transition-colors hover:bg-purple-200"
        @click="pressureMode.startTimer"
      >
        <FontAwesomeIcon icon="stopwatch" />
        Add Pressure
      </button>

      <!-- Active Timer Display -->
      <button
        v-else
        class="flex w-full items-center justify-center gap-2 rounded-lg py-1 transition-colors hover:bg-gray-100"
        @click="pressureMode.togglePause"
      >
        <CircularTimer
          :progress="pressureMode.progress.value"
          :is-caution="pressureMode.isCaution.value"
          :is-warning="pressureMode.isWarning.value"
          :is-paused="pressureMode.isPaused.value"
          :size="40"
          :stroke-width="4"
          show-play-pause
        />
        <div class="text-center">
          <span :class="['block text-lg leading-tight font-bold', getTimerColorClass()]">
            {{ pressureMode.formattedTime.value }}
          </span>
          <span
            v-if="pressureMode.isPaused.value"
            class="block text-xs leading-tight text-gray-400 uppercase"
          >
            Paused
          </span>
          <div class="flex justify-center gap-1">
            <FontAwesomeIcon
              v-for="i in pressureModeConfig.maxStrikes"
              :key="i"
              icon="skull-crossbones"
              :class="[
                'text-sm',
                i <= pressureMode.strikes.value ? 'text-gray-700' : 'text-gray-300',
              ]"
            />
          </div>
        </div>
      </button>
    </div>

    <!-- Collapse Hint -->
    <div class="shrink-0 bg-gray-100 px-3 py-1 text-center">
      <span class="text-xs text-gray-400">
        <FontAwesomeIcon icon="chevron-up" class="mr-1" />
        tap to collapse
      </span>
    </div>
  </div>
</template>
