<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { useGameStore } from '@/stores'
import CardGrid from './CardGrid.vue'
import { ScoreBoard, TeamSummary, TeamsModal } from '@/components/team'
import { BaseMenu } from '@/components/ui'

const store = useGameStore()
const showTeamsModal = ref(false)

function toggleTeamsModal(): void {
  showTeamsModal.value = !showTeamsModal.value
}

function handleNewGame(event: Event): void {
  event.preventDefault()
  store.newGame()
}
</script>

<template>
  <div class="min-h-screen">
    <ScoreBoard />

    <TeamsModal v-if="showTeamsModal" @close="toggleTeamsModal" />

    <div class="container mx-auto p-4">
      <div class="flex flex-col lg:flex-row gap-6">
        <!-- Card Grid -->
        <div class="flex-1 flex justify-center">
          <CardGrid />
        </div>

        <!-- Sidebar -->
        <div class="w-full lg:w-auto lg:min-w-36 flex flex-col gap-4">
          <!-- Team Summaries -->
          <div class="space-y-4">
            <TeamSummary
              v-for="color in store.activeTeamColors"
              :key="color"
              :color="color"
            />
          </div>

          <!-- Spacer to push menu to bottom -->
          <div class="flex-1 hidden lg:block"></div>

          <!-- Menu -->
          <BaseMenu>
            <RouterLink
              to="#"
              class="block px-4 py-2 hover:bg-green-100 border-b border-green-600"
              @click.prevent="toggleTeamsModal"
            >
              Teams
            </RouterLink>
            <RouterLink
              to="/spy-master"
              target="_blank"
              class="block px-4 py-2 hover:bg-green-100 border-b border-green-600"
            >
              Spy Master
            </RouterLink>
            <RouterLink
              to="#"
              class="block px-4 py-2 hover:bg-green-100 border-b border-green-600"
              @click.prevent="handleNewGame"
            >
              New Game
            </RouterLink>
            <RouterLink
              to="/"
              target="_blank"
              class="block px-4 py-2 hover:bg-green-100"
            >
              Rules
            </RouterLink>
          </BaseMenu>
        </div>
      </div>
    </div>
  </div>
</template>
