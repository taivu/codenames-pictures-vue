/**
 * Close menus/modals when you click outside them.
 */
import type { Ref } from 'vue'
import { onMounted, onUnmounted } from 'vue'

export function useClickOutside(elementRef: Ref<HTMLElement | null>, callback: () => void): void {
  function handleClick(event: MouseEvent) {
    if (elementRef.value && !elementRef.value.contains(event.target as Node)) {
      callback()
    }
  }

  onMounted(() => document.addEventListener('mousedown', handleClick))
  onUnmounted(() => document.removeEventListener('mousedown', handleClick))
}
