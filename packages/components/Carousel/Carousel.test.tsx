import { mount } from '@vue/test-utils'
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { nextTick } from 'vue'
import Carousel from './Carousel.vue'
import CarouselItem from './CarouselItem.vue'

describe('Carousel 组件', () => {
    beforeEach(() => {
        vi.useFakeTimers()
    })

    afterEach(() => {
        vi.useRealTimers()
    })

    it('正确渲染轮播项', () => {
        const wrapper = mount(Carousel, {
            slots: {
                default: `
          <CarouselItem>Item 1</CarouselItem>
          <CarouselItem>Item 2</CarouselItem>
          <CarouselItem>Item 3</CarouselItem>
        `
            },
            global: {
                components: {
                    CarouselItem
                }
            }
        })

        expect(wrapper.findAll('.hy-carousel__item').length).toBe(3)
        expect(wrapper.find('.hy-carousel__item.is-active').text()).toBe('Item 1')
    })

    it('初始索引设置正确', () => {
        const wrapper = mount(Carousel, {
            props: {
                initialIndex: 1
            },
            slots: {
                default: `
          <CarouselItem>Item 1</CarouselItem>
          <CarouselItem>Item 2</CarouselItem>
          <CarouselItem>Item 3</CarouselItem>
        `
            },
            global: {
                components: {
                    CarouselItem
                }
            }
        })

        expect(wrapper.find('.hy-carousel__item.is-active').text()).toBe('Item 2')
    })

    it('height 属性设置正确', () => {
        const wrapper = mount(Carousel, {
            props: {
                height: '300px'
            },
            slots: {
                default: `
          <CarouselItem>Item 1</CarouselItem>
        `
            },
            global: {
                components: {
                    CarouselItem
                }
            }
        })

        expect(wrapper.find('.hy-carousel').attributes('style')).toContain('height: 300px')
    })

    it('trigger 类型为 click 时点击指示器切换', async () => {
        const wrapper = mount(Carousel, {
            props: {
                trigger: 'click'
            },
            slots: {
                default: `
          <CarouselItem>Item 1</CarouselItem>
          <CarouselItem>Item 2</CarouselItem>
          <CarouselItem>Item 3</CarouselItem>
        `
            },
            global: {
                components: {
                    CarouselItem
                }
            }
        })

        const indicators = wrapper.findAll('.hy-carousel__indicator')
        await indicators[2].trigger('click')

        expect(wrapper.find('.hy-carousel__item.is-active').text()).toBe('Item 3')
    })

    it('自动播放功能', async () => {
        const wrapper = mount(Carousel, {
            props: {
                autoplay: true,
                interval: 3000
            },
            slots: {
                default: `
          <CarouselItem>Item 1</CarouselItem>
          <CarouselItem>Item 2</CarouselItem>
          <CarouselItem>Item 3</CarouselItem>
        `
            },
            global: {
                components: {
                    CarouselItem
                }
            }
        })

        expect(wrapper.find('.hy-carousel__item.is-active').text()).toBe('Item 1')

        // 快进 3 秒
        vi.advanceTimersByTime(3000)
        await nextTick()

        expect(wrapper.find('.hy-carousel__item.is-active').text()).toBe('Item 2')

        // 再快进 3 秒
        vi.advanceTimersByTime(3000)
        await nextTick()

        expect(wrapper.find('.hy-carousel__item.is-active').text()).toBe('Item 3')
    })

    it('暂停自动播放', async () => {
        const wrapper = mount(Carousel, {
            props: {
                autoplay: true,
                interval: 3000,
                pauseOnHover: true
            },
            slots: {
                default: `
          <CarouselItem>Item 1</CarouselItem>
          <CarouselItem>Item 2</CarouselItem>
        `
            },
            global: {
                components: {
                    CarouselItem
                }
            }
        })

        // 鼠标进入
        await wrapper.trigger('mouseenter')
        const initialText = wrapper.find('.hy-carousel__item.is-active').text()

        // 快进 3 秒，应该不会切换
        vi.advanceTimersByTime(3000)
        await nextTick()

        expect(wrapper.find('.hy-carousel__item.is-active').text()).toBe(initialText)

        // 鼠标离开
        await wrapper.trigger('mouseleave')

        // 快进 3 秒，应该会切换
        vi.advanceTimersByTime(3000)
        await nextTick()

        expect(wrapper.find('.hy-carousel__item.is-active').text()).not.toBe(initialText)
    })

    it('循环播放', async () => {
        const wrapper = mount(Carousel, {
            props: {
                autoplay: true,
                interval: 2000,
                loop: true
            },
            slots: {
                default: `
          <CarouselItem>Item 1</CarouselItem>
          <CarouselItem>Item 2</CarouselItem>
          <CarouselItem>Item 3</CarouselItem>
        `
            },
            global: {
                components: {
                    CarouselItem
                }
            }
        })

        expect(wrapper.find('.hy-carousel__item.is-active').text()).toBe('Item 1')

        // 切换到最后一项
        vi.advanceTimersByTime(6000) // 3个间隔
        await nextTick()

        expect(wrapper.find('.hy-carousel__item.is-active').text()).toBe('Item 1') // 循环回到第一项
    })

    it('不循环播放', async () => {
        const wrapper = mount(Carousel, {
            props: {
                autoplay: true,
                interval: 2000,
                loop: false
            },
            slots: {
                default: `
          <CarouselItem>Item 1</CarouselItem>
          <CarouselItem>Item 2</CarouselItem>
          <CarouselItem>Item 3</CarouselItem>
        `
            },
            global: {
                components: {
                    CarouselItem
                }
            }
        })

        expect(wrapper.find('.hy-carousel__item.is-active').text()).toBe('Item 1')

        // 切换到最后一项
        vi.advanceTimersByTime(4000) // 2个间隔
        await nextTick()

        expect(wrapper.find('.hy-carousel__item.is-active').text()).toBe('Item 3')

        // 再等一个间隔，应该不会继续切换
        vi.advanceTimersByTime(2000)
        await nextTick()

        expect(wrapper.find('.hy-carousel__item.is-active').text()).toBe('Item 3')
    })

    it('指示器点击切换', async () => {
        const wrapper = mount(Carousel, {
            slots: {
                default: `
          <CarouselItem>Item 1</CarouselItem>
          <CarouselItem>Item 2</CarouselItem>
          <CarouselItem>Item 3</CarouselItem>
        `
            },
            global: {
                components: {
                    CarouselItem
                }
            }
        })

        const indicators = wrapper.findAll('.hy-carousel__indicator')

        await indicators[1].trigger('click')
        expect(wrapper.find('.hy-carousel__item.is-active').text()).toBe('Item 2')

        await indicators[0].trigger('click')
        expect(wrapper.find('.hy-carousel__item.is-active').text()).toBe('Item 1')
    })

    it('箭头导航', async () => {
        const wrapper = mount(Carousel, {
            slots: {
                default: `
          <CarouselItem>Item 1</CarouselItem>
          <CarouselItem>Item 2</CarouselItem>
          <CarouselItem>Item 3</CarouselItem>
        `
            },
            global: {
                components: {
                    CarouselItem
                }
            }
        })

        const nextButton = wrapper.find('.hy-carousel__arrow--right')
        const prevButton = wrapper.find('.hy-carousel__arrow--left')

        // 下一个
        await nextButton.trigger('click')
        expect(wrapper.find('.hy-carousel__item.is-active').text()).toBe('Item 2')

        // 再下一个
        await nextButton.trigger('click')
        expect(wrapper.find('.hy-carousel__item.is-active').text()).toBe('Item 3')

        // 上一个
        await prevButton.trigger('click')
        expect(wrapper.find('.hy-carousel__item.is-active').text()).toBe('Item 2')
    })

    it('direction 属性', () => {
        const wrapper = mount(Carousel, {
            props: {
                direction: 'vertical'
            },
            slots: {
                default: `
          <CarouselItem>Item 1</CarouselItem>
        `
            },
            global: {
                components: {
                    CarouselItem
                }
            }
        })

        expect(wrapper.find('.hy-carousel.is-vertical').exists()).toBe(true)
    })

    it('indicator-position 属性', () => {
        const wrapper = mount(Carousel, {
            props: {
                indicatorPosition: 'outside'
            },
            slots: {
                default: `
          <CarouselItem>Item 1</CarouselItem>
        `
            },
            global: {
                components: {
                    CarouselItem
                }
            }
        })

        expect(wrapper.find('.hy-carousel.is-indicator-outside').exists()).toBe(true)
    })

    it('arrow 属性控制箭头显示', () => {
        const wrapper = mount(Carousel, {
            props: {
                arrow: 'never'
            },
            slots: {
                default: `
          <CarouselItem>Item 1</CarouselItem>
        `
            },
            global: {
                components: {
                    CarouselItem
                }
            }
        })

        expect(wrapper.find('.hy-carousel__arrow').exists()).toBe(false)
    })

    it('change 事件触发', async () => {
        const wrapper = mount(Carousel, {
            slots: {
                default: `
          <CarouselItem>Item 1</CarouselItem>
          <CarouselItem>Item 2</CarouselItem>
        `
            },
            global: {
                components: {
                    CarouselItem
                }
            }
        })

        const indicators = wrapper.findAll('.hy-carousel__indicator')
        await indicators[1].trigger('click')

        expect(wrapper.emitted('change')).toBeTruthy()
        expect(wrapper.emitted('change')![0]).toEqual([1, 0])
    })

    it('active 方法测试', async () => {
        const wrapper = mount(Carousel, {
            slots: {
                default: `
          <CarouselItem>Item 1</CarouselItem>
          <CarouselItem>Item 2</CarouselItem>
        `
            },
            global: {
                components: {
                    CarouselItem
                }
            }
        })

        // @ts-ignore
        wrapper.vm.setActiveItem(1)
        await nextTick()

        expect(wrapper.find('.hy-carousel__item.is-active').text()).toBe('Item 2')
    })

    it('prev 和 next 方法测试', async () => {
        const wrapper = mount(Carousel, {
            slots: {
                default: `
          <CarouselItem>Item 1</CarouselItem>
          <CarouselItem>Item 2</CarouselItem>
          <CarouselItem>Item 3</CarouselItem>
        `
            },
            global: {
                components: {
                    CarouselItem
                }
            }
        })

        // @ts-ignore
        wrapper.vm.next()
        await nextTick()
        expect(wrapper.find('.hy-carousel__item.is-active').text()).toBe('Item 2')

        // @ts-ignore
        wrapper.vm.prev()
        await nextTick()
        expect(wrapper.find('.hy-carousel__item.is-active').text()).toBe('Item 1')
    })

    it('destroy 时清理定时器', () => {
        const clearIntervalSpy = vi.spyOn(globalThis, 'clearInterval')

        const wrapper = mount(Carousel, {
            props: {
                autoplay: true
            },
            slots: {
                default: `
          <CarouselItem>Item 1</CarouselItem>
        `
            },
            global: {
                components: {
                    CarouselItem
                }
            }
        })

        wrapper.unmount()
        expect(clearIntervalSpy).toHaveBeenCalled()
    })
})