import { describe, it, expect } from "vitest";
import { mount } from '@vue/test-utils'
import { defineComponent, createApp } from "vue";

import { withInstall, makeInstaller } from "../install";

const AppComp = defineComponent({
    setup(){
        return () => <div>App</div>
    },
})

const compA = withInstall(defineComponent({
    name: 'comA',
    setup(){
        return () => <div>comA</div>
    }
})) as any

const compB = withInstall(defineComponent({
    name: 'comB',
    setup(){
        return () => <div>comB</div>
    }
}))as any

describe('install', () => {
    it('withInstall should work', () => {
        const wrapper = mount(() => <div id="app"></div>)
        const app = createApp(AppComp)
        app.use(compA).mount(wrapper.element)
        expect(compA.install).toBeDefined()
        expect(compB.install).toBeDefined()
        // expect(wrapper.findComponent(compA)).toBeTruthy() // 错误的写法
        // expect(wrapper.findComponent(compB)).toBeTruthy()
        expect(app._context.components['comA']).toBeTruthy()
        expect(app._context.components['comB']).toBeFalsy()
    })

    it('makeInstaller should work', () => {
        const wrapper = mount(() => <div id="app"></div>)
        const app = createApp(AppComp)
        const installer = makeInstaller([compA, compB])
        expect(installer).toBeDefined()
        app.use(installer).mount(wrapper.element)
        expect(wrapper.findComponent(compA)).toBeTruthy()
        expect(wrapper.findComponent(compB)).toBeTruthy()
    })
})

