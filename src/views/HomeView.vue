<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="flex min-h-screen flex-col p-4 sm:p-8">
    <!-- Hero Section -->
    <div class="mx-auto flex max-w-4xl flex-1 flex-col justify-center text-center">
      <h1 class="mb-4 text-4xl font-bold sm:text-5xl">Codenames Pictures Online</h1>
      <p class="mb-6 text-lg">
        The online version of Codenames Pictures by
        <a
          href="https://czechgames.com/en/codenames-pictures/"
          target="_blank"
          rel="noopener noreferrer"
          class="font-bold text-blue-600 hover:underline"
        >
          czechgames
        </a>
      </p>

      <!-- Top Play Buttons -->
      <div class="mb-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <RouterLink to="/play" class="btn btn-green w-full px-8 py-4 text-xl sm:w-auto">
          <FontAwesomeIcon icon="play" class="mr-2" />Start Game
        </RouterLink>
        <RouterLink to="/spy-master" class="btn btn-blue w-full px-8 py-4 text-xl sm:w-auto">
          <FontAwesomeIcon icon="user-secret" class="mr-2" />Spy Master
        </RouterLink>
      </div>

      <!-- Quick Start -->
      <div
        class="mx-auto mb-8 max-w-xl rounded-xl border-2 border-gray-200 bg-white/80 p-6 text-left"
      >
        <h2 class="mb-4 text-center text-xl font-bold">Quick Start</h2>
        <ol class="mb-4 space-y-3 text-gray-700">
          <li class="flex gap-3">
            <span
              class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500 text-sm font-bold text-white"
              >1</span
            >
            <span
              ><strong>Set up the game board</strong> — Open the site on a phone, tablet, or
              computer. This is what everyone looks at. For bigger groups, mirror the screen to a TV
              using AirPlay or Chromecast.</span
            >
          </li>
          <li class="flex gap-3">
            <span
              class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500 text-sm font-bold text-white"
              >2</span
            >
            <span
              ><strong>Spymasters get the key</strong> — Each spymaster opens the site on their own
              device and navigates to the Spy Master view. Together, they pick which key card to
              use.</span
            >
          </li>
          <li class="flex gap-3">
            <span
              class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500 text-sm font-bold text-white"
              >3</span
            >
            <span
              ><strong>Play!</strong> — The game doesn't enforce turns or endings—it's designed to
              get out of the way and let you play. Track guesses by tapping cards on the game board.
              Enable Pressure Mode in settings if you want timed rounds.</span
            >
          </li>
        </ol>
        <div class="text-center">
          <RouterLink to="/rules" class="text-sm font-medium text-blue-600 hover:underline">
            <FontAwesomeIcon icon="book" class="mr-1" />Read full rules
          </RouterLink>
        </div>
      </div>

      <!-- Bottom Play Buttons -->
      <div class="mb-4 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <RouterLink to="/play" class="btn btn-green w-full px-8 py-4 text-xl sm:w-auto">
          <FontAwesomeIcon icon="play" class="mr-2" />Start Game
        </RouterLink>
        <RouterLink to="/spy-master" class="btn btn-blue w-full px-8 py-4 text-xl sm:w-auto">
          <FontAwesomeIcon icon="user-secret" class="mr-2" />Spy Master
        </RouterLink>
      </div>

      <!-- Secondary link -->
      <RouterLink to="/play-duet" class="text-sm font-medium text-green-700 hover:underline">
        <FontAwesomeIcon icon="users" class="mr-1" />Play Duet Mode
      </RouterLink>
    </div>
  </div>
</template>
