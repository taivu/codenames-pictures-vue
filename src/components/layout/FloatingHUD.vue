<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useGameStore } from '@/stores'
import { useTeamColors } from '@/composables'
import { trackStartingTeamSet } from '@/plugins/analytics'

const store = useGameStore()
const { teamBgClasses, teamTextClasses } = useTeamColors()

const isExpanded = ref(false)
let autoCollapseTimer: ReturnType<typeof setTimeout> | null = null

const hasAnyPlayers = computed(() =>
  store.activeTeamColors.some(color => store.teams[color].players.length > 0)
)

function toggleExpanded() {
  isExpanded.value = !isExpanded.value
  resetAutoCollapse()
}

function resetAutoCollapse() {
  if (autoCollapseTimer) {
    clearTimeout(autoCollapseTimer)
  }
  if (isExpanded.value) {
    autoCollapseTimer = setTimeout(() => {
      isExpanded.value = false
    }, 5000)
  }
}

function handleSetStartingTeam(color: string) {
  if (!store.isDuetMode) {
    store.setStartingTeam(color as 'red' | 'blue' | 'green')
    trackStartingTeamSet(color as 'red' | 'blue' | 'green')
  }
}

// Cleanup timer on unmount
watch(() => isExpanded.value, () => {
  resetAutoCollapse()
})
</script>

<template>
  <div
    class="select-none"
    @click="toggleExpanded"
  >
    <!-- Collapsed View: Compact score badges -->
    <Transition name="hud" mode="out-in">
      <div
        v-if="!isExpanded"
        class="flex portrait:flex-row landscape:flex-col xl:flex-row gap-1.5 cursor-pointer"
      >
        <div
          v-for="color in store.activeTeamColors"
          :key="color"
          :class="[
            'flex items-center gap-1 px-2 py-1 rounded-lg',
            'text-white font-bold text-sm shadow-lg',
            'backdrop-blur-md',
            teamBgClasses[color]
          ]"
        >
          <FontAwesomeIcon
            v-if="store.startingTeam === color"
            icon="star"
            class="text-yellow-300 text-xs"
          />
          <span class="uppercase text-xs opacity-80">{{ color.slice(0, 3) }}</span>
          <span>{{ store.getGuessedCount(color) }}<template v-if="store.startingTeam || store.isDuetMode">/{{ store.getTotalCards(color) }}</template></span>
        </div>
      </div>

      <!-- Expanded View: Full team info -->
      <div
        v-else
        class="bg-white/90 backdrop-blur-md rounded-xl shadow-xl border border-gray-200 overflow-hidden cursor-pointer min-w-[200px] max-w-[280px]"
      >
        <div
          v-for="(color, index) in store.activeTeamColors"
          :key="color"
          :class="[
            'p-3',
            index > 0 && 'border-t border-gray-200'
          ]"
        >
          <!-- Team Header -->
          <div class="flex items-center justify-between gap-2 mb-1">
            <h4
              class="font-bold flex items-center gap-1"
              :class="teamTextClasses[color]"
            >
              <FontAwesomeIcon
                v-if="store.startingTeam === color"
                icon="star"
                class="text-yellow-500 text-xs"
              />
              Team {{ color }}
            </h4>
            <button
              :class="[
                'px-2 py-0.5 rounded text-white text-xs font-bold',
                'hover:opacity-80 transition-opacity',
                teamBgClasses[color]
              ]"
              :title="!store.isDuetMode ? 'Click to set as starting team' : ''"
              @click.stop="handleSetStartingTeam(color)"
            >
              {{ store.getGuessedCount(color) }}/{{ store.getTotalCards(color) }}
            </button>
          </div>

          <!-- Players List -->
          <ul
            v-if="store.teams[color].players.length > 0"
            class="text-xs space-y-0.5"
          >
            <li
              v-for="(player, playerIndex) in store.teams[color].players"
              :key="playerIndex"
              class="truncate"
              :class="[
                playerIndex === 0 && !store.isDuetMode
                  ? ['font-bold', teamTextClasses[color]]
                  : 'text-gray-600'
              ]"
            >
              <template v-if="playerIndex === 0 && !store.isDuetMode">&gt; </template>
              {{ player }}
            </li>
          </ul>
          <p
            v-else
            class="text-xs text-gray-400 italic"
          >
            No players yet
          </p>
        </div>

        <!-- Tap to collapse hint -->
        <div class="px-3 py-1 bg-gray-100 text-center">
          <span class="text-xs text-gray-400">tap to collapse</span>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.hud-enter-active,
.hud-leave-active {
  transition: all 0.2s ease;
}

.hud-enter-from,
.hud-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>
