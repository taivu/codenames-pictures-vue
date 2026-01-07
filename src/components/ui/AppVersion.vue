<script setup lang="ts">
import { appConfig } from '@/config'
</script>

<template>
  <p class="block p-2 text-right text-xs text-gray-400">rev: {{ appConfig.version }}</p>
</template>
