<script setup lang="ts">
import { computed } from 'vue'
import type { TeamColor } from '@/types'
import { useGameStore } from '@/stores'
import { useTeamColors } from '@/composables'
import { trackStartingTeamSet } from '@/plugins/analytics'

interface Props {
  color: TeamColor
}

const props = defineProps<Props>()

const store = useGameStore()
const { teamTextClasses } = useTeamColors()

const team = computed(() => store.teams[props.color])
const hasPlayers = computed(() => team.value.players.length > 0)

const totalCards = computed(() => store.getTotalCards(props.color))
const guessedCards = computed(() => store.getGuessedCount(props.color))
const isStartingTeam = computed(() => store.startingTeam === props.color)

function handleBadgeClick(): void {
  if (!store.isDuetMode) {
    store.setStartingTeam(props.color)
    trackStartingTeamSet(props.color)
  }
}
</script>

<template>
  <div v-if="hasPlayers" class="bg-gray-50 rounded-xl p-3">
    <div class="flex items-center justify-between gap-2 mb-2">
      <h3
        class="text-sm font-bold capitalize"
        :class="teamTextClasses[color]"
      >
        <FontAwesomeIcon
          v-if="isStartingTeam"
          icon="star"
          class="text-yellow-500 text-xs mr-1"
        />
        Team {{ color }}
      </h3>
      <button
        :class="[
          'px-2 py-0.5 text-xs font-bold rounded-md transition-colors',
          !store.isDuetMode ? 'cursor-pointer hover:opacity-80' : '',
          teamTextClasses[color],
          'bg-white shadow-sm'
        ]"
        :title="!store.isDuetMode ? 'Click to set as starting team' : ''"
        @click="handleBadgeClick"
      >
        {{ guessedCards }}<template v-if="store.startingTeam || store.isDuetMode">/{{ totalCards }}</template>
      </button>
    </div>

    <ul class="space-y-0.5 text-xs">
      <li
        v-for="(player, index) in team.players"
        :key="index"
        class="truncate"
        :class="[
          index === 0 && !store.isDuetMode
            ? ['font-semibold', teamTextClasses[color]]
            : 'text-gray-600',
        ]"
      >
        <template v-if="index === 0 && !store.isDuetMode">&gt; </template>
        {{ player }}
      </li>
    </ul>
  </div>
</template>
