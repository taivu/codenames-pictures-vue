# Changelog

## January 2026 (Playtesting Revisions)

- Redesigned site header with pill-style navigation buttons
- Header background transitions from transparent to amber on scroll
- Mobile-optimized header with centered Start Game + Spy Master buttons
- Spymaster page header redesign with Home/Lock/New Card buttons
- Touch prevention in spymaster lock mode (no OS UI interference)
- Random icons and shit-talking quotes displayed in locked state
- Card search with instructional label for finding other spymaster's card
- Drawer tabs renamed to Teams and Nav for clarity
- Pressure mode purple theming throughout the app
- Team scores show RED/BLUE labels with trophy icon separator
- Consistent team naming format ("Red Team" with capitalization)
- Homepage feature cards with distinct colors (yellow/orange/cyan)
- Footer now includes "How to Play" link to Rules page
- Removed redundant "Back to Home" links from content pages
- TeamsModal header with responsive layout
- Refactored SpyMasterView into composable + CardSearch component

## January 2026

- Complete rewrite in Vue 3 + Vite + TypeScript
- Mobile-first responsive design with portrait and landscape layouts
- New floating HUD with collapsible team scores
- Slide-out drawer menu for game actions
- Edge swipe to open drawer
- Improved card color selection with arrow indicator
- Card zoom modal with fade transitions
- Team setup modal with shuffle and spy master randomizer
- Score tracking with increment/decrement
- Auto-save with immediate persist/clear on toggle
- Spy master card lock mode with screen wake lock
- New Pressure Mode with countdown timer
- Strike system: 10min → 5min → 1min, 3 strikes = game over
- Pause/resume timer by tapping in expanded HUD
- Timer colors: green → orange (50%) → red (25%)
- Skull-crossbones strike indicators
- "Continue as scrub" option after game over
- Saved game restore modal with team preview
- Fresh start confirmation to prevent accidental data loss
- Modal headers with icons
- Card zoom works during color selection mode
- HUD auto-collapses when color menu opens
- Scrollable HUD for mobile landscape
- Drawer close button in header
- Separated homepage with quick start from full rules page
- Added About page and Rules page

## Original Fork (2024)

- Fixed mobile touch interactions
- Improved card randomizer to avoid repeats
- Basic bug fixes
