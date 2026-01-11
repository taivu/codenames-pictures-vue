<script setup lang="ts">
/**
 * RestoreGameModal - Prompts user to restore a saved game or start fresh.
 * Shows a preview of the saved game board and team scores.
 */
import type { GameMode, TeamColor, Card, Team } from '@/types'
import { computed } from 'vue'
import { BaseModal, IconButton } from '@/components/ui'
import { getCardImagePath, cardOverlayClasses, teamTextClasses } from '@/utils'

interface SavedGameData {
  mode: GameMode
  cards: Card[]
  teams: Record<TeamColor, Team>
  startingTeam: TeamColor | null
}

interface Props {
  savedGame: SavedGameData
}

const props = defineProps<Props>()

defineEmits<{
  restore: []
  freshStart: []
}>()

const teamColors = computed((): TeamColor[] => {
  return props.savedGame.mode === 'duet' ? ['green'] : ['red', 'blue']
})
</script>

<template>
  <BaseModal title="Saved Game Found" icon="floppy-disk" @close="$emit('restore')">
    <p class="mb-4 text-gray-600">
      A previously saved game was found. Would you like to continue where you left off?
    </p>

    <!-- Team Preview -->
    <div class="mb-4 grid gap-2 sm:grid-cols-2">
      <div
        v-for="color in teamColors"
        :key="color"
        class="flex items-center justify-between gap-3 rounded-lg bg-gray-50 p-3 sm:flex-col sm:items-start sm:justify-start sm:gap-1"
      >
        <div class="shrink-0 sm:contents">
          <div :class="['font-bold whitespace-nowrap capitalize', teamTextClasses[color]]">
            <FontAwesomeIcon
              v-if="savedGame.startingTeam === color"
              icon="star"
              class="mr-1 text-xs text-yellow-500"
            />
            {{ color }} Team
          </div>
          <div class="text-sm whitespace-nowrap text-gray-600">
            Score: <span class="font-bold">{{ savedGame.teams[color].score }}</span>
          </div>
        </div>
        <div class="text-right text-sm text-gray-500 sm:text-left">
          <template v-if="savedGame.teams[color].players.length > 0">
            {{ savedGame.teams[color].players.join(', ') }}
          </template>
          <template v-else> No players </template>
        </div>
      </div>
    </div>

    <!-- Board Preview -->
    <div class="mb-6 grid grid-cols-5 gap-1 rounded-lg bg-gray-100 p-2">
      <div
        v-for="card in savedGame.cards"
        :key="card.id"
        class="relative aspect-square overflow-hidden rounded"
      >
        <img
          :src="getCardImagePath(card)"
          :alt="`Card ${card.id + 1}`"
          class="h-full w-full object-cover"
        />
        <div v-if="card.color" class="absolute inset-0" :class="cardOverlayClasses[card.color]" />
      </div>
    </div>

    <div class="flex justify-end gap-3">
      <IconButton
        icon="rotate-right"
        variant="ghost"
        label="Start Fresh"
        @click="$emit('freshStart')"
      >
        Start Fresh
      </IconButton>
      <IconButton icon="play" color="green" label="Continue" @click="$emit('restore')">
        Continue
      </IconButton>
    </div>
  </BaseModal>
</template>
