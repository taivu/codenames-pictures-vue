import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import type { App } from 'vue'

// Solid icons
import {
  faArrowLeft,
  faArrowRight,
  faBars,
  faBook,
  faCheck,
  faChevronDown,
  faChevronUp,
  faCircleExclamation,
  faCircleInfo,
  faDice,
  faFloppyDisk,
  faGear,
  faImages,
  faLock,
  faLockOpen,
  faMagnifyingGlass,
  faPause,
  faPlay,
  faPlus,
  faRotate,
  faRotateRight,
  faShuffle,
  faSkullCrossbones,
  faSpinner,
  faStar,
  faStopwatch,
  faTriangleExclamation,
  faUpRightFromSquare,
  faUserSecret,
  faUsers,
  faXmark,
} from '@fortawesome/free-solid-svg-icons'


// Register icons
library.add(
  // UI
  faArrowLeft,
  faArrowRight,
  faBars,
  faCheck,
  faChevronDown,
  faChevronUp,
  faPlus,
  faSpinner,
  faXmark,
  // Navigation
  faBook,
  faCircleInfo,
  faGear,
  faUpRightFromSquare,
  // Game
  faDice,
  faImages,
  faLock,
  faLockOpen,
  faMagnifyingGlass,
  faPause,
  faPlay,
  faRotate,
  faShuffle,
  faStar,
  faUserSecret,
  faUsers,
  // Pressure mode
  faCircleExclamation,
  faRotateRight,
  faSkullCrossbones,
  faStopwatch,
  // Settings
  faFloppyDisk,
  // Warnings
  faTriangleExclamation,
)

export function setupFontAwesome(app: App): void {
  app.component('FontAwesomeIcon', FontAwesomeIcon)
}
