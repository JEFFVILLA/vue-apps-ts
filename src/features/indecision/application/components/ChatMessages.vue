<template>
  <div ref="chatRef" class="flex-1 overflow-y-auto p-4">
    <div class="flex flex-col space-y-2">
      <MessageItem
          v-for="message in messages"
          :key="message.id"
          v-bind="message"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type {ChatMessagesInterface} from '@/features/indecision/domain/interfaces/chat-messages.interface';
import MessageItem from '@/features/indecision/application/components/MessageItem.vue';
import {nextTick, ref, watch} from 'vue';

interface ChatMessagesProps {
  messages: ChatMessagesInterface[];
}

const props = defineProps<ChatMessagesProps>();

const chatRef = ref<HTMLDivElement | null>(null);

watch(props, () => {
  nextTick(() => {
    chatRef?.value?.scrollTo({
      top: chatRef?.value?.scrollHeight,
      behavior: 'smooth',
    });
  });
});

</script>
