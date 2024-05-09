import CalculateNumber from '@/component/CalculateNumber.vue';
import {mount} from '@vue/test-utils';
import {expect, test, describe} from 'vitest';

describe('CalculateNumber', () => {
    test('should match snapshot', () => {
        const wrapper = mount(CalculateNumber, {
            props: {
                numberPass: 1
            }
        });
        expect(wrapper.html()).toMatchSnapshot();
    });
});
