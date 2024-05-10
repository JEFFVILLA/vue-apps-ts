import {describe, test, expect, vi} from 'vitest';
import ChatMessages from '@/features/indecision/application/components/ChatMessages.vue';
import {mount} from '@vue/test-utils';
import type {ChatMessagesInterface} from '@/features/indecision/domain/interfaces/chat-messages.interface';

const messages: ChatMessagesInterface[] = [
    {
        id: 1,
        message: 'Hello',
        isSent: true
    },
    {
        id: 2,
        message: 'Hi',
        isSent: false,
        image: 'https://example.com/image.jpg'
    }
];

describe('ChatMessages', () => {
    const wrapper = mount(ChatMessages, {
        props: {
            messages
        }
    });
    test('should render chat messages correct', () => {
        const messageItem = wrapper.findAllComponents({name: 'MessageItem'});
        expect(messageItem.length).toBe(messages.length);
    });

    test('should scroll to bottom when messages updated', async () => {
        const scrollToMock = vi.fn();
        const chatRef = wrapper.vm.$refs.chatRef as HTMLDivElement;
        chatRef.scrollTo = scrollToMock;
        await wrapper.setProps({
            messages: [
                ...messages,
                {
                    id: 3,
                    message: 'How are you?',
                    isSent: true
                }
            ]
        });
        await new Promise(resolve => setTimeout(resolve, 150));
        expect(scrollToMock).toHaveBeenCalledTimes(1);
        expect(scrollToMock).toHaveBeenCalledWith({
            top: expect.any(Number),
            behavior: 'smooth'
        });
    });
});
