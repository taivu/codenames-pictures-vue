import { ref, onMounted, onUnmounted, type Ref } from 'vue'

interface SwipeOptions {
  threshold?: number
  edgeSize?: number
  onSwipeLeft?: () => void
  onSwipeRight?: () => void
  onSwipeUp?: () => void
  onSwipeDown?: () => void
}

interface SwipeState {
  startX: number
  startY: number
  startTime: number
}

export function useSwipeGesture(
  targetRef: Ref<HTMLElement | null>,
  options: SwipeOptions = {}
) {
  const {
    threshold = 50,
    onSwipeLeft,
    onSwipeRight,
    onSwipeUp,
    onSwipeDown
  } = options

  const isSwiping = ref(false)
  const swipeState = ref<SwipeState | null>(null)

  function handleTouchStart(e: TouchEvent) {
    const touch = e.touches[0]
    if (!touch) return
    swipeState.value = {
      startX: touch.clientX,
      startY: touch.clientY,
      startTime: Date.now()
    }
    isSwiping.value = true
  }

  function handleTouchEnd(e: TouchEvent) {
    if (!swipeState.value || !isSwiping.value) return

    const touch = e.changedTouches[0]
    if (!touch) return
    const deltaX = touch.clientX - swipeState.value.startX
    const deltaY = touch.clientY - swipeState.value.startY
    const deltaTime = Date.now() - swipeState.value.startTime

    // Only register swipe if it was quick enough (under 300ms) or long enough distance
    if (deltaTime > 500 && Math.abs(deltaX) < threshold * 2 && Math.abs(deltaY) < threshold * 2) {
      reset()
      return
    }

    const absX = Math.abs(deltaX)
    const absY = Math.abs(deltaY)

    // Determine if horizontal or vertical swipe
    if (absX > absY && absX > threshold) {
      if (deltaX > 0) {
        onSwipeRight?.()
      } else {
        onSwipeLeft?.()
      }
    } else if (absY > absX && absY > threshold) {
      if (deltaY > 0) {
        onSwipeDown?.()
      } else {
        onSwipeUp?.()
      }
    }

    reset()
  }

  function handleTouchCancel() {
    reset()
  }

  function reset() {
    isSwiping.value = false
    swipeState.value = null
  }

  onMounted(() => {
    const el = targetRef.value
    if (!el) return

    el.addEventListener('touchstart', handleTouchStart, { passive: true })
    el.addEventListener('touchend', handleTouchEnd, { passive: true })
    el.addEventListener('touchcancel', handleTouchCancel, { passive: true })
  })

  onUnmounted(() => {
    const el = targetRef.value
    if (!el) return

    el.removeEventListener('touchstart', handleTouchStart)
    el.removeEventListener('touchend', handleTouchEnd)
    el.removeEventListener('touchcancel', handleTouchCancel)
  })

  return {
    isSwiping
  }
}

// Hook for detecting edge swipes (useful for opening drawers)
export function useEdgeSwipe(options: {
  edge: 'left' | 'right'
  edgeSize?: number
  threshold?: number
  onSwipe: () => void
}) {
  const { edge, edgeSize = 20, threshold = 50, onSwipe } = options

  let startX = 0
  let startY = 0
  let isEdgeSwipe = false

  function handleTouchStart(e: TouchEvent) {
    const touch = e.touches[0]
    if (!touch) return
    startX = touch.clientX
    startY = touch.clientY

    const windowWidth = window.innerWidth

    if (edge === 'right' && startX > windowWidth - edgeSize) {
      isEdgeSwipe = true
    } else if (edge === 'left' && startX < edgeSize) {
      isEdgeSwipe = true
    } else {
      isEdgeSwipe = false
    }
  }

  function handleTouchEnd(e: TouchEvent) {
    if (!isEdgeSwipe) return

    const touch = e.changedTouches[0]
    if (!touch) return
    const deltaX = touch.clientX - startX
    const deltaY = touch.clientY - startY
    const absX = Math.abs(deltaX)
    const absY = Math.abs(deltaY)

    // Must be primarily horizontal and exceed threshold
    if (absX > absY && absX > threshold) {
      if (edge === 'right' && deltaX < 0) {
        // Swipe left from right edge
        onSwipe()
      } else if (edge === 'left' && deltaX > 0) {
        // Swipe right from left edge
        onSwipe()
      }
    }

    isEdgeSwipe = false
  }

  onMounted(() => {
    document.addEventListener('touchstart', handleTouchStart, { passive: true })
    document.addEventListener('touchend', handleTouchEnd, { passive: true })
  })

  onUnmounted(() => {
    document.removeEventListener('touchstart', handleTouchStart)
    document.removeEventListener('touchend', handleTouchEnd)
  })
}
