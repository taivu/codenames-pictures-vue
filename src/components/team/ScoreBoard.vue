<script setup lang="ts">
/**
 * ScoreBoard - Horizontal display of all team scores with trophy separator.
 * Trophy gets a colored circle showing who's winning.
 */
import { computed } from 'vue'
import { useGameStore } from '@/stores'
import TeamScore from './TeamScore.vue'

const store = useGameStore()

const shouldShow = computed(() => store.teamsAreSetup && !store.isDuetMode)

const trophyBgClass = computed(() => {
  const redScore = store.teams.red.score
  const blueScore = store.teams.blue.score
  if (redScore > blueScore) return 'bg-red-500'
  if (blueScore > redScore) return 'bg-blue-500'
  return 'bg-gray-100'
})
</script>

<template>
  <div v-if="shouldShow" class="flex items-center justify-center gap-4">
    <template v-for="(color, index) in store.activeTeamColors" :key="color">
      <div
        v-if="index > 0"
        class="flex h-9 w-9 items-center justify-center rounded-full transition-colors"
        :class="trophyBgClass"
      >
        <FontAwesomeIcon icon="trophy" class="text-lg text-yellow-400" />
      </div>
      <TeamScore :color="color" />
    </template>
  </div>
</template>
