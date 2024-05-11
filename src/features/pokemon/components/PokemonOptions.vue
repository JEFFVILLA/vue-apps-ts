<template>
  <section class="flex flex-col pt-4 pb-12 select-none items-center overflow-hidden flex-wrap w-full lg:w-96 gap-4">
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
  @apply cursor-pointer bg-white shadow-md rounded-lg p-2 w-32 truncate h-10 text-center transition-all;
}

.correct {
  @apply bg-green-500 text-white;
}

.incorrect {
  @apply bg-red-100 opacity-70;
}

</style>
