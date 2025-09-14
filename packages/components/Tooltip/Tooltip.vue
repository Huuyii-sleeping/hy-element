<script setup lang="ts">
import { createPopper, type Instance } from '@popperjs/core'
import { ref, watch, watchEffect, onUnmounted, computed, type Ref } from 'vue'
import { bind, debounce, type DebouncedFunc } from 'lodash-es'
import { useClickOutside } from '@hy-element/hooks'

import type { TooltipProps, TooltipEmits, TooltipInstance } from './types'
import type { ButtonInstance } from '../Button'
import { useEventsToTriggerNode } from './useEventsToTriggerNode'

// import useEvenstToTiggerNode from './useEventsToTiggerNode'

defineOptions({
    name: 'hyTooltip',
})

// 支持虚拟节点触发器,可以通过virtualRef传入Button组件实例或者HTMLELEMENT
// 用来在复杂的场景(如表格,动态组件)中指定触发器
// 同时配置当中支持 默认悬停触发,鼠标出延迟关闭(防抖体验优化)
// 设置默认弹窗出现的地方
interface _TooltipProps extends TooltipProps {
    virtualRef?: HTMLElement | ButtonInstance | void
    virtualTriggering?: boolean
}

const props = withDefaults(defineProps<_TooltipProps>(), {
    placement: 'bottom',
    trigger: 'hover',
    transition: 'fade',
    showTimeout: 0,
    hideTimeout: 200,
})
const emits = defineEmits<TooltipEmits>()
const visible = ref(false) // 控制弹窗出现

// 三个事件绑定不同的区域 
// 触发器区域
const events: Ref<Record<string, EventListener>> = ref({})
// 容器区域(用来mousehover)
const outerEvents: Ref<Record<string, EventListener>> = ref({})
// 弹窗区域(用来保持打开)
const dropdownEvents: Ref<Record<string, EventListener>> = ref({})
/**
 * 进行事件分离:
 *  event绑定在触发器上(按钮之类的)
 *  outerEvents绑定在容器当中,(监听鼠标离开整个区域)
 *  dropdownEvents 绑定在弹窗当中
 */

// DOM引用
const containerNode = ref<HTMLElement>()
const popperNode = ref<HTMLElement>()
const _triggerNode = ref<HTMLElement>()

// 计算属性 (动态响应)
// 支持三种触发节点来源:
// 1.virtualRef 是 Button组件实例 取ref真实的DOM文件
// 2.virtualRef 是HTMLELEMENT 直接使用
// 3.默认使用模板中的 _triggerNode
const triggerNode = computed(() => {
    if (props.virtualTriggering)
        return (
            // @tips any 为了 fix 一个初始设计上的小失误 （后续重构 "虚拟目标节点" 时解决）
            ((props.virtualRef as ButtonInstance)?.ref as any) ??
            (props.virtualRef as HTMLElement) ??
            _triggerNode.value
        )
    return _triggerNode.value as HTMLElement
    // 设置虚拟DOM元素的作用是 允许指定任意元素作为Tooltip的触发器和定位基准,而不是只能使用组件内部的slot元素
    // 这就是虚拟触发节点
})

// Popper的定位配置
const popperOptions = computed(() => ({
    placement: props.placement,
    modifiers: [
        {
            name: 'offset',
            options: {
                offset: [0, 9], // 举例触发器9px
            },
        },
    ],
    ...props.popperOptions, // 支持外部的扩展
}))

// 防抖延迟 (hover模式草启动延迟),click等其他模式直接返回 延迟可以自己设置
const openDelay = computed(() =>
    props.trigger === 'hover' ? props.showTimeout : 0
)
const closeDelay = computed(() =>
    props.trigger === 'hover' ? props.hideTimeout : 0
)

// 事件策略映射(核心交互逻辑) 
/**
 *  根据不同的trigger对应不同的事件绑定策略
 *  hover => 鼠标进入触发器,打开;鼠标离开容器,关闭;鼠标进入弹窗,保持打开;
 *  click => 点击触发器 toggle显示/隐藏
 *  contextmenu 右键阻止默认菜单,打开弹窗
 *  策略模式设计:容易扩展,易维护,逻辑清晰
 */
const triggerStrategyMap: Map<string, () => void> = new Map()
triggerStrategyMap.set('hover', () => {
    events.value['mouseenter'] = openFinal
    outerEvents.value['mouseleave'] = closeFinal
    dropdownEvents.value['mouseenter'] = openFinal
})
triggerStrategyMap.set('click', () => {
    events.value['click'] = togglePopper
})
triggerStrategyMap.set('contextmenu', () => {
    events.value['contextmenu'] = (e) => {
        e.preventDefault()
        openFinal()
    }
})

let openDebounce: DebouncedFunc<() => void> | void
let closeDebounce: DebouncedFunc<() => void> | void

