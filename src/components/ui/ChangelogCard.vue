<script setup lang="ts">
import { marked } from 'marked'
import DOMPurify from 'dompurify'
import changelogMd from '../../../CHANGELOG.md?raw'

// Parse markdown to HTML (skip the h1 title) and sanitize
const rawHtml = marked.parse(changelogMd.replace(/^# Changelog\n+/, ''))
const changelogHtml = DOMPurify.sanitize(rawHtml as string)
</script>

<template>
  <div class="rounded-xl border-2 border-gray-300 bg-white/80 p-6 shadow-sm">
    <h2 class="mb-4">Changelog</h2>
    <div class="changelog-content" v-html="changelogHtml" />
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
