<script setup lang="ts">
/**
 * ChangelogCard - Renders changelog markdown as styled cards per version.
 */
import { marked } from 'marked'
import DOMPurify from 'dompurify'
import changelogMd from '../../../CHANGELOG.md?raw'

// Remove the h1 title and split by h2 sections
const content = changelogMd.replace(/^# Changelog\n+/, '')
const sections = content.split(/(?=^## )/m).filter((s) => s.trim())

// Parse each section into a card
const cards = sections.map((section) => {
  const titleMatch = section.match(/^## (.+)\n/)
  const title = titleMatch ? titleMatch[1] : 'Update'
  const body = section.replace(/^## .+\n+/, '')
  const rawHtml = marked.parse(body)
  const html = DOMPurify.sanitize(rawHtml as string)
  return { title, html }
})
</script>

<template>
  <div class="space-y-6">
    <div
      v-for="(card, index) in cards"
      :key="index"
      class="rounded-xl border-2 border-gray-300 bg-white/80 p-6 shadow-sm"
    >
      <h2 class="mb-4">{{ card.title }}</h2>
      <div class="changelog-content" v-html="card.html" />
    </div>
  </div>
</template>

<style scoped>
/* Markdown content spacing - typography inherited from global styles */
.changelog-content :deep(h2) {
  color: #1f2937;
  margin-top: 1.5rem;
  margin-bottom: 0.5rem;
}

.changelog-content :deep(h2:first-child) {
  margin-top: 0;
}

.changelog-content :deep(h3) {
  color: #374151;
  margin-top: 1rem;
  margin-bottom: 0.25rem;
}

.changelog-content :deep(p) {
  margin-bottom: 0.5rem;
}

.changelog-content :deep(ul) {
  list-style-type: disc;
  list-style-position: inside;
  margin-left: 0.5rem;
  margin-bottom: 1rem;
}

.changelog-content :deep(li) {
  margin-bottom: 0.25rem;
}
</style>
