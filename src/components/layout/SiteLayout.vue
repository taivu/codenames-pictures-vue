<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'

interface Props {
  hideActionButtons?: boolean
  hideFooter?: boolean
}

defineProps<Props>()

const isSticky = ref(false)
const stickyRef = ref<HTMLElement | null>(null)

let observer: IntersectionObserver | null = null

onMounted(() => {
  if (stickyRef.value) {
    observer = new IntersectionObserver(
      ([entry]) => {
        isSticky.value = entry.intersectionRatio < 1
      },
      { threshold: [1], rootMargin: '-1px 0px 0px 0px' }
    )
    observer.observe(stickyRef.value)
  }
})

onUnmounted(() => {
  observer?.disconnect()
})
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <!-- Optional content above action buttons (e.g., homepage hero) -->
    <slot name="hero" />

    <!-- Sticky Action Buttons -->
    <div
      v-if="!hideActionButtons"
      ref="stickyRef"
      class="sticky top-0 z-50 mb-8 px-4 py-3 transition-colors duration-200"
      :class="isSticky ? 'border-b border-gray-200/50 bg-white/80 backdrop-blur-md' : ''"
    >
      <div class="flex items-center justify-center gap-2">
        <RouterLink
          to="/play"
          class="flex items-center gap-2 whitespace-nowrap rounded-lg bg-green-500 px-4 py-2.5 font-medium text-white shadow-sm transition-colors hover:bg-green-600"
        >
          <FontAwesomeIcon icon="play" />Start Game
        </RouterLink>
        <RouterLink
          to="/spy-master"
          class="flex items-center gap-2 whitespace-nowrap rounded-lg bg-blue-500 px-4 py-2.5 font-medium text-white shadow-sm transition-colors hover:bg-blue-600"
        >
          <FontAwesomeIcon icon="user-secret" />Spy Master
        </RouterLink>
      </div>
    </div>

    <main class="flex-1">
      <slot />
    </main>

    <footer v-if="!hideFooter" class="border-t border-amber-300 bg-amber-100/50 px-4 py-4">
      <div class="mx-auto max-w-4xl text-center text-sm text-amber-800">
        <p class="mb-2">
          Fan-made project. Not affiliated with
          <a
            href="https://czechgames.com/en/codenames-pictures/"
            target="_blank"
            rel="noopener noreferrer"
            class="font-medium underline hover:text-amber-900"
          >
            Czech Games Edition
          </a>
        </p>
        <div class="flex items-center justify-center gap-3">
          <RouterLink
            to="/disclaimer"
            class="text-amber-700 transition-colors hover:text-amber-900 hover:underline"
          >
            Disclaimer
          </RouterLink>
          <span class="text-amber-400">|</span>
          <RouterLink
            to="/about"
            class="text-amber-700 transition-colors hover:text-amber-900 hover:underline"
          >
            About
          </RouterLink>
        </div>
      </div>
    </footer>
  </div>
</template>
