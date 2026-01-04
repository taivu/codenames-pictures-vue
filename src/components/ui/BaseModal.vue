<script setup lang="ts">
interface Props {
  title?: string
}

defineProps<Props>()

const emit = defineEmits<{
  close: []
}>()

function handleClose(): void {
  emit('close')
}
</script>

<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
    <div class="relative bg-board border-2 border-black rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
      <button
        type="button"
        class="absolute top-2 right-2 w-8 h-8 flex items-center justify-center text-2xl font-bold hover:bg-black/10 rounded"
        @click="handleClose"
      >
        &times;
      </button>

      <h3 v-if="title" class="text-2xl font-bold mb-4">
        {{ title }}
      </h3>

      <slot />
    </div>
  </div>
</template>
