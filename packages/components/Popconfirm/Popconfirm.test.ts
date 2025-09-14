import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import Popconfirm from "./Popconfirm.vue";
import type { PopconfirmProps } from "./types";
import { each, get } from "lodash-es";
import { nextTick } from "vue";

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
})
