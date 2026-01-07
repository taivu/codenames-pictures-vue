<script setup lang="ts">
import { useGameStore } from '@/stores'
import { BaseModal } from '@/components/ui'
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
  <BaseModal
    :title="`Setup your ${store.isDuetMode ? 'team' : 'teams'}`"
    icon="users"
    size="lg"
    @close="handleClose"
  >
    <template v-if="!store.isDuetMode" #header-actions>
      <div class="flex gap-1">
        <button
          class="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100 text-gray-600 transition-colors hover:bg-green-100 hover:text-green-600 [@media(hover:none)]:bg-green-100 [@media(hover:none)]:text-green-600"
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
    </template>

    <div
      class="grid gap-6"
      :class="store.isDuetMode ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2'"
    >
      <TeamSetup v-for="color in store.activeTeamColors" :key="color" :color="color" />
    </div>

    <div v-if="!store.isDuetMode" class="mt-6 flex justify-center border-t border-gray-100 pt-4">
      <div class="flex gap-2">
        <button
          class="flex items-center gap-2 rounded-lg bg-green-500 px-4 py-2.5 font-medium text-white shadow-sm transition-colors hover:bg-green-600"
          title="Shuffle teams"
          @click="handleShuffleTeams"
        >
          <FontAwesomeIcon icon="shuffle" />
          <span class="hidden sm:inline">Shuffle teams</span>
        </button>
        <button
          class="flex items-center gap-2 rounded-lg bg-blue-500 px-4 py-2.5 font-medium text-white shadow-sm transition-colors hover:bg-blue-600"
          title="Randomize spy masters"
          @click="handlePickSpyMasters"
        >
          <FontAwesomeIcon icon="user-secret" />
          <span class="hidden sm:inline">Pick spymasters</span>
        </button>
      </div>
    </div>
  </BaseModal>
</template>
