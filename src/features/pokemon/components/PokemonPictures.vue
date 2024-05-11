<template>
  <section>
    <img v-if="!showPokemon" :src="pokemonImage"
         alt="pokemon" class="brightness-0 w-full h-full"/>
    <img v-else :src="pokemonImage" class="fade-in w-full h-full" alt="pokemon img"/>
  </section>
</template>

<script setup lang="ts">
import {computed} from 'vue';

interface Props {
  randomPokemonId: number;
  showPokemon: boolean;
}

const props = withDefaults(defineProps<Props>(),
    {
      showPokemon: false
    });

const pokemonImage = computed(() => `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${props.randomPokemonId}.svg`);

</script>

<style scoped>
img {
  user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -webkit-user-select: none;
  -webkit-user-drag: none;
}
</style>
