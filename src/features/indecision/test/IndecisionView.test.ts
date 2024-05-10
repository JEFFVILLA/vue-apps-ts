import {describe, test, expect} from 'vitest';
import {mount} from '@vue/test-utils';
import IndecisionView from '@/features/indecision/application/IndecisionView.vue';
import ChatMessages from '@/features/indecision/application/components/ChatMessages.vue';
import MessageBox from '@/features/indecision/application/components/MessageBox.vue';


const mockChatMessages = {
    template: '<div data-test-id="mock-message"> Mock ChatMessages </div>'
};

describe('IndecisionView', it => {
    test('should render', async () => {
        const wrapper = mount(IndecisionView);
        expect(wrapper.html()).toMatchSnapshot();
        expect(wrapper.findComponent(ChatMessages).exists()).toBe(true);
        expect(wrapper.findComponent(MessageBox).exists()).toBe(true);
    });

    test('calls sendMessage when message is sent', async () => {
        const wrapper = mount(IndecisionView, {
            global: {
                stubs: {
                    ChatMessages: mockChatMessages,
                }
            }
        });
        const messageBoxComponent = wrapper.findComponent(MessageBox);
        messageBoxComponent.vm.$emit('sendMessage', 'Hello');
        await new Promise(resolve => setTimeout(resolve, 150));
        expect(wrapper.html()).toMatchSnapshot();
    });
});

