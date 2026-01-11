<script setup lang="ts">
/**
 * TeamsModal - Full team setup dialog with player management and randomization.
 */
import { useGameStore } from '@/stores'
import { BaseModal, BaseButton, IconButton } from '@/components/ui'
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
          <IconButton
            icon="shuffle"
            color="amber"
            size="sm"
            variant="secondary"
            label="Shuffle teams"
            @click="handleShuffleTeams"
          />
          <IconButton
            icon="user-secret"
            color="blue"
            size="sm"
            variant="secondary"
            label="Pick spy masters"
            @click="handlePickSpyMasters"
          />
        </div>
        <!-- Close button (far right) -->
        <IconButton
          icon="xmark"
          size="sm"
          variant="ghost"
          label="Close"
          class="ml-auto"
          @click="close"
        />
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
        <IconButton icon="shuffle" color="amber" variant="secondary" size="sm" @click="handleShuffleTeams">
          Shuffle teams
        </IconButton>
        <IconButton icon="user-secret" color="blue" variant="secondary" size="sm" @click="handlePickSpyMasters">
          Pick spymasters
        </IconButton>
      </div>
      <BaseButton color="green" title="Play" @click="handleClose">
        <FontAwesomeIcon icon="play" />
        <span>Play</span>
      </BaseButton>
    </div>
  </BaseModal>
</template>
