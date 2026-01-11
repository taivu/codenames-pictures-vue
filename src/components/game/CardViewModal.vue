<script setup lang="ts">
/**
 * CardViewModal - Full-screen modal for viewing a card image in detail.
 */
import type { Card } from '@/types'
import { ref, computed, onMounted } from 'vue'
import { useEscapeKey } from '@/composables'
import { getCardImagePath } from '@/utils'

interface Props {
  card: Card
}

const props = defineProps<Props>()

const emit = defineEmits<{
  close: []
}>()

const isVisible = ref(false)

const imagePath = computed(() => getCardImagePath(props.card))

function handleClose(): void {
  isVisible.value = false
}

function onAfterLeave(): void {
  emit('close')
}

onMounted(() => {
  isVisible.value = true
})

useEscapeKey(handleClose)
</script>

<template>
  <Teleport to="body">
    <Transition name="modal" @after-leave="onAfterLeave">
      <div
        v-if="isVisible"
        class="fixed inset-0 z-[100] flex items-center justify-center p-4"
        @mousedown.stop
      >
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-black/50 backdrop-blur-sm" @click="handleClose" />

        <!-- Close button -->
        <button
          type="button"
          class="absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-xl text-xl text-white/80 transition-colors hover:bg-white/10 hover:text-white"
          @click="handleClose"
        >
          <FontAwesomeIcon icon="xmark" />
        </button>

        <!-- Card number -->
        <div
          class="absolute top-4 left-4 z-10 rounded-lg bg-white/90 px-3 py-1.5 text-sm font-bold text-gray-800 shadow-lg backdrop-blur-sm"
        >
          Card {{ card.id + 1 }}
        </div>

        <!-- Card image -->
        <img
          :src="imagePath"
          :alt="`Card ${card.setId}-${card.imageIndex}`"
          class="relative max-h-full max-w-full rounded-2xl object-contain shadow-2xl"
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
  transition:
    transform 0.2s ease,
    opacity 0.2s ease;
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
