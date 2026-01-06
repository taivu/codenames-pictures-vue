<script setup lang="ts">
import type { Card } from '@/types'
import { computed } from 'vue'

interface Props {
  card: Card
}

const props = defineProps<Props>()

const emit = defineEmits<{
  close: []
}>()

const imagePath = computed(() => `${import.meta.env.BASE_URL}images/cards/${props.card.setId}/card-${props.card.imageIndex}.jpg`)

function handleClose(): void {
  emit('close')
}

function handleBackdropClick(event: MouseEvent): void {
  if (event.target === event.currentTarget) {
    handleClose()
  }
}
</script>

<template>
  <Teleport to="body">
    <Transition name="modal" appear>
      <div
        class="fixed inset-0 z-[100] flex items-center justify-center p-4"
        @click="handleBackdropClick"
      >
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-black/80 backdrop-blur-sm" />

        <!-- Close button -->
        <button
          type="button"
          class="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center text-white/80 hover:text-white text-xl hover:bg-white/10 rounded-xl transition-colors"
          @click="handleClose"
        >
          <FontAwesomeIcon icon="xmark" />
        </button>

        <!-- Card number -->
        <div class="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur-sm text-gray-800 font-bold px-3 py-1.5 rounded-lg text-sm shadow-lg">
          Card {{ card.id + 1 }}
        </div>

        <!-- Card image -->
        <img
          :src="imagePath"
          :alt="`Card ${card.setId}-${card.imageIndex}`"
          class="relative max-w-full max-h-full object-contain rounded-2xl shadow-2xl"
        />
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.2s ease;
}

.modal-enter-active img,
.modal-leave-active img {
  transition: transform 0.2s ease, opacity 0.2s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from img,
.modal-leave-to img {
  opacity: 0;
  transform: scale(0.9);
}
</style>
