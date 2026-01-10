<script setup lang="ts">
import { computed } from 'vue'
import { useGameStore } from '@/stores'
import TeamScore from './TeamScore.vue'

const store = useGameStore()

const shouldShow = computed(() => store.teamsAreSetup && !store.isDuetMode)
</script>

<template>
  <div v-if="shouldShow" class="flex items-center justify-center gap-4">
    <template v-for="(color, index) in store.activeTeamColors" :key="color">
      <FontAwesomeIcon v-if="index > 0" icon="trophy" class="text-lg text-yellow-500" />
      <TeamScore :color="color" />
    </template>
  </div>
</template>
