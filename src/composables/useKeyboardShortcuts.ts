import { onMounted, onUnmounted } from 'vue'

interface ShortcutConfig {
  key: string
  ctrl?: boolean
  meta?: boolean
  shift?: boolean
  handler: () => void
}

export function useKeyboardShortcuts(shortcuts: ShortcutConfig[]) {
  function handleKeydown(event: KeyboardEvent) {
    // Don't trigger shortcuts when typing in inputs
    const target = event.target as HTMLElement
    if (
      target.tagName === 'INPUT' ||
      target.tagName === 'TEXTAREA' ||
      target.isContentEditable
    ) {
      return
    }

    for (const shortcut of shortcuts) {
      const keyMatches = event.key.toLowerCase() === shortcut.key.toLowerCase()
      const ctrlMatches = shortcut.ctrl ? event.ctrlKey : !event.ctrlKey
      const metaMatches = shortcut.meta ? event.metaKey : !event.metaKey
      const shiftMatches = shortcut.shift ? event.shiftKey : !event.shiftKey

      // For Cmd/Ctrl shortcuts, accept either
      const modifierMatches = shortcut.ctrl || shortcut.meta
        ? (event.ctrlKey || event.metaKey)
        : (ctrlMatches && metaMatches)

      if (keyMatches && modifierMatches && shiftMatches) {
        event.preventDefault()
        shortcut.handler()
        return
      }
    }
  }

  onMounted(() => {
    document.addEventListener('keydown', handleKeydown)
  })

  onUnmounted(() => {
    document.removeEventListener('keydown', handleKeydown)
  })
}

// Pre-configured shortcuts for common actions
export function useGameShortcuts(handlers: {
  onNewGame?: () => void
  onToggleTeams?: () => void
  onEscape?: () => void
}) {
  const shortcuts: ShortcutConfig[] = []

  if (handlers.onNewGame) {
    shortcuts.push({
      key: 'n',
      meta: true,
      handler: handlers.onNewGame
    })
  }

  if (handlers.onToggleTeams) {
    shortcuts.push({
      key: 't',
      meta: true,
      handler: handlers.onToggleTeams
    })
  }

  if (handlers.onEscape) {
    shortcuts.push({
      key: 'Escape',
      handler: handlers.onEscape
    })
  }

  useKeyboardShortcuts(shortcuts)
}
