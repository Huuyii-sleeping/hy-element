
import { defer, delay, isNil, isString } from 'lodash-es'
import type { LoadingOptions, LoadingOptionsResolved } from './types'
import { useZindex } from '@hy-element/hooks'
import { createApp, nextTick, reactive, ref } from 'vue'
import LoadingComp from './Loading.vue'

const RELATIVE_CLASS = 'hy-loading-parent--relative' as const
const HIDDEN_CLASS = 'hy-loading-parent--hiden' as const
const LOADING_NUMBER_KEY = 'hy-loading-number' as const

const instanceMap: Map<HTMLElement, LoadingInstance> = new Map()
const { nextZindex } = useZindex(30000)

function addRelativeClass(target: HTMLElement = document.body) {
    target.classList.add(RELATIVE_CLASS)
}

function removeRelativeClasss(target: HTMLElement = document.body) {
    target.classList.remove(RELATIVE_CLASS)
}

function addHiddenClass(target: HTMLElement = document.body) {
    target.classList.add(HIDDEN_CLASS)
}

function removeHiddenClass(target: HTMLElement = document.body) {
    target.classList.remove(HIDDEN_CLASS)
}

function addClass(
    opts: LoadingOptions,
    target: HTMLElement = document.body
) {
    if (opts.lock) {
        addHiddenClass(target)
    } else {
        removeHiddenClass(target)
    }
    addRelativeClass(target)
}

function getLoadingNumber(target: HTMLElement = document.body) {
    return target.getAttribute(LOADING_NUMBER_KEY)
}

function addLoadingNumb(target: HTMLElement = document.body) {
    const number = getLoadingNumber(target) ?? '0'
    target.setAttribute(LOADING_NUMBER_KEY, `${Number.parseInt(number) + 1}`)
}

function subLoadingNumb(target: HTMLElement = document.body) {
    const number = getLoadingNumber(target)
    if (number) {
        const newNumber = Number.parseInt(number) - 1
        if (newNumber === 0) {
            // remove loading 
            removeLoadingNumber(target)
        } else {
            target.setAttribute(LOADING_NUMBER_KEY, `${newNumber}`)
        }
    }
}

function removeLoadingNumber(target: HTMLElement = document.body) {
    target.removeAttribute(LOADING_NUMBER_KEY)
}

function createLoading(opts: LoadingOptionsResolved) {
    // todo create
    // 进行状态的初始化
    const visible = ref(opts.visible)
    const afterLeaveFlag = ref(false)
    // 定义卸载之后的逻辑
    const handleAfterLeave = () => {
        if (!afterLeaveFlag.value) return
        destory()
    }
    // 处理组件的数据
    const data = reactive({
        ...opts,
        onAfterLeave: handleAfterLeave
    })
    // 提供文本的更新办法
    const setText = (text: string) => (data.text = text)

    // 创建并且挂载组件  后续将instance进行暴露就可以执行挂载
    const app = createApp(LoadingComp, {
        ...data,
        zIndex: data.fullscreen ? nextZindex() : void 0,
        visible
    })
    const vm = app.mount(document.createElement('div'))

    // 卸载销毁的逻辑
    const destory = () => {
        const target = data.parent
        subLoadingNumb(target)
        if (getLoadingNumber(target)) {
            return
        } else {
            // 延迟卸载class 防止出现异常
            delay(() => {
                removeRelativeClasss(target)
                removeHiddenClass(target)
            }, 1)
            instanceMap.delete(target ?? document.body)
            vm.$el?.parentNode?.removeChild(vm.$el)
            app.unmount()
        }
    }
    let afterLeaveTimer: number
    const close = () => {
        if (opts.beforeClose && !opts.beforeClose()) return
        afterLeaveFlag.value = true
        clearTimeout(afterLeaveTimer)
        afterLeaveTimer = defer(handleAfterLeave)

        visible.value = false
        opts.closed?.()
    }
    return {
        get $el(): HTMLElement {
            return vm.$el
        },
        vm,
        close,
        visible,
        setText,
    }
}
// 处理之后的options
function resolveOptions(opts: LoadingOptions): LoadingOptionsResolved {
    let target: HTMLElement
    if (isString(opts.target)) {
        target = document.querySelector(opts.target) ?? document.body
    } else {
        target = opts.target ?? document.body
    }

    return {
        parent: target === document.body || opts.body ? document.body : target,
        background: opts.background ?? 'ragb(0,0,0,0.5)',
        spinner: opts.spinner,
        fullscreen: target === document.body && (opts.fullscreen ?? true),
        lock: opts.lock ?? false,
        visible: opts.visible ?? true,
        target
    }
}

let fullscreenInstance: LoadingInstance | null = null
// mean LoadingInstance 是 createLoading的返回值
export type LoadingInstance = ReturnType<typeof createLoading>
export function Loading(options: LoadingOptions = {}): LoadingInstance {
    const resolvedOptions = resolveOptions(options)
    const target = resolvedOptions.parent ?? document.body
    if (resolvedOptions.fullscreen && !isNil(fullscreenInstance)) {
        return fullscreenInstance
    }
    // 增加loading的数目
    addLoadingNumb(resolvedOptions.parent)
    if (instanceMap.has(target)) {
        return instanceMap.get(target) as LoadingInstance
    }

    const instance = createLoading({
        ...resolvedOptions,
        closed: () => {
            resolvedOptions.closed?.()
            if (resolvedOptions.fullscreen) {
                fullscreenInstance = null
            }
        }
    })
    // 为了让父级元素找到实现定位,loading能够找到对应的位置
    addClass(options, resolvedOptions?.parent)
    // 在父级元素当中加入loading
    resolvedOptions.parent?.appendChild(instance.$el)
    // 挂载之后将loading的visible设置成true
    nextTick(() => instance.visible.value = !!resolvedOptions.visible)

    if (resolvedOptions.fullscreen) {
        fullscreenInstance = instance
    }
    instanceMap.set(target, instance)
    return instance
}