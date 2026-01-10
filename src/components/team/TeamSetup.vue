<script setup lang="ts">
import { ref } from 'vue'
import type { TeamColor } from '@/types'
import { useGameStore } from '@/stores'
import { useTeamColors } from '@/composables'
import { trackPlayerAdded, trackStartingTeamSet } from '@/plugins/analytics'

interface Props {
  color: TeamColor
}

const props = defineProps<Props>()

const store = useGameStore()
const { teamTextClasses, teamBgClasses } = useTeamColors()
const newPlayer = ref('')
const newPlayerInput = ref<HTMLInputElement | null>(null)

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
        :class="
          store.startingTeam === color
            ? [teamBgClasses[color], 'text-white shadow-sm']
            : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
        "
        @click="handleSetStartingTeam"
      >
        <FontAwesomeIcon
          icon="star"
          :class="['mr-1', store.startingTeam === color ? 'text-yellow-300' : 'text-gray-400']"
        />
        {{ store.startingTeam === color ? 'Starting' : 'Set starting' }}
      </button>
    </div>

    <form @submit.prevent="handleSubmit">
      <div class="space-y-2">
        <div v-for="(player, index) in store.teams[color].players" :key="index" class="flex gap-2">
          <input
            :value="player"
            class="min-w-0 flex-1 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm transition-shadow focus:border-transparent focus:ring-2 focus:ring-green-500 focus:outline-none"
            @input="handleUpdatePlayer(index, $event)"
          />
          <button
            type="button"
            class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-400 transition-colors hover:border-red-200 hover:bg-red-50 hover:text-red-500 [@media(hover:none)]:border-red-200 [@media(hover:none)]:bg-red-50 [@media(hover:none)]:text-red-500"
            @click="handleRemovePlayer(index)"
          >
            <FontAwesomeIcon icon="xmark" />
          </button>
        </div>
      </div>

      <div class="mt-3 flex gap-2">
        <input
          ref="newPlayerInput"
          v-model="newPlayer"
          class="min-w-0 flex-1 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm placeholder-gray-400 transition-shadow focus:border-transparent focus:ring-2 focus:ring-green-500 focus:outline-none"
          placeholder="Add player..."
        />
        <button
          type="submit"
          class="flex shrink-0 items-center gap-1.5 rounded-lg bg-green-100 px-4 py-2 text-sm font-medium text-green-600 transition-colors hover:bg-green-500 hover:text-white"
        >
          <FontAwesomeIcon icon="plus" /> Add
        </button>
      </div>
    </form>
  </div>
</template>
