<script setup lang="ts">
import { computed } from 'vue'
import { useGameStore } from '@/stores'
import TeamScore from './TeamScore.vue'

const store = useGameStore()

const shouldShow = computed(() => store.teamsAreSetup && !store.isDuetMode)
</script>

<template>
  <div v-if="shouldShow" class="flex justify-center gap-3">
    <TeamScore v-for="color in store.activeTeamColors" :key="color" :color="color" />
  </div>
</template>
