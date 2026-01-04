<script setup lang="ts">
import { ref } from 'vue'
import { useClickOutside } from '@/composables'

interface Props {
  title?: string
}

defineProps<Props>()

const emit = defineEmits<{
  close: []
}>()

const modalRef = ref<HTMLElement | null>(null)

function handleClose(): void {
  emit('close')
}

useClickOutside(modalRef, handleClose)
</script>

<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
    <div ref="modalRef" class="flex flex-col bg-board border-2 border-black rounded-lg max-w-2xl w-full mx-4 max-h-[90vh]">
      <!-- Fixed header -->
      <div class="flex items-center justify-between p-4 border-b border-black/20 shrink-0">
        <h3 v-if="title" class="text-2xl font-bold">
          {{ title }}
        </h3>
        <div class="flex items-center gap-2">
          <slot name="header-actions" />
          <button
            type="button"
            class="w-8 h-8 flex items-center justify-center text-xl hover:bg-black/10 rounded"
            @click="handleClose"
          >
            <FontAwesomeIcon icon="xmark" />
          </button>
        </div>
      </div>

      <!-- Scrollable content -->
      <div class="p-6 overflow-y-auto">
        <slot />
      </div>
    </div>
  </div>
</template>
