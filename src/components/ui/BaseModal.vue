<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useClickOutside, useEscapeKey } from '@/composables'

interface Props {
  title?: string
  icon?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md'
})

const sizeClasses = computed(() => {
  switch (props.size) {
    case 'sm': return 'max-w-sm'
    case 'md': return 'max-w-md'
    case 'lg': return 'max-w-2xl'
    case 'xl': return 'max-w-4xl'
    default: return 'max-w-md'
  }
})

const emit = defineEmits<{
  close: []
}>()

const modalRef = ref<HTMLElement | null>(null)

function handleClose(): void {
  emit('close')
}

useClickOutside(modalRef, handleClose)
useEscapeKey(handleClose)

onMounted(() => {
  document.body.style.overflow = 'hidden'
})

onUnmounted(() => {
  document.body.style.overflow = ''
})
</script>

<template>
  <Teleport to="body">
    <Transition name="modal" appear>
      <div class="fixed inset-0 z-50 flex items-center justify-center">
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-black/50 backdrop-blur-sm" />

        <!-- Modal -->
        <div
          ref="modalRef"
          :class="[
            'relative flex flex-col bg-white rounded-xl shadow-2xl w-full mx-4 max-h-[90vh] overflow-hidden',
            sizeClasses
          ]"
          @mousedown.stop
        >
          <!-- Header -->
          <div class="flex items-center justify-between px-5 py-4 border-b border-gray-100 shrink-0">
            <h3 v-if="title" class="text-xl font-bold text-gray-800 flex items-center gap-2">
              <FontAwesomeIcon v-if="icon" :icon="icon" class="text-gray-500" />
              {{ title }}
            </h3>
            <div class="flex items-center gap-2">
              <slot name="header-actions" />
              <button
                type="button"
                class="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                @click="handleClose"
              >
                <FontAwesomeIcon icon="xmark" />
              </button>
            </div>
          </div>

          <!-- Content -->
          <div class="px-5 py-4 overflow-y-auto">
            <slot />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.2s ease;
}

.modal-enter-active > div:last-child,
.modal-leave-active > div:last-child {
  transition: transform 0.2s ease, opacity 0.2s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from > div:last-child,
.modal-leave-to > div:last-child {
  opacity: 0;
  transform: scale(0.95);
}
</style>
