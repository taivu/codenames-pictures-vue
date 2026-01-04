<script setup lang="ts">
import { computed } from 'vue'
import type { TeamColor } from '@/types'
import { useGameStore } from '@/stores'
import { useTeamColors } from '@/composables'
import { BaseBadge } from '@/components/ui'

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
  }
}
</script>

<template>
  <div v-if="hasPlayers" class="bg-white/50 rounded-lg p-2 md:p-4">
    <h3
      class="text-sm md:text-xl font-bold flex items-center justify-between gap-1 md:gap-2 whitespace-nowrap"
      :class="teamTextClasses[color]"
    >
      <span><span class="hidden md:inline">Team </span>{{ color }}</span>
      <span class="flex items-center gap-1">
        <FontAwesomeIcon
          v-if="isStartingTeam"
          icon="star"
          class="text-yellow-500 text-xs md:text-sm"
        />
        <BaseBadge
          :class="!store.isDuetMode ? 'cursor-pointer hover:opacity-80' : ''"
          :title="!store.isDuetMode ? 'Click to set as starting team' : ''"
          @click="handleBadgeClick"
        >
          {{ guessedCards }}<template v-if="store.startingTeam || store.isDuetMode">/{{ totalCards }}</template>
        </BaseBadge>
      </span>
    </h3>

    <ul class="mt-1 md:mt-2 space-y-1 text-xs md:text-base">
      <li
        v-for="(player, index) in team.players"
        :key="index"
        class="truncate"
        :class="[
          index === 0 && !store.isDuetMode
            ? ['font-bold', teamTextClasses[color]]
            : 'text-gray-700',
        ]"
      >
        <template v-if="index === 0 && !store.isDuetMode">&gt; </template>
        {{ player }}
      </li>
    </ul>
  </div>
</template>
