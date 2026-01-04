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
  <div class="h-screen overflow-hidden p-2 sm:p-4 pb-14 portrait:pb-14 landscape:pb-2 sm:landscape:pb-4">
    <TeamsModal v-if="showTeamsModal" @close="toggleTeamsModal" />

    <!-- Portrait: column layout, Landscape: row layout -->
    <div class="h-full flex flex-col landscape:flex-row gap-2 sm:gap-4">
      <!-- Card Grid - contained, never overflow -->
      <div class="flex-1 min-h-0 min-w-0 flex items-center justify-center">
        <CardGrid />
      </div>

      <!-- Sidebar - scrolls if needed -->
      <div class="flex-1 min-h-0 flex flex-col gap-2 overflow-auto landscape:w-48 landscape:flex-none lg:w-56">
          <!-- Team Setup Prompt -->
          <div
            v-if="!store.teamsAreSetup"
            class="shrink-0 p-2 bg-amber-100 border-2 border-amber-400 rounded-lg text-center"
          >
            <p class="text-xs mb-1">
              No teams yet?
            </p>
            <button
              class="px-2 py-1 bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold rounded"
              @click="toggleTeamsModal"
            >
              Set up teams
            </button>
          </div>

          <!-- Team Summaries -->
          <div class="shrink-0 flex flex-row landscape:flex-col gap-2">
            <TeamSummary
              v-for="color in store.activeTeamColors"
              :key="color"
              :color="color"
              class="flex-1 landscape:flex-none"
            />
          </div>

          <!-- Spacer to push menu/scores to bottom -->
          <div class="flex-1 hidden landscape:block"></div>

          <!-- Scores -->
          <ScoreBoard class="shrink-0" />

          <!-- Menu (in sidebar on landscape) -->
          <BaseMenu class="shrink-0 hidden landscape:block">
            <RouterLink
              to="#"
              class="block px-2 md:px-4 py-1 md:py-2 text-sm md:text-base hover:bg-green-100 border-b border-green-600"
              @click.prevent="toggleTeamsModal"
            >
              Teams
            </RouterLink>
            <RouterLink
              to="/spy-master"
              target="_blank"
              class="flex items-center justify-between px-2 md:px-4 py-1 md:py-2 text-sm md:text-base hover:bg-green-100 border-b border-green-600"
            >
              Spy Master
              <FontAwesomeIcon icon="up-right-from-square" class="text-xs opacity-50" />
            </RouterLink>
            <RouterLink
              to="#"
              class="block px-2 md:px-4 py-1 md:py-2 text-sm md:text-base hover:bg-green-100 border-b border-green-600"
              @click.prevent="handleNewGame"
            >
              New Game
            </RouterLink>
            <RouterLink
              to="/"
              target="_blank"
              class="flex items-center justify-between px-2 md:px-4 py-1 md:py-2 text-sm md:text-base hover:bg-green-100 border-b border-green-600"
            >
              Rules
              <FontAwesomeIcon icon="up-right-from-square" class="text-xs opacity-50" />
            </RouterLink>
            <RouterLink
              to="/about"
              target="_blank"
              class="flex items-center justify-between px-2 md:px-4 py-1 md:py-2 text-sm md:text-base hover:bg-green-100"
            >
              About
              <FontAwesomeIcon icon="up-right-from-square" class="text-xs opacity-50" />
            </RouterLink>
          </BaseMenu>
        </div>
      </div>

    <!-- Fixed menu at bottom (portrait only) -->
    <div class="fixed bottom-2 left-2 right-2 landscape:hidden z-50">
      <BaseMenu>
        <RouterLink
          to="#"
          class="block px-4 py-2 text-sm hover:bg-green-100 border-b border-green-600"
          @click.prevent="toggleTeamsModal"
        >
          Teams
        </RouterLink>
        <RouterLink
          to="/spy-master"
          target="_blank"
          class="flex items-center justify-between px-4 py-2 text-sm hover:bg-green-100 border-b border-green-600"
        >
          Spy Master
          <FontAwesomeIcon icon="up-right-from-square" class="text-xs opacity-50" />
        </RouterLink>
        <RouterLink
          to="#"
          class="block px-4 py-2 text-sm hover:bg-green-100 border-b border-green-600"
          @click.prevent="handleNewGame"
        >
          New Game
        </RouterLink>
        <RouterLink
          to="/"
          target="_blank"
          class="flex items-center justify-between px-4 py-2 text-sm hover:bg-green-100 border-b border-green-600"
        >
          Rules
          <FontAwesomeIcon icon="up-right-from-square" class="text-xs opacity-50" />
        </RouterLink>
        <RouterLink
          to="/about"
          target="_blank"
          class="flex items-center justify-between px-4 py-2 text-sm hover:bg-green-100"
        >
          About
          <FontAwesomeIcon icon="up-right-from-square" class="text-xs opacity-50" />
        </RouterLink>
      </BaseMenu>
    </div>
  </div>
</template>
