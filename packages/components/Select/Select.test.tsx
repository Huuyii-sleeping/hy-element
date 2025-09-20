import { describe, expect, test, vi } from "vitest";
import { rAF } from "@hy-element/utils";
import Select from "./Select.vue";
import Options from "./Options.vue";
import { mount } from "@vue/test-utils";
import type { SelectOptionProps } from "./types";
import { SELECT_CTX_KEY } from "./constants";

describe('Select.vue', () => {
    test('select render with default props', async () => {
        const wrapper = mount(Select, {
            props: {
                modelValue: '',
                options: [
                    {
                        value: '1',
                        label: 'option 1'
                    }
                ]
            }
        })
        wrapper.find('input').trigger('click')
        await rAF()
        console.log('wrapper.text():',wrapper.text())
        expect(wrapper.text()).toContain('option 1')
    })

    test('selected an options', async () => {
        const wrapper = mount(Select, {
            props: {
                modelValue: '',
                options: [{ value: '1', label: 'option 1' }]
            }
        })
        wrapper.find('input').trigger('click')
        await rAF()
        const option = wrapper.findAll('li').at(0)
        await option?.trigger('click') 
        expect(wrapper.emitted('update:modelValue')).toEqual([['1']])
        expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['1'])
    })

    test('option emits an event click', async () => {
        const ctx = {
            handleSelect: vi.fn(),
            selectStates: {
                selectedOption: null
            },
            renderLabel: (props: SelectOptionProps) => `label:${props.label}`
        }
        const wrapper = mount(Options, {
            props: {
                value: '1',
                label: 'option 1'
            },
            global: {
                provide: {
                    [SELECT_CTX_KEY as any]: ctx
                }
            }
        })
        await wrapper.trigger('click')
        expect(ctx.handleSelect).toHaveBeenCalled()
    })
})