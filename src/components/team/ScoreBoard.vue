<script setup lang="ts">
import { ref, computed } from 'vue'
import { useGameStore } from '@/stores'
import TeamScore from './TeamScore.vue'

const store = useGameStore()
const expanded = ref(false)

const shouldShow = computed(() => store.teamsAreSetup && !store.isDuetMode)
</script>

<template>
  <div
    v-if="shouldShow"
    class="fixed top-0 left-1/2 -translate-x-1/2 z-40 bg-board border-2 border-black border-t-0 rounded-b-lg px-6 py-2 transition-all duration-200"
    :class="expanded ? 'pb-4' : 'pb-2'"
    @mouseenter="expanded = true"
    @mouseleave="expanded = false"
  >
    <div
      class="flex gap-8 justify-center overflow-hidden transition-all duration-200"
      :class="expanded ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'"
    >
      <TeamScore
        v-for="color in store.activeTeamColors"
        :key="color"
        :color="color"
      />
    </div>

    <div class="text-center text-sm text-gray-600 mt-1">
      <span :class="expanded ? 'rotate-180 inline-block' : ''">&#9660;</span>
    </div>
  </div>
</template>
