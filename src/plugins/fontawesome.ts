import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import type { App } from 'vue'

// Solid icons
import {
  faArrowLeft,
  faArrowRight,
  faBars,
  faBolt,
  faBook,
  faCheck,
  faChevronDown,
  faChevronUp,
  faCircleExclamation,
  faCompass,
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
  faSliders,
  faSpinner,
  faStar,
  faStopwatch,
  faTriangleExclamation,
  faTv,
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
  faBolt,
  faCheck,
  faChevronDown,
  faChevronUp,
  faPlus,
  faSpinner,
  faTv,
  faXmark,
  // Navigation
  faBook,
  faCircleInfo,
  faCompass,
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
  faSliders,
  // Warnings
  faTriangleExclamation
)

export function setupFontAwesome(app: App): void {
  app.component('FontAwesomeIcon', FontAwesomeIcon)
}
