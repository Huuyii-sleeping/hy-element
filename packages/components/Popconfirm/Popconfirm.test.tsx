import { mount } from "@vue/test-utils";
import { describe, it, expect, test, vi, beforeEach } from "vitest";
import Popconfirm from "./Popconfirm.vue";
import type { PopconfirmProps } from "./types";
import { each, get } from "lodash-es";
import { nextTick } from "vue";
import { hyPopconfirm } from "./index";
import { withInstall } from "@hy-element/utils";

const onConfirm = vi.fn()
const onCancel = vi.fn()

describe('Popconfirm/index.ts', () => {
    it('should be exported with withInstall()', () => {
        expect((hyPopconfirm as any).install).toBeDefined()
    })

    it('should be exported Popconfirm component', () => {
        expect(hyPopconfirm).toBe(Popconfirm)
    })

    test('should enhance Popconfirm component', () => {
        const enhancePopconfirm = withInstall(Popconfirm)
        expect(enhancePopconfirm).toBe(hyPopconfirm)
    })

    test('should apply specific enhancements', () => {
        const enhancePopconfirm = withInstall(Popconfirm)
        expect(enhancePopconfirm).toHaveProperty('install')
    })
})

describe('Popconfirm.vue', () => {
    const props = {
        title: "Test Title",
        confirmButtonText: "Confirm",
        cancelButtonText: "Cancel",
        confirmButtonType: "primary",
        cancelButtonType: "info",
        icon: "check-circle",
        iconColor: "green",
        hideIcon: false,
        hideAfter: 500,
        width: 200,
    } as PopconfirmProps

    beforeEach(() => {
        vi.useFakeTimers()
        vi.clearAllMocks()
    })

    it('should accept all props', async () => {
        const wrapper = mount(Popconfirm, {
            props
        })
        await nextTick()
        each(props, (value, key) => {
            expect(get(wrapper.props(), key)).toBe(value)
        })
    })

    it('render slot content corrently', () => {
        const slotContent = 'slot Content'
        const wrapper = mount(Popconfirm, {
            props,
            slots: {
                default: slotContent
            }
        })

        expect(wrapper.text()).toContain('slot Content')
    })

    test('Popconfirm emits', async () => {
        const wrapper = mount(() => (
            <div>
                <div id="outside">
                    <Popconfirm title="test title" hideIcon={true} onConfirm={onConfirm} onCancel={onCancel}>
                        <button id="trigger">trigger</button>
                    </Popconfirm>
                </div>
            </div>
        ))  
        const triggerNode = wrapper.find('#trigger')
        expect(triggerNode.exists()).toBeTruthy()
        triggerNode.trigger('click')
        await vi.runAllTimers()
        expect(wrapper.find('.hy-popconfirm').exists()).toBeTruthy()
        
        const confirmBtn = wrapper.find('.hy-popconfirm__confirm')
        expect(confirmBtn.exists()).toBeTruthy()
        confirmBtn.trigger('click')
        await vi.runAllTimers()
        expect(wrapper.find('.hy-popconfirm').exists()).toBeFalsy()
        expect(onConfirm).toBeCalled()

        triggerNode.trigger('click')
        await vi.runAllTimers()
        expect(wrapper.find('.hy-popconfirm').exists()).toBeTruthy()

        const cancelBtn = wrapper.find('.hy-popconfirm__cancel')
        expect(cancelBtn.exists()).toBeTruthy()

        cancelBtn.trigger('click')
        await vi.runAllTimers()
        expect(wrapper.find('.hy-popconfirm').exists()).toBeFalsy()
        expect(onCancel).toBeCalled()
    })
})
