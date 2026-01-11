<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

interface Props {
  hideActionButtons?: boolean
  hideFooter?: boolean
  fixedHeader?: boolean
}

defineProps<Props>()

const route = useRoute()
const isHomePage = computed(() => route.path === '/')

const isSticky = ref(false)

function handleScroll(): void {
  isSticky.value = window.scrollY > 10
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  handleScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <!-- Sticky/Fixed Action Buttons -->
    <div
      v-if="!hideActionButtons"
      class="px-4 py-3 transition-colors duration-200"
      :class="[
        fixedHeader ? 'fixed top-0 right-0 left-0 z-[60]' : 'sticky top-0 z-50 mb-8',
        isSticky && !fixedHeader ? 'border-b border-amber-300 bg-amber-100/50 backdrop-blur-md' : ''
      ]"
    >
      <slot name="action-buttons" :is-sticky="isSticky">
        <!-- Default action buttons -->
        <div class="flex items-center">
          <!-- Left: Home (hidden on homepage) -->
          <div class="flex flex-1 justify-start">
            <RouterLink
              v-if="!isHomePage"
              to="/"
              class="flex items-center justify-center rounded-full bg-white p-2 text-sm text-gray-600 shadow-sm transition-colors hover:bg-gray-100 sm:gap-1.5 sm:px-3"
            >
              <FontAwesomeIcon icon="arrow-left" />
              <span class="hidden sm:inline">Home</span>
            </RouterLink>
          </div>

          <!-- Center: Play -->
          <RouterLink
            to="/play"
            class="flex items-center gap-1.5 rounded-full bg-green-500 px-4 py-2 text-sm font-medium whitespace-nowrap text-white shadow-sm transition-colors hover:bg-green-600"
          >
            <FontAwesomeIcon icon="play" />
            <span>Play</span>
          </RouterLink>

          <!-- Right: Spy Master -->
          <div class="flex flex-1 justify-end">
            <RouterLink
              to="/spy-master"
              class="flex items-center gap-1.5 rounded-full bg-blue-100 px-3 py-2 text-sm font-medium whitespace-nowrap text-blue-600 shadow-sm transition-colors hover:bg-blue-500 hover:text-white"
            >
              <FontAwesomeIcon icon="user-secret" />
              <span class="hidden sm:inline">Spy Master</span>
            </RouterLink>
          </div>
        </div>
      </slot>
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
            class="external-link !text-amber-800 font-medium hover:!text-amber-900"
          >Czech Games Edition</a>
        </p>
        <div class="flex items-center justify-center gap-3">
          <RouterLink
            to="/rules"
            class="text-amber-700 transition-colors hover:text-amber-900 hover:underline"
          >
            How to Play
          </RouterLink>
          <span class="text-amber-400">|</span>
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
