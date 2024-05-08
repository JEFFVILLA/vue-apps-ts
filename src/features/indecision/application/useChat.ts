import {nextTick, ref} from 'vue';
import type {ChatMessagesInterface} from '@/features/indecision/domain/interfaces/chat-messages.interface';
import type {YesNoApiResponse} from '@/features/indecision/domain/interfaces/yes-no-api.interface';
import {sleep} from '@/features/indecision/helpers/sleep';

export const useChat = () => {
    const messages = ref<ChatMessagesInterface[]>([]);

    const getHerResponse = async () => {
        const response = await fetch('https://yesno.wtf/api');
        return (await response.json()) as YesNoApiResponse;
    };

    const onNewMessage = async (message: string) => {
        if (message.length === 0) {
            return;
        }

        messages.value.push({
            id: new Date().getTime(),
            message,
            isSent: true,
        });

        if (!message.endsWith('?')) {
            return;
        }

        await sleep(1.5);
        const {answer, image} = await getHerResponse();
        messages.value.push({
            id: new Date().getTime(),
            message: answer,
            isSent: false,
            image,
        });

        await nextTick();
    };
    return {
        messages,
        onNewMessage,
    };
};
