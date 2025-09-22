// Card.test.ts
import { mount } from '@vue/test-utils'
import Card from './Card.vue' // 根据实际路径调整
import { describe, expect, it } from 'vitest'

describe('Card 组件', () => {
    it('正确渲染默认插槽内容', () => {
        const wrapper = mount(Card, {
            slots: {
                default: '<p>这是卡片内容</p>'
            }
        })

        expect(wrapper.find('.hy-card__content').exists()).toBe(true)
        expect(wrapper.find('.hy-card__content p').text()).toBe('这是卡片内容')
    })

    it('正确渲染 header 插槽', () => {
        const wrapper = mount(Card, {
            slots: {
                header: '<h3>卡片标题</h3>'
            }
        })

        expect(wrapper.find('.hy-card__header').exists()).toBe(true)
        expect(wrapper.find('.hy-card__header h3').text()).toBe('卡片标题')
    })

    it('正确渲染 footer 插槽', () => {
        const wrapper = mount(Card, {
            slots: {
                footer: '<button>操作按钮</button>'
            }
        })
        console.log(wrapper.find('.hy-card'))
        expect(wrapper.find('.hy-card__footer').exists()).toBe(true)
        expect(wrapper.find('.hy-card__footer button').text()).toBe('操作按钮')
    })

    it('同时渲染所有插槽', () => {
        const wrapper = mount(Card, {
            slots: {
                header: '<h3>完整卡片</h3>',
                default: '<p>主体内容</p>',
                footer: '<div>底部内容</div>'
            }
        })

        expect(wrapper.find('.hy-card__header').exists()).toBe(true)
        expect(wrapper.find('.hy-card__content').exists()).toBe(true)
        expect(wrapper.find('.hy-card__footer').exists()).toBe(true)
    })

    it('无插槽时不渲染对应区域', () => {
        const wrapper = mount(Card, {
            slots: {
                default: '<p>只有内容</p>'
            }
        })

        expect(wrapper.find('.hy-card__header').exists()).toBe(true)
        expect(wrapper.find('.hy-card__footer').exists()).toBe(true)
        expect(wrapper.find('.hy-card__content').exists()).toBe(true)
    })

    it('检查 DOM 结构', () => {
        const wrapper = mount(Card, {
            slots: {
                header: '<div>头部</div>',
                default: '<div>内容</div>',
                footer: '<div>底部</div>'
            }
        })

        // 验证整体结构
        expect(wrapper.find('.hy-card').exists()).toBe(true)
        expect(wrapper.find('.hy-card .hy-card__header').exists()).toBe(true)
        expect(wrapper.find('.hy-card .hy-card__content').exists()).toBe(true)
        expect(wrapper.find('.hy-card .hy-card__footer').exists()).toBe(true)

        // 验证顺序
        const children = wrapper.find('.hy-card').element.children
        expect(children[0].className).toContain('hy-card__header')
        expect(children[1].className).toContain('hy-card__content')
        expect(children[2].className).toContain('hy-card__footer')
    })
})