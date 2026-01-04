<script setup lang="ts">
import { RouterLink } from 'vue-router'

const baseUrl = import.meta.env.BASE_URL
</script>

<template>
  <div class="min-h-screen p-4 sm:p-8">
    <!-- Hero Section -->
    <div class="max-w-4xl mx-auto text-center mb-8">
      <h1 class="text-4xl sm:text-5xl font-bold mb-4">Codenames Pictures Online</h1>
      <p class="text-lg mb-6">
        The online version of Codenames Pictures by
        <a
          href="https://czechgames.com/en/codenames-pictures/"
          target="_blank"
          rel="noopener noreferrer"
          class="text-blue-600 hover:underline font-bold"
        >
          czechgames
        </a>
      </p>

      <!-- Quick Start Buttons -->
      <div class="flex flex-wrap gap-3 justify-center">
        <RouterLink to="/play" class="btn btn-green text-lg px-6 py-3">
          <FontAwesomeIcon icon="play" class="mr-2" />Start Classic
        </RouterLink>
        <RouterLink to="/play-duet" class="btn border-2 border-green-600 text-green-700 bg-white hover:bg-green-50 text-lg px-6 py-3">
          <FontAwesomeIcon icon="users" class="mr-2" />Start Duet
        </RouterLink>
        <RouterLink to="/spy-master" class="btn btn-blue text-lg px-6 py-3">
          <FontAwesomeIcon icon="user-secret" class="mr-2" />Spy Master
        </RouterLink>
        <RouterLink to="/settings" class="btn bg-gray-600 hover:bg-gray-700 text-white text-lg px-6 py-3">
          <FontAwesomeIcon icon="gear" class="mr-2" />Settings
        </RouterLink>
      </div>
    </div>

    <!-- Intro Card -->
    <div class="max-w-4xl mx-auto mb-6">
      <div class="bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-300 rounded-xl p-6 shadow-md">
        <h2 class="text-2xl font-bold mb-3 text-amber-800">Intro</h2>
        <p class="text-gray-700 leading-relaxed">
          What are these strange symbols on the map? They code for locations where spies must contact secret agents!
          Two rival spymasters know the agent in each location. They deliver coded messages telling their field operatives
          where to go for clandestine meetings. Operatives must be clever. A decoding mistake could lead to an unpleasant
          encounter with an enemy agent - or worse, with the assassin!
          Both teams race to contact all their agents, but only one team can win.
        </p>
      </div>
    </div>

    <!-- Game Rules Section -->
    <div class="max-w-4xl mx-auto mb-6">
      <h2 class="text-3xl font-bold mb-4 text-center">Game Rules</h2>

      <div class="grid gap-4 md:grid-cols-2">
        <!-- Spymaster Key Card -->
        <div class="bg-white/80 border-2 border-gray-300 rounded-xl p-5 shadow-sm">
          <h3 class="text-xl font-bold mb-3 text-blue-700">The Spymasters Key Card</h3>
          <p class="text-gray-700 leading-relaxed text-sm">
            Each game has one spy master key that shows who can be found in each location.
            The spymasters should choose the key card randomly, don't let the field operatives see the key.
            The key corresponds to the grid. Blue squares correspond to pictures that Blue Team
            must guess (locations with blue agents). Red squares correspond to pictures that Red Team must
            guess (locations with red agents). Pale squares have innocent bystanders, and the black square
            hides an assassin!
          </p>
        </div>

        <!-- Starting Team -->
        <div class="bg-white/80 border-2 border-gray-300 rounded-xl p-5 shadow-sm">
          <h3 class="text-xl font-bold mb-3 text-green-700">Starting Team</h3>
          <p class="text-gray-700 leading-relaxed text-sm">
            The lights on the sides of the key card indicate which team starts. The starting team
            has 8 pictures to guess. The other team has 7. The starting team will give the first
            clue of the game.
          </p>
        </div>

        <!-- Game Play -->
        <div class="bg-white/80 border-2 border-gray-300 rounded-xl p-5 shadow-sm">
          <h3 class="text-xl font-bold mb-3 text-purple-700">Game Play</h3>
          <p class="text-gray-700 leading-relaxed text-sm">
            Spymasters take turns giving one-word clues.
            The word relates to one or more pictures on the grid. The field operatives try to guess which pictures their
            spymaster meant.
            When a field operative touches a picture, the spymaster reveals who is in that location. If it is one of their
            team's agents, the operatives may keep guessing locations related to that one-word clue. Otherwise, it is the
            other team's turn. The first team to contact all their agents wins the game.
          </p>
        </div>

        <!-- Taking Turns -->
        <div class="bg-white/80 border-2 border-gray-300 rounded-xl p-5 shadow-sm">
          <h3 class="text-xl font-bold mb-3 text-orange-700">Taking Turns</h3>
          <p class="text-gray-700 leading-relaxed text-sm">
            <strong>Teams take turns</strong>, beginning with the starting team. (The starting team is indicated by the lights
            on the sides of the key card.)
            On your team's turn, the spymaster gives <strong>one clue</strong>, and the field operatives may make
            <strong>multiple guesses</strong>.
          </p>
        </div>
      </div>
    </div>

    <!-- Giving Clues Section -->
    <div class="max-w-4xl mx-auto mb-6">
      <div class="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-300 rounded-xl p-6 shadow-md">
        <h3 class="text-2xl font-bold mb-4 text-blue-800">Giving the Clue</h3>
        <p class="text-gray-700 leading-relaxed mb-4">
          If you are the spymaster, your job is to think up a clue that relates to some of the pictures your team is trying
          to guess.
          Your clue consists of <strong>one word</strong> that relates to those pictures <strong>and one number</strong>
          that tells how many of your pictures relate to that word.
        </p>

        <div class="bg-white/60 rounded-lg p-4 mb-4">
          <p class="italic text-gray-600">
            Example: A good clue for these two pictures might be <strong class="text-blue-700">"flying: 2"</strong>
          </p>
        </div>

        <div class="flex gap-4 justify-center mb-4">
          <img
            :src="`${baseUrl}images/cards/og/card-29.jpg`"
            alt="card-example"
            class="w-28 sm:w-36 rounded-lg border-2 border-gray-300 shadow-md"
          />
          <img
            :src="`${baseUrl}images/cards/og/card-4.jpg`"
            alt="card-example"
            class="w-28 sm:w-36 rounded-lg border-2 border-gray-300 shadow-md"
          />
        </div>

        <p class="text-gray-700 leading-relaxed text-sm">
          You are allowed to give a clue for only one
          picture (<strong><em>doghnut: 1</em></strong>) but it's fun to try for two or more.
          Getting four pictures with one clue is a big accomplishment.
        </p>
      </div>
    </div>

    <!-- Making Contact Section -->
    <div class="max-w-4xl mx-auto mb-6">
      <div class="bg-white/80 border-2 border-gray-300 rounded-xl p-6 shadow-sm">
        <h3 class="text-2xl font-bold mb-4">Making Contact</h3>
        <p class="text-gray-700 leading-relaxed mb-4">
          When the spymaster gives a clue, his or her field operatives try to figure out what it means.
          They can debate it amongst themselves, but the spymaster must keep a straight face and is not allowed to comment.
          The operatives indicate their official guess when one of them touches one of the pictures on
          the table. (Online, verbal confirmation to the spymaster which card)
          The spymaster reveals who is in that location by clicking on the tile and assigns one of the following
          states: "Red", "Blue", "Neutral", "Game over".
        </p>

        <div class="grid gap-3 sm:grid-cols-2">
          <div class="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <p class="text-sm"><span class="font-bold text-blue-700">Correct guess:</span> The spymaster marks the picture with the correct color. The operatives may continue making guesses (but they do not get another clue).</p>
          </div>
          <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
            <p class="text-sm"><span class="font-bold text-yellow-700">Innocent bystander:</span> The spymaster marks it with an innocent ("Neutral") state. <strong>This ends the turn</strong>.</p>
          </div>
          <div class="bg-red-50 border border-red-200 rounded-lg p-3">
            <p class="text-sm"><span class="font-bold text-red-700">Other team's agent:</span> The picture is marked by the other team's agent colors. <strong>This ends the turn</strong>. (And it helps the other team)</p>
          </div>
          <div class="bg-gray-800 text-white rounded-lg p-3">
            <p class="text-sm"><span class="font-bold">Assassin:</span> The picture is marked as assassinated ("Game over"). <strong>This ends the game!</strong> The team that contacted the assassin loses.</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Turn Ending Section -->
    <div class="max-w-4xl mx-auto mb-6">
      <div class="grid gap-4 md:grid-cols-2">
        <div class="bg-white/80 border-2 border-gray-300 rounded-xl p-5 shadow-sm">
          <h3 class="text-xl font-bold mb-3">Ending the Turn</h3>
          <p class="text-gray-700 leading-relaxed text-sm mb-3">
            Your team's turn always has <strong>exactly one clue</strong> and <strong>one or more guesses</strong>. If the
            operatives' first guess is one of their team's pictures, they may make a second guess.
            If that's correct, they may make another guess, and so on.
          </p>
          <p class="font-bold mb-2 text-sm">The turn ends:</p>
          <ul class="list-disc list-inside space-y-1 text-sm text-gray-600">
            <li>if they guess a picture that's not theirs,</li>
            <li>if they choose to not guess anymore,</li>
            <li>or if they have already made as many guesses as the number specified by the clue <strong>plus one more</strong>.</li>
          </ul>
        </div>

        <div class="bg-white/80 border-2 border-gray-300 rounded-xl p-5 shadow-sm">
          <h3 class="text-xl font-bold mb-3">Bonus Guesses</h3>
          <p class="text-gray-700 leading-relaxed text-sm">
            For example, if your spymaster says <strong><em>flying: 2</em></strong>, you can make as many as 3 correct guesses.
            This doesn't make much sense on your first turn, but later in the game it can be very useful.
            For example, you might have received several clues for which you did not get all the pictures. You can guess these
            pictures instead of or in addition to those related to the current clue.
            The "one more guess" rule gives you a chance to catch up.
          </p>
        </div>
      </div>
    </div>

    <!-- Ending the Game -->
    <div class="max-w-4xl mx-auto mb-6">
      <div class="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-300 rounded-xl p-6 shadow-md">
        <h3 class="text-2xl font-bold mb-3 text-green-800">Ending the Game</h3>
        <p class="text-gray-700 leading-relaxed">
          <strong>The game ends when one team has all their pictures covered.</strong>
          That team wins. It is possible to win on the other team's turn if
          they guess your last picture.
          The game can end early if a field operative touches the location with the assassin. That operative's team loses.
        </p>
      </div>
    </div>

    <!-- Online Actions -->
    <div class="max-w-4xl mx-auto mb-8">
      <div class="bg-gray-100 border-2 border-gray-400 rounded-xl p-6">
        <h2 class="text-2xl font-bold mb-4">Online Actions</h2>
        <div class="grid gap-3 sm:grid-cols-2">
          <div class="bg-white rounded-lg p-3 border border-gray-200">
            <p><strong>Mark a card:</strong> tap an unmarked card and select a color</p>
          </div>
          <div class="bg-white rounded-lg p-3 border border-gray-200">
            <p><strong>Remove marking:</strong> tap a marked card to clear it</p>
          </div>
          <div class="bg-white rounded-lg p-3 border border-gray-200">
            <p><strong>View card full screen:</strong> tap the card number in the corner</p>
          </div>
          <div class="bg-white rounded-lg p-3 border border-gray-200">
            <p><strong>Set starting team:</strong> tap the score badge next to a team name</p>
          </div>
          <div class="bg-white rounded-lg p-3 border border-gray-200">
            <p><strong>Track score:</strong> use the + and - buttons under each team's score</p>
          </div>
          <div class="bg-white rounded-lg p-3 border border-gray-200">
            <p><strong>Spy master key:</strong> open from menu, share URL with the other spymaster</p>
          </div>
          <div class="bg-white rounded-lg p-3 border border-gray-200">
            <p><strong>Lock spy master screen:</strong> tap lock button to hide card, hold to peek</p>
          </div>
          <div class="bg-white rounded-lg p-3 border border-gray-200">
            <p><strong>Setup teams:</strong> add players, shuffle teams, and randomize spy masters</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom CTA -->
    <div class="max-w-4xl mx-auto text-center">
      <div class="flex flex-wrap gap-4 justify-center">
        <RouterLink to="/play" class="btn btn-green text-xl px-8 py-4">
          <FontAwesomeIcon icon="play" class="mr-2" />Start Classic!
        </RouterLink>
        <RouterLink to="/play-duet" class="btn border-2 border-green-600 text-green-700 bg-white hover:bg-green-50 text-xl px-8 py-4">
          <FontAwesomeIcon icon="users" class="mr-2" />Start Duet!
        </RouterLink>
        <RouterLink to="/spy-master" class="btn btn-blue text-xl px-8 py-4">
          <FontAwesomeIcon icon="user-secret" class="mr-2" />Spy Master Cards
        </RouterLink>
      </div>
    </div>
  </div>
</template>
