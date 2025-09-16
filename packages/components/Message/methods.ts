import { isVNode, render, shallowReactive, h } from "vue"
import { type CreateMessageProps, type MessageInstance, type MessageFn, type Message, type MessageParams, type MessageProps, type MessageType, type MessageHandler, messageTypes } from "./types"
import { each, findIndex, get, isString, set } from "lodash-es"
import MessageConstructor from "./Message.vue"
import { useId, useZindex } from "@hy-element/hooks"

const instances: MessageInstance[] = shallowReactive([])

export const messageDefaults = {
    type: 'info',
    duration: 3000,
    offset: 10,
    transitionName: 'fade-up'
}

// 将传递的options进行序列化 更加简单的取值和操作
const normalizedOptions = (opts: MessageParams): CreateMessageProps => {
    const result = !opts || isVNode(opts) || isString(opts)
        ? {
            message: opts,
        } : opts
    return { ...messageDefaults, ...result } as CreateMessageProps
}

const { nextZindex } = useZindex()
// 创建消息实例对象
const createMessage = (props: CreateMessageProps): MessageInstance => {
    const id = useId().value
    const container = document.createElement('div')
    const destory = () => {
        const idx = findIndex(instances, { id })
        if (idx === -1) return
        instances.splice(idx, 1)
        render(null, container) // 不进行渲染
    }
    const _props: MessageProps = {
        ...props,
        id,
        zIndex: nextZindex(),
        onDestory: destory
    }
    const vnode = h(MessageConstructor, _props) // 测试尽量使用h函数进行测试,比较安全并且使用简单
    render(vnode, container)
    document.body.appendChild(container.firstElementChild!) // !保证我的不是空节点

    const vm = vnode.component!
    const handler: MessageHandler = {
        close: () => vm.exposed!.close()
    }
    const instance: MessageInstance = {
        id,
        vnode,
        handler,
        vm,
        props: _props
    }
    instances.push(instance)
    return instance
}

export function getLastBottomOffset(this: MessageProps) {
    const idx = findIndex(instances, { id: this.id })
    if (idx <= 0) return 0
    // 这个访问的行为等价于 instances[idx - 1]?.vm?.exposed?.bottomOffset?.value
    return get(instances, [idx - 1, 'vm', 'exposed', 'bottomOffset', 'value'])
}

export const message: MessageFn & Partial<Message> = (options = {}) => {
    const normalized = normalizedOptions(options)
    const instance = createMessage(normalized)

    return instance.handler
}

export function closeAll(type?: MessageType) {
    each(instances, (instance) => {
        if (type) {
            instance.props.type === type && instance.handler.close()
            return
        }
        instance.handler.close()
    })
}
// 将对应的属性绑定到message的身上
// 将类型转化成函数 这样message外部调用 info success warn 就是相当于直接创建对应的instance
// 这样就不需要手写type属性 直接建立和挂载(render)对应的message的实际对象
each(messageTypes, (type) => {
    set(message, type, (opts: MessageParams) => {
        const normalized = normalizedOptions(opts)
        return message({ ...normalized, type })
    })
})

message.closeAll = closeAll

export default message as Message