<script setup lang="ts">
import { appConfig } from '@/config'
</script>

<template>
  <p class="block p-2 text-center text-xs text-gray-400">
    rev: {{ appConfig.version }}
    <span v-if="appConfig.buildDate"> ({{ appConfig.buildDate }})</span>
  </p>
</template>
