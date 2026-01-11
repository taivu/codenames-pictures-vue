<script setup lang="ts">
/**
 * HUDCollapsed - Compact score badges and timer shown when HUD is minimized.
 */
import { useGameStore } from '@/stores'
import { usePressureMode } from '@/composables'
import { teamBgClasses } from '@/utils'
import { CircularTimer } from '@/components/ui'

const store = useGameStore()
const pressureMode = usePressureMode()

function getTimerColorClass(): string {
  return 'text-gray-900'
}
</script>

<template>
  <div
    class="flex cursor-pointer items-center gap-1.5 xl:flex-row xl:items-center portrait:flex-row landscape:flex-col landscape:items-start"
  >
    <!-- Team score badges -->
    <div
      v-for="color in store.activeTeamColors"
      :key="color"
      :class="[
        'flex items-center gap-1 rounded-lg px-2 py-1',
        'text-sm font-bold text-white shadow-lg',
        'backdrop-blur-md',
        teamBgClasses[color],
      ]"
    >
      <FontAwesomeIcon
        v-if="store.startingTeam === color"
        icon="star"
        class="text-xs text-yellow-300"
      />
      <span class="text-xs uppercase opacity-80">{{ color.slice(0, 3) }}</span>
      <span
        >{{ store.getGuessedCount(color)
        }}<template v-if="store.startingTeam || store.isDuetMode"
          >/{{ store.getTotalCards(color) }}</template
        ></span
      >
    </div>

    <!-- Pressure Mode Timer -->
    <div
      v-if="pressureMode.isActive.value"
      class="flex items-center gap-1 rounded-lg bg-white/90 px-2 py-1 shadow-lg backdrop-blur-md xl:order-last landscape:order-first"
    >
      <CircularTimer
        :progress="pressureMode.progress.value"
        :is-caution="pressureMode.isCaution.value"
        :is-warning="pressureMode.isWarning.value"
        :is-paused="pressureMode.isPaused.value"
        :size="28"
        :stroke-width="3"
        show-play-pause
      />
      <span :class="['text-sm font-bold', getTimerColorClass()]">
        {{ pressureMode.formattedTime.value }}
      </span>
    </div>
  </div>
</template>
