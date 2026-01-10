<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { marked } from 'marked'
import DOMPurify from 'dompurify'
import changelogMd from '../../CHANGELOG.md?raw'
import SiteLayout from '@/components/layout/SiteLayout.vue'

// Parse markdown to HTML (skip the h1 title) and sanitize
const rawHtml = marked.parse(changelogMd.replace(/^# Changelog\n+/, ''))
const changelogHtml = DOMPurify.sanitize(rawHtml as string)
</script>

<template>
  <SiteLayout>
    <div class="p-4 sm:p-8">
      <div class="mx-auto max-w-4xl">
        <!-- Page Header -->
        <div class="mb-6">
          <RouterLink to="/" class="mb-4 inline-block text-blue-600 hover:underline">
            <FontAwesomeIcon icon="arrow-left" class="mr-1" />Back to Home
          </RouterLink>
          <h1 class="text-3xl font-bold sm:text-4xl">About</h1>
        </div>

        <!-- About Card -->
        <div class="mb-6 rounded-xl border-2 border-gray-300 bg-white/80 p-6 shadow-sm">
          <h2 class="mb-4 text-2xl font-bold">What is this?</h2>
          <p class="mb-4 leading-relaxed text-gray-700">
            This is an unofficial online version of Codenames Pictures, a party game designed by
            Vlaada Chvátil and published by Czech Games Edition.
          </p>
          <p class="leading-relaxed text-gray-700">
            This web app allows you to play Codenames Pictures remotely with friends and family.
            Simply share your screen or send the spy master card link to play together!
          </p>
        </div>

        <!-- Tai Version Story -->
        <div
          class="mb-6 rounded-xl border-2 border-green-300 bg-gradient-to-br from-green-50 to-emerald-50 p-6 shadow-md"
        >
          <h2 class="mb-4 text-2xl font-bold text-green-800">
            Uhh, why is this game on your site Tai?
          </h2>
          <div class="space-y-4 leading-relaxed text-gray-700">
            <p>
              Picture this: family trip in Florida, everyone's hyped to play Codenames: Pictures.
              There's just one problem &mdash; a hurricane is barreling toward us and
              <em>every single store</em>
              in the area is sold out. Disaster? Not yet. I found an online version, pulled it up on
              an iPad, and mirrored it to the Airbnb TV. Crisis averted... or so I thought.
            </p>
            <p>
              Turns out the site wasn't built for mobile. At all. We couldn't even mark the cards
              red or blue. So what did we do? We grabbed post-it notes and started slapping them on
              the TV like cavemen. Honestly? Everyone still had a blast. And of course, we wanted to
              play again the next night.
            </p>
            <p>
              But I couldn't let it go. The frustration was real. I tracked down the original GitHub
              repo, saw it was open source, and thought: <em>"Fine. I'll fix it myself."</em>
              The twist? I did it entirely on my iPhone. Forked the repo, edited code through
              GitHub's web interface, deployed to Netlify, and hooked it up to my domain &mdash; all
              from my phone. No laptop, no desktop, just me, my phone, and pure stubbornness. Did
              this after shooting water guns in the pool with the kids, and still had plenty of time
              to enjoy the rest of the day before evening game night. It was painful, but I got it
              working well enough to play without post-it notes for the rest of the trip.
            </p>
            <p>
              While I was at it, I squashed some bugs and overhauled the card randomizer &mdash; the
              original kept dealing the same cards over and over like a broken deck.
            </p>
            <p>
              Over time, I kept tinkering. I made my own UI/UX choices to make things easier and
              more fun when friends and family play together. Eventually, I did a complete rewrite
              in Vue and Vite &mdash; nothing against React, I just prefer working with Vue.
            </p>
            <p>
              The best part? Hearing ideas, bugs, and suggestions from the people who actually play.
              There's something special about building something that brings people together for
              game night.
            </p>
            <p class="font-bold text-green-700">
              And you know what? It's a
              <RouterLink to="/play" class="underline hover:text-green-900"
                >pretty fun way to play!</RouterLink
              >
            </p>
          </div>
        </div>

        <!-- Changelog -->
        <div class="mb-6 rounded-xl border-2 border-gray-300 bg-white/80 p-6 shadow-sm">
          <h2 class="mb-4 text-2xl font-bold">Changelog</h2>
          <div class="changelog-content" v-html="changelogHtml" />
        </div>

        <!-- Credits Card -->
        <div
          class="mb-6 rounded-xl border-2 border-blue-300 bg-gradient-to-br from-blue-50 to-indigo-50 p-6 shadow-md"
        >
          <h2 class="mb-4 text-2xl font-bold text-blue-800">Credits</h2>
          <ul class="space-y-3 text-gray-700">
            <li>
              <strong>Original Game:</strong>
              <a
                href="https://czechgames.com/en/codenames-pictures/"
                target="_blank"
                rel="noopener noreferrer"
                class="ml-1 text-blue-600 hover:underline"
              >
                Codenames Pictures by Czech Games Edition
                <FontAwesomeIcon icon="up-right-from-square" class="ml-1 text-xs opacity-50" />
              </a>
            </li>
            <li><strong>Game Designer:</strong> Vlaada Chvátil</li>
            <li>
              <strong>Original Web App:</strong>
              <a
                href="https://github.com/samdemaeyer/codenames-pictures"
                target="_blank"
                rel="noopener noreferrer"
                class="ml-1 text-blue-600 hover:underline"
              >
                samdemaeyer/codenames-pictures
                <FontAwesomeIcon icon="up-right-from-square" class="ml-1 text-xs opacity-50" />
              </a>
            </li>
          </ul>
        </div>

        <!-- Disclaimer Card -->
        <div
          class="mb-6 rounded-xl border-2 border-amber-300 bg-gradient-to-br from-amber-50 to-orange-50 p-6 shadow-md"
        >
          <h2 class="mb-4 text-2xl font-bold text-amber-800">Disclaimer</h2>
          <p class="leading-relaxed text-gray-700">
            This is a fan-made project and is not affiliated with or endorsed by Czech Games
            Edition. If you enjoy this game, please consider purchasing the official
            <a
              href="https://czechgames.com/en/codenames-pictures/"
              target="_blank"
              rel="noopener noreferrer"
              class="text-blue-600 hover:underline"
            >
              physical version
              <FontAwesomeIcon icon="up-right-from-square" class="ml-1 text-xs opacity-50" />
            </a>
            to support the creators!
          </p>
        </div>

        <!-- Bottom CTA -->
        <div class="text-center">
          <RouterLink to="/" class="btn btn-green px-8 py-4 text-xl">
            <FontAwesomeIcon icon="play" class="mr-2" />Ready to Play!
          </RouterLink>
        </div>
      </div>
    </div>
  </SiteLayout>
</template>

<style scoped>
.changelog-content :deep(h2) {
  font-weight: 700;
  color: #1f2937;
  margin-top: 1rem;
  margin-bottom: 0.5rem;
}

.changelog-content :deep(h2:first-child) {
  margin-top: 0;
}

.changelog-content :deep(ul) {
  list-style-type: disc;
  list-style-position: inside;
  color: #374151;
  font-size: 0.875rem;
  margin-left: 0.5rem;
  margin-bottom: 1rem;
}

.changelog-content :deep(li) {
  margin-bottom: 0.25rem;
}
</style>
