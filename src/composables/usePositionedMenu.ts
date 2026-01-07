import { ref, onMounted, nextTick, type Ref } from 'vue'

/** Menu positioning configuration */
const MENU_CONFIG = {
  /** Gap between anchor element and menu */
  gap: 12,
  /** Padding from viewport edges */
  viewportPadding: 8,
  /** Arrow size for offset calculations */
  arrowSize: 10,
  /** Arrow offset from edge (in CSS) */
  arrowOffset: 18,
  /** Minimum arrow distance from menu edge */
  arrowMinOffset: 12,
} as const

export type ArrowPosition = 'left' | 'right' | 'top' | 'bottom'

interface PositionedMenuOptions {
  /** Callback when positioning is complete */
  onPositioned?: () => void
}

/**
 * Composable for positioning a dropdown menu relative to an anchor element.
 * Automatically handles viewport boundaries and arrow positioning.
 */
export function usePositionedMenu(
  menuRef: Ref<HTMLElement | null>,
  anchorRef: Ref<HTMLElement | null>,
  options: PositionedMenuOptions = {}
) {
  const positionStyle = ref<Record<string, string>>({})
  const arrowPosition = ref<ArrowPosition>('left')
  const arrowOffset = ref(0)
  const arrowStyle = ref<Record<string, string>>({})

  function calculatePosition(): void {
    if (!menuRef.value || !anchorRef.value) return

    const anchorRect = anchorRef.value.getBoundingClientRect()
    const menuRect = menuRef.value.getBoundingClientRect()
    const { height: menuHeight, width: menuWidth } = menuRect
    const viewportHeight = window.innerHeight
    const viewportWidth = window.innerWidth
    const {
      gap,
      viewportPadding,
      arrowSize,
      arrowOffset: arrowCssOffset,
      arrowMinOffset,
    } = MENU_CONFIG

    let top = 0
    let left = 0

    // Try positioning to the right of the anchor
    if (anchorRect.right + gap + menuWidth < viewportWidth - viewportPadding) {
      left = anchorRect.right + gap
      top = anchorRect.top + (anchorRect.height - menuHeight) / 2
      arrowPosition.value = 'left'
    }
    // Try positioning to the left of the anchor
    else if (anchorRect.left - gap - menuWidth > viewportPadding) {
      left = anchorRect.left - gap - menuWidth
      top = anchorRect.top + (anchorRect.height - menuHeight) / 2
      arrowPosition.value = 'right'
    }
    // Try positioning below the anchor
    else if (anchorRect.bottom + gap + menuHeight < viewportHeight - viewportPadding) {
      top = anchorRect.bottom + gap
      left = anchorRect.left + (anchorRect.width - menuWidth) / 2
      arrowPosition.value = 'top'
    }
    // Position above the anchor
    else {
      top = anchorRect.top - gap - menuHeight
      left = anchorRect.left + (anchorRect.width - menuWidth) / 2
      arrowPosition.value = 'bottom'
    }

    // Keep menu within viewport bounds
    top = Math.max(viewportPadding, Math.min(viewportHeight - viewportPadding - menuHeight, top))
    left = Math.max(viewportPadding, Math.min(viewportWidth - viewportPadding - menuWidth, left))

    // Calculate arrow offset to point to anchor center
    if (arrowPosition.value === 'left' || arrowPosition.value === 'right') {
      const anchorCenterY = anchorRect.top + anchorRect.height / 2
      arrowOffset.value = Math.max(
        arrowMinOffset,
        Math.min(menuHeight - arrowMinOffset, anchorCenterY - top)
      )
    } else {
      const anchorCenterX = anchorRect.left + anchorRect.width / 2
      arrowOffset.value = Math.max(
        arrowMinOffset,
        Math.min(menuWidth - arrowMinOffset, anchorCenterX - left)
      )
    }

    positionStyle.value = {
      top: `${top}px`,
      left: `${left}px`,
    }

    // Set arrow style based on position
    const arrowTopOffset = `${arrowOffset.value - arrowSize}px`
    const arrowLeftOffset = `${arrowOffset.value - arrowSize}px`
    const arrowCssOffsetPx = `-${arrowCssOffset}px`

    switch (arrowPosition.value) {
      case 'left':
        arrowStyle.value = { left: arrowCssOffsetPx, top: arrowTopOffset }
        break
      case 'right':
        arrowStyle.value = { right: arrowCssOffsetPx, top: arrowTopOffset }
        break
      case 'top':
        arrowStyle.value = { top: arrowCssOffsetPx, left: arrowLeftOffset }
        break
      case 'bottom':
        arrowStyle.value = { bottom: arrowCssOffsetPx, left: arrowLeftOffset }
        break
    }

    options.onPositioned?.()
  }

  onMounted(async () => {
    await nextTick()
    calculatePosition()
  })

  return {
    positionStyle,
    arrowPosition,
    arrowOffset,
    arrowStyle,
    recalculate: calculatePosition,
  }
}
