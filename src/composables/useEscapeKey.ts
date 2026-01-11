/**
 * Close things when you hit Escape. Simple.
 */
import { onMounted, onUnmounted } from 'vue'

export function useEscapeKey(callback: () => void): void {
  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape') callback()
  }

  onMounted(() => document.addEventListener('keydown', handleKeydown))
  onUnmounted(() => document.removeEventListener('keydown', handleKeydown))
}
