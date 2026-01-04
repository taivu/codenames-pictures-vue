<script setup lang="ts">
import { useGameStore } from '@/stores'
import { BaseModal } from '@/components/ui'
import TeamSetup from './TeamSetup.vue'

const emit = defineEmits<{
  close: []
}>()

const store = useGameStore()

function handleClose(): void {
  emit('close')
}

function handleShuffleTeams(): void {
  store.shuffleTeams()
}

function handlePickSpyMasters(): void {
  store.pickSpyMasters()
}
</script>

<template>
  <BaseModal
    :title="`Setup your ${store.isDuetMode ? 'team' : 'teams'}`"
    @close="handleClose"
  >
    <template v-if="!store.isDuetMode" #header-actions>
      <div class="inline-flex">
        <button
          class="w-10 h-10 flex items-center justify-center font-bold border-2 border-black rounded-l bg-green-500 text-white hover:opacity-80"
          title="Shuffle teams"
          @click="handleShuffleTeams"
        >
          <FontAwesomeIcon icon="shuffle" class="text-lg" />
        </button>
        <button
          class="w-10 h-10 flex items-center justify-center font-bold border-2 border-l-0 border-black rounded-r bg-blue-500 text-white hover:opacity-80"
          title="Pick spy masters"
          @click="handlePickSpyMasters"
        >
          <FontAwesomeIcon icon="user-secret" class="text-lg" />
        </button>
      </div>
    </template>

    <div
      class="grid gap-6"
      :class="store.isDuetMode ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2'"
    >
      <TeamSetup
        v-for="color in store.activeTeamColors"
        :key="color"
        :color="color"
      />
    </div>

    <div v-if="!store.isDuetMode" class="flex justify-center mt-6">
      <div class="inline-flex">
        <button
          class="px-3 py-2 flex items-center justify-center font-bold border-2 border-black rounded-l bg-green-500 text-white hover:opacity-80"
          title="Shuffle teams"
          @click="handleShuffleTeams"
        >
          <FontAwesomeIcon icon="shuffle" />
          <span class="hidden sm:inline ml-2">Shuffle teams</span>
        </button>
        <button
          class="px-3 py-2 flex items-center justify-center font-bold border-2 border-l-0 border-black rounded-r bg-blue-500 text-white hover:opacity-80"
          title="Randomize spy masters"
          @click="handlePickSpyMasters"
        >
          <FontAwesomeIcon icon="user-secret" />
          <span class="hidden sm:inline ml-2">Randomize spy masters</span>
        </button>
      </div>
    </div>
  </BaseModal>
</template>
