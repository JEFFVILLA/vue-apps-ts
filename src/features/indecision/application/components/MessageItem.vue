<template>
  <div v-if="isSent" class="flex justify-end">
    <div class="bg-blue-200 text-black p-2 rounded-lg max-w-xs">
      <span class="capitalize">{{ message }}</span>
    </div>
  </div>
  <div class="flex" v-else>
    <div class="bg-gray-300 text-black p-2 rounded-lg max-w-xs">
      <span class="capitalize">{{ message }}</span>
      <img
          v-if="image"
          :src="image"
          alt="message" class="w-52 h-52 object-cover rounded-md"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
interface MessageItemProps {
  message: string;
  isSent: boolean;
  image?: string;
  typing?: boolean;
}

defineProps<MessageItemProps>();
</script>