function openFinal() {
    closeDebounce?.cancel() // 取消"关闭"定时器
    openDebounce?.() // 触发"打开"防抖
}
// 打开之前取消关闭定时器,避免刚打开就被关闭

function closeFinal() {
    openDebounce?.cancel() // 取消"打开"定时器
    closeDebounce?.() // 触发"关闭""防抖
}
// 关闭之前取消打开定时器,避免刚想关闭又被打开

function togglePopper() {
    visible.value ? closeFinal() : openFinal()
}

// 是最终状态修改,加上事件通知
function setVisible(val: boolean) {
    if (props.disabled) return
    visible.value = val
    emits('visible-change', val)
}

// 事件绑定和事件解绑
// 事件绑定根据事件的类型(click|hover)进行绑定
function attachEvents() {
    if (props.disabled || props.manual) return
    triggerStrategyMap.get(props.trigger)?.()
}
function resetEvents() {
    events.value = {}
    outerEvents.value = {}
    dropdownEvents.value = {}

    attachEvents()
}

// Popper实例管理(定位操作)
// 组件卸载的时候清理实例,避免内存泄露
let popperInstance: null | Instance
function destroyPopperInstance() {
    popperInstance?.destroy()
    popperInstance = null
}

if (!props.manual) {
    attachEvents()
}

const show: TooltipInstance['show'] = openFinal

const hide: TooltipInstance['hide'] = function () {
    openDebounce?.cancel()
    setVisible(false)
}

// 点击外部关闭
// 点击containerNode外部触发, hover或者manual模式不自动触发,click模式点击外部关闭弹窗
useClickOutside(containerNode, () => {
    emits('click-outside')
    if (props.trigger === 'hover' || props.manual) return
    visible.value && closeFinal()
})

// 只有在visible=true才进行popper的创建,flush保证在DOM更新之后定位
watch(
    visible,
    (val) => {
        if (!val) return

        if (triggerNode.value && popperNode.value) {
            destroyPopperInstance() // 销毁和创建组件实例对象
            popperInstance = createPopper(
                triggerNode.value,
                popperNode.value,
                popperOptions.value
            )
        }
    },
    { flush: 'post' }
)
// 监听是否手动切换 
// true => 解绑所有事件
// false => 重新绑定事件
watch(
    () => props.manual,
    (isManual) => {
        if (isManual) {
            events.value = {}
            outerEvents.value = {}
            dropdownEvents.value = {}
            return
        }
        attachEvents()
    }
)

// 监听触发方式
// trigger 变化重新绑定事件
watch(
    () => props.trigger,
    (newTrigger, oldTrigger) => {
        if (newTrigger === oldTrigger) return
        resetEvents()
    }
)

// 禁用时,取消定时器,关闭弹窗,重置事件
watch(
    () => props.disabled,
    (val, oldVal) => {
        if (val === oldVal) return
        openDebounce?.cancel()
        visible.value = false
        emits('visible-change', false)
        resetEvents()
    }
)

// 防抖函数的更新 
// 自动响应openDelay/closeDelay变化
// 比如:当trigger从hover => click,延迟设置成 0,函数自动创建,
watchEffect(() => {
    // 实际上执行的逻辑是 () => setvisible(true)
    openDebounce = debounce(bind(setVisible, null, true), openDelay.value)
    closeDebounce = debounce(bind(setVisible, null, false), closeDelay.value)
})

// 监听的是对应的方法,以及绑定的外部事件
useEventsToTriggerNode(props, triggerNode, events, () => {
    openDebounce?.cancel()
    setVisible(false)
})

onUnmounted(() => {
    destroyPopperInstance()
})

// 暴露组件方法,父组件调用show/hide hide会取消打开定时器+立即关闭
defineExpose<TooltipInstance>({
    show,
    hide,
})

/**
 * containerNode 用来点击外部检测
 * trigger 默认slot或者named slot 
 * popper transition slot 箭头 (popper使用data-popper-arrow定位箭头)
 * @after-leave 动画结束之后销毁Popper实例(节省资源)
 */
</script>

<template>
    <div class="hy-tooltip" ref="containerNode" v-on="outerEvents">
        <!-- v-on绑定对应的事件监听器,执行对应的方法 -->
        <div class="hy-tooltip__trigger" ref="_triggerNode" v-on="events" v-if="!virtualTriggering">
            <slot></slot>
        </div>
        <slot name="default" v-else></slot>

        <transition :name="transition" @after-leave="destroyPopperInstance">
            <div class="hy-tooltip__popper" ref="popperNode" v-on="dropdownEvents" v-if="visible">
                <slot name="content">
                    {{ content }}
                </slot>
                <div id="arrow" data-popper-arrow></div>
            </div>
        </transition>
    </div>
</template>

<style scoped>
@import './style.css';
</style>