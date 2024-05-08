<template>
  <div>
    <h1>{{ props.title }}</h1>
    <input type="text" v-model="message"/>
    <p>{{ message }}</p>
  </div>
</template>

<script setup lang="ts">
import {ref, onMounted} from 'vue';

const props = defineProps(
    {
      title: String,
    }
);

let message = ref('');

onMounted(() => {
  message.value = 'Two way data binding in Vue 3';
});

</script>
