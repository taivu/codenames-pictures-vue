<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useSettingsStore } from '@/stores'
import CardSetSelector from '@/components/settings/CardSetSelector.vue'

const settingsStore = useSettingsStore()
</script>

<template>
  <div class="min-h-screen p-4 sm:p-8">
    <div class="max-w-2xl mx-auto">
      <!-- Header -->
      <div class="mb-8">
        <RouterLink
          to="/"
          class="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4"
        >
          <FontAwesomeIcon icon="arrow-left" class="mr-2" />
          Back to Home
        </RouterLink>
        <h1 class="text-3xl sm:text-4xl font-bold">Settings</h1>
      </div>

      <!-- Card Sets Section -->
      <section class="mb-8">
        <div class="flex items-center justify-between mb-4">
          <div>
            <h2 class="text-xl font-bold">Card Sets</h2>
            <p class="text-gray-600 text-sm">
              Select which card sets to use in your games.
              You can combine multiple sets.
            </p>
          </div>
          <button
            type="button"
            class="text-sm text-blue-600 hover:text-blue-800 hover:underline"
            @click="settingsStore.resetToDefaults()"
          >
            Reset to defaults
          </button>
        </div>

        <CardSetSelector />

        <!-- Summary -->
        <div class="mt-4 bg-gray-100 rounded-lg p-4 text-sm text-gray-700">
          <div class="flex items-center justify-between">
            <span>
              <strong>{{ settingsStore.enabledCardSets.length }}</strong>
              {{ settingsStore.enabledCardSets.length === 1 ? 'set' : 'sets' }} enabled
            </span>
            <span>
              <strong>{{ settingsStore.totalEnabledCards }}</strong> total cards available
            </span>
          </div>
        </div>
      </section>

      <!-- Back to Game -->
      <div class="flex flex-wrap gap-3 justify-center pt-4 border-t border-gray-200">
        <RouterLink to="/play" class="btn btn-green px-6 py-3">
          <FontAwesomeIcon icon="play" class="mr-2" />Play Classic
        </RouterLink>
        <RouterLink to="/play-duet" class="btn border-2 border-green-600 text-green-700 bg-white hover:bg-green-50 px-6 py-3">
          <FontAwesomeIcon icon="users" class="mr-2" />Play Duet
        </RouterLink>
      </div>
    </div>
  </div>
</template>
