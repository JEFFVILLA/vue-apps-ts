import {describe, expect, test} from 'vitest';
import {mount} from '@vue/test-utils';
import MessageItem from '@/features/indecision/application/components/MessageItem.vue';


describe('MessageItem', () => {
    test('render own message correctly', () => {
        const message = 'Hello';
        const wrapper = mount(MessageItem, {
            props: {
                message,
                isSent: true
            }
        });
        expect(wrapper.find('.bg-blue-200').exists()).toBe(true);
        expect(wrapper.find('.bg-blue-200').exists()).toBeTruthy();
        expect(wrapper.find('.bg-blue-200').text()).toBe(message);
        expect(wrapper.find('.bg-gray-300').exists()).toBeFalsy();
    });

    test('render receive message correctly', () => {
        const message = 'Hello';
        const wrapper = mount(MessageItem, {
            props: {
                message,
                isSent: false,
                image: undefined,
            }
        });
        expect(wrapper.find('.bg-gray-300').exists()).toBe(true);
        expect(wrapper.find('.bg-gray-200').exists()).toBe(false);
        expect(wrapper.find('.bg-gray-300').text()).toBe(message);
        expect(wrapper.find('img').exists()).toBe(false);
    });
    test('render receive message correctly with image', () => {
        const message = 'Hello';
        const image = 'example.jpg';
        const wrapper = mount(MessageItem, {
            props: {
                message,
                isSent: false,
                image,
            }
        });
        expect(wrapper.find('.bg-gray-300').exists()).toBe(true);
        expect(wrapper.find('.bg-gray-200').exists()).toBe(false);
        expect(wrapper.find('.bg-gray-300').text()).toBe(message);
        expect(wrapper.find('img').attributes('src')).toBe(image);
    });
});

