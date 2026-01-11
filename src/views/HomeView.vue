<script setup lang="ts">
/**
 * HomeView - Landing page with hero section and how-to-play cards.
 */
import SiteLayout from '@/components/layout/SiteLayout.vue'
import { BaseButton } from '@/components/ui'

const howToPlaySteps = [
  {
    to: '/play',
    icon: 'tv',
    iconBg: 'bg-red-100 text-red-600',
    title: 'Put the board on a big screen',
    description: 'Cast to a TV or share your screen so everyone can see the picture grid together.',
  },
  {
    to: '/spy-master',
    icon: 'user-secret',
    iconBg: 'bg-blue-100 text-blue-600',
    title: 'Spymasters grab their phones',
    description:
      'Each spymaster opens the Spy Master page on their own phone to see the secret key card.',
  },
  {
    to: '/rules',
    icon: 'book',
    iconBg: 'bg-yellow-100 text-yellow-600',
    title: 'Give clues & guess!',
    description:
      'Spymasters give one-word clues. Everyone else guesses which pictures match. First team to find all their agents wins!',
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
          The perfect party game for game night. Two teams, secret agents, and one-word clues. Based
          on
          <a
            href="https://czechgames.com/en/codenames-pictures/"
            target="_blank"
            rel="noopener noreferrer"
            class="external-link font-semibold"
            >Codenames Pictures</a
          >
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
            class="group rounded-2xl border border-gray-100 bg-gradient-to-br from-white to-gray-50 px-3 py-5 shadow-sm transition-shadow hover:shadow-md"
          >
            <div
              class="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl transition-transform group-hover:scale-110"
              :class="step.iconBg"
            >
              <FontAwesomeIcon :icon="step.icon" class="text-xl" />
            </div>
            <h3 class="mb-4 font-semibold text-gray-900">{{ step.title }}</h3>
            <p class="text-sm text-gray-500">{{ step.description }}</p>
          </RouterLink>
        </div>

        <!-- Secondary Links -->
        <div class="flex flex-wrap items-center justify-center gap-3">
          <BaseButton to="/rules" variant="outline" rounded="full" size="sm">
            <FontAwesomeIcon icon="book" />
            Read full rules
          </BaseButton>
          <BaseButton to="/play-duet" color="green" variant="outline" rounded="full" size="sm">
            <FontAwesomeIcon icon="users" />
            Try Duet Mode
          </BaseButton>
        </div>
      </div>
    </div>
  </SiteLayout>
</template>
