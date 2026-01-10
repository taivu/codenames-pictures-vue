<script setup lang="ts">
import SiteLayout from '@/components/layout/SiteLayout.vue'
</script>

<template>
  <SiteLayout>
    <div class="p-4 sm:p-8">
      <div class="mx-auto max-w-4xl">
        <!-- Page Header -->
        <div class="mb-6">
          <h1>Disclaimer</h1>
        </div>

        <!-- Fan Project Notice -->
        <div
          class="mb-6 rounded-xl border-2 border-amber-300 bg-gradient-to-br from-amber-50 to-orange-50 p-6 shadow-md"
        >
          <h2 class="mb-4 text-amber-800">Fan-Made Project</h2>
          <p class="mb-4">
            This is a fan-made project and is not affiliated with, endorsed by, or connected to
            Czech Games Edition in any way. All trademarks, game mechanics, and intellectual
            property related to Codenames Pictures belong to their respective owners.
          </p>
          <p>
            This app was inspired by and built upon the
            <a
              href="https://github.com/samdemaeyer/codenames-pictures"
              target="_blank"
              rel="noopener noreferrer"
              class="external-link"
            >
              original online version
            </a>
            by samdemaeyer.
          </p>
        </div>

        <!-- Support the Creators -->
        <div
          class="mb-6 rounded-xl border-2 border-green-300 bg-gradient-to-br from-green-50 to-emerald-50 p-6 shadow-md"
        >
          <h2 class="mb-4 text-green-800">Support the Creators</h2>
          <p>
            If you enjoy playing Codenames Pictures, please consider purchasing the
            <a
              href="https://czechgames.com/en/codenames-pictures/"
              target="_blank"
              rel="noopener noreferrer"
              class="external-link"
            >official physical version</a>
            to support the original creators and designers.
          </p>
        </div>

        <!-- Usage -->
        <div class="mb-6 rounded-xl border-2 border-gray-300 bg-white/80 p-6 shadow-sm">
          <h2 class="mb-4">Usage</h2>
          <p class="mb-4">
            This web application is provided free of charge for personal, non-commercial use. It is
            intended to help friends and family play together remotely.
          </p>
          <p>
            This project is open source and available on GitHub. Contributions and feedback are
            welcome.
          </p>
        </div>

        <!-- No Warranty -->
        <div class="mb-6 rounded-xl border-2 border-gray-300 bg-white/80 p-6 shadow-sm">
          <h2 class="mb-4">No Warranty</h2>
          <p>
            This application is provided "as is" without warranty of any kind, express or implied.
            The developers are not responsible for any issues that may arise from using this
            application.
          </p>
        </div>
      </div>
    </div>
  </SiteLayout>
</template>
