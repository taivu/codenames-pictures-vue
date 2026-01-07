<script setup lang="ts">
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
      <div class="relative animate-shake">
        <div class="bg-gradient-to-b from-red-900 to-gray-900 rounded-2xl p-8 text-center max-w-sm shadow-2xl border border-red-700">
          <!-- Strike Icons -->
          <div class="mb-4 flex justify-center gap-3">
            <FontAwesomeIcon
              v-for="i in pressureModeConfig.maxStrikes"
              :key="i"
              icon="skull-crossbones"
              :class="[
                'text-5xl',
                i <= strikeNumber ? 'text-white' : 'text-white/25'
              ]"
            />
          </div>

          <!-- Strike Number -->
          <h1 class="text-5xl font-black text-white mb-2 tracking-wider">
            STRIKE {{ strikeNumber }}
          </h1>

          <!-- Shame Message -->
          <p class="text-red-300 text-lg mb-6">
            {{ pressureModeConfig.strikeMessages[strikeNumber - 1] }}
          </p>

          <!-- Next Round Info -->
          <div class="bg-black/30 rounded-lg p-3 mb-6">
            <p class="text-gray-400 text-sm">Next round</p>
            <p class="text-white font-bold text-xl">{{ nextDuration }}</p>
          </div>

          <!-- Continue Button -->
          <button
            :disabled="!canContinue"
            :class="[
              'w-full py-3 px-6 rounded-lg font-bold text-lg transition-all',
              canContinue
                ? 'bg-red-600 hover:bg-red-500 text-white cursor-pointer'
                : 'bg-gray-700 text-gray-500 cursor-not-allowed'
            ]"
            @click="canContinue && emit('acknowledge')"
          >
            <template v-if="canContinue">
              Continue
            </template>
            <template v-else>
              <FontAwesomeIcon icon="spinner" class="animate-spin mr-2" />
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
  0%, 100% { transform: translateX(0); }
  10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
  20%, 40%, 60%, 80% { transform: translateX(5px); }
}

.animate-shake {
  animation: shake 0.5s ease-in-out;
}
</style>
