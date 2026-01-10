<script setup lang="ts">
import { RouterLink } from 'vue-router'
import SiteLayout from '@/components/layout/SiteLayout.vue'

const howToPlaySteps = [
  {
    to: '/play',
    icon: 'gamepad',
    iconBg: 'bg-red-100 text-red-600',
    title: 'Set up the game board',
    description: 'Open the site on a shared screen and start a game. Everyone looks at this device together.',
  },
  {
    to: '/spy-master',
    icon: 'user-secret',
    iconBg: 'bg-blue-100 text-blue-600',
    title: 'Spymasters get the key',
    description: 'Each spymaster opens Spy Master view on their own device. Together, they agree on which key card to use.',
  },
  {
    to: '/play',
    icon: 'trophy',
    iconBg: 'bg-yellow-100 text-yellow-600',
    title: 'Play!',
    description: 'Tap cards to mark them. Enable Pressure Mode in settings for timed rounds.',
  },
]
</script>

<template>
  <SiteLayout>
    <!-- Hero Section -->
    <div class="px-4 pt-8 sm:px-8 sm:pt-12">
      <div class="mx-auto max-w-4xl text-center">
        <h1
          class="mb-4 bg-gradient-to-r from-green-600 via-emerald-500 to-teal-500 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent sm:text-5xl md:text-6xl"
        >
          Codenames Pictures
        </h1>
        <p class="mx-auto mb-8 max-w-2xl text-lg text-gray-600 sm:text-xl">
          Play the hit party game online with friends. Based on
          <a
            href="https://czechgames.com/en/codenames-pictures/"
            target="_blank"
            rel="noopener noreferrer"
            class="font-semibold text-blue-600 underline decoration-blue-300 decoration-2 underline-offset-2 transition-colors hover:text-blue-700 hover:decoration-blue-500"
          >
            Codenames Pictures
          </a>
          by Czech Games.
        </p>
      </div>
    </div>

    <!-- Main Content -->
    <div class="px-4 pb-12 sm:px-8 sm:pb-16">
      <div class="mx-auto max-w-4xl text-center">
        <!-- How to Play Cards -->
        <div class="mx-auto mb-10 grid max-w-3xl gap-4 sm:grid-cols-3">
          <RouterLink
            v-for="step in howToPlaySteps"
            :key="step.title"
            :to="step.to"
            class="rounded-2xl border border-gray-100 bg-gradient-to-br from-white to-gray-50 px-3 py-5 shadow-sm transition-shadow hover:shadow-md"
          >
            <div
              class="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl"
              :class="step.iconBg"
            >
              <FontAwesomeIcon :icon="step.icon" class="text-xl" />
            </div>
            <h3 class="mb-4 font-semibold text-gray-900">{{ step.title }}</h3>
            <p class="text-sm text-gray-500">{{ step.description }}</p>
          </RouterLink>
        </div>

        <!-- Full Rules Link -->
        <div class="mx-auto mb-10 text-center">
          <RouterLink
            to="/rules"
            class="inline-flex items-center gap-1.5 rounded-full border border-gray-300 bg-gray-100 px-4 py-2 text-sm font-medium text-gray-800 transition-colors hover:bg-gray-200"
          >
            <FontAwesomeIcon icon="book" />
            Read full rules
          </RouterLink>
        </div>

        <!-- Secondary link -->
        <RouterLink
          to="/play-duet"
          class="inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-5 py-2.5 text-sm font-medium text-green-700 transition-all hover:border-green-300 hover:bg-green-100"
        >
          <FontAwesomeIcon icon="users" />
          Try Duet Mode
        </RouterLink>
      </div>
    </div>
  </SiteLayout>
</template>
