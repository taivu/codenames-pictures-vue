<script setup lang="ts">
import { ref } from 'vue'
import { useEdgeSwipe, usePressureMode } from '@/composables'
import { trackModalOpened } from '@/plugins/analytics'

import { CardGrid } from '@/components/game'
import { TeamsModal } from '@/components/team'
import { SettingsModal } from '@/components/settings'
import { StrikeModal, LossModal } from '@/components/ui'
import FloatingHUD from './FloatingHUD.vue'
import SlideDrawer from './SlideDrawer.vue'
import { DrawerTrigger, DrawerContent } from '@/components/navigation'

const pressureMode = usePressureMode()

// UI State
const isDrawerOpen = ref(false)
const showTeamsModal = ref(false)
const showSettingsModal = ref(false)

// Open drawer on swipe from right edge
useEdgeSwipe({
  edge: 'right',
  onSwipe: () => {
    isDrawerOpen.value = true
  }
})

function openDrawer() {
  isDrawerOpen.value = true
}

function closeDrawer() {
  isDrawerOpen.value = false
}

function openTeamsModal() {
  trackModalOpened('teams')
  showTeamsModal.value = true
}

function closeTeamsModal() {
  showTeamsModal.value = false
}

function openSettingsModal() {
  trackModalOpened('settings')
  showSettingsModal.value = true
}

function closeSettingsModal() {
  showSettingsModal.value = false
}
</script>

<template>
  <div class="h-dvh overflow-hidden relative bg-board">
    <!-- Full-screen Card Grid Container -->
    <div class="absolute inset-0 flex items-center justify-center p-2 sm:p-4">
      <CardGrid />
    </div>

    <!-- Floating HUD - Top Left (z-45 to stay above card selection backdrop at z-40) -->
    <FloatingHUD class="fixed top-2 left-2 sm:top-4 sm:left-4 z-45" />

    <!-- Drawer Trigger Button - Bottom Right -->
    <DrawerTrigger
      class="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40"
      @click="openDrawer"
    />

    <!-- Slide-out Drawer -->
    <SlideDrawer
      v-model:open="isDrawerOpen"
      position="right"
    >
      <DrawerContent
        @close="closeDrawer"
        @open-teams="openTeamsModal"
        @open-settings="openSettingsModal"
      />
    </SlideDrawer>

    <!-- Teams Modal -->
    <TeamsModal
      v-if="showTeamsModal"
      @close="closeTeamsModal"
    />

    <!-- Settings Modal -->
    <SettingsModal
      v-if="showSettingsModal"
      @close="closeSettingsModal"
    />

    <!-- Pressure Mode: Strike Modal -->
    <StrikeModal
      v-if="pressureMode.showStrikeModal.value"
      :strike-number="pressureMode.strikes.value"
      :next-duration="pressureMode.formatDuration(pressureMode.currentDuration.value)"
      @acknowledge="pressureMode.acknowledgeStrike"
    />

    <!-- Pressure Mode: Loss Modal -->
    <LossModal
      v-if="pressureMode.showLossModal.value"
      @new-game="pressureMode.handleLoss"
      @continue-as-scrub="pressureMode.continueAsScrub"
    />
  </div>
</template>
