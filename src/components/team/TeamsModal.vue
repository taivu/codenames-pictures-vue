<script setup lang="ts">
import { useGameStore } from '@/stores'
import { BaseModal, BaseButton } from '@/components/ui'
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

    <div v-if="!store.isDuetMode" class="flex gap-4 justify-center mt-6">
      <BaseButton variant="blue" @click="handleShuffleTeams">
        Shuffle teams
      </BaseButton>
      <BaseButton @click="handlePickSpyMasters">
        Pick spy masters
      </BaseButton>
    </div>
  </BaseModal>
</template>
