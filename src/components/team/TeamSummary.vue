<script setup lang="ts">
import { computed } from 'vue'
import type { TeamColor } from '@/types'
import { useGameStore } from '@/stores'
import { BaseBadge } from '@/components/ui'

interface Props {
  color: TeamColor
}

const props = defineProps<Props>()

const store = useGameStore()

const team = computed(() => store.teams[props.color])
const hasPlayers = computed(() => team.value.players.length > 0)

const totalCards = computed(() => store.getTotalCards(props.color))
const guessedCards = computed(() => store.getGuessedCount(props.color))

const textColorClass: Record<TeamColor, string> = {
  red: 'text-red-500',
  blue: 'text-blue-500',
  green: 'text-green-500',
}
</script>

<template>
  <div v-if="hasPlayers" class="bg-white/50 rounded-lg p-4">
    <h3
      class="text-xl font-bold flex items-center gap-2"
      :class="textColorClass[color]"
    >
      Team {{ color }}
      <BaseBadge>
        {{ guessedCards }}<template v-if="store.startingTeam || store.isDuetMode">/{{ totalCards }}</template>
      </BaseBadge>
    </h3>

    <ul class="mt-2 space-y-1">
      <li
        v-for="(player, index) in team.players"
        :key="index"
        :class="[
          index === 0 && !store.isDuetMode
            ? ['font-bold', textColorClass[color]]
            : 'text-gray-700',
        ]"
      >
        <template v-if="index === 0 && !store.isDuetMode">&gt; </template>
        {{ player }}
      </li>
    </ul>
  </div>
</template>
