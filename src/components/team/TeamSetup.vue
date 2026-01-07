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
  <div class="p-4 rounded-xl bg-gray-50 overflow-hidden">
    <div class="flex flex-wrap items-center justify-between gap-2 mb-4">
      <h3
        class="text-lg font-bold whitespace-nowrap"
        :class="teamTextClasses[color]"
      >
        Team {{ color }}
      </h3>

      <button
        type="button"
        class="text-xs px-3 py-1.5 rounded-lg transition-all"
        :class="store.startingTeam === color
          ? [teamBgClasses[color], 'text-white shadow-sm']
          : 'bg-gray-200 text-gray-600 hover:bg-gray-300'"
        @click="handleSetStartingTeam"
      >
        <FontAwesomeIcon icon="star" :class="['mr-1', store.startingTeam === color ? 'text-yellow-300' : 'text-gray-400']" />
        {{ store.startingTeam === color ? 'Starting' : 'Set starting' }}
      </button>
    </div>

    <form @submit.prevent="handleSubmit">
      <div class="space-y-2">
        <div
          v-for="(player, index) in store.teams[color].players"
          :key="index"
          class="flex gap-2"
        >
          <input
            :value="player"
            class="flex-1 min-w-0 px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-shadow"
            @input="handleUpdatePlayer(index, $event)"
          />
          <button
            type="button"
            class="w-9 h-9 shrink-0 flex items-center justify-center bg-white border border-gray-200 hover:bg-red-50 hover:border-red-200 hover:text-red-500 rounded-lg text-gray-400 transition-colors"
            @click="handleRemovePlayer(index)"
          >
            <FontAwesomeIcon icon="xmark" />
          </button>
        </div>
      </div>

      <div class="flex gap-2 mt-3">
        <input
          ref="newPlayerInput"
          v-model="newPlayer"
          class="flex-1 min-w-0 px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-shadow"
          placeholder="Add player..."
        />
        <button
          type="submit"
          class="px-4 py-2 shrink-0 flex items-center gap-1.5 bg-green-500 hover:bg-green-600 rounded-lg text-white text-sm font-medium shadow-sm transition-colors"
        >
          <FontAwesomeIcon icon="plus" /> Add
        </button>
      </div>
    </form>
  </div>
</template>
