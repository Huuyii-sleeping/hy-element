import { describe, expect, it } from "vitest";
import Dialog from './Dialog.vue'
import { mount } from "@vue/test-utils";

describe('Dialog.vue', () => {
    it('render corrently', async () => {
        const props = {
            title: 'test title',
            confirmButtonText: 'Confirm',
            cancelButtonText: 'Cancel',
            destory: () => {},
        }
        const wrapper = mount(Dialog, {
            props
        })
        const title = wrapper.find('.hy-dialog__title')
        const confirmBtn = wrapper.find('.hy-dialog__confirmBtn')
        const cancelBtn = wrapper.find('.hy-dialog__cancelBtn')
        
        expect(title.text()).toContain('test title')
        expect(confirmBtn.text()).toContain('Confirm')
        expect(cancelBtn.text()).toContain('Cancel')
    })
})