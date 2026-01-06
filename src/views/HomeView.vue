<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="min-h-screen p-4 sm:p-8 flex flex-col">
    <!-- Hero Section -->
    <div class="max-w-4xl mx-auto text-center flex-1 flex flex-col justify-center">
      <h1 class="text-4xl sm:text-5xl font-bold mb-4">Codenames Pictures Online</h1>
      <p class="text-lg mb-6">
        The online version of Codenames Pictures by
        <a
          href="https://czechgames.com/en/codenames-pictures/"
          target="_blank"
          rel="noopener noreferrer"
          class="text-blue-600 hover:underline font-bold"
        >
          czechgames
        </a>
      </p>

      <!-- Top Play Buttons -->
      <div class="flex flex-col sm:flex-row gap-3 justify-center items-center mb-8">
        <RouterLink to="/play" class="btn btn-green text-xl px-8 py-4 w-full sm:w-auto">
          <FontAwesomeIcon icon="play" class="mr-2" />Start Game
        </RouterLink>
        <RouterLink to="/spy-master" class="btn btn-blue text-xl px-8 py-4 w-full sm:w-auto">
          <FontAwesomeIcon icon="user-secret" class="mr-2" />Spy Master
        </RouterLink>
      </div>

      <!-- Quick Start -->
      <div class="bg-white/80 border-2 border-gray-200 rounded-xl p-6 mb-8 text-left max-w-xl mx-auto">
        <h2 class="text-xl font-bold mb-4 text-center">Quick Start</h2>
        <ol class="space-y-3 text-gray-700 mb-4">
          <li class="flex gap-3">
            <span class="shrink-0 w-6 h-6 rounded-full bg-green-500 text-white text-sm font-bold flex items-center justify-center">1</span>
            <span>Split into two teams and pick a spymaster for each</span>
          </li>
          <li class="flex gap-3">
            <span class="shrink-0 w-6 h-6 rounded-full bg-green-500 text-white text-sm font-bold flex items-center justify-center">2</span>
            <span>Spymasters open the <strong>Spy Master</strong> view to see the key card</span>
          </li>
          <li class="flex gap-3">
            <span class="shrink-0 w-6 h-6 rounded-full bg-green-500 text-white text-sm font-bold flex items-center justify-center">3</span>
            <span>Spymasters give one-word clues to help their team find their agents</span>
          </li>
          <li class="flex gap-3">
            <span class="shrink-0 w-6 h-6 rounded-full bg-green-500 text-white text-sm font-bold flex items-center justify-center">4</span>
            <span>First team to find all their agents wins! Avoid the assassin!</span>
          </li>
        </ol>
        <div class="text-center">
          <RouterLink to="/rules" class="text-blue-600 hover:underline font-medium text-sm">
            <FontAwesomeIcon icon="book" class="mr-1" />Read full rules
          </RouterLink>
        </div>
      </div>

      <!-- Bottom Play Buttons -->
      <div class="flex flex-col sm:flex-row gap-3 justify-center items-center mb-4">
        <RouterLink to="/play" class="btn btn-green text-xl px-8 py-4 w-full sm:w-auto">
          <FontAwesomeIcon icon="play" class="mr-2" />Start Game
        </RouterLink>
        <RouterLink to="/spy-master" class="btn btn-blue text-xl px-8 py-4 w-full sm:w-auto">
          <FontAwesomeIcon icon="user-secret" class="mr-2" />Spy Master
        </RouterLink>
      </div>

      <!-- Secondary link -->
      <RouterLink to="/play-duet" class="text-green-700 hover:underline font-medium text-sm">
        <FontAwesomeIcon icon="users" class="mr-1" />Play Duet Mode
      </RouterLink>
    </div>
  </div>
</template>
