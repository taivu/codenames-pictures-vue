<script setup lang="ts">
/**
 * TeamsModal - Full team setup dialog with player management and randomization.
 */
import { useGameStore } from '@/stores'
import { BaseModal, BaseButton } from '@/components/ui'
import TeamSetup from './TeamSetup.vue'
import { trackTeamsShuffled, trackSpymastersPicked } from '@/plugins/analytics'

const emit = defineEmits<{
  close: []
}>()

const store = useGameStore()

function handleClose(): void {
  emit('close')
}

function handleShuffleTeams(): void {
  store.shuffleTeams()
  const teams = Object.fromEntries(
    store.activeTeamColors.map((color) => [color, store.teams[color].players])
  )
  trackTeamsShuffled(teams)
}

function handlePickSpyMasters(): void {
  store.pickSpyMasters()
  trackSpymastersPicked()
}
</script>

<template>
  <BaseModal size="lg" @close="handleClose">
    <template #header="{ close }">
      <div class="flex flex-wrap-reverse items-center gap-2">
        <!-- Icon + Title -->
        <h3 class="flex items-center gap-2 text-xl font-bold text-gray-800">
          <FontAwesomeIcon icon="users" class="text-gray-500" />
          <span>Setup your {{ store.isDuetMode ? 'team' : 'teams' }}</span>
        </h3>
        <!-- Action buttons -->
        <div v-if="!store.isDuetMode" class="flex items-center gap-1">
          <button
            class="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100 text-gray-600 transition-colors hover:bg-amber-100 hover:text-amber-600 [@media(hover:none)]:bg-amber-100 [@media(hover:none)]:text-amber-600"
            title="Shuffle teams"
            @click="handleShuffleTeams"
          >
            <FontAwesomeIcon icon="shuffle" />
          </button>
          <button
            class="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100 text-gray-600 transition-colors hover:bg-blue-100 hover:text-blue-600 [@media(hover:none)]:bg-blue-100 [@media(hover:none)]:text-blue-600"
            title="Pick spy masters"
            @click="handlePickSpyMasters"
          >
            <FontAwesomeIcon icon="user-secret" />
          </button>
        </div>
        <!-- Close button (far right) -->
        <button
          class="ml-auto flex h-9 w-9 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
          title="Close"
          @click="close"
        >
          <FontAwesomeIcon icon="xmark" class="text-lg" />
        </button>
      </div>
    </template>

    <div
      class="grid gap-6"
      :class="store.isDuetMode ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2'"
    >
      <TeamSetup v-for="color in store.activeTeamColors" :key="color" :color="color" />
    </div>

    <div
      class="mt-6 flex border-t border-gray-100 pt-4"
      :class="store.isDuetMode ? 'justify-center' : 'justify-between'"
    >
      <div v-if="!store.isDuetMode" class="flex gap-2">
        <button
          class="flex items-center gap-2 rounded-lg bg-amber-500 px-3 py-2.5 font-medium text-white transition-colors sm:bg-amber-100 sm:text-amber-600 sm:hover:bg-amber-500 sm:hover:text-white"
          title="Shuffle teams"
          @click="handleShuffleTeams"
        >
          <FontAwesomeIcon icon="shuffle" />
          <span class="hidden sm:inline">Shuffle teams</span>
        </button>
        <button
          class="flex items-center gap-2 rounded-lg bg-blue-500 px-3 py-2.5 font-medium text-white transition-colors sm:bg-blue-100 sm:text-blue-600 sm:hover:bg-blue-500 sm:hover:text-white"
          title="Randomize spy masters"
          @click="handlePickSpyMasters"
        >
          <FontAwesomeIcon icon="user-secret" />
          <span class="hidden sm:inline">Pick spymasters</span>
        </button>
      </div>
      <BaseButton variant="green" title="Play" @click="handleClose">
        <FontAwesomeIcon icon="play" />
        <span>Play</span>
      </BaseButton>
    </div>
  </BaseModal>
</template>
