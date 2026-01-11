<script setup lang="ts">
/**
 * RulesView - Full game rules and app usage instructions.
 */
import SiteLayout from '@/components/layout/SiteLayout.vue'

const baseUrl = import.meta.env.BASE_URL
</script>

<template>
  <SiteLayout>
    <div class="p-4 sm:p-8">
      <!-- Page Header -->
      <div class="mx-auto mb-6 max-w-4xl">
        <h1>How to Play</h1>
      </div>

      <!-- Overview -->
      <div class="mx-auto mb-6 max-w-4xl">
        <div
          class="rounded-xl border-2 border-amber-300 bg-gradient-to-br from-amber-50 to-orange-50 p-6 shadow-md"
        >
          <h2 class="mb-3 text-amber-800">What is Codenames: Pictures?</h2>
          <p class="mb-4">
            Two teams compete to find their secret agents hidden among a grid of mysterious
            pictures. Each team has a Spymaster who knows which pictures belong to their team. The
            Spymaster gives one-word clues to help their teammates guess the right pictures.
          </p>
          <p>
            Be careful though &mdash; some pictures are innocent bystanders, some belong to the
            other team, and one is the deadly assassin. Find the assassin and your team loses
            instantly!
          </p>
        </div>
      </div>

      <!-- Teams & Roles -->
      <div class="mx-auto mb-6 max-w-4xl">
        <div class="rounded-xl border-2 border-gray-300 bg-white/80 p-6 shadow-sm">
          <h2 class="mb-4">Teams & Roles</h2>

          <div class="grid gap-4 md:grid-cols-2">
            <div class="rounded-lg border border-blue-200 bg-blue-50 p-4">
              <h3 class="mb-2 text-blue-700">Spymasters</h3>
              <p>
                One player from each team is the Spymaster. They can see the secret key card that
                shows which pictures belong to which team. Their job is to give clever one-word
                clues to guide their teammates.
              </p>
            </div>

            <div class="rounded-lg border border-green-200 bg-green-50 p-4">
              <h3 class="mb-2 text-green-700">Field Operatives</h3>
              <p>
                Everyone else on the team are Field Operatives. They listen to the Spymaster's clues
                and try to guess which pictures belong to their team. They can discuss amongst
                themselves before making a guess.
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- The Key Card -->
      <div class="mx-auto mb-6 max-w-4xl">
        <div
          class="rounded-xl border-2 border-blue-300 bg-gradient-to-br from-blue-50 to-indigo-50 p-6 shadow-md"
        >
          <h2 class="mb-4 text-blue-800">The Key Card</h2>
          <p class="mb-4">
            The key card is the Spymaster's secret map. It shows the 20 pictures arranged in a grid
            and reveals which pictures are:
          </p>
          <ul class="mb-4 list-inside list-disc space-y-2">
            <li>
              <strong class="text-blue-600">Blue agents</strong> &mdash; Pictures the Blue team
              needs to find
            </li>
            <li>
              <strong class="text-red-600">Red agents</strong> &mdash; Pictures the Red team needs
              to find
            </li>
            <li>
              <strong class="text-amber-600">Innocent bystanders</strong> &mdash; Neutral pictures
              that end your turn
            </li>
            <li>
              <strong>The assassin</strong> &mdash; One deadly picture that loses the game instantly
            </li>
          </ul>
          <p>
            The starting team (shown by the border color on the key card) has 8 agents to find. The
            other team has 7. This balances out the advantage of going first.
          </p>
        </div>
      </div>

      <!-- Giving Clues -->
      <div class="mx-auto mb-6 max-w-4xl">
        <div class="rounded-xl border-2 border-gray-300 bg-white/80 p-6 shadow-sm">
          <h2 class="mb-4">Giving Clues</h2>
          <p class="mb-4">
            When it's your team's turn, the Spymaster gives a clue that consists of:
          </p>

          <div class="mb-4 rounded-lg bg-amber-50 p-4 text-center">
            <p class="text-xl"><strong>One word</strong> + <strong>One number</strong></p>
            <p class="mt-2 text-gray-600 italic">Example: "Flying: 2"</p>
          </div>

          <p class="mb-4">
            The word relates to the pictures you want your team to guess. The number tells them how
            many pictures relate to that clue. A good clue connects multiple pictures while avoiding
            pictures that belong to the other team or the assassin.
          </p>

          <div class="mb-4 flex justify-center gap-4">
            <img
              :src="`${baseUrl}images/cards/og/card-29.jpg`"
              alt="card-example"
              class="w-28 rounded-lg border-2 border-gray-300 shadow-md sm:w-36"
            />
            <img
              :src="`${baseUrl}images/cards/og/card-4.jpg`"
              alt="card-example"
              class="w-28 rounded-lg border-2 border-gray-300 shadow-md sm:w-36"
            />
          </div>

          <p class="text-center text-gray-600 italic">
            "Flying: 2" could connect a rocket and a bird
          </p>
        </div>
      </div>

      <!-- Clue Rules -->
      <div class="mx-auto mb-6 max-w-4xl">
        <div class="rounded-xl border-2 border-gray-300 bg-white/80 p-6 shadow-sm">
          <h2 class="mb-4">Clue Rules</h2>
          <div class="space-y-3">
            <p>
              <strong>One word only.</strong> Your clue must be a single word. No hyphens, no
              spaces, no "sort of two words." If your group agrees, you can relax this for common
              phrases like "hot dog" or "New York."
            </p>
            <p>
              <strong>You can describe what you see.</strong> Unlike regular Codenames, you're
              allowed to name something pictured on the card. If there's a picture of a cat, you can
              say "cat."
            </p>
            <p>
              <strong>Keep a straight face.</strong> Spymasters can't give hints through reactions,
              gestures, or tone of voice. Stay neutral no matter what your team guesses!
            </p>
          </div>
        </div>
      </div>

      <!-- Making Guesses -->
      <div class="mx-auto mb-6 max-w-4xl">
        <div class="rounded-xl border-2 border-gray-300 bg-white/80 p-6 shadow-sm">
          <h2 class="mb-4">Making Guesses</h2>
          <p class="mb-4">
            After hearing the clue, the Field Operatives discuss and then touch a picture to guess.
            The Spymaster reveals what's there:
          </p>

          <div class="grid gap-3 sm:grid-cols-2">
            <div class="rounded-lg border border-green-200 bg-green-50 p-4">
              <h4 class="mb-2 text-green-700">Correct!</h4>
              <p>
                You found one of your agents! You may keep guessing or stop and end your turn
                safely.
              </p>
            </div>

            <div class="rounded-lg border border-amber-200 bg-amber-50 p-4">
              <h4 class="mb-2 text-amber-700">Innocent Bystander</h4>
              <p>Oops, that's nobody important. Your turn ends, but no harm done.</p>
            </div>

            <div class="rounded-lg border border-red-200 bg-red-50 p-4">
              <h4 class="mb-2 text-red-700">Other Team's Agent</h4>
              <p>
                You just helped the other team! Your turn ends and they're one step closer to
                winning.
              </p>
            </div>

            <div class="rounded-lg bg-gray-800 p-4">
              <h4 class="mb-2 text-white">Assassin</h4>
              <p class="text-white">
                Game over. Your team loses immediately. Always avoid this one!
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- How Many Guesses -->
      <div class="mx-auto mb-6 max-w-4xl">
        <div class="rounded-xl border-2 border-gray-300 bg-white/80 p-6 shadow-sm">
          <h2 class="mb-4">How Many Guesses?</h2>
          <p class="mb-4">
            You can make up to <strong>the number in the clue + 1</strong> guesses. So if the
            Spymaster says "Flying: 2", you can guess up to 3 pictures.
          </p>
          <p class="mb-4">
            That extra guess is useful for catching up on pictures from previous clues you might
            have missed. You can always choose to stop guessing and end your turn safely.
          </p>
          <p>
            <strong>Your turn ends</strong> when you guess wrong, hit a bystander, find the other
            team's agent, or choose to stop.
          </p>
        </div>
      </div>

      <!-- Winning -->
      <div class="mx-auto mb-6 max-w-4xl">
        <div
          class="rounded-xl border-2 border-green-300 bg-gradient-to-br from-green-50 to-emerald-50 p-6 shadow-md"
        >
          <h2 class="mb-3 text-green-800">Winning the Game</h2>
          <p class="mb-4">
            <strong>Find all your agents first to win!</strong> It doesn't matter whose turn it is
            &mdash; if your last agent gets revealed, your team wins. This means you could
            technically win on the other team's turn if they accidentally guess your final agent.
          </p>
          <p>
            The game also ends immediately if anyone finds the assassin. That team loses, and the
            other team wins by default.
          </p>
        </div>
      </div>

      <!-- Using This App -->
      <div class="mx-auto mb-6 max-w-4xl">
        <h2 class="mb-4">Using This App</h2>
        <p class="mb-6">
          This app lets you play Codenames: Pictures online. Display the game board on a shared
          screen (TV, tablet, or laptop) and have each Spymaster open the Spy Master page on their
          own phone.
        </p>

        <div class="grid gap-6 md:grid-cols-2">
          <!-- Game Board -->
          <div class="rounded-xl border-2 border-gray-300 bg-white/80 p-6 shadow-sm">
            <h3 class="mb-3 text-gray-700"><FontAwesomeIcon icon="tv" class="mr-2" />Game Board</h3>
            <p class="mb-3">This is what everyone sees. Display it on a TV or shared screen.</p>
            <div class="space-y-3">
              <div class="rounded-lg border border-gray-200 bg-gray-50 p-4">
                <h4 class="mb-1">Mark a Card</h4>
                <p>
                  Tap any card, then pick a color to mark it as red, blue, neutral, or assassin.
                </p>
              </div>
              <div class="rounded-lg border border-gray-200 bg-gray-50 p-4">
                <h4 class="mb-1">Remove a Mark</h4>
                <p>Tap a marked card to clear it if you made a mistake.</p>
              </div>
              <div class="rounded-lg border border-gray-200 bg-gray-50 p-4">
                <h4 class="mb-1">Zoom In</h4>
                <p>Tap the card number in the corner to see it full screen.</p>
              </div>
              <div class="rounded-lg border border-gray-200 bg-gray-50 p-4">
                <h4 class="mb-1">Track Scores</h4>
                <p>Use the + and - buttons in the menu to keep track of wins.</p>
              </div>
            </div>
          </div>

          <!-- Spy Master View -->
          <div
            class="rounded-xl border-2 border-blue-300 bg-gradient-to-br from-blue-50 to-indigo-50 p-6 shadow-md"
          >
            <h3 class="mb-3 text-blue-700">
              <FontAwesomeIcon icon="user-secret" class="mr-2" />Spy Master View
            </h3>
            <p class="mb-3">
              Each Spymaster opens this page on their own phone to see the secret key card.
            </p>
            <div class="space-y-3">
              <div class="rounded-lg border border-blue-200 bg-white/70 p-4">
                <h4 class="mb-1">See the Key Card</h4>
                <p>Shows which pictures belong to each team, plus the assassin.</p>
              </div>
              <div class="rounded-lg border border-blue-200 bg-white/70 p-4">
                <h4 class="mb-1">Search for Card</h4>
                <p>
                  Look up any card by number. Handy when both Spymasters are deciding which key card
                  to use.
                </p>
              </div>
              <div class="rounded-lg border border-blue-200 bg-white/70 p-4">
                <h4 class="mb-1">Lock Screen</h4>
                <p>Tap the lock to hide the key card and prevent accidental peeks.</p>
              </div>
              <div class="rounded-lg border border-blue-200 bg-white/70 p-4">
                <h4 class="mb-1">Quick Peek</h4>
                <p>Hold the lock button to temporarily reveal the key card.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Pressure Mode -->
      <div class="mx-auto mb-8 max-w-4xl">
        <div
          class="rounded-xl border-2 border-orange-400 bg-gradient-to-br from-orange-50 to-red-50 p-6 shadow-md"
        >
          <h2 class="mb-3 text-orange-800">
            <FontAwesomeIcon icon="stopwatch" class="mr-2" />Pressure Mode
          </h2>
          <p class="mb-4">
            Want to add some excitement? Turn on <strong>Pressure Mode</strong> in Settings to add a
            countdown timer. If time runs out before you mark a card, that's a strike!
          </p>

          <div class="mb-4 grid gap-4 md:grid-cols-2">
            <div class="rounded-lg border border-orange-200 bg-white/70 p-4">
              <h4 class="mb-2 text-orange-700">How It Works</h4>
              <ul class="space-y-1">
                <li><strong>Start:</strong> Tap "Add Pressure" in the score display</li>
                <li><strong>Reset:</strong> Marking any card resets the timer</li>
                <li><strong>Pause:</strong> Tap the timer if you need a break</li>
              </ul>
            </div>

            <div class="rounded-lg border border-orange-200 bg-white/70 p-4">
              <h4 class="mb-2 text-orange-700">Strike System</h4>
              <ul class="space-y-1">
                <li><strong>0 strikes:</strong> 5 minute timer</li>
                <li><strong>1 strike:</strong> 3 minute timer</li>
                <li><strong>2 strikes:</strong> 1 minute timer</li>
                <li><strong>3 strikes:</strong> Game over!</li>
              </ul>
            </div>
          </div>

          <p class="italic">
            Three strikes and it's game over &mdash; unless you want to continue as a "scrub" and
            finish anyway!
          </p>
        </div>
      </div>
    </div>
  </SiteLayout>
</template>
