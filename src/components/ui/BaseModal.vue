<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useClickOutside, useEscapeKey } from '@/composables'
import IconButton from './IconButton.vue'

interface Props {
  title?: string
  icon?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
})

const sizeClasses = computed(() => {
  switch (props.size) {
    case 'sm':
      return 'max-w-sm'
    case 'md':
      return 'max-w-md'
    case 'lg':
      return 'max-w-2xl'
    case 'xl':
      return 'max-w-4xl'
    default:
      return 'max-w-md'
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
            'relative mx-4 flex max-h-[90vh] w-full flex-col overflow-hidden rounded-xl bg-white shadow-2xl',
            sizeClasses,
          ]"
          @mousedown.stop
        >
          <!-- Header -->
          <div
            class="flex shrink-0 items-center justify-between border-b border-gray-100 px-5 py-4"
          >
            <h3 v-if="title" class="flex items-center gap-2 text-xl font-bold text-gray-800">
              <FontAwesomeIcon v-if="icon" :icon="icon" class="text-gray-500" />
              {{ title }}
            </h3>
            <div class="flex items-center gap-2">
              <slot name="header-actions" />
              <IconButton
                icon="xmark"
                size="sm"
                shape="square"
                variant="subtle"
                label="Close"
                @click="handleClose"
              />
            </div>
          </div>

          <!-- Content -->
          <div class="overflow-y-auto px-5 py-4">
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
  transition:
    transform 0.2s ease,
    opacity 0.2s ease;
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
