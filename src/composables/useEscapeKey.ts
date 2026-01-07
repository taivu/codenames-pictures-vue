import { useEventListener } from './useEventListener'

/**
 * Composable to handle Escape key press.
 * Automatically manages event listener lifecycle.
 */
export function useEscapeKey(callback: () => void): void {
  useEventListener(document, 'keydown', (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      callback()
    }
  })
}
