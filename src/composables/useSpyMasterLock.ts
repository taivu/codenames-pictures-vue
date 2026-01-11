/**
 * Lock screen for spymasters so they don't accidentally flash the key card.
 * Hold the screen to peek, let go to hide. Shows random trash talk to keep
 * things interesting. Keeps the screen awake so you don't lose your place.
 */
import { ref } from 'vue'

// Fun icons shown while locked (FontAwesome icon names)
const tauntIcons = [
  'fire',
  'bomb',
  'skull',
  'ghost',
  'poo',
  'pepper-hot',
  'toilet-paper',
  'face-laugh-squint',
  'hand-point-right',
  'bolt',
  'skull-crossbones',
]

export function useSpyMasterLock() {
  // ===================
  // State
  // ===================

  const isLocked = ref(false)
  const isPeeking = ref(false)
  const wakeLock = ref<WakeLockSentinel | null>(null)

  // Trash talk phrases and icons shown while locked
  const phrases = ref<string[]>([])
  const currentPhrase = ref('')
  const currentIcon = ref('')

  // ===================
  // Actions
  // ===================

  function pickRandomTaunt(): void {
    if (phrases.value.length === 0) return

    const phraseIndex = Math.floor(Math.random() * phrases.value.length)
    const iconIndex = Math.floor(Math.random() * tauntIcons.length)
    currentPhrase.value = phrases.value[phraseIndex] ?? ''
    currentIcon.value = tauntIcons[iconIndex] ?? 'fire'
  }

  async function loadPhrases(): Promise<void> {
    try {
      const response = await fetch(`${import.meta.env.BASE_URL}data/humble-phrases.json`)
      phrases.value = await response.json()
    } catch {
      // Phrases are optional, fail silently
    }
  }

  async function toggle(): Promise<void> {
    if (isLocked.value) {
      await unlock()
    } else {
      await lock()
    }
  }

  async function lock(): Promise<void> {
    isLocked.value = true
    pickRandomTaunt()

    // Request wake lock to keep screen on
    if ('wakeLock' in navigator) {
      try {
        wakeLock.value = await navigator.wakeLock.request('screen')
      } catch {
        // Wake lock not available or denied, continue without it
      }
    }
  }

  async function unlock(): Promise<void> {
    isLocked.value = false
    isPeeking.value = false

    if (wakeLock.value) {
      await wakeLock.value.release()
      wakeLock.value = null
    }
  }

  function startPeek(): void {
    if (!isLocked.value) return
    isPeeking.value = true
  }

  function endPeek(): void {
    if (!isPeeking.value) return
    isPeeking.value = false
    pickRandomTaunt()
  }

  return {
    // State
    isLocked,
    isPeeking,
    currentPhrase,
    currentIcon,
    // Actions
    loadPhrases,
    toggle,
    startPeek,
    endPeek,
  }
}
