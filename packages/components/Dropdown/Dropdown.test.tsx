import { withInstall } from "@hy-element/utils";
import { describe, it, vi, expect, test } from "vitest";
import Dropdown from "./Dropdown.vue";
import DropdownItem from "./DropdownItem.vue";
import { hyDropdown, hyDropdownItem } from ".";
import { beforeEach } from "vitest";
import type { DropdownItemProps } from "./types";
import { mount } from "@vue/test-utils";


describe('Dropdown/index.ts', () => {
    it('should be exported with withInstall()', () => {
        expect((hyDropdown as any).install).toBeDefined()
        expect((hyDropdownItem as any).install).toBeDefined()
    })

    it('should be exported Dropdown component', () => {
        expect(hyDropdown).toBe(Dropdown)
        expect(hyDropdownItem).toBe(DropdownItem)
    })

    test('should enhance Dropdown component', () => {
        const enhanceDropdown = withInstall(Dropdown)
        expect(enhanceDropdown).toBe(hyDropdown)
    })

    test('should apply specific enhancements', () => {
        const enhanceDropdown = withInstall(Dropdown)
        expect(enhanceDropdown).toHaveProperty('install')
    })
})

describe('Dropdown.vue', () => {
    beforeEach(() => {
        vi.useFakeTimers()
        vi.clearAllMocks()
    })
    it('should render slots correctly', () => {
        const items: DropdownItemProps[] = [
            { label: 'Item 1', command: 'item1' },
            { label: 'Item 2', command: 'item2' },
        ]

        const wrapper = mount(Dropdown, {
            props: {
                trigger: 'click',
            },
            slots: {
                default: () => <button id='trigger'>Default slot content</button>,
                dropdown: () => items.map((item) => <DropdownItem {...item} />),
            },
        })

        expect(wrapper.text()).toContain('Default slot content')
        expect(wrapper.find('.hy-dropdown').exists()).toBeTruthy()
    })

    it('should emit command event when item is clicked', async () => {
        const items: DropdownItemProps[] = [
            { label: 'Item 1', disabled: true },
            { label: 'Item 2', command: 'item2', divided: true },
        ]
        const onCommand = vi.fn()
        const wrapper = mount(Dropdown, {
            props: {
                trigger: 'click',
                onCommand,
            },
            slots: {
                default: () => <button id='trigger'>Default slot content</button>,
                dropdown: () => items.map((item) => <DropdownItem {...item} />),
            },
        })

        const triggerArea = wrapper.find('#trigger')
        expect(triggerArea.exists()).toBeTruthy()

        triggerArea.trigger('click')
        await vi.runAllTimers()

        expect(wrapper.find('.hy-dropdown__menu').exists()).toBeTruthy()
        await wrapper.findAll('li').at(0)?.trigger('click')
        expect(onCommand).toBeCalledTimes(0) // disabled

        await wrapper.findAll('li').at(2)?.trigger('click')
        expect(onCommand).toBeCalled()
        expect(onCommand).toBeCalledWith('item2')
    })

    it('should toggle visibility when split btn is clicked', async () => {
        const items: DropdownItemProps[] = [
            { label: 'Item 1' },
            { label: 'Item 2', command: 'item2' },
        ]
        const onClick = vi.fn()
        const wrapper = mount(Dropdown, {
            props: {
                trigger: 'click',
                splitButton: true,
                items: items,
                onClick,
            },
            slots: {
                default: () => <div id='trigger'>Default slot content</div>,
            },
        })

        const triggerArea = wrapper.find('#trigger')
        expect(triggerArea.exists()).toBeTruthy()
        triggerArea.trigger('click')
        await vi.runAllTimers()

        expect(wrapper.find('.hy-dropdown__menu').exists()).toBeFalsy()
        expect(onClick).toBeCalled()
    })
})