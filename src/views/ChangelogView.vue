<script setup lang="ts">
/**
 * ChangelogView - Version history page with styled changelog cards.
 */
import SiteLayout from '@/components/layout/SiteLayout.vue'
import { ChangelogCard } from '@/components/ui'
</script>

<template>
  <SiteLayout>
    <div class="p-4 sm:p-8">
      <div class="mx-auto max-w-4xl">
        <div class="mb-6">
          <h1>Changelog</h1>
        </div>
        <ChangelogCard />
      </div>
    </div>
  </SiteLayout>
</template>
