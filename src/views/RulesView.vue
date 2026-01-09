<script setup lang="ts">
import { RouterLink } from 'vue-router'
import SiteLayout from '@/components/layout/SiteLayout.vue'

const baseUrl = import.meta.env.BASE_URL
</script>

<template>
  <SiteLayout>
    <div class="p-4 sm:p-8">
    <!-- Page Header -->
    <div class="mx-auto mb-6 max-w-4xl">
      <RouterLink to="/" class="mb-4 inline-block text-blue-600 hover:underline">
        <FontAwesomeIcon icon="arrow-left" class="mr-1" />Back to Home
      </RouterLink>
      <h1 class="text-3xl font-bold sm:text-4xl">Game Rules</h1>
    </div>

    <!-- Intro Card -->
    <div class="mx-auto mb-6 max-w-4xl">
      <div
        class="rounded-xl border-2 border-amber-300 bg-gradient-to-br from-amber-50 to-orange-50 p-6 shadow-md"
      >
        <h2 class="mb-3 text-2xl font-bold text-amber-800">Intro</h2>
        <p class="leading-relaxed text-gray-700">
          What are these strange symbols on the map? They code for locations where spies must
          contact secret agents! Two rival spymasters know the agent in each location. They deliver
          coded messages telling their field operatives where to go for clandestine meetings.
          Operatives must be clever. A decoding mistake could lead to an unpleasant encounter with
          an enemy agent - or worse, with the assassin! Both teams race to contact all their agents,
          but only one team can win.
        </p>
      </div>
    </div>

    <!-- Game Rules Section -->
    <div class="mx-auto mb-6 max-w-4xl">
      <div class="grid gap-4 md:grid-cols-2">
        <!-- Spymaster Key Card -->
        <div class="rounded-xl border-2 border-gray-300 bg-white/80 p-5 shadow-sm">
          <h3 class="mb-3 text-xl font-bold text-blue-700">The Spymasters Key Card</h3>
          <p class="text-sm leading-relaxed text-gray-700">
            Each game has one spy master key that shows who can be found in each location. The
            spymasters should choose the key card randomly, don't let the field operatives see the
            key. The key corresponds to the grid. Blue squares correspond to pictures that Blue Team
            must guess (locations with blue agents). Red squares correspond to pictures that Red
            Team must guess (locations with red agents). Pale squares have innocent bystanders, and
            the black square hides an assassin!
          </p>
        </div>

        <!-- Starting Team -->
        <div class="rounded-xl border-2 border-gray-300 bg-white/80 p-5 shadow-sm">
          <h3 class="mb-3 text-xl font-bold text-green-700">Starting Team</h3>
          <p class="text-sm leading-relaxed text-gray-700">
            The lights on the sides of the key card indicate which team starts. The starting team
            has 8 pictures to guess. The other team has 7. The starting team will give the first
            clue of the game.
          </p>
        </div>

        <!-- Game Play -->
        <div class="rounded-xl border-2 border-gray-300 bg-white/80 p-5 shadow-sm">
          <h3 class="mb-3 text-xl font-bold text-purple-700">Game Play</h3>
          <p class="text-sm leading-relaxed text-gray-700">
            Spymasters take turns giving one-word clues. The word relates to one or more pictures on
            the grid. The field operatives try to guess which pictures their spymaster meant. When a
            field operative touches a picture, the spymaster reveals who is in that location. If it
            is one of their team's agents, the operatives may keep guessing locations related to
            that one-word clue. Otherwise, it is the other team's turn. The first team to contact
            all their agents wins the game.
          </p>
        </div>

        <!-- Taking Turns -->
        <div class="rounded-xl border-2 border-gray-300 bg-white/80 p-5 shadow-sm">
          <h3 class="mb-3 text-xl font-bold text-orange-700">Taking Turns</h3>
          <p class="text-sm leading-relaxed text-gray-700">
            <strong>Teams take turns</strong>, beginning with the starting team. (The starting team
            is indicated by the lights on the sides of the key card.) On your team's turn, the
            spymaster gives <strong>one clue</strong>, and the field operatives may make
            <strong>multiple guesses</strong>.
          </p>
        </div>
      </div>
    </div>

    <!-- Giving Clues Section -->
    <div class="mx-auto mb-6 max-w-4xl">
      <div
        class="rounded-xl border-2 border-blue-300 bg-gradient-to-br from-blue-50 to-indigo-50 p-6 shadow-md"
      >
        <h3 class="mb-4 text-2xl font-bold text-blue-800">Giving the Clue</h3>
        <p class="mb-4 leading-relaxed text-gray-700">
          If you are the spymaster, your job is to think up a clue that relates to some of the
          pictures your team is trying to guess. Your clue consists of
          <strong>one word</strong> that relates to those pictures <strong>and one number</strong>
          that tells how many of your pictures relate to that word.
        </p>

        <div class="mb-4 rounded-lg bg-white/60 p-4">
          <p class="text-gray-600 italic">
            Example: A good clue for these two pictures might be
            <strong class="text-blue-700">"flying: 2"</strong>
          </p>
        </div>

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

        <p class="text-sm leading-relaxed text-gray-700">
          You are allowed to give a clue for only one picture (<strong><em>doghnut: 1</em></strong
          >) but it's fun to try for two or more. Getting four pictures with one clue is a big
          accomplishment.
        </p>
      </div>
    </div>

    <!-- Making Contact Section -->
    <div class="mx-auto mb-6 max-w-4xl">
      <div class="rounded-xl border-2 border-gray-300 bg-white/80 p-6 shadow-sm">
        <h3 class="mb-4 text-2xl font-bold">Making Contact</h3>
        <p class="mb-4 leading-relaxed text-gray-700">
          When the spymaster gives a clue, his or her field operatives try to figure out what it
          means. They can debate it amongst themselves, but the spymaster must keep a straight face
          and is not allowed to comment. The operatives indicate their official guess when one of
          them touches one of the pictures on the table. (Online, verbal confirmation to the
          spymaster which card) The spymaster reveals who is in that location by clicking on the
          tile and assigns one of the following states: "Red", "Blue", "Neutral", "Game over".
        </p>

        <div class="grid gap-3 sm:grid-cols-2">
          <div class="rounded-lg border border-blue-200 bg-blue-50 p-3">
            <p class="text-sm">
              <span class="font-bold text-blue-700">Correct guess:</span> The spymaster marks the
              picture with the correct color. The operatives may continue making guesses (but they
              do not get another clue).
            </p>
          </div>
          <div class="rounded-lg border border-yellow-200 bg-yellow-50 p-3">
            <p class="text-sm">
              <span class="font-bold text-yellow-700">Innocent bystander:</span> The spymaster marks
              it with an innocent ("Neutral") state. <strong>This ends the turn</strong>.
            </p>
          </div>
          <div class="rounded-lg border border-red-200 bg-red-50 p-3">
            <p class="text-sm">
              <span class="font-bold text-red-700">Other team's agent:</span> The picture is marked
              by the other team's agent colors. <strong>This ends the turn</strong>. (And it helps
              the other team)
            </p>
          </div>
          <div class="rounded-lg bg-gray-800 p-3 text-white">
            <p class="text-sm">
              <span class="font-bold">Assassin:</span> The picture is marked as assassinated ("Game
              over"). <strong>This ends the game!</strong> The team that contacted the assassin
              loses.
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Turn Ending Section -->
    <div class="mx-auto mb-6 max-w-4xl">
      <div class="grid gap-4 md:grid-cols-2">
        <div class="rounded-xl border-2 border-gray-300 bg-white/80 p-5 shadow-sm">
          <h3 class="mb-3 text-xl font-bold">Ending the Turn</h3>
          <p class="mb-3 text-sm leading-relaxed text-gray-700">
            Your team's turn always has <strong>exactly one clue</strong> and
            <strong>one or more guesses</strong>. If the operatives' first guess is one of their
            team's pictures, they may make a second guess. If that's correct, they may make another
            guess, and so on.
          </p>
          <p class="mb-2 text-sm font-bold">The turn ends:</p>
          <ul class="list-inside list-disc space-y-1 text-sm text-gray-600">
            <li>if they guess a picture that's not theirs,</li>
            <li>if they choose to not guess anymore,</li>
            <li>
              or if they have already made as many guesses as the number specified by the clue
              <strong>plus one more</strong>.
            </li>
          </ul>
        </div>

        <div class="rounded-xl border-2 border-gray-300 bg-white/80 p-5 shadow-sm">
          <h3 class="mb-3 text-xl font-bold">Bonus Guesses</h3>
          <p class="text-sm leading-relaxed text-gray-700">
            For example, if your spymaster says <strong><em>flying: 2</em></strong
            >, you can make as many as 3 correct guesses. This doesn't make much sense on your first
            turn, but later in the game it can be very useful. For example, you might have received
            several clues for which you did not get all the pictures. You can guess these pictures
            instead of or in addition to those related to the current clue. The "one more guess"
            rule gives you a chance to catch up.
          </p>
        </div>
      </div>
    </div>

    <!-- Ending the Game -->
    <div class="mx-auto mb-6 max-w-4xl">
      <div
        class="rounded-xl border-2 border-green-300 bg-gradient-to-br from-green-50 to-emerald-50 p-6 shadow-md"
      >
        <h3 class="mb-3 text-2xl font-bold text-green-800">Ending the Game</h3>
        <p class="leading-relaxed text-gray-700">
          <strong>The game ends when one team has all their pictures covered.</strong>
          That team wins. It is possible to win on the other team's turn if they guess your last
          picture. The game can end early if a field operative touches the location with the
          assassin. That operative's team loses.
        </p>
      </div>
    </div>

    <!-- Online Actions -->
    <div class="mx-auto mb-6 max-w-4xl">
      <div class="rounded-xl border-2 border-gray-400 bg-gray-100 p-6">
        <h2 class="mb-4 text-2xl font-bold">Online Actions</h2>
        <div class="grid gap-3 sm:grid-cols-2">
          <div class="rounded-lg border border-gray-200 bg-white p-3">
            <p><strong>Mark a card:</strong> tap an unmarked card and select a color</p>
          </div>
          <div class="rounded-lg border border-gray-200 bg-white p-3">
            <p><strong>Remove marking:</strong> tap a marked card to clear it</p>
          </div>
          <div class="rounded-lg border border-gray-200 bg-white p-3">
            <p><strong>View card full screen:</strong> tap the card number in the corner</p>
          </div>
          <div class="rounded-lg border border-gray-200 bg-white p-3">
            <p><strong>Set starting team:</strong> tap the score badge next to a team name</p>
          </div>
          <div class="rounded-lg border border-gray-200 bg-white p-3">
            <p><strong>Track score:</strong> use the + and - buttons under each team's score</p>
          </div>
          <div class="rounded-lg border border-gray-200 bg-white p-3">
            <p>
              <strong>Spy master key:</strong> open from menu, share URL with the other spymaster
            </p>
          </div>
          <div class="rounded-lg border border-gray-200 bg-white p-3">
            <p>
              <strong>Lock spy master screen:</strong> tap lock button to hide card, hold to peek
            </p>
          </div>
          <div class="rounded-lg border border-gray-200 bg-white p-3">
            <p>
              <strong>Setup teams:</strong> add players, shuffle teams, and randomize spy masters
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Pressure Mode -->
    <div class="mx-auto mb-8 max-w-4xl">
      <div
        class="rounded-xl border-2 border-orange-400 bg-gradient-to-br from-orange-50 to-red-50 p-6 shadow-md"
      >
        <h2 class="mb-3 text-2xl font-bold text-orange-800">
          <FontAwesomeIcon icon="stopwatch" class="mr-2" />Pressure Mode
        </h2>
        <p class="mb-4 leading-relaxed text-gray-700">
          Want to spice things up? Enable <strong>Pressure Mode</strong> in Settings to add a
          countdown timer that keeps everyone on their toes.
        </p>

        <div class="mb-4 grid gap-4 md:grid-cols-2">
          <div class="rounded-lg border border-orange-200 bg-white/70 p-4">
            <h4 class="mb-2 font-bold text-orange-700">How It Works</h4>
            <ul class="space-y-1 text-sm text-gray-700">
              <li><strong>Start:</strong> Tap "Add Pressure" in the HUD</li>
              <li><strong>Timer:</strong> Counts down while you deliberate</li>
              <li><strong>Reset:</strong> Marking any card with a color resets the timer</li>
              <li><strong>Pause:</strong> Tap the timer to pause/resume</li>
            </ul>
          </div>

          <div class="rounded-lg border border-orange-200 bg-white/70 p-4">
            <h4 class="mb-2 font-bold text-orange-700">Strike System</h4>
            <ul class="space-y-1 text-sm text-gray-700">
              <li><strong>0 strikes:</strong> 10 minute timer</li>
              <li><strong>1 strike:</strong> 5 minute timer</li>
              <li><strong>2 strikes:</strong> 1 minute timer</li>
              <li><strong>3 strikes:</strong> Game over!</li>
            </ul>
          </div>
        </div>

        <p class="text-sm text-gray-600 italic">
          Time runs out without selecting a card? That's a strike! The timer gets shorter with each
          strike. Three strikes and it's game over - unless you want to continue as a "scrub" and
          finish the game anyway.
        </p>
      </div>
    </div>
    </div>
  </SiteLayout>
</template>
