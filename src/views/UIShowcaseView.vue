<script setup lang="ts">
/**
 * UIShowcaseView - Demonstrates all reusable UI components.
 */
import SiteLayout from '@/components/layout/SiteLayout.vue'
import { BaseButton, IconButton, ToggleSwitch, BaseBadge } from '@/components/ui'

const colors = ['blue', 'green', 'red', 'rose', 'orange', 'amber', 'purple', 'gray'] as const
const buttonVariants = ['primary', 'secondary', 'ghost', 'subtle', 'outline', 'glass'] as const
const iconButtonVariants = ['primary', 'secondary', 'ghost', 'subtle', 'glass'] as const
const sizes = ['xs', 'sm', 'md', 'lg'] as const
const toggleColors = ['green', 'orange', 'blue', 'purple'] as const
const badgeVariants = ['default', 'success', 'warning', 'danger'] as const
</script>

<template>
  <SiteLayout>
    <div class="mx-auto max-w-5xl space-y-12 px-4 py-8">
      <h1 class="text-3xl font-bold text-gray-800">UI Components</h1>

      <!-- BaseButton -->
      <section class="space-y-6">
        <h2 class="text-2xl font-semibold text-gray-700">BaseButton</h2>

        <!-- Variants -->
        <div class="space-y-3">
          <h3 class="text-lg font-medium text-gray-600">Variants</h3>
          <div class="flex flex-wrap gap-2">
            <BaseButton v-for="variant in buttonVariants" :key="variant" :variant="variant" color="blue">
              {{ variant }}
            </BaseButton>
          </div>
          <pre class="rounded-lg bg-gray-100 p-3 text-sm text-gray-700">&lt;BaseButton variant="primary|secondary|ghost|subtle|outline|glass" color="blue"&gt;</pre>
        </div>

        <!-- Colors -->
        <div class="space-y-3">
          <h3 class="text-lg font-medium text-gray-600">Colors</h3>
          <div class="flex flex-wrap gap-2">
            <BaseButton v-for="color in colors" :key="color" :color="color">
              {{ color }}
            </BaseButton>
          </div>
          <div class="flex flex-wrap gap-2">
            <BaseButton v-for="color in colors" :key="color" :color="color" variant="secondary">
              {{ color }}
            </BaseButton>
          </div>
          <div class="flex flex-wrap gap-2">
            <BaseButton v-for="color in colors" :key="color" :color="color" variant="outline">
              {{ color }}
            </BaseButton>
          </div>
          <pre class="rounded-lg bg-gray-100 p-3 text-sm text-gray-700">&lt;BaseButton color="blue|green|red|orange|amber|purple|gray"&gt;</pre>
        </div>

        <!-- Sizes -->
        <div class="space-y-3">
          <h3 class="text-lg font-medium text-gray-600">Sizes</h3>
          <div class="flex flex-wrap items-center gap-2">
            <BaseButton v-for="size in sizes" :key="size" :size="size" color="green">
              {{ size }}
            </BaseButton>
          </div>
          <pre class="rounded-lg bg-gray-100 p-3 text-sm text-gray-700">&lt;BaseButton size="xs|sm|md|lg"&gt;</pre>
        </div>

        <!-- Rounded -->
        <div class="space-y-3">
          <h3 class="text-lg font-medium text-gray-600">Rounded</h3>
          <div class="flex flex-wrap items-center gap-2">
            <BaseButton rounded="lg" color="purple">rounded-lg</BaseButton>
            <BaseButton rounded="full" color="purple">rounded-full</BaseButton>
          </div>
          <pre class="rounded-lg bg-gray-100 p-3 text-sm text-gray-700">&lt;BaseButton rounded="lg|full"&gt;</pre>
        </div>

        <!-- With Icons -->
        <div class="space-y-3">
          <h3 class="text-lg font-medium text-gray-600">With Icons</h3>
          <div class="flex flex-wrap items-center gap-2">
            <BaseButton color="green">
              <FontAwesomeIcon icon="play" />
              Play
            </BaseButton>
            <BaseButton color="red" variant="secondary">
              <FontAwesomeIcon icon="trash" />
              Delete
            </BaseButton>
            <BaseButton color="blue" variant="outline" rounded="full">
              <FontAwesomeIcon icon="book" />
              Read more
            </BaseButton>
          </div>
        </div>

        <!-- As RouterLink -->
        <div class="space-y-3">
          <h3 class="text-lg font-medium text-gray-600">As RouterLink</h3>
          <div class="flex flex-wrap items-center gap-2">
            <BaseButton to="/rules" variant="outline" rounded="full" size="sm">
              <FontAwesomeIcon icon="book" />
              Go to Rules
            </BaseButton>
            <BaseButton to="/" color="green" variant="secondary">
              <FontAwesomeIcon icon="house" />
              Home
            </BaseButton>
          </div>
          <pre class="rounded-lg bg-gray-100 p-3 text-sm text-gray-700">&lt;BaseButton to="/rules" variant="outline"&gt;</pre>
        </div>

        <!-- Disabled -->
        <div class="space-y-3">
          <h3 class="text-lg font-medium text-gray-600">Disabled</h3>
          <div class="flex flex-wrap items-center gap-2">
            <BaseButton color="blue" disabled>Disabled</BaseButton>
            <BaseButton color="green" variant="secondary" disabled>Disabled</BaseButton>
            <BaseButton color="red" variant="outline" disabled>Disabled</BaseButton>
          </div>
          <pre class="rounded-lg bg-gray-100 p-3 text-sm text-gray-700">&lt;BaseButton disabled&gt;</pre>
        </div>
      </section>

      <!-- IconButton -->
      <section class="space-y-6">
        <h2 class="text-2xl font-semibold text-gray-700">IconButton</h2>

        <!-- Variants -->
        <div class="space-y-3">
          <h3 class="text-lg font-medium text-gray-600">Variants</h3>
          <div class="flex flex-wrap gap-2">
            <IconButton v-for="variant in iconButtonVariants" :key="variant" icon="gear" :variant="variant" color="blue" />
          </div>
          <pre class="rounded-lg bg-gray-100 p-3 text-sm text-gray-700">&lt;IconButton icon="gear" variant="primary|secondary|ghost|subtle|glass"&gt;</pre>
        </div>

        <!-- Colors -->
        <div class="space-y-3">
          <h3 class="text-lg font-medium text-gray-600">Colors (secondary variant)</h3>
          <div class="flex flex-wrap gap-2">
            <IconButton v-for="color in colors" :key="color" icon="star" :color="color" variant="secondary" />
          </div>
          <pre class="rounded-lg bg-gray-100 p-3 text-sm text-gray-700">&lt;IconButton icon="star" color="..." variant="secondary"&gt;</pre>
        </div>

        <!-- Sizes -->
        <div class="space-y-3">
          <h3 class="text-lg font-medium text-gray-600">Sizes</h3>
          <div class="flex flex-wrap items-center gap-2">
            <IconButton v-for="size in sizes" :key="size" icon="plus" :size="size" color="green" variant="primary" />
          </div>
          <pre class="rounded-lg bg-gray-100 p-3 text-sm text-gray-700">&lt;IconButton size="xs|sm|md|lg"&gt;</pre>
        </div>

        <!-- Common Icons -->
        <div class="space-y-3">
          <h3 class="text-lg font-medium text-gray-600">Common Uses</h3>
          <div class="flex flex-wrap items-center gap-2">
            <IconButton icon="xmark" variant="ghost" label="Close" />
            <IconButton icon="trash" color="red" variant="secondary" label="Delete" />
            <IconButton icon="gear" variant="subtle" label="Settings" />
            <IconButton icon="shuffle" color="amber" variant="secondary" label="Shuffle" />
            <IconButton icon="user-secret" color="blue" variant="secondary" label="Spymaster" />
            <IconButton icon="bars" variant="glass" label="Menu" />
          </div>
        </div>

        <!-- With Text -->
        <div class="space-y-3">
          <h3 class="text-lg font-medium text-gray-600">With Text</h3>
          <div class="flex flex-wrap items-center gap-2">
            <IconButton icon="play" color="green">Play</IconButton>
            <IconButton icon="trash" color="red" variant="secondary">Delete</IconButton>
            <IconButton icon="gear" variant="ghost">Settings</IconButton>
            <IconButton icon="shuffle" color="amber" variant="primary">Shuffle</IconButton>
          </div>
          <pre class="rounded-lg bg-gray-100 p-3 text-sm text-gray-700">&lt;IconButton icon="play" color="green"&gt;Play&lt;/IconButton&gt;</pre>
        </div>
      </section>

      <!-- ToggleSwitch -->
      <section class="space-y-6">
        <h2 class="text-2xl font-semibold text-gray-700">ToggleSwitch</h2>

        <div class="space-y-3">
          <h3 class="text-lg font-medium text-gray-600">Colors</h3>
          <div class="flex flex-wrap items-center gap-4">
            <div v-for="color in toggleColors" :key="color" class="flex items-center gap-2">
              <ToggleSwitch default-value :active-color="color" />
              <span class="text-sm text-gray-600">{{ color }}</span>
            </div>
          </div>
          <pre class="rounded-lg bg-gray-100 p-3 text-sm text-gray-700">&lt;ToggleSwitch v-model="value" active-color="green|orange|blue|purple"&gt;</pre>
        </div>

        <div class="space-y-3">
          <h3 class="text-lg font-medium text-gray-600">Disabled</h3>
          <div class="flex flex-wrap items-center gap-4">
            <ToggleSwitch :model-value="true" disabled />
            <ToggleSwitch :model-value="false" disabled />
          </div>
          <pre class="rounded-lg bg-gray-100 p-3 text-sm text-gray-700">&lt;ToggleSwitch disabled&gt;</pre>
        </div>
      </section>

      <!-- BaseBadge -->
      <section class="space-y-6">
        <h2 class="text-2xl font-semibold text-gray-700">BaseBadge</h2>

        <div class="space-y-3">
          <h3 class="text-lg font-medium text-gray-600">Variants</h3>
          <div class="flex flex-wrap items-center gap-2">
            <BaseBadge v-for="variant in badgeVariants" :key="variant" :variant="variant">
              {{ variant }}
            </BaseBadge>
          </div>
          <pre class="rounded-lg bg-gray-100 p-3 text-sm text-gray-700">&lt;BaseBadge variant="default|success|warning|danger"&gt;</pre>
        </div>

        <div class="space-y-3">
          <h3 class="text-lg font-medium text-gray-600">With Numbers</h3>
          <div class="flex flex-wrap items-center gap-2">
            <BaseBadge>5</BaseBadge>
            <BaseBadge variant="success">12</BaseBadge>
            <BaseBadge variant="warning">3</BaseBadge>
            <BaseBadge variant="danger">!</BaseBadge>
          </div>
        </div>
      </section>
    </div>
  </SiteLayout>
</template>
