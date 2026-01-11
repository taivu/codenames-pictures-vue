<script setup lang="ts">
/**
 * TeamSetup - Player input and starting team selection for a single team.
 */
import { ref, computed } from 'vue'
import type { TeamColor } from '@/types'
import { useGameStore } from '@/stores'
import { useTeamColors } from '@/composables'
import { trackPlayerAdded, trackStartingTeamSet } from '@/plugins/analytics'
import { BaseButton, IconButton } from '@/components/ui'

interface Props {
  color: TeamColor
}

const props = defineProps<Props>()

const store = useGameStore()
const { teamTextClasses, teamBgClasses } = useTeamColors()

// ===================
// State
// ===================

const newPlayer = ref('')
const newPlayerInput = ref<HTMLInputElement | null>(null)

// ===================
// Computed
// ===================

const isStartingTeam = computed(() => store.startingTeam === props.color)
const players = computed(() => store.teams[props.color].players)

const startingButtonClasses = computed(() =>
  isStartingTeam.value
    ? [teamBgClasses[props.color], 'text-white shadow-sm']
    : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
)

// ===================
// Handlers
// ===================

function handleSubmit(): void {
  const name = newPlayer.value.trim()
  if (!name) return

  store.addPlayer(props.color, name)
  trackPlayerAdded(props.color, name)
  newPlayer.value = ''
  newPlayerInput.value?.focus()
}

function handleUpdatePlayer(index: number, event: Event): void {
  const target = event.target
  if (target instanceof HTMLInputElement) {
    store.updatePlayer(props.color, index, target.value)
  }
}

function handleRemovePlayer(index: number): void {
  store.removePlayer(props.color, index)
}

function handleSetStartingTeam(): void {
  store.setStartingTeam(props.color)
  trackStartingTeamSet(props.color)
}
</script>

<template>
  <div class="overflow-hidden rounded-xl bg-gray-50 p-4">
    <div class="mb-4 flex flex-wrap items-center justify-between gap-2">
      <h3 class="text-lg font-bold capitalize whitespace-nowrap" :class="teamTextClasses[color]">
        {{ color }} Team
      </h3>

      <button
        type="button"
        class="rounded-lg px-3 py-1.5 text-xs transition-all"
        :class="startingButtonClasses"
        @click="handleSetStartingTeam"
      >
        <FontAwesomeIcon
          icon="star"
          :class="['mr-1', isStartingTeam ? 'text-yellow-300' : 'text-gray-400']"
        />
        {{ isStartingTeam ? 'Starting' : 'Set starting' }}
      </button>
    </div>

    <form @submit.prevent="handleSubmit">
      <div class="space-y-2">
        <div v-for="(player, index) in players" :key="index" class="flex gap-2">
          <input
            :value="player"
            class="min-w-0 flex-1 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm transition-shadow focus:border-transparent focus:ring-2 focus:ring-green-500 focus:outline-none"
            @input="handleUpdatePlayer(index, $event)"
          />
          <IconButton
            icon="trash"
            color="red"
            variant="ghost"
            size="sm"
            label="Remove player"
            touch-hover
            @click="handleRemovePlayer(index)"
          />
        </div>
      </div>

      <div class="mt-3 flex gap-2">
        <input
          ref="newPlayerInput"
          v-model="newPlayer"
          class="min-w-0 flex-1 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm placeholder-gray-400 transition-shadow focus:border-transparent focus:ring-2 focus:ring-green-500 focus:outline-none"
          placeholder="Add player..."
        />
        <BaseButton type="submit" color="green" variant="secondary" size="sm">
          <FontAwesomeIcon icon="plus" /> Add
        </BaseButton>
      </div>
    </form>
  </div>
</template>
