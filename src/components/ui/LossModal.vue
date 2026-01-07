<script setup lang="ts">
const emit = defineEmits<{
  newGame: []
  continueAsScrub: []
}>()
</script>

<template>
  <Teleport to="body">
    <div class="fixed inset-0 z-50 flex items-center justify-center p-4">
      <!-- Backdrop -->
      <div class="absolute inset-0 bg-black/90 backdrop-blur-md" />

      <!-- Modal -->
      <div class="animate-fade-in relative">
        <div
          class="max-w-md rounded-2xl border border-gray-700 bg-gradient-to-b from-gray-900 to-black p-10 text-center shadow-2xl"
        >
          <!-- Skull Icons -->
          <div class="mb-6 flex justify-center gap-4">
            <FontAwesomeIcon
              v-for="i in 3"
              :key="i"
              icon="skull-crossbones"
              class="text-5xl text-white"
            />
          </div>

          <!-- Game Over Text -->
          <h1 class="mb-4 animate-pulse text-6xl font-black tracking-wider text-red-500">
            GAME OVER
          </h1>

          <!-- Message -->
          <p class="mb-8 text-xl text-gray-400">Three strikes. Better luck next time.</p>

          <!-- New Game Button -->
          <button
            class="mb-3 w-full rounded-xl bg-gradient-to-r from-green-600 to-emerald-500 px-8 py-4 text-xl font-bold text-white shadow-lg transition-all hover:scale-105 hover:from-green-500 hover:to-emerald-400 hover:shadow-xl"
            @click="emit('newGame')"
          >
            <FontAwesomeIcon icon="rotate-right" class="mr-2" />
            Start New Game
          </button>

          <!-- Continue as Scrub Button -->
          <button
            class="w-full rounded-xl px-6 py-3 text-base font-medium text-gray-400 transition-all hover:bg-white/10 hover:text-white"
            @click="emit('continueAsScrub')"
          >
            Continue like a scrub
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
@keyframes fade-in {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.animate-fade-in {
  animation: fade-in 0.3s ease-out;
}
</style>
