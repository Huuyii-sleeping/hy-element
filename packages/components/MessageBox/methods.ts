import type {
    MessageBoxOptions,
    MessageBoxAction,
    MessageBoxData,
    MessageBoxCallback,
    MessageBoxProps,
    hyMessageBox,
} from "./types";
import MessageBoxConstructor from './MessageBox.vue'
import { isVNode, ref, render, nextTick, createVNode } from 'vue'
import type { ComponentPublicInstance, Ref, VNode, VNodeProps } from "vue";
import { assign, each, isFunction, isObject, isString, isUndefined, set } from "lodash-es";


const MessageBoxInstancesMap = new Map<
    ComponentPublicInstance<{ doClose: () => void }>,
    {
        options: MessageBoxOptions
        callback: MessageBoxCallback | void
        resolve: (res: any) => void
        reject: (res: any) => void
    }
>()

function initInstance(props: MessageBoxProps, contaienr: HTMLElement) {
    const visible = ref(false)
    // 当传入的节点的类型是VNode进行特殊处理 函数返回的也是vnode
    const isVnodeMsg = isFunction(props?.message) || isVNode(props?.message)
    const getDefaultSlot = (msg: VNode | (() => VNode)) => {
        return isFunction(msg) ? msg : () => msg
    }
    const vnode = createVNode(
        MessageBoxConstructor,
        {
            ...props,
            visible,
        } as VNodeProps,
        // 设置插槽
        isVnodeMsg ? { default: getDefaultSlot(props.message as VNode) } : void 0
    )
    render(vnode, contaienr)
    document.body.appendChild(contaienr.firstElementChild!)
    return vnode.component
}

function createMessageBox(options: MessageBoxOptions) {
    console.log('options:', options)
    const container = document.createElement('div')
    const props: MessageBoxProps = {
        ...options,
        doClose: () => {
            // todo 
            vm.visible.value = false
        },
        doAction: (action: MessageBoxAction, inputVal: string) => {
            // todo 
            const currentMsg = MessageBoxInstancesMap.get(vm)
            let resolve: MessageBoxAction | { value: string, action: MessageBoxAction }
            nextTick(() => vm.doClose())
            if (options.showInput) {
                console.log('------', inputVal)
                resolve = { value: inputVal, action }
            } else {
                resolve = action
            }
            if (options.callback) {
                options.callback(resolve)
                return
            }
            // 直接取消操作
            if (action === 'cancel' || action === 'close') {
                currentMsg?.reject(action)
                return
            }
            // 将处理的结果传递出去
            currentMsg?.resolve(resolve)
        },
        destroy: () => {
            // todo 
            render(null, container)
            MessageBoxInstancesMap.delete(vm)
        }
    }
    const instance = initInstance(props as MessageBoxProps, container)
    const vm = instance?.proxy as ComponentPublicInstance<{ doClose: () => void, visible: Ref<boolean> }>
    vm.visible.value = true
    return vm
}
/**
 * vm 的组件实例(instance)内部结构很复杂,包含喝多对的字段
 * 所以vue3做了一层代理对象 使得能够安全的访问,防止误触操作 
 * 做了一层代理对象 使得能够像vue2那样访问this和vm访问组件中的内容
 */

async function MessageBox(options: MessageBoxOptions): Promise<MessageBoxData>
function MessageBox(options: MessageBoxOptions | string | VNode): Promise<any> {
    let callback: MessageBoxCallback | void
    if (isString(options) || isVNode(options)) {
        options = {
            message: options
        }
    } else {
        callback = options.callback
    }
    // 将判断的内容传入组件实例对象当中,这样直接在组件当中就能resolve, reject
    return new Promise((resolve, reject) => {
        const instance = createMessageBox(options)
        MessageBoxInstancesMap.set(instance, { options, callback, resolve, reject })
    })
}

const MESSAGE_BOX_VARIANTS = ['alert', 'confirm', 'prompt'] as const
// Parital 会将props当中的属性全部变成可选值
const MESSAGE_BOX_DEFAULT_OPTS: Record<
    (typeof MESSAGE_BOX_VARIANTS)[number],
    Partial<MessageBoxOptions>
> = {
    alert: { closeOnClickModal: false },
    confirm: { showCancelButton: false },
    prompt: { showCancelButton: true, showInput: true }
}

each(MESSAGE_BOX_VARIANTS, (type) => set(MessageBox, type, messageBoxFactory(type)))

function messageBoxFactory(boxType: (typeof MESSAGE_BOX_VARIANTS[number])) {
    return (message: string | VNode, title: string | MessageBoxProps, options: MessageBoxOptions) => {
        let titleOrOpts = ''
        if (isObject(title)) {
            options = title as MessageBoxOptions
            titleOrOpts = ''
        } else if (isUndefined(title)) {
            titleOrOpts = ''
        } else {
            titleOrOpts = title as string
        }

        return MessageBox(
            assign(
                {
                    title: titleOrOpts,
                    message,
                    type: '',
                    boxType,
                    ...MESSAGE_BOX_DEFAULT_OPTS[boxType],
                }, options),
        )
    }
}

set(MessageBox, "close", () => {
    MessageBoxInstancesMap.forEach((_, vm) => {
        vm.doClose();
    });
    MessageBoxInstancesMap.clear();
})

export default MessageBox as hyMessageBox