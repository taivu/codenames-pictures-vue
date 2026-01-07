<script setup lang="ts">
import { useGameStore } from '@/stores'
import { useTeamColors, usePressureMode } from '@/composables'
import { CircularTimer } from '@/components/ui'

const store = useGameStore()
const { teamBgClasses } = useTeamColors()
const pressureMode = usePressureMode()

function getTimerColorClass(): string {
  if (pressureMode.isWarning.value) return 'text-red-600'
  if (pressureMode.isCaution.value) return 'text-orange-600'
  return 'text-green-600'
}
</script>

<template>
  <div class="flex portrait:flex-row landscape:flex-col xl:flex-row gap-1.5 cursor-pointer items-center landscape:items-start xl:items-center">
    <!-- Team score badges -->
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

    <!-- Pressure Mode Timer -->
    <div
      v-if="pressureMode.isActive.value"
      class="flex items-center gap-1 px-2 py-1 rounded-lg bg-white/90 backdrop-blur-md shadow-lg landscape:order-first xl:order-last"
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
      <span :class="['font-bold text-sm', getTimerColorClass()]">
        {{ pressureMode.formattedTime.value }}
      </span>
    </div>
  </div>
</template>
