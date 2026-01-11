/**
 * Swipe gesture detection for touch devices.
 */
import { ref, onMounted, onUnmounted, type Ref } from 'vue'

/**
 * Detect swipe gestures on an element. Pass a ref to the element and
 * callbacks for each direction you care about.
 */
export function useSwipeGesture(
  targetRef: Ref<HTMLElement | null>,
  options: {
    threshold?: number
    onSwipeLeft?: () => void
    onSwipeRight?: () => void
    onSwipeUp?: () => void
    onSwipeDown?: () => void
  } = {}
) {
  const { threshold = 50, onSwipeLeft, onSwipeRight, onSwipeUp, onSwipeDown } = options

  const isSwiping = ref(false)
  let startX = 0
  let startY = 0
  let startTime = 0

  function handleTouchStart(e: TouchEvent) {
    const touch = e.touches[0]
    if (!touch) return
    startX = touch.clientX
    startY = touch.clientY
    startTime = Date.now()
    isSwiping.value = true
  }

  function handleTouchEnd(e: TouchEvent) {
    if (!isSwiping.value) return

    const touch = e.changedTouches[0]
    if (!touch) return

    const deltaX = touch.clientX - startX
    const deltaY = touch.clientY - startY
    const deltaTime = Date.now() - startTime

    // Ignore slow drags (> 500ms) that are also short
    if (deltaTime > 500 && Math.abs(deltaX) < threshold * 2 && Math.abs(deltaY) < threshold * 2) {
      isSwiping.value = false
      return
    }

    const absX = Math.abs(deltaX)
    const absY = Math.abs(deltaY)
    const isHorizontal = absX > absY

    if (isHorizontal && absX > threshold) {
      deltaX > 0 ? onSwipeRight?.() : onSwipeLeft?.()
    } else if (!isHorizontal && absY > threshold) {
      deltaY > 0 ? onSwipeDown?.() : onSwipeUp?.()
    }

    isSwiping.value = false
  }

  onMounted(() => {
    const el = targetRef.value
    if (!el) return
    el.addEventListener('touchstart', handleTouchStart, { passive: true })
    el.addEventListener('touchend', handleTouchEnd, { passive: true })
  })

  onUnmounted(() => {
    const el = targetRef.value
    if (!el) return
    el.removeEventListener('touchstart', handleTouchStart)
    el.removeEventListener('touchend', handleTouchEnd)
  })

  return { isSwiping }
}

/**
 * Detect swipes from the edge of the screen. Useful for opening drawers
 * with a swipe-in gesture.
 */
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

    if (absX > absY && absX > threshold) {
      if (edge === 'right' && deltaX < 0) {
        onSwipe()
      } else if (edge === 'left' && deltaX > 0) {
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
