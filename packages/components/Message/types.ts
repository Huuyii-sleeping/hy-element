import type { VNode, ComponentInternalInstance, Ref } from "vue";

export const messageTypes = [
    'info',
    'success',
    'warning',
    'danger',
    'error',
] as const 

export type MessageType = (typeof messageTypes)[number]

export interface MessageHandler {
    close(): void
}

export type MessageFn = {
    (props: MessageParams): MessageHandler,
    closeAll(type?: MessageType): void
}

export type MessageTypeFn = (props: MessageParams) => MessageHandler

export interface Message extends MessageFn{
    success: MessageTypeFn
    warning: MessageTypeFn
    info: MessageTypeFn,
    danger: MessageTypeFn
    error: MessageTypeFn
}

export interface MessageProps{
    id: string
    message?: string | VNode | (() => VNode)
    duration?: number
    showClose?: boolean
    center?: boolean
    type?: MessageType
    offset?: number
    zIndex: number
    transitionName?: string
    onDestory(): void
}

// 意思是从MessageProps中除去id属性返回一个新的类型
export type MessageOptions = Partial<Omit<MessageProps, 'id'>>
export type MessageParams = string | VNode | MessageOptions

export interface MessageInstance {
    id: string
    vnode: VNode
    props: MessageProps
    vm: ComponentInternalInstance
    handler: MessageHandler
}

export interface MessageComponentInstance{
    close(): void
    bottomOffset: Ref<number>
}

export type CreateMessageProps = Omit<
    MessageProps,
    'onDestory' | 'id' | 'zIndex'
>