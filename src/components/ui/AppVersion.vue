<script setup lang="ts">
import { appConfig } from '@/config'
</script>

<template>
  <p class="text-gray-400 text-xs text-right block p-2">rev: {{ appConfig.version }}</p>
</template>
