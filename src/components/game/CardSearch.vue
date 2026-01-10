<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits<{
  search: [cardId: number]
}>()

const props = defineProps<{
  inputId?: string
}>()

const searchValue = ref('')

function handleSubmit(event: Event): void {
  event.preventDefault()
  const cardId = Number(searchValue.value)
  if (!isNaN(cardId)) {
    emit('search', cardId)
    searchValue.value = ''
  }
}
</script>

<template>
  <div class="flex flex-col items-center gap-1">
    <label :for="inputId ?? 'card-search'" class="text-xs text-gray-500">
      Enter other spymaster's key card #
    </label>
    <form class="flex" @submit="handleSubmit">
      <input
        :id="inputId ?? 'card-search'"
        v-model="searchValue"
        type="tel"
        class="h-11 w-28 rounded-l-lg rounded-r-none border border-r-0 border-gray-200 bg-white text-center text-lg focus:border-green-500 focus:outline-none"
        placeholder="Key Card #"
        name="card-id"
        maxlength="3"
      />
      <button
        type="submit"
        class="h-11 rounded-l-none rounded-r-lg bg-green-500 px-3 text-white transition-colors hover:bg-green-600"
      >
        <FontAwesomeIcon icon="magnifying-glass" />
      </button>
    </form>
  </div>
</template>
