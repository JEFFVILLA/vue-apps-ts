import CalculateNumber from '@/component/CalculateNumber.vue';
import {mount} from '@vue/test-utils';
import {expect, test, describe} from 'vitest';

describe('CalculateNumber', () => {
    test('should reset correctly', async () => {
        const wrapper = mount(CalculateNumber, {
            props: {
                numberPass: 2
            }
        });
        await wrapper.find('input').setValue(2);
        await wrapper.find('button').trigger('click');
        expect(wrapper.find('input').element.value).toBe('0');
    });
});
