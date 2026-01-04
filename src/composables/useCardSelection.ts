import { ref } from 'vue'
import type { Card } from '@/types'

export function useCardSelection() {
  const activeCardId = ref<number | null>(null)
  const menuPosition = ref({ x: 0, y: 0 })

  function openMenu(card: Card, event: MouseEvent): void {
    event.preventDefault()
    activeCardId.value = card.id
    menuPosition.value = { x: event.clientX, y: event.clientY }
  }

  function closeMenu(): void {
    activeCardId.value = null
  }

  function isMenuOpen(cardId: number): boolean {
    return activeCardId.value === cardId
  }

  return {
    activeCardId,
    menuPosition,
    openMenu,
    closeMenu,
    isMenuOpen,
  }
}
