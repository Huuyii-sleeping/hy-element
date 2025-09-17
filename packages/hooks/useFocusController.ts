import { isFunction } from 'lodash-es'
import { getCurrentInstance, ref, type Ref } from 'vue'
import useEventListener from './useEventListener'

interface UseFocusOptions {
    afterFocus?(): void
    beforeBlur?(event: FocusEvent): boolean | void
    afterBlur?(): void
}

// 只有原生的element或者有focus方法的可以调用
export function useFocusController<T extends HTMLElement | { focus(): void }>(
    target: Ref<T | void>, // 传入聚焦的元素
    { afterBlur, beforeBlur, afterFocus }: UseFocusOptions = {} // 提供聚焦/失焦的前后钩子
) {
    const instance = getCurrentInstance()! // 必须在setup当中使用
    const { emit } = instance
    const wrapperRef = ref<HTMLElement>() // 通常用来绑定事件监听器 (如点击wrapper自动聚焦内部的input)
    const isFocus = ref(false)

    // 聚焦事件
    const handleFocus = (event: FocusEvent) => {
        if (isFocus.value) return
        isFocus.value = true
        emit('focus', event)
        afterFocus?.()
    }

    // 失焦事件 函数的是false或者undefined继续,返回true 取消失焦
    const handleBlur = (event: FocusEvent) => {
        // 没有对应的操作就不执行
        const cancelBlur = isFunction(beforeBlur) ? beforeBlur(event) : false
        // relatedTarget是即将获取焦点的元素,如果在聚焦组件内部不能触发失焦操作
        if (cancelBlur || (event.relatedTarget && wrapperRef.value?.contains(event.relatedTarget as Node))) {
            return
        }
        isFocus.value = false
        emit('blur', event)
        afterBlur?.()
    }

    // 点击wrapper自动聚焦
    const handleClick = () => {
        target.value?.focus()
    }

    useEventListener(wrapperRef, 'click', handleClick)
    return {
        wrapperRef,
        isFocus,
        handleFocus,
        handleBlur,
    }
}

export default useFocusController

/**
 * 为任意的可聚焦元素,(input,button,自定义组件等等)提供聚焦,失焦管理状态,事件监听,放冒泡处理,回调钩子,并自动绑定聚焦行为
 */