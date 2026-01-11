<script setup lang="ts">
/**
 * StrikeModal - Strike notification shown when timer expires in pressure mode.
 */
import { ref, onMounted } from 'vue'
import { pressureModeConfig } from '@/config'

interface Props {
  strikeNumber: number
  nextDuration: string
}

defineProps<Props>()

const emit = defineEmits<{
  acknowledge: []
}>()

const canContinue = ref(false)

// Force user to wait before continuing
onMounted(() => {
  setTimeout(() => {
    canContinue.value = true
  }, pressureModeConfig.strikeModalDelay)
})
</script>

<template>
  <Teleport to="body">
    <div class="fixed inset-0 z-50 flex items-center justify-center p-4">
      <!-- Backdrop -->
      <div class="absolute inset-0 bg-black/80 backdrop-blur-sm" />

      <!-- Modal -->
      <div class="animate-shake relative">
        <div
          class="max-w-sm rounded-2xl border border-red-700 bg-gradient-to-b from-red-900 to-gray-900 p-8 text-center shadow-2xl"
        >
          <!-- Strike Icons -->
          <div class="mb-4 flex justify-center gap-3">
            <FontAwesomeIcon
              v-for="i in pressureModeConfig.maxStrikes"
              :key="i"
              icon="skull-crossbones"
              :class="['text-5xl', i <= strikeNumber ? 'text-white' : 'text-white/25']"
            />
          </div>

          <!-- Strike Number -->
          <h1 class="mb-2 text-5xl font-black tracking-wider text-white">
            STRIKE {{ strikeNumber }}
          </h1>

          <!-- Shame Message -->
          <p class="mb-6 text-lg text-red-300">
            {{ pressureModeConfig.strikeMessages[strikeNumber - 1] }}
          </p>

          <!-- Next Round Info -->
          <div class="mb-6 rounded-lg bg-black/30 p-3">
            <p class="text-sm text-gray-400">Next round</p>
            <p class="text-xl font-bold text-white">{{ nextDuration }}</p>
          </div>

          <!-- Continue Button -->
          <button
            :disabled="!canContinue"
            :class="[
              'w-full rounded-lg px-6 py-3 text-lg font-bold transition-all',
              canContinue
                ? 'cursor-pointer bg-red-600 text-white hover:bg-red-500'
                : 'cursor-not-allowed bg-gray-700 text-gray-500',
            ]"
            @click="canContinue && emit('acknowledge')"
          >
            <template v-if="canContinue"> Continue </template>
            <template v-else>
              <FontAwesomeIcon icon="spinner" class="mr-2 animate-spin" />
              Wait...
            </template>
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
@keyframes shake {
  0%,
  100% {
    transform: translateX(0);
  }
  10%,
  30%,
  50%,
  70%,
  90% {
    transform: translateX(-5px);
  }
  20%,
  40%,
  60%,
  80% {
    transform: translateX(5px);
  }
}

.animate-shake {
  animation: shake 0.5s ease-in-out;
}
</style>
