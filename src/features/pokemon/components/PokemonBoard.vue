<template>
  <section class="flex flex-col items-center justify-center gap-2">
    <div class="flex gap-2">
      <div class="flex border border-gray-200 rounded-lg flex-col gap-2 px-4 py-2">
        <h1 class="text-lg font-semibold">Puntaje</h1>
        <div class="flex gap-2">
          <span class="text">Correctas: <span class="text-green-600">{{ pointBoard.correct }}</span></span>
          <span>Incorrectas: <span class="text-red-600">{{ pointBoard.wrong }}</span> </span>
        </div>
      </div>
      <div class="flex flex-col items-center  gap-2">
        <button @click="handleNextRound"
                :disabled="currentBoard  === totalBoard"
                :class="{'button-next-round': true, 'button-next-round-disabled': currentBoard === totalBoard}">
          Siguiente ronda
        </button>
        <button
            @click="handleResetGame"
            class="bg-red-400 text-white h-10 p-2 rounded-lg hover:bg-red-600 transition-all">Terminar ronda
        </button>
      </div>
    </div>
    <div>Ronda: {{ currentBoard }} / {{ totalBoard }}</div>
  </section>
</template>

<script setup lang="ts">
import {GameStatus} from '@/features/pokemon/interfaces';
import type {BoardInterface} from '@/features/pokemon/interfaces/board.interface';
import {ref} from 'vue';

interface Props {
  gameStatus: GameStatus;
  pointBoard: BoardInterface;
}

defineProps<Props>();
const emit = defineEmits<(e: 'getNextRound' | 'resetGame') => void>();


const currentBoard = ref(1);
const totalBoard = ref(5);
const handleNextRound = () => {
  currentBoard.value += 1;
  emit('getNextRound');
};

const handleResetGame = () => {
  currentBoard.value = 0;
  emit('resetGame');
};

</script>

<style scoped>

.button-next-round {
  @apply cursor-pointer bg-blue-500 text-white h-10 p-2 rounded-lg hover:bg-blue-700 transition-all;
}

.button-next-round-disabled {
  @apply bg-gray-400 cursor-not-allowed hover:bg-gray-400;
}
</style>
