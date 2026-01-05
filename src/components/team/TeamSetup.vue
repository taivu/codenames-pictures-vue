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
const { teamTextClasses, teamBgClasses, teamBorderClasses } = useTeamColors()
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

function handleUpdatePlayer(index: number, value: string): void {
  store.updatePlayer(props.color, index, value)
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
  <div
    class="p-4 rounded-lg border-2 bg-amber-50 overflow-hidden"
    :class="teamBorderClasses[color]"
  >
    <div class="flex flex-wrap items-center justify-between gap-2 mb-4">
      <h3
        class="text-xl font-bold whitespace-nowrap"
        :class="teamTextClasses[color]"
      >
        Team {{ color }}
      </h3>

      <button
        type="button"
        class="text-sm px-3 py-1 rounded-full border-2 transition-all"
        :class="store.startingTeam === color
          ? [teamBgClasses[color], 'text-white border-current']
          : 'border-gray-300 text-gray-500 hover:border-gray-400'"
        @click="handleSetStartingTeam"
      >
        <FontAwesomeIcon icon="star" :class="['mr-1', store.startingTeam === color ? 'text-yellow-500' : 'text-gray-300']" />
        {{ store.startingTeam === color ? 'Starting team' : 'Set as starting' }}
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
            class="input flex-1 min-w-0"
            @input="handleUpdatePlayer(index, ($event.target as HTMLInputElement).value)"
          />
          <button
            type="button"
            class="w-8 h-8 shrink-0 flex items-center justify-center bg-gray-200 hover:bg-gray-300 rounded text-gray-600"
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
          class="input flex-1 min-w-0"
          placeholder="Player name"
        />
        <button
          type="submit"
          class="px-3 py-2 shrink-0 flex items-center gap-1 bg-gray-200 hover:bg-gray-300 rounded text-gray-700 font-bold"
        >
          <FontAwesomeIcon icon="plus" /> Add
        </button>
      </div>
    </form>
  </div>
</template>
