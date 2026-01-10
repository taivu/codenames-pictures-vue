<script setup lang="ts">
import { RouterLink } from 'vue-router'
import SiteLayout from '@/components/layout/SiteLayout.vue'
</script>

<template>
  <SiteLayout>
    <!-- Hero Section (appears above action buttons) -->
    <template #hero>
      <div class="px-4 pt-12 sm:px-8 sm:pt-16">
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
    </template>

    <!-- Main Content -->
    <div class="px-4 pb-12 sm:px-8 sm:pb-16">
      <div class="mx-auto max-w-4xl text-center">
        <!-- Feature Cards -->
        <div class="mx-auto mb-12 grid max-w-3xl gap-4 sm:grid-cols-3">
          <div
            class="rounded-2xl border border-gray-100 bg-gradient-to-br from-white to-gray-50 p-5 shadow-sm transition-shadow hover:shadow-md"
          >
            <div
              class="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-green-600"
            >
              <FontAwesomeIcon icon="bolt" class="text-xl" />
            </div>
            <h3 class="mb-1 font-semibold text-gray-900">Instant Setup</h3>
            <p class="text-sm text-gray-500">No accounts needed. Just open and play.</p>
          </div>
          <div
            class="rounded-2xl border border-gray-100 bg-gradient-to-br from-white to-gray-50 p-5 shadow-sm transition-shadow hover:shadow-md"
          >
            <div
              class="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-600"
            >
              <FontAwesomeIcon icon="users" class="text-xl" />
            </div>
            <h3 class="mb-1 font-semibold text-gray-900">Party Ready</h3>
            <p class="text-sm text-gray-500">Works on any device. Great for groups.</p>
          </div>
          <div
            class="rounded-2xl border border-gray-100 bg-gradient-to-br from-white to-gray-50 p-5 shadow-sm transition-shadow hover:shadow-md"
          >
            <div
              class="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100 text-purple-600"
            >
              <FontAwesomeIcon icon="tv" class="text-xl" />
            </div>
            <h3 class="mb-1 font-semibold text-gray-900">Big Screen</h3>
            <p class="text-sm text-gray-500">Cast to TV with AirPlay or Chromecast.</p>
          </div>
        </div>

        <!-- Quick Start -->
        <div
          class="mx-auto mb-10 max-w-2xl overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm"
        >
          <div class="border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white px-6 py-4">
            <h2 class="text-lg font-bold text-gray-900">How to Play</h2>
          </div>
          <ol class="divide-y divide-gray-100">
            <li class="flex gap-4 p-5">
              <span
                class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-emerald-600 text-sm font-bold text-white shadow-sm"
                >1</span
              >
              <div class="text-left">
                <strong class="text-gray-900">Set up the game board</strong>
                <p class="mt-1 text-sm text-gray-600">
                  Open the site on a shared screen and start a game. Everyone looks at this device
                  together.
                </p>
              </div>
            </li>
            <li class="flex gap-4 p-5">
              <span
                class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-emerald-600 text-sm font-bold text-white shadow-sm"
                >2</span
              >
              <div class="text-left">
                <strong class="text-gray-900">Spymasters get the key</strong>
                <p class="mt-1 text-sm text-gray-600">
                  Each spymaster opens Spy Master view on their own device. Together, they agree on
                  which key card to use.
                </p>
              </div>
            </li>
            <li class="flex gap-4 p-5">
              <span
                class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-emerald-600 text-sm font-bold text-white shadow-sm"
                >3</span
              >
              <div class="text-left">
                <strong class="text-gray-900">Play!</strong>
                <p class="mt-1 text-sm text-gray-600">
                  Tap cards to mark them. Enable Pressure Mode in settings for timed rounds.
                </p>
              </div>
            </li>
          </ol>
          <div class="border-t border-gray-100 bg-gray-50 px-6 py-3">
            <RouterLink
              to="/rules"
              class="inline-flex items-center text-sm font-medium text-blue-600 transition-colors hover:text-blue-700"
            >
              <FontAwesomeIcon icon="book" class="mr-1.5" />Read full rules
              <FontAwesomeIcon icon="arrow-right" class="ml-1.5 text-xs" />
            </RouterLink>
          </div>
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
