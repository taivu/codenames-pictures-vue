<script setup lang="ts">
import { ref } from 'vue'
import type { TeamColor } from '@/types'
import { useGameStore } from '@/stores'
import { BaseButton } from '@/components/ui'

interface Props {
  color: TeamColor
}

const props = defineProps<Props>()

const store = useGameStore()
const newPlayer = ref('')

const textColorClass: Record<TeamColor, string> = {
  red: 'text-red-500',
  blue: 'text-blue-500',
  green: 'text-green-500',
}

const bgColorClass: Record<TeamColor, string> = {
  red: 'bg-red-500',
  blue: 'bg-blue-500',
  green: 'bg-green-500',
}

function handleSubmit(): void {
  if (!newPlayer.value.trim()) return
  store.addPlayer(props.color, newPlayer.value)
  newPlayer.value = ''
}

function handleUpdatePlayer(index: number, value: string): void {
  store.updatePlayer(props.color, index, value)
}

function handleRemovePlayer(index: number): void {
  store.removePlayer(props.color, index)
}

function handleSetStartingTeam(): void {
  store.setStartingTeam(props.color)
}
</script>

<template>
  <div class="space-y-4">
    <h3
      class="text-xl font-bold flex items-center gap-2 cursor-pointer"
      :class="textColorClass[color]"
      @click="handleSetStartingTeam"
    >
      Team {{ color }}
      <button
        type="button"
        class="w-4 h-4 rounded-full border-2 border-current"
        :class="store.startingTeam === color ? bgColorClass[color] : ''"
      />
    </h3>

    <form @submit.prevent="handleSubmit">
      <div class="space-y-2">
        <div
          v-for="(player, index) in store.teams[color].players"
          :key="index"
          class="flex gap-2"
        >
          <input
            :value="player"
            class="input flex-1"
            @input="handleUpdatePlayer(index, ($event.target as HTMLInputElement).value)"
          />
          <button
            type="button"
            class="w-8 h-8 flex items-center justify-center bg-red-100 hover:bg-red-200 rounded text-red-600 font-bold"
            @click="handleRemovePlayer(index)"
          >
            &times;
          </button>
        </div>
      </div>

      <div class="flex gap-2 mt-3">
        <input
          v-model="newPlayer"
          class="input flex-1"
          placeholder="Player name"
        />
        <BaseButton type="submit">
          Add player
        </BaseButton>
      </div>
    </form>
  </div>
</template>
