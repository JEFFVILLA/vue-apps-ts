import {describe, test, expect} from 'vitest';
import MessageBox from '@/features/indecision/application/components/MessageBox.vue';
import {mount} from '@vue/test-utils';


describe('MessageBox', () => {

    const wrapper = mount(MessageBox);

    test('render input and buttons elements correctly', () => {
        expect(wrapper.html()).toMatchSnapshot();
        expect(wrapper.find('input[type="text"]').exists()).toBe(true);
        expect(wrapper.find('button svg').exists()).toBe(true);
    });

    test('emit send message event when click send button', async () => {
        const message = 'message to emit';
        const input = wrapper.find('input[type="text"]');
        await input.setValue(message);
        await wrapper.find('button').trigger('click');
        expect(wrapper.emitted('sendMessage')?.[0]).toEqual([message]);
        expect((wrapper.vm as any).message).toBe('');
    });

    test('emit send message event when press enter key', async () => {
        const message = 'message to emit';
        const input = wrapper.find('input[type="text"]');
        await input.setValue(message);
        await input.trigger('keyup.enter');
        expect(wrapper.emitted('sendMessage')?.[0]).toEqual([message]);
    });

    test('do not emit send message event', async () => {
        const wrapper = mount(MessageBox);
        const input = wrapper.find('input[type="text"]');
        await input.trigger('keyup.enter');
        await wrapper.find('button').trigger('click');
        expect(wrapper.emitted('sendMessage')).toBeFalsy();
    });


});
