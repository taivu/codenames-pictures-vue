<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { appConfig } from '@/config'
</script>

<template>
  <p class="block p-2 text-center text-xs text-gray-400">
    <RouterLink to="/changelog" class="hover:text-gray-600 hover:underline">
      rev: {{ appConfig.version }}
    </RouterLink>
    <span v-if="appConfig.buildDate"> ({{ appConfig.buildDate }})</span>
  </p>
</template>
