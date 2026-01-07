<script setup lang="ts">
import { ref, watch } from 'vue'
import { useGameStore } from '@/stores'
import HUDCollapsed from './HUDCollapsed.vue'
import HUDExpanded from './HUDExpanded.vue'

const store = useGameStore()
const isExpanded = ref(false)

// Collapse HUD when color selection menu opens
watch(() => store.colorMenuOpen, (isOpen) => {
  if (isOpen) isExpanded.value = false
})

function toggleExpanded(): void {
  isExpanded.value = !isExpanded.value
}
</script>

<template>
  <div class="select-none" @click="toggleExpanded">
    <Transition name="hud" mode="out-in">
      <HUDCollapsed v-if="!isExpanded" />
      <HUDExpanded v-else />
    </Transition>
  </div>
</template>

<style scoped>
.hud-enter-active,
.hud-leave-active {
  transition: all 0.2s ease;
}

.hud-enter-from,
.hud-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>
