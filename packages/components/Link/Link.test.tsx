import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import hyLink from './Link.vue'

describe('hyLink', () => {
    it('should render correctly', () => {
        const wrapper = mount(hyLink, {
            props: { href: 'https://example.com', type: 'primary' }
        })
        expect(wrapper.exists()).toBe(true)
    })

    it('should have correct class when type is primary', () => {
        const wrapper = mount(hyLink, {
            props: { type: 'primary' }
        })
        expect(wrapper.classes().includes('hy-link--primary')).toBe(true)
    })

    it('should have correct class when type is danger', () => {
        const wrapper = mount(hyLink, {
            props: { type: 'danger' }
        })
        expect(wrapper.classes().includes('hy-link--danger')).toBe(true)
    })

    it('should not emit click when disabled', async () => {
        const wrapper = mount(hyLink, {
            props: { href: 'https://example.com', disabled: true }
        })

        await wrapper.trigger('click')
        expect(wrapper.emitted().click).toBeFalsy()
    })

    it('should have correct href attribute', () => {
        const wrapper = mount(hyLink, {
            props: { href: 'https://example.com' }
        })
        expect(wrapper.element.getAttribute('href')).toBe('https://example.com')
    })

    it('should have correct targetattribute', () => {
        const wrapper = mount(hyLink, {
            props: { target: '_blank' }
        })
        expect(wrapper.element.getAttribute('target')).toBe('_blank')
    })

    it('should render slot content', () => {
        const wrapper = mount(hyLink, {
            props: { href: 'https://example.com' },
            slots: {
                default: '<span>自定义内容</span>'
            }
        })
        expect(wrapper.find('span').text()).toBe('自定义内容')
    })

    it('emit event', async () => {
        const wrapper = mount(hyLink, {
            props: { href: 'https://example.com' },
        })
        await wrapper.trigger('click')
        expect(wrapper.emitted('click')).toBeTruthy()
    })
})