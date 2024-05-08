<template>
  <div class="bg-gray-100 h-screen flex flex-col max-w-lg mx-auto">


    <div class="bg-blue-500 p-4 text-white flex justify-between items-center">
      <span>Agencia 123</span>
    </div>
    <ChatMessages :messages="messages"/>
    <MessageBox @send-message="onNewMessage"/>
  </div>
</template>

<script setup lang="ts">
import ChatMessages from '@/features/indecision/application/components/ChatMessages.vue';
import MessageBox from '@/features/indecision/application/components/MessageBox.vue';
import {useChat} from '@/features/indecision/application/useChat';

const {messages, onNewMessage} = useChat();

</script>
