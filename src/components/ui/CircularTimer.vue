<script setup lang="ts">
/**
 * CircularTimer - SVG circular progress indicator for pressure mode countdown.
 */
import { computed } from 'vue'

interface Props {
  progress: number // 0 to 1 (1 = full, 0 = empty)
  isCaution?: boolean // Orange at 50%
  isWarning?: boolean // Red at 25%
  size?: number
  strokeWidth?: number
  showTime?: boolean
  formattedTime?: string
  isPaused?: boolean
  showPlayPause?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  isCaution: false,
  isWarning: false,
  size: 48,
  strokeWidth: 4,
  showTime: false,
  formattedTime: '',
  isPaused: false,
  showPlayPause: false,
})

const radius = computed(() => (props.size - props.strokeWidth) / 2)
const circumference = computed(() => 2 * Math.PI * radius.value)
const offset = computed(() => circumference.value * (1 - props.progress))
const center = computed(() => props.size / 2)

// Color: purple -> orange -> red
const colorClass = computed(() => {
  if (props.isWarning) return 'stroke-red-500'
  if (props.isCaution) return 'stroke-orange-500'
  return 'stroke-purple-500'
})

const iconColorClass = computed(() => {
  if (props.isWarning) return 'text-red-500'
  if (props.isCaution) return 'text-orange-500'
  return 'text-purple-500'
})
</script>

<template>
  <div class="relative inline-flex items-center justify-center">
    <svg :width="size" :height="size" class="-rotate-90 transform">
      <!-- Background circle -->
      <circle
        :cx="center"
        :cy="center"
        :r="radius"
        fill="none"
        :stroke-width="strokeWidth"
        class="stroke-gray-200"
      />
      <!-- Progress circle -->
      <circle
        :cx="center"
        :cy="center"
        :r="radius"
        fill="none"
        :stroke-width="strokeWidth"
        :stroke-dasharray="circumference"
        :stroke-dashoffset="offset"
        stroke-linecap="round"
        :class="['transition-all duration-300', colorClass]"
      />
    </svg>
    <!-- Play/Pause icon overlay -->
    <span
      v-if="showPlayPause"
      :class="['absolute inset-0 flex items-center justify-center', iconColorClass]"
    >
      <FontAwesomeIcon
        :icon="isPaused ? 'play' : 'pause'"
        :style="{ fontSize: `${size * 0.35}px` }"
      />
    </span>
    <!-- Time display overlay -->
    <span
      v-else-if="showTime && formattedTime"
      :class="[
        'absolute inset-0 flex items-center justify-center text-xs font-bold',
        isWarning ? 'text-red-600' : 'text-gray-700',
      ]"
    >
      {{ formattedTime }}
    </span>
  </div>
</template>
