// Dialog.spec.ts
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import hyDialog from './Dialog.vue'
import { nextTick } from 'vue'

describe('hyDialog', () => {
    let wrapper: any

    const factory = (props = {}, slots = {}) => {
        return mount(hyDialog, {
            props: {
                ...props
            },
            slots: {
                ...slots
            },
        })
    }

    beforeEach(() => {
        wrapper = factory()
    })

    // ============ 基础测试 ============
    it('should render correctly', () => {
        expect(wrapper.exists()).toBe(true)
    })

    it('should not show when visible is false', async () => {
        wrapper = factory({ visible: false })
        console.log(wrapper.find('.hy-dialog__header'))
        expect(wrapper.find('.hy-dialog__header').exists()).toBe(true)
    })

    it('should show when visible is true', async () => {
        wrapper = factory({ visible: true })
        expect(wrapper.find('.hy-dialog__header').exists()).toBe(true)
    })

    // ============ v-model:visible 测试 ============
    it('should emit update:visible when toggleVisible is called', async () => {
        wrapper = factory({ visible: true })
        await wrapper.vm.toggleVisible()
        expect(wrapper.emitted()['update:visible']).toBeTruthy()
        expect(wrapper.emitted()['update:visible'][0]).toEqual([false])
    })

    // ============ 插槽测试 ============
    it('should render title slot when provided', () => {
        wrapper = factory({ visible: true }, {
            title: '<span class="custom-title">Custom Title</span>'
        })
        expect(wrapper.find('.custom-title').text()).toBe('Custom Title')
    })

    it('should render default slot content', () => {
        wrapper = factory({}, {
            default: '<p class="test-content">Test Content</p>'
        })
        expect(wrapper.find('.test-content').text()).toBe('Test Content')
    })

    it('should render footer slot when provided', () => {
        wrapper = factory({}, {
            footer: '<button class="custom-footer-btn">Custom Footer</button>'
        })
        expect(wrapper.find('.custom-footer-btn').text()).toBe('Custom Footer')
    })

    it('should emit update:visible(false) when close button is clicked', async () => {
        wrapper = factory({ visible: true, showClose: true })
        await wrapper.find('.hy-dialog__header-btn').trigger('click')
        expect(wrapper.emitted()['update:visible']).toBeTruthy()
        expect(wrapper.emitted()['update:visible'][0]).toEqual([false])
    })

    // ============ 关闭控制测试 ============
    it('should not close when showClose is false and overlay is clicked', async () => {
        wrapper = factory({ visible: true, showClose: false })
        await wrapper.find('.hy-overlay-dialog').trigger('click')
        expect(wrapper.emitted()['update:visible']).toBeFalsy()
    })

    it('should close when showClose is true and overlay is clicked', async () => {
        wrapper = factory({ visible: true, showClose: true })
        await wrapper.find('.hy-overlay-dialog').trigger('click')
        expect(wrapper.emitted()['update:visible']).toBeTruthy()
        expect(wrapper.emitted()['update:visible'][0]).toEqual([false])
    })

    // ============ 拖拽功能测试 ============
    it('should start dragging when mousedown on header', async () => {
        wrapper = factory({ visible: true, draggable: true })
        const header = wrapper.find('.hy-dialog__header')
        await header.trigger('mousedown', {
            clientX: 100,
            clientY: 100
        })
        expect(wrapper.vm.isDragging).toBe(true)
        expect(wrapper.vm.startX).toBe(100)
        expect(wrapper.vm.startY).toBe(100)
    })

    it('should update position when mousemove during drag', async () => {
        wrapper = factory({ visible: true, draggable: true })
        const header = wrapper.find('.hy-dialog__header')

        // Start drag
        await header.trigger('mousedown', {
            clientX: 100,
            clientY: 100
        })

        // Move mouse
        await window.dispatchEvent(new MouseEvent('mousemove', {
            clientX: 150,
            clientY: 120
        }))

        expect(wrapper.vm.position.x).toBe(50) // 150 - 100
        expect(wrapper.vm.position.y).toBe(20) // 120 - 100
    })

    it('should stop dragging when mouseup', async () => {
        wrapper = factory({ visible: true, draggable: true })
        const header = wrapper.find('.hy-dialog__header')

        await header.trigger('mousedown', {
            clientX: 100,
            clientY: 100
        })

        await window.dispatchEvent(new MouseEvent('mouseup'))

        expect(wrapper.vm.isDragging).toBe(false)
    })

    // ============ 样式和类名测试 ============
    it('should have is-center class when center prop is true', () => {
        wrapper = factory({ center: true })
        expect(wrapper.find('.hy-dialog').classes()).toContain('is-center')
    })

    it('should have grab cursor when not dragging', () => {
        wrapper = factory()
        expect(wrapper.find('.hy-dialog__header').attributes('style')).toContain('cursor: grab')
    })

    it('should have grabbing cursor when dragging', async () => {
        wrapper = factory({ draggable: true })
        const header = wrapper.find('.hy-dialog__header')
        await header.trigger('mousedown', { clientX: 0, clientY: 0 })
        await nextTick()
        expect(wrapper.find('.hy-dialog__header').attributes('style')).toContain('cursor: grabbing')
    })

    // ============ 边界情况测试 ============
    it('should not drag when draggable is false', async () => {
        wrapper = factory({ visible: true, draggable: false })
        const header = wrapper.find('.hy-dialog__header')
        await header.trigger('mousedown', {
            clientX: 100,
            clientY: 100
        })
        expect(wrapper.vm.isDragging).toBe(false)
    })

    it('should not show close button when showClose is false', () => {
        wrapper = factory({ showClose: false })
        expect(wrapper.find('.hy-dialog__header-btn').exists()).toBe(false)
    })

    it('should cleanup event listeners on unmount', async () => {
        const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener')

        wrapper = mount(hyDialog, { props: { visible: true } })
        await wrapper.unmount()

        expect(removeEventListenerSpy).toHaveBeenCalled()
    })
})