<script setup lang="ts">
import { IconButton } from '@/components/ui'

defineEmits<{
  click: [event: MouseEvent]
}>()
</script>

<template>
  <IconButton
    icon="bars"
    size="lg"
    variant="primary"
    label="Open menu"
    @click="$emit('click', $event)"
  />
</template>
