<template>
  <section class="flex flex-col gap-2 items-center justify-center">
    <h1 class="text-2xl"> ¿Quién es este pokemon?</h1>
    <h3 class="capitalize text-teal-700 text-xl">
      {{ gameStatus !== GameStatus.Playing ? pokemon.name : '--------' }}</h3>
    <h3 v-if="gameStatus === GameStatus.Won" class="capitalize text-green-600 text-xl">Acertaste</h3>
    <h3 v-if="gameStatus === GameStatus.Lost" class="capitalize text-red-400 text-xl">No acertaste</h3>
  </section>
</template>
<script setup lang="ts">

interface Props {
  gameStatus: GameStatus;
  pokemon: Pokemon;
}

defineProps<Props>();

import {GameStatus, type Pokemon} from '@/features/pokemon/interfaces';
</script>

