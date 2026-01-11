<script setup lang="ts">
/**
 * BaseModal - Reusable modal dialog with backdrop and close handling.
 */
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useClickOutside, useEscapeKey } from '@/composables'
import IconButton from './IconButton.vue'

type ModalSize = 'sm' | 'md' | 'lg' | 'xl'

interface Props {
  title?: string
  icon?: string
  size?: ModalSize
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
})

// Size classes as a lookup map
const sizeClassMap: Record<ModalSize, string> = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-2xl',
  xl: 'max-w-4xl',
}

const sizeClasses = computed(() => sizeClassMap[props.size])

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
          <div class="relative z-10 shrink-0 border-b border-gray-100 px-5 py-4 shadow-[0_4px_16px_rgba(0,0,0,0.06)]">
            <slot name="header" :close="handleClose">
              <div class="flex items-center justify-between">
                <h3 v-if="title" class="flex items-center gap-2 text-xl font-bold text-gray-800">
                  <FontAwesomeIcon v-if="icon" :icon="icon" class="text-gray-500" />
                  {{ title }}
                </h3>
                <div class="flex items-center gap-2">
                  <slot name="header-actions" />
                  <IconButton
                    icon="xmark"
                    size="sm"
                    variant="ghost"
                    label="Close"
                    @click="handleClose"
                  />
                </div>
              </div>
            </slot>
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
