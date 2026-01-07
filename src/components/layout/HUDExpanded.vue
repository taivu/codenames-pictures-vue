<script setup lang="ts">
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
  if (pressureMode.isWarning.value) return 'text-red-600'
  if (pressureMode.isCaution.value) return 'text-orange-600'
  return 'text-green-600'
}
</script>

<template>
  <div class="bg-white/90 backdrop-blur-md rounded-xl shadow-xl border border-gray-200 overflow-hidden cursor-pointer min-w-[200px] max-w-[280px] max-h-[calc(100dvh-1rem)] flex flex-col">
    <!-- Scrollable Content -->
    <div class="flex-1 overflow-y-auto min-h-0">
      <!-- Team Sections -->
      <div
        v-for="(color, index) in store.activeTeamColors"
        :key="color"
        :class="['p-3', index > 0 && 'border-t border-gray-200']"
      >
        <!-- Team Header -->
        <div class="flex items-center justify-between gap-2 mb-1">
          <h4 class="font-bold flex items-center gap-1" :class="teamTextClasses[color]">
            <FontAwesomeIcon
              v-if="store.startingTeam === color"
              icon="star"
              class="text-yellow-500 text-xs"
            />
            Team {{ color }}
          </h4>
          <button
            :class="[
              'px-2 py-0.5 rounded text-white text-xs font-bold',
              'hover:opacity-80 transition-opacity',
              teamBgClasses[color]
            ]"
            :title="!store.isDuetMode ? 'Click to set as starting team' : ''"
            @click.stop="handleSetStartingTeam(color)"
          >
            {{ store.getGuessedCount(color) }}/{{ store.getTotalCards(color) }}
          </button>
        </div>

        <!-- Players List -->
        <ul v-if="store.teams[color].players.length > 0" class="text-xs space-y-0.5">
          <li
            v-for="(player, playerIndex) in store.teams[color].players"
            :key="playerIndex"
            class="truncate"
            :class="[
              playerIndex === 0 && !store.isDuetMode
                ? ['font-bold', teamTextClasses[color]]
                : 'text-gray-600'
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
    <div
      v-if="settingsStore.pressureModeEnabled"
      class="shrink-0 px-3 py-2 border-t border-gray-200"
      @click.stop
    >
      <!-- Start Timer Button -->
      <button
        v-if="!pressureMode.isActive.value"
        class="w-full px-3 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-bold text-sm transition-colors flex items-center justify-center gap-2"
        @click="pressureMode.startTimer"
      >
        <FontAwesomeIcon icon="stopwatch" />
        Add Pressure
      </button>

      <!-- Active Timer Display -->
      <button
        v-else
        class="flex items-center justify-center gap-2 w-full py-1 rounded-lg hover:bg-gray-100 transition-colors"
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
          <span :class="['block font-bold text-lg leading-tight', getTimerColorClass()]">
            {{ pressureMode.formattedTime.value }}
          </span>
          <span v-if="pressureMode.isPaused.value" class="text-xs block text-gray-400 uppercase leading-tight">
            Paused
          </span>
          <div class="flex justify-center gap-1">
            <FontAwesomeIcon
              v-for="i in pressureModeConfig.maxStrikes"
              :key="i"
              icon="skull-crossbones"
              :class="['text-sm', i <= pressureMode.strikes.value ? 'text-gray-700' : 'text-gray-300']"
            />
          </div>
        </div>
      </button>
    </div>

    <!-- Collapse Hint -->
    <div class="shrink-0 px-3 py-1 bg-gray-100 text-center">
      <span class="text-xs text-gray-400">
        <FontAwesomeIcon icon="chevron-up" class="mr-1" />
        tap to collapse
      </span>
    </div>
  </div>
</template>
