import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import type { App } from 'vue'

// Solid icons
import {
  faArrowLeft,
  faArrowRight,
  faBars,
  faBolt,
  faBomb,
  faBook,
  faCheck,
  faChevronDown,
  faChevronUp,
  faCircleExclamation,
  faCompass,
  faCircleInfo,
  faDice,
  faFaceLaughSquint,
  faFire,
  faFloppyDisk,
  faGear,
  faGhost,
  faHandPointRight,
  faImages,
  faLock,
  faLockOpen,
  faMagnifyingGlass,
  faPause,
  faPepperHot,
  faPlay,
  faPlus,
  faPoo,
  faRotate,
  faRotateRight,
  faShuffle,
  faSkull,
  faSkullCrossbones,
  faSliders,
  faSpinner,
  faStar,
  faStopwatch,
  faToiletPaper,
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
  // Shit-talking icons
  faBomb,
  faFaceLaughSquint,
  faFire,
  faGhost,
  faHandPointRight,
  faPepperHot,
  faPoo,
  faSkull,
  faToiletPaper,
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
