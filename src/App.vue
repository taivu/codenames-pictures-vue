<script setup lang="ts">
import { RouterView } from 'vue-router'
import { AppVersion } from '@/components/ui'
</script>

<template>
  <div class="min-h-dvh flex flex-col">
    <main class="flex-1">
      <RouterView />
    </main>
    <footer class="">
      <AppVersion />
    </footer>
  </div>
</template>
