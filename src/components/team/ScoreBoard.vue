<script setup lang="ts">
import { computed } from 'vue'
import { useGameStore } from '@/stores'
import TeamScore from './TeamScore.vue'

const store = useGameStore()

const shouldShow = computed(() => store.teamsAreSetup && !store.isDuetMode)
</script>

<template>
  <div v-if="shouldShow">
    <h3 class="text-center text-sm font-bold text-gray-600 mb-1">Scores</h3>
    <div class="flex gap-2 md:gap-4 justify-center">
      <TeamScore
        v-for="color in store.activeTeamColors"
        :key="color"
        :color="color"
      />
    </div>
  </div>
</template>
