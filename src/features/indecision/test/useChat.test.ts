import {describe, test, expect, vi} from 'vitest';
import {useChat} from '@/features/indecision/application/useChat';


describe('useChat', () => {
    test('should render', async () => {
        const text = 'Hello';
        const {messages, onNewMessage} = useChat();
        await onNewMessage(text);
        expect(messages.value.length).toBe(1);
        expect(messages.value[0].isSent).toBe(true);
        expect(messages.value[0].message).toBe(text);
        expect(messages.value[0]).toEqual({
            id: expect.any(Number),
            isSent: true,
            message: text,
        });
    });

    test('do nothing if message is empty', async () => {
        const text = '';
        const {messages, onNewMessage} = useChat();
        await onNewMessage(text);
        expect(messages.value.length).toBe(0);
    });

    test('get her response when message ends with "?"', async () => {
        const text = 'Hello?';
        const {messages, onNewMessage} = useChat();
        await onNewMessage(text);

        await new Promise(resolve => setTimeout(resolve, 2000));
        const [myMessage, herMessage] = messages.value;
        expect(messages.value.length).toBe(2);
        expect(herMessage).toEqual({
            id: expect.any(Number),
            message: expect.any(String),
            isSent: false,
            image: expect.any(String),
        });
        expect(myMessage).toEqual({
            id: expect.any(Number),
            isSent: true,
            message: text,
        });

    });

    test('mock response - fetch api', async () => {
        const mockResponse = {answer: 'yes', image: 'example.gif'};
        (window as any).fetch = vi.fn(async () => {
            return {
                json: async () => mockResponse,
            };
        });
        const text = 'Hello?';
        const {messages, onNewMessage} = useChat();
        await onNewMessage(text);

        await new Promise(resolve => setTimeout(resolve, 500));

        const [, herMessage] = messages.value;
        expect(herMessage).toEqual({
            id: expect.any(Number),
            message: mockResponse.answer,
            isSent: false,
            image: mockResponse.image,
        });
    });

});
