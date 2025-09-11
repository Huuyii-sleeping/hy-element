import { describe, it, expect } from "vitest";
import {mount} from '@vue/test-utils'
import Button from "./Button.vue";

describe('Button.vue', () => {
    it('should has the corrent type class when type prop is set', () => {
        const types = ['primary', 'success', 'warning', 'danger', 'info']
        types.forEach((type) => {
            const wrapper = mount(Button, {
                props: { type: type as any}
            })
            expect(wrapper.classes()).toContain(`hy-button--${type}`)
        })
    })  

    it('should has the corrent size class when size prop is set', () => {
        const sizes = ['large', 'default', 'small']
        sizes.forEach((size) => {
            const wrapper = mount(Button, {
                props: { type: size as any }
            })
            expect(wrapper.classes()).toContain(`hy-button--${size}`)
        })
    })

    // props: plain round circle
    // 测试按钮在不同的prop是否设置成true的时候是否添加了对应的类名
    it.each([
        ['plain', 'is-plain'],
        ['round', 'is-round'],
        ['circle', 'is-circle'],
        ['disabled', 'is-disabled'],
        ['loading', 'is-loading'],
    ])(
        'should has the corrent class when prop %s is set to true',
        (prop, className) => {
            const wrapper = mount(Button, {
                props: { [prop]: true },
                global: {
                    stubs: ['hyIcon'],
                }
            })
            expect(wrapper.classes()).toContain(className)
        }
    )

    // 测试原生按钮类型
    it('should has the correct native type attribute when native-type prop is set', () => {
        const wrapper = mount(Button, {
            props: { nativeType: 'submit' },
        })
        expect(wrapper.element.tagName).toBe('BUTTON')
        expect(wrapper.element.type).toBe('submit')
        // type是原生的类型 代表按钮/输入框的类型
    })

    // 测试标签类型
    it('should renders the custom tag when tag prop is set', () => {
        const wrapper = mount(Button, {
            props: { tag: 'a' }
        })
        expect(wrapper.element.tagName.toLowerCase()).toBe('a')
    })

    // 测试点击
    it('shoule emit a click event when the button is clicked', async () => {
        const wrapper = mount(Button, {})
        await wrapper.trigger('click')
        expect(wrapper.emitted().click).toHaveLength(1)
    })
})