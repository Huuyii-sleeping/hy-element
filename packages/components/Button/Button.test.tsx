import { describe, it, expect } from "vitest";
import { mount } from '@vue/test-utils'
import Button from "./Button.vue";
import Icon from "../Icon/Icon.vue";
import test from "node:test";

describe('Button.vue', () => {
    it('should has the corrent type class when type prop is set', () => {
        const types = ['primary', 'success', 'warning', 'danger', 'info']
        types.forEach((type) => {
            const wrapper = mount(Button, {
                props: { type: type as any }
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
            /**
             * mount 借助Vitest借助挂载，传入props和全局配置
             */
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

    it('should display loading icon and not emit click event when button is loading',
        async () => {
            const wrapper = mount(Button, {
                props: { loading: true },
                global: {
                    stubs: ['hyIcon'],
                }
            })
            const iconElement = wrapper.findComponent(Icon)
            expect(wrapper.find('.loading-icon').exists()).toBe(true)
            expect(iconElement.exists()).toBeTruthy()
            expect(iconElement.attributes('icon')).toBe('spinner')
            await wrapper.trigger('click')
            expect(wrapper.emitted('click')).toBeUndefined()
        }
    )

    it('should display loading icon', async () => {
        const wrapper = mount(Button, {
            props: { loading: true },
            global: {
                stubs: ['hyIcon']
            }
        })
        const iconElement = wrapper.findComponent(Icon)
        expect(iconElement.exists()).toBeTruthy()
        expect(iconElement.attributes('icon')).toBe('spinner')
        await wrapper.trigger('click')
        expect(wrapper.emitted('click')).toBeUndefined()
    })

    test('loading icon', () => {
        const wrapper = mount(Button, {
            props: { loading: true },
            slots: { default: 'loading button' }, // 设置slot的内容
            global: {
                stubs: ['hyIcon'],
            }
        })
        // class
        expect(wrapper.classes()).toContain('is-loading')
        // attrs
        expect(wrapper.attributes('disabled')).toBeDefined()
        expect(wrapper.find('button').element.disabled).toBeTruthy()
        // events
        wrapper.get('button').trigger('click')
        expect(wrapper.emitted()).not.toHaveProperty('click')
        // icon
        const iconElement = wrapper.findComponent(Icon)
        expect(iconElement.exists()).toBeTruthy()
        expect(iconElement.attributes('icon')).toBe('spinner')
    })

    test('icon button', () => {
        const wrapper = mount(Button, {
            props: { icon: 'arrow-up' },
            slots: { default: 'icon button' },
            global: {
                stubs: ['hyIcon']
            }
        })

        const iconElement = wrapper.findComponent(Icon)
        expect(iconElement.exists()).toBeTruthy()
        expect(iconElement.attributes()).toBe('arrow-up')
    })
})