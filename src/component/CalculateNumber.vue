<template>
  <div>
    <span class="text-2xl">Calculate square and cube of a number</span>
    <input type="number" v-model="numberToCalculate"/>
    <span>square: {{ square }}</span>
    <span>cube: {{ cube }}</span>
    <span>numberPass: {{ props.numberPass }}</span>
    <div>
      <button @click="reset">Reset</button>
    </div>

  </div>

</template>

<script setup lang="ts">
import {computed, ref} from 'vue';

const props = defineProps({
  numberPass: {type: Number, required: true}
});

const emit = defineEmits(['reset']);

const numberToCalculate = ref(0);

const square = computed(() => Math.pow(numberToCalculate.value, 2));
const cube = computed(() => Math.pow(numberToCalculate.value, 3));
const reset = () => {
  numberToCalculate.value = 0;
  emit('reset');
};
</script>
