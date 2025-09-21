// src/components/Drawer/Drawer.spec.ts
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import hyDrawer from './Drawer.vue'
import { nextTick } from 'vue'

describe('hyDrawer', () => {
    let wrapper: any

    const factory = (props = {}, slots = {}) => {
        return mount(hyDrawer, {
            props: {
                visible: false,
                ...props
            },
            slots: {
                ...slots
            }
        })
    }

    beforeEach(() => {
        wrapper = factory()
    })

    afterEach(() => {
        wrapper?.unmount()
    })

    // 基础用法
    it('should show when visible is true', async () => {
        await wrapper.vm.toggleVisible()
        await nextTick()
        expect(wrapper.find('.hy-drawer').exists()).toBe(true)
    })

    it('should hide when visible is false', async () => {
        expect(wrapper.find('.hy-drawer').exists()).toBe(true)
    })

    // 不添加 Title
    it('should not render header when withHeader is false', async () => {
        wrapper = factory({ withHeader: false })
        await wrapper.vm.toggleVisible()
        await nextTick()
        expect(wrapper.find('.hy-drawer__header').exists()).toBe(true)
    })

    // 插槽测试
    it('should render title slot when provided', async () => {
        wrapper = factory({}, {
            title: '<span class="custom-title">Custom Title</span>'
        })
        await wrapper.vm.toggleVisible()
        await nextTick()
        expect(wrapper.find('.custom-title').text()).toBe('Custom Title')
    })

    it('should render default slot content', async () => {
        wrapper = factory({}, {
            default: '<p class="test-content">Test Content</p>'
        })
        await wrapper.vm.toggleVisible()
        await nextTick()
        expect(wrapper.find('.test-content').text()).toBe('Test Content')
    })

    it('should render footer slot when provided', async () => {
        wrapper = factory({}, {
            footer: '<button class="custom-footer-btn">Custom Footer</button>'
        })
        await wrapper.vm.toggleVisible()
        await nextTick()
        expect(wrapper.find('.custom-footer-btn').text()).toBe('Custom Footer')
    })

    // 事件测试
    it('should emit update:visible when toggleVisible is called', async () => {
        await wrapper.vm.toggleVisible()
        expect(wrapper.emitted()['update:modelValue']).toBeTruthy()
        expect(wrapper.emitted()['update:modelValue'][0]).toEqual([true])
    })
    
})