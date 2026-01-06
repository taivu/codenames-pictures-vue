<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="min-h-screen p-4 sm:p-8">
    <div class="max-w-4xl mx-auto">
      <!-- Page Header -->
      <div class="mb-6">
        <RouterLink to="/" class="text-blue-600 hover:underline mb-4 inline-block">
          <FontAwesomeIcon icon="arrow-left" class="mr-1" />Back to Home
        </RouterLink>
        <h1 class="text-3xl sm:text-4xl font-bold">About</h1>
      </div>

      <!-- About Card -->
      <div class="bg-white/80 border-2 border-gray-300 rounded-xl p-6 shadow-sm mb-6">
        <h2 class="text-2xl font-bold mb-4">What is this?</h2>
        <p class="text-gray-700 leading-relaxed mb-4">
          This is an unofficial online version of Codenames Pictures, a party game designed by Vlaada Chvátil
          and published by Czech Games Edition.
        </p>
        <p class="text-gray-700 leading-relaxed">
          This web app allows you to play Codenames Pictures remotely with friends and family.
          Simply share your screen or send the spy master card link to play together!
        </p>
      </div>

      <!-- Tai Version Story -->
      <div class="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-300 rounded-xl p-6 shadow-md mb-6">
        <h2 class="text-2xl font-bold mb-4 text-green-800">Uhh, why is this game on your site Tai?</h2>
        <div class="text-gray-700 leading-relaxed space-y-4">
          <p>
            Picture this: family trip in Florida, everyone's hyped to play Codenames: Pictures.
            There's just one problem &mdash; a hurricane is barreling toward us and <em>every single store</em>
            in the area is sold out. Disaster? Not yet. I found an online version, pulled it up on an iPad,
            and mirrored it to the Airbnb TV. Crisis averted... or so I thought.
          </p>
          <p>
            Turns out the site wasn't built for mobile. At all. We couldn't even mark the cards red or blue.
            So what did we do? We grabbed post-it notes and started slapping them on the TV like cavemen.
            Honestly? Everyone still had a blast. And of course, we wanted to play again the next night.
          </p>
          <p>
            But I couldn't let it go. The frustration was real. I tracked down the original GitHub repo,
            saw it was open source, and thought: <em>"Fine. I'll fix it myself."</em>
            The twist? I did it entirely on my iPhone. Forked the repo, edited code through GitHub's web interface,
            deployed to Netlify, and hooked it up to my domain &mdash; all from my phone. No laptop, no desktop,
            just me, my phone, and pure stubbornness. Did this after shooting water guns in the pool with the kids, and still had
            plenty of time to enjoy the rest of the day before evening game night. It was painful, but I got it
            working well enough to play without post-it notes for the rest of the trip.
          </p>
          <p>
            While I was at it, I squashed some bugs and overhauled the card randomizer &mdash;
            the original kept dealing the same cards over and over like a broken deck.
          </p>
          <p>
            Over time, I kept tinkering. I made my own UI/UX choices to make things easier and more fun
            when friends and family play together. Eventually, I did a complete rewrite in Vue and Vite &mdash;
            nothing against React, I just prefer working with Vue.
          </p>
          <p>
            The best part? Hearing ideas, bugs, and suggestions from the people who actually play.
            There's something special about building something that brings people together for game night.
          </p>
          <p class="font-bold text-green-700">
            And you know what? It's a
            <RouterLink to="/play" class="underline hover:text-green-900">pretty fun way to play!</RouterLink>
          </p>
        </div>
      </div>

      <!-- Changelog -->
      <div class="bg-white/80 border-2 border-gray-300 rounded-xl p-6 shadow-sm mb-6">
        <h2 class="text-2xl font-bold mb-4">Changelog</h2>
        <div class="space-y-4">
          <div>
            <h3 class="font-bold text-gray-800">January 2025</h3>
            <ul class="list-disc list-inside text-gray-700 text-sm space-y-1 ml-2">
              <li>Complete rewrite in Vue 3 + Vite + TypeScript</li>
              <li>Mobile-first responsive design</li>
              <li>Portrait and landscape layouts</li>
              <li>Improved card color selection with arrow indicator</li>
              <li>Added team setup modal with shuffle and spy master randomizer</li>
              <li>Score tracking with increment/decrement</li>
              <li>Spy master card lock mode with screen wake lock</li>
              <li>Added About page</li>
            </ul>
          </div>
          <div>
            <h3 class="font-bold text-gray-800">Original Fork (2024)</h3>
            <ul class="list-disc list-inside text-gray-700 text-sm space-y-1 ml-2">
              <li>Fixed mobile touch interactions</li>
              <li>Improved card randomizer to avoid repeats</li>
              <li>Basic bug fixes</li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Credits Card -->
      <div class="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-300 rounded-xl p-6 shadow-md mb-6">
        <h2 class="text-2xl font-bold mb-4 text-blue-800">Credits</h2>
        <ul class="space-y-3 text-gray-700">
          <li>
            <strong>Original Game:</strong>
            <a
              href="https://czechgames.com/en/codenames-pictures/"
              target="_blank"
              rel="noopener noreferrer"
              class="text-blue-600 hover:underline ml-1"
            >
              Codenames Pictures by Czech Games Edition
              <FontAwesomeIcon icon="up-right-from-square" class="text-xs opacity-50 ml-1" />
            </a>
          </li>
          <li>
            <strong>Game Designer:</strong> Vlaada Chvátil
          </li>
          <li>
            <strong>Original Web App:</strong>
            <a
              href="https://github.com/samdemaeyer/codenames-pictures"
              target="_blank"
              rel="noopener noreferrer"
              class="text-blue-600 hover:underline ml-1"
            >
              samdemaeyer/codenames-pictures
              <FontAwesomeIcon icon="up-right-from-square" class="text-xs opacity-50 ml-1" />
            </a>
          </li>
        </ul>
      </div>

      <!-- Disclaimer Card -->
      <div class="bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-300 rounded-xl p-6 shadow-md mb-6">
        <h2 class="text-2xl font-bold mb-4 text-amber-800">Disclaimer</h2>
        <p class="text-gray-700 leading-relaxed">
          This is a fan-made project and is not affiliated with or endorsed by Czech Games Edition.
          If you enjoy this game, please consider purchasing the official
          <a
            href="https://czechgames.com/en/codenames-pictures/"
            target="_blank"
            rel="noopener noreferrer"
            class="text-blue-600 hover:underline"
          >
            physical version
            <FontAwesomeIcon icon="up-right-from-square" class="text-xs opacity-50 ml-1" />
          </a>
          to support the creators!
        </p>
      </div>

      <!-- Bottom CTA -->
      <div class="text-center">
        <RouterLink to="/" class="btn btn-green text-xl px-8 py-4">
          <FontAwesomeIcon icon="play" class="mr-2" />Ready to Play!
        </RouterLink>
      </div>
    </div>
  </div>
</template>
