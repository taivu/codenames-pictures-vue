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
    <div
      class="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4"
      @click="handleBackdropClick"
    >
      <!-- Close button -->
      <button
        type="button"
        class="absolute top-4 right-4 w-10 h-10 flex items-center justify-center text-white text-2xl hover:bg-white/20 rounded-full transition-colors"
        @click="handleClose"
      >
        <FontAwesomeIcon icon="xmark" />
      </button>

      <!-- Card number -->
      <div class="absolute top-4 left-4 bg-white/90 text-black font-bold px-3 py-1 rounded text-lg">
        Card {{ card.id + 1 }}
      </div>

      <!-- Card image -->
      <img
        :src="imagePath"
        :alt="`Card ${card.setId}-${card.imageIndex}`"
        class="max-w-full max-h-full object-contain rounded-xl shadow-2xl"
      />
    </div>
  </Teleport>
</template>
