<template>
  <section v-if="isLoading"
           class="flex flex-col  justify-center items-center w-screen h-screen">
    <h1 class="text-xl">Espere porfis</h1>
    <p class="animate-pulse ">Estamos cargando el juego de pokemon</p>
  </section>

  <section v-else class="bg-gray-50 flex flex-col flex-1 justify-center items-center w-screen h-screen">
    <div class="flex flex-col items-center gap-4 h-1/6 flex-1 p-8">
      <PokemonResult :game-status="gameStatus" :pokemon="randomPokemon"/>
      <PokemonBoard :game-status="gameStatus"
                    :point-board="pointBoard"
                    @getNextRound="getNextRoundOptions(10)"
                    @resetGame="resetGame"
      />
    </div>
    <!--    Pokemon Pictures-->
    <PokemonPictures
        class="h-1/6"
        :random-pokemon-id="randomPokemon.id"
        :show-pokemon="gameStatus !== GameStatus.Playing"
    />
    <!--    Pokemon Options-->
    <PokemonOptions
        class="select-none h-3/6"
        :pokemons-options="pokemonsOptions"
        :block-selection="gameStatus !== GameStatus.Playing"
        :correct-answer="randomPokemon.id"
        @selectedOption="handleSelectedOption"/>
  </section>
</template>

<script setup lang="ts">
import PokemonPictures from '@/features/pokemon/components/PokemonPictures.vue';
import PokemonOptions from '@/features/pokemon/components/PokemonOptions.vue';
import {usePokemonGame} from '@/features/pokemon/composables/usePokemonGame';
import {GameStatus} from '@/features/pokemon/interfaces';
import PokemonResult from '@/features/pokemon/components/PokemonResult.vue';
import PokemonBoard from '@/features/pokemon/components/PokemonBoard.vue';

const {
  gameStatus,
  isLoading,
  randomPokemon,
  pokemonsOptions,
  pointBoard,
  checkAnswer,
  getNextRoundOptions,
  resetGame
} = usePokemonGame();

const handleSelectedOption = (id: number) => {
  checkAnswer(id);
};

</script>
