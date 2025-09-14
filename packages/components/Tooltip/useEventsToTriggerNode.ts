import { onUnmounted, watch } from "vue";
import type { TooltipProps } from "hy-element";
import { each, isElement } from "lodash-es";
import { onMounted, type ComputedRef, type Ref, type WatchStopHandle } from "vue";


// 实现当使用虚拟节点的时候,自动将事件监听器,自动绑定到外部指定的触发元素上面,并在组件卸载或者依赖发生变化的时候自动解绑,防止内存泄漏
// 执行流程: 组件挂载, 监听triggerNode和Events的变化,自动绑定到外部的DOM元素的上面 组件卸载自动解绑所有事件,防止内存泄漏
export function useEventsToTriggerNode(
    props: TooltipProps & { virtualTriggering?: boolean }, // 是否启动虚拟触发
    triggerNode: ComputedRef<HTMLElement | undefined>, // 计算属性,指向虚拟触发器
    events: Ref<Record<string, EventListener>>, // 事件对象
    closeMethod: () => void // 关闭弹窗的方法
) {
    // 用来组件卸载时候停止监听
    let watchEventsStopHandle: WatchStopHandle | void
    let watchTriggerNodeStopHandle: WatchStopHandle | void

    const _eventHandleMap = new Map()
    // JavaScript 当中的坑: 当你想要解绑对应的监听事件,必须传入相同的引用,不能传递看起来一样的引用
    // 所以我们需要使用这个来存储函数的原始引用 有时候及时函数体没变,但是引用却是新的

    // 绑定事件函数 
    // 检查是否是真实的DOM元素, 遍历events.value 安装监听器 缓存函数绑定到Map当中,便于定制监听
    const _bindEventToVirtualTriggerNode = () => {
        const el = triggerNode.value
        // 将所有的事件绑定到对应的外部的组件身上
        isElement(el) && each(events.value, (fn, event) => {
            _eventHandleMap.set(event, fn)
            el?.addEventListener(event as keyof HTMLElementEventMap, fn)
        })
    }

    // 解绑事件函数
    const _unbindEventToVirtualTiggerNode = () => {
        const el = triggerNode.value
        isElement(el) &&
            each(['mouseenter', 'click', 'contextmenu'], (key) => {
                _eventHandleMap.has(key) && el?.removeEventListener(key, _eventHandleMap.get(key))
            })
    }

    onMounted(() => {
        // 监听trigger的变化 组件挂载时候立即执行一次
        watchTriggerNodeStopHandle = watch(triggerNode,
            () => props.virtualTriggering && _bindEventToVirtualTriggerNode(),
            { immediate: true })

        // 监听events的变化,
        watchEventsStopHandle = watch(events, () => {
            if (!props.virtualTriggering) return
            // 进行绑定的更新操作
            _unbindEventToVirtualTiggerNode()
            _bindEventToVirtualTriggerNode()
            closeMethod()
        }, { deep: true })
    })

    onUnmounted(() => {
        watchTriggerNodeStopHandle?.()
        watchEventsStopHandle?.()
        _unbindEventToVirtualTiggerNode()
    })
}