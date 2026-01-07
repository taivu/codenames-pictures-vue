<script setup lang="ts">
import { ref } from 'vue'
import { useGameStore, useSettingsStore } from '@/stores'
import { useTeamColors, usePressureMode } from '@/composables'
import { CircularTimer } from '@/components/ui'
import { trackStartingTeamSet } from '@/plugins/analytics'

const store = useGameStore()
const settingsStore = useSettingsStore()
const { teamBgClasses, teamTextClasses } = useTeamColors()
const pressureMode = usePressureMode()

const isExpanded = ref(false)

function toggleExpanded() {
  isExpanded.value = !isExpanded.value
}

function handleSetStartingTeam(color: string) {
  if (!store.isDuetMode) {
    store.setStartingTeam(color as 'red' | 'blue' | 'green')
    trackStartingTeamSet(color as 'red' | 'blue' | 'green')
  }
}
</script>

<template>
  <div
    class="select-none"
    @click="toggleExpanded"
  >
    <!-- Collapsed View: Compact score badges -->
    <Transition name="hud" mode="out-in">
      <div
        v-if="!isExpanded"
        class="flex portrait:flex-row landscape:flex-col xl:flex-row gap-1.5 cursor-pointer items-center"
      >
        <!-- Pressure Mode Timer (collapsed view) -->
        <div
          v-if="pressureMode.isActive.value"
          class="flex items-center gap-1 px-2 py-1 rounded-lg bg-white/90 backdrop-blur-md shadow-lg"
        >
          <CircularTimer
            :progress="pressureMode.progress.value"
            :is-warning="pressureMode.isWarning.value"
            :is-paused="pressureMode.isPaused.value"
            :size="28"
            :stroke-width="3"
            show-play-pause
          />
          <span
            :class="[
              'font-bold text-sm',
              pressureMode.isWarning.value ? 'text-red-600' : 'text-gray-700'
            ]"
          >
            {{ pressureMode.formattedTime.value }}
          </span>
        </div>
        <div
          v-for="color in store.activeTeamColors"
          :key="color"
          :class="[
            'flex items-center gap-1 px-2 py-1 rounded-lg',
            'text-white font-bold text-sm shadow-lg',
            'backdrop-blur-md',
            teamBgClasses[color]
          ]"
        >
          <FontAwesomeIcon
            v-if="store.startingTeam === color"
            icon="star"
            class="text-yellow-300 text-xs"
          />
          <span class="uppercase text-xs opacity-80">{{ color.slice(0, 3) }}</span>
          <span>{{ store.getGuessedCount(color) }}<template v-if="store.startingTeam || store.isDuetMode">/{{ store.getTotalCards(color) }}</template></span>
        </div>
      </div>

      <!-- Expanded View: Full team info -->
      <div
        v-else
        class="bg-white/90 backdrop-blur-md rounded-xl shadow-xl border border-gray-200 overflow-hidden cursor-pointer min-w-[200px] max-w-[280px]"
      >
        <div
          v-for="(color, index) in store.activeTeamColors"
          :key="color"
          :class="[
            'p-3',
            index > 0 && 'border-t border-gray-200'
          ]"
        >
          <!-- Team Header -->
          <div class="flex items-center justify-between gap-2 mb-1">
            <h4
              class="font-bold flex items-center gap-1"
              :class="teamTextClasses[color]"
            >
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
          <ul
            v-if="store.teams[color].players.length > 0"
            class="text-xs space-y-0.5"
          >
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
          <p
            v-else
            class="text-xs text-gray-400 italic"
          >
            No players yet
          </p>
        </div>

        <!-- Pressure Mode Controls -->
        <div
          v-if="settingsStore.pressureModeEnabled"
          class="px-3 py-2 border-t border-gray-200"
          @click.stop
        >
          <button
            v-if="!pressureMode.isActive.value"
            class="w-full px-3 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-bold text-sm transition-colors flex items-center justify-center gap-2"
            @click="pressureMode.startTimer"
          >
            <FontAwesomeIcon :icon="['far', 'gem']" />
            Add Pressure
          </button>
          <button
            v-else
            class="flex items-center justify-center gap-2 w-full py-1 rounded-lg hover:bg-gray-100 transition-colors"
            @click="pressureMode.togglePause"
          >
            <CircularTimer
              :progress="pressureMode.progress.value"
              :is-warning="pressureMode.isWarning.value"
              :is-paused="pressureMode.isPaused.value"
              :size="40"
              :stroke-width="4"
              show-play-pause
            />
            <div class="text-center">
              <span v-if="pressureMode.isPaused.value" class="font-bold text-lg block text-gray-400">
                PAUSED
              </span>
              <span
                :class="[
                  'block',
                  pressureMode.isPaused.value ? 'text-sm text-gray-400' : 'font-bold text-lg',
                  !pressureMode.isPaused.value && (pressureMode.isWarning.value ? 'text-red-600' : 'text-gray-700')
                ]"
              >
                {{ pressureMode.formattedTime.value }}
              </span>
              <div class="flex justify-center gap-1">
                <FontAwesomeIcon
                  v-for="i in 3"
                  :key="i"
                  icon="skull-crossbones"
                  :class="[
                    'text-sm',
                    i <= pressureMode.strikes.value ? 'text-gray-700' : 'text-gray-300'
                  ]"
                />
              </div>
            </div>
          </button>
        </div>

        <!-- Tap to collapse hint -->
        <div class="px-3 py-1 bg-gray-100 text-center">
          <span class="text-xs text-gray-400">tap to collapse</span>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.hud-enter-active,
.hud-leave-active {
  transition: all 0.2s ease;
}

.hud-enter-from,
.hud-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>
