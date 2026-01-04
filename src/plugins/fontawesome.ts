import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
  faPlus,
  faXmark,
  faChevronUp,
  faChevronDown,
  faStar,
  faShuffle,
  faUserSecret,
  faLock,
  faLockOpen,
  faMagnifyingGlass,
  faDice,
  faPlay,
  faUsers,
  faSkullCrossbones,
  faUpRightFromSquare,
} from '@fortawesome/free-solid-svg-icons'
import type { App } from 'vue'

// Add only the icons we need (tree-shakable)
library.add(faPlus, faXmark, faChevronUp, faChevronDown, faStar, faShuffle, faUserSecret, faLock, faLockOpen, faMagnifyingGlass, faDice, faPlay, faUsers, faSkullCrossbones, faUpRightFromSquare)

export function setupFontAwesome(app: App): void {
  app.component('FontAwesomeIcon', FontAwesomeIcon)
}
