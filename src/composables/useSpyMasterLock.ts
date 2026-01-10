import { ref } from 'vue'

const shitTalkIcons = [
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
  const isLocked = ref(false)
  const isPeeking = ref(false)
  const wakeLock = ref<WakeLockSentinel | null>(null)
  const phrases = ref<string[]>([])
  const currentPhrase = ref('')
  const currentIcon = ref('')

  function pickRandom(): void {
    if (phrases.value.length === 0) return
    const phraseIndex = Math.floor(Math.random() * phrases.value.length)
    const iconIndex = Math.floor(Math.random() * shitTalkIcons.length)
    currentPhrase.value = phrases.value[phraseIndex] ?? ''
    currentIcon.value = shitTalkIcons[iconIndex] ?? 'fire'
  }

  async function loadPhrases(): Promise<void> {
    try {
      const response = await fetch(`${import.meta.env.BASE_URL}data/humble-phrases.json`)
      phrases.value = await response.json()
    } catch {
      // Phrases are optional
    }
  }

  async function toggle(): Promise<void> {
    if (isLocked.value) {
      // Unlock
      isLocked.value = false
      isPeeking.value = false
      if (wakeLock.value) {
        await wakeLock.value.release()
        wakeLock.value = null
      }
    } else {
      // Lock
      isLocked.value = true
      pickRandom()
      // Keep screen awake
      if ('wakeLock' in navigator) {
        try {
          wakeLock.value = await navigator.wakeLock.request('screen')
        } catch {
          // Wake lock not available or denied
        }
      }
    }
  }

  function startPeek(): void {
    if (isLocked.value) {
      isPeeking.value = true
    }
  }

  function endPeek(): void {
    if (isPeeking.value) {
      isPeeking.value = false
      pickRandom()
    }
  }

  return {
    isLocked,
    isPeeking,
    currentPhrase,
    currentIcon,
    loadPhrases,
    toggle,
    startPeek,
    endPeek,
  }
}
