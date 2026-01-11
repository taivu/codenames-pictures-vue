<script setup lang="ts">
/**
 * ConfirmModal - Reusable confirmation dialog with cancel/confirm actions.
 */
import type { ButtonColor } from './BaseButton.vue'
import BaseModal from './BaseModal.vue'
import BaseButton from './BaseButton.vue'

interface Props {
  title: string
  message: string
  icon?: string
  confirmText?: string
  cancelText?: string
  confirmColor?: ButtonColor
}

withDefaults(defineProps<Props>(), {
  icon: 'triangle-exclamation',
  confirmText: 'Confirm',
  cancelText: 'Cancel',
  confirmColor: 'red',
})

defineEmits<{
  confirm: []
  cancel: []
}>()
</script>

<template>
  <BaseModal :title="title" :icon="icon" @close="$emit('cancel')">
    <p class="mb-6 text-gray-600">{{ message }}</p>
    <div class="flex justify-end gap-3">
      <BaseButton variant="ghost" @click="$emit('cancel')">
        {{ cancelText }}
      </BaseButton>
      <BaseButton :color="confirmColor" @click="$emit('confirm')">
        {{ confirmText }}
      </BaseButton>
    </div>
  </BaseModal>
</template>
