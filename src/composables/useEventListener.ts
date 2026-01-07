import { onMounted, onUnmounted } from 'vue'

/**
 * Composable that manages event listener lifecycle automatically.
 * Adds listener on mount and removes on unmount.
 */
export function useEventListener<K extends keyof DocumentEventMap>(
  target: Document | Window,
  event: K,
  callback: (e: DocumentEventMap[K]) => void
): void {
  onMounted(() => {
    target.addEventListener(event, callback as EventListener)
  })

  onUnmounted(() => {
    target.removeEventListener(event, callback as EventListener)
  })
}
