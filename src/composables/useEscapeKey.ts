import { onMounted, onUnmounted } from 'vue'

/**
 * Composable to handle Escape key press.
 * Automatically manages event listener lifecycle.
 */
export function useEscapeKey(callback: () => void): void {
  function handleKeydown(e: KeyboardEvent): void {
    if (e.key === 'Escape') {
      callback()
    }
  }

  onMounted(() => {
    document.addEventListener('keydown', handleKeydown)
  })

  onUnmounted(() => {
    document.removeEventListener('keydown', handleKeydown)
  })
}
