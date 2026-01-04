<script setup lang="ts">
import { RouterLink } from 'vue-router'

const baseUrl = import.meta.env.BASE_URL
</script>

<template>
  <div class="max-w-4xl mx-auto p-8 bg-white/50 border-2 border-dashed border-gray-400 my-8 rounded-lg">
    <RouterLink to="/play" class="btn btn-green float-right">
      Start!
    </RouterLink>

    <h1 class="text-4xl font-bold mb-4">Codenames Pictures Online</h1>

    <p class="mb-6">
      The online version of Codenames Pictures by
      <a
        href="https://czechgames.com/en/codenames-pictures/"
        target="_blank"
        rel="noopener noreferrer"
        class="text-blue-600 hover:underline"
      >
        czechgames
      </a>
    </p>

    <h3 class="text-2xl font-bold mt-6 mb-2">Intro</h3>
    <p class="mb-4">
      What are these strange symbols on the map? They code for locations where spies must contact secret agents!
      <br />
      Two rival spymasters know the agent in each location. They deliver coded messages telling their field operatives
      where to go for clandestine meetings. Operatives must be clever. A decoding mistake could lead to an unpleasant
      encounter with an enemy agent - or worse, with the assassin!
      <br />
      Both teams race to contact all their agents, but only one team can win.
    </p>

    <h2 class="text-3xl font-bold mt-8 mb-4">Game rules</h2>

    <h3 class="text-2xl font-bold mt-6 mb-2">The spymasters key card</h3>
    <p class="mb-4">
      Each game has one spy master key that shows who can be found in each location.
      <br />
      The spymasters should choose the key card randomly, don't let the field operatives see the key.
      <br />
      The key corresponds to the grid. Blue squares correspond to pictures that Blue Team
      <br />
      must guess (locations with blue agents). Red squares correspond to pictures that Red Team must
      <br />
      guess (locations with red agents). Pale squares have innocent bystanders, and the black square
      <br />
      hides an assassin!
    </p>

    <h3 class="text-2xl font-bold mt-6 mb-2">Starting team</h3>
    <p class="mb-4">
      The lights on the sides of the key card indicate which team starts. The starting team
      <br />
      has 8 pictures to guess. The other team has 7. The starting team will give the first
      <br />
      clue of the game.
    </p>

    <h3 class="text-2xl font-bold mt-6 mb-2">Game play</h3>
    <p class="mb-4">
      Spymasters take turns giving one-word clues.
      <br />
      The word relates to one or more pictures on the grid. The field operatives try to guess which pictures their
      spymaster meant.
      <br />
      When a field operative touches a picture, the spymaster reveals who is in that location. If it is one of their
      team's agents, the operatives may keep guessing locations related to that one-word clue. Otherwise, it is the
      other team's turn. The first team to contact all their agents wins the game.
    </p>

    <h3 class="text-2xl font-bold mt-6 mb-2">Taking turns</h3>
    <p class="mb-4">
      <strong>Teams take turns</strong>, beginning with the starting team. (The starting team is indicated by the lights
      on the sides of the key card.)
      <br />
      On your team's turn, the spymaster gives <strong>one clue</strong>, and the field operatives may make
      <strong>multiple guesses</strong>.
    </p>

    <h3 class="text-2xl font-bold mt-6 mb-2">Giving the clue</h3>
    <p class="mb-4">
      If you are the spymaster, your job is to think up a clue that relates to some of the pictures your team is trying
      to guess.
      <br />
      Your clue consists of <strong>one word</strong> that relates to those pictures <strong>and one number</strong>
      that tells how many of your pictures relate to that word.
    </p>

    <blockquote class="border-l-4 border-gray-400 pl-4 italic my-4">
      Example: A good clue for these two pictures might be <strong><em>flying: 2</em></strong>.
    </blockquote>

    <div class="flex gap-4 my-4">
      <img
        :src="`${baseUrl}images/cards/card-29.jpg`"
        alt="card-example"
        class="w-36 rounded border border-gray-400"
      />
      <img
        :src="`${baseUrl}images/cards/card-4.jpg`"
        alt="card-example"
        class="w-36 rounded border border-gray-400"
      />
    </div>

    <p class="mb-4">
      You are allowed to give a clue for only one
      <br />
      picture (<strong><em>doghnut: 1</em></strong>) but it's fun to try for two or more.
      <br />
      Getting four pictures with one clue is a big accomplishment.
    </p>

    <h3 class="text-2xl font-bold mt-6 mb-2">Making contact</h3>
    <p class="mb-4">
      When the spymaster gives a clue, his or her field operatives try to figure out what it means.
      <br />
      They can debate it amongst themselves, but the spymaster must keep a straight face and is not allowed to comment.
      The operatives indicate their official guess when one of them touches one of the pictures on
      <br />
      the table. (Online, verbal confirmation to the spymaster which card)
      <br />
      The spymaster reveals who is in that location by clicking on the tile and assigns one of the following
      states: "Red", "Blue", "Neutral", "Game over".
    </p>

    <ul class="list-disc list-inside space-y-2 mb-4">
      <li>
        If the field operative verbally chooses a picture belonging to his or her team, the spymaster marks the picture
        with the correct color. The operatives may continue making guesses (but they do not get another clue).
      </li>
      <li>
        If the field operative verbally chooses a location
        with an innocent bystander, the spymaster marks it with an innocent ("Neutral") state.
        <strong>This ends the turn</strong>.
      </li>
      <li>
        If the field operative chooses a picture belonging to the other team, the picture is marked by one of the other
        team's agent colors.
        This <strong>ends the turn</strong>. (And it helps the other team)
      </li>
      <li>
        If the field operative chooses the location
        with the assassin, the picture is marked as assassinated ("Game over").
        <strong>This ends the game!</strong>
        The team that contacted the assassin loses.
      </li>
    </ul>

    <h3 class="text-2xl font-bold mt-6 mb-2">Ending the Turn</h3>
    <p class="mb-4">
      Your team's turn always has <strong>exactly one clue</strong> and <strong>one or more guesses</strong>. If the
      operatives' first guess is one of their team's pictures, they may make a second guess.
      <br />
      If that's correct, they may make another guess, and so on.
    </p>

    <p class="font-bold mb-2">The turn ends</p>
    <ul class="list-disc list-inside space-y-1 mb-4">
      <li>if they guess a picture that's not theirs,</li>
      <li>if they choose to not guess anymore,</li>
      <li>or if they have already made as many guesses as the number specified by the clue <strong>plus one more</strong>.</li>
    </ul>

    <p class="mb-4">
      For example, if your spymaster says <strong><em>flying: 2</em></strong>, you can make as many as 3 correct guesses.
      This doesn't make much sense on your first turn, but later in the game it can be very useful.
      <br />
      For example, you might have received several clues for which you did not get all the pictures. You can guess these
      pictures instead of or in addition to those related to the current clue.
      <br />
      The "one more guess" rule gives you a chance to catch up.
    </p>

    <h3 class="text-2xl font-bold mt-6 mb-2">Ending the game</h3>
    <p class="mb-4">
      <strong>The game ends when one team has all their pictures covered.</strong>
      <br />
      That team wins. It is possible to win on the other team's turn if
      <br />
      they guess your last picture.
      <br />
      The game can end early if a field operative touches the location with the assassin. That operative's team loses.
    </p>

    <h2 class="text-3xl font-bold mt-8 mb-4">Online actions</h2>
    <ul class="list-disc list-inside space-y-2 mb-6">
      <li>
        <strong>Marking a state:</strong> click on the tile
      </li>
      <li>
        <strong>Remove a marking:</strong> double click on the tile
      </li>
      <li>
        <strong>Choosing a spymasters key card:</strong> click on the <strong><em>spy master</em></strong> button
      </li>
      <li>
        <strong>Search for a spymaster key:</strong> enter the card ID on the spymaster page and submit.
      </li>
    </ul>

    <div class="flex gap-4">
      <RouterLink to="/play" class="btn btn-green">
        Start Classic!
      </RouterLink>
      <RouterLink to="/play-duet" class="btn btn-green">
        Start Duet!
      </RouterLink>
    </div>
  </div>
</template>
