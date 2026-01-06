<script setup lang="ts">
import { ref, watch, onUnmounted } from 'vue'
import { useClickOutside, useEscapeKey } from '@/composables'

interface Props {
  open: boolean
  position?: 'left' | 'right'
  width?: string
}

const props = withDefaults(defineProps<Props>(), {
  position: 'right',
  width: '80vw'
})

const emit = defineEmits<{
  'update:open': [value: boolean]
  close: []
}>()

const drawerRef = ref<HTMLElement | null>(null)

// Swipe to close state
let startX = 0
let currentX = 0
let isDragging = false

function close() {
  emit('update:open', false)
  emit('close')
}

// Click outside to close
useClickOutside(drawerRef, () => {
  if (props.open) {
    close()
  }
})

// Escape key to close (only when open)
useEscapeKey(() => {
  if (props.open) {
    close()
  }
})

// Touch handlers for swipe-to-close
function handleTouchStart(e: TouchEvent) {
  startX = e.touches[0].clientX
  currentX = startX
  isDragging = true
}

function handleTouchMove(e: TouchEvent) {
  if (!isDragging) return
  currentX = e.touches[0].clientX

  const drawer = drawerRef.value
  if (!drawer) return

  const deltaX = currentX - startX

  // Only allow dragging in the close direction
  if (props.position === 'right' && deltaX > 0) {
    drawer.style.transform = `translateX(${deltaX}px)`
  } else if (props.position === 'left' && deltaX < 0) {
    drawer.style.transform = `translateX(${deltaX}px)`
  }
}

function handleTouchEnd() {
  if (!isDragging) return
  isDragging = false

  const drawer = drawerRef.value
  if (!drawer) return

  const deltaX = currentX - startX
  const threshold = 100

  // If swiped far enough, close the drawer
  if (props.position === 'right' && deltaX > threshold) {
    close()
  } else if (props.position === 'left' && deltaX < -threshold) {
    close()
  }

  // Reset transform
  drawer.style.transform = ''
}

// Lock body scroll when open
watch(() => props.open, (isOpen) => {
  if (isOpen) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})

onUnmounted(() => {
  document.body.style.overflow = ''
})
</script>

<template>
  <Teleport to="body">
    <Transition name="drawer">
      <div
        v-if="open"
        class="fixed inset-0 z-50"
      >
        <!-- Backdrop -->
        <div
          ref="backdropRef"
          class="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
          @click="close"
        />

        <!-- Drawer Panel -->
        <div
          ref="drawerRef"
          :class="[
            'absolute top-0 bottom-0 bg-white shadow-2xl',
            'flex flex-col overflow-hidden',
            'transition-transform duration-300 ease-out',
            position === 'right' ? 'right-0' : 'left-0'
          ]"
          :style="{ width, maxWidth: '360px' }"
          @touchstart="handleTouchStart"
          @touchmove="handleTouchMove"
          @touchend="handleTouchEnd"
        >
          <!-- Content -->
          <div class="flex-1 overflow-y-auto">
            <slot />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.drawer-enter-active,
.drawer-leave-active {
  transition: opacity 0.3s ease;
}

.drawer-enter-active > div:last-child,
.drawer-leave-active > div:last-child {
  transition: transform 0.3s cubic-bezier(0.32, 0.72, 0, 1);
}

.drawer-enter-from,
.drawer-leave-to {
  opacity: 0;
}

.drawer-enter-from > div:last-child {
  transform: translateX(100%);
}

.drawer-leave-to > div:last-child {
  transform: translateX(100%);
}

/* Left position variants */
:deep(.drawer-enter-from > div[class*="left-0"]),
:deep(.drawer-leave-to > div[class*="left-0"]) {
  transform: translateX(-100%);
}
</style>
