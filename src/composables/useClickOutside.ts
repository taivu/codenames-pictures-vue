import type { Ref } from 'vue'
import { useEventListener } from './useEventListener'

export function useClickOutside(elementRef: Ref<HTMLElement | null>, callback: () => void): void {
  useEventListener(document, 'mousedown', (event: MouseEvent) => {
    if (elementRef.value && !elementRef.value.contains(event.target as Node)) {
      callback()
    }
  })
}
