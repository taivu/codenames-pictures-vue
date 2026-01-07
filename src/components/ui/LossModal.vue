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
      <div class="relative animate-fade-in">
        <div class="bg-gradient-to-b from-gray-900 to-black rounded-2xl p-10 text-center max-w-md shadow-2xl border border-gray-700">
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
          <h1 class="text-6xl font-black text-red-500 mb-4 tracking-wider animate-pulse">
            GAME OVER
          </h1>

          <!-- Message -->
          <p class="text-gray-400 text-xl mb-8">
            Three strikes. Better luck next time.
          </p>

          <!-- New Game Button -->
          <button
            class="w-full py-4 px-8 rounded-xl font-bold text-xl bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-500 hover:to-emerald-400 text-white transition-all shadow-lg hover:shadow-xl hover:scale-105 mb-3"
            @click="emit('newGame')"
          >
            <FontAwesomeIcon icon="rotate-right" class="mr-2" />
            Start New Game
          </button>

          <!-- Continue as Scrub Button -->
          <button
            class="w-full py-3 px-6 rounded-xl font-medium text-base text-gray-400 hover:text-white hover:bg-white/10 transition-all"
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
