<template>
  <section class="flex flex-col pb-18 select-none items-center overflow-hidden flex-wrap w-full gap-4">
    <button v-for="{name, id} in pokemonsOptions" :key="id"
            :class="[
                'capitalize disabled:shadow-none disabled:cursor-not-allowed',
            {
              'hover:bg-gray-100': !blockSelection,
              correct: id === correctAnswer && blockSelection,
              incorrect: id !== correctAnswer && blockSelection,
            }]"
            :disabled="blockSelection"
            @click="emit('selectedOption', id);">
      {{ name }}
    </button>
  </section>
</template>
<script setup lang="ts">


import {type Pokemon} from '@/features/pokemon/interfaces';

defineProps<{
  pokemonsOptions: Pokemon[];
  blockSelection: boolean;
  correctAnswer: number;
}>();

const emit = defineEmits<(e: 'selectedOption', id: number) => void>();

</script>


<style scoped>
button {
  @apply cursor-pointer bg-white shadow-md rounded-lg p-3 m-2 w-40 text-center transition-all;
}

.correct {
  @apply bg-green-500 text-white;
}

.incorrect {
  @apply bg-red-100 opacity-70;
}

</style>
