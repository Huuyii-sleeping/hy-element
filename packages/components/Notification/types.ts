
import type { VNode, ComponentInternalInstance, Ref } from "vue";

export const notificationTypes = [
    'info',
    'success',
    'warning',
    'danger',
] as const

export type NotificationType = (typeof notificationTypes)[number]

export const notificationPositions = [
    'top-right',
    'top-left',
    'bottom-left',
    'bottom-right'
] as const

export type NotificationPosition = (typeof notificationPositions)[number]

export interface NotificationProps {
    id: string
    title: string
    position: NotificationPosition
    type?: 'success' | 'info' | 'warning' | 'danger' | 'error'
    message?: string | VNode
    duration?: number
    center?: boolean
    offset?: number
    zIndex: number
    transitionName?: string
    showClose?: boolean
    icon?: string
    onDestory(): void
    onClick?(): void
    onClose?(): void
}

export interface NotificationInstance {
    id: string
    vnode: VNode
    vm: ComponentInternalInstance
    props: NotificationProps
    handler: NotificationHandler
}

export interface NotificationComponmentInstance {
    close(): void
    bottomOffset: Ref<number>
}

export type CreateNotificationProps = Omit<
    NotificationProps,
    'onDestory' | 'id' | 'zIndex'
>

export interface NotificationHandler {
    close(): void
}

export type NotificationOptions = Partial<Omit<NotificationProps, 'id'>>
export type NotificationParams = string | VNode | NotificationOptions

export type NotificationFn = {
    (props: NotificationParams): NotificationHandler
    closeAll(type?: NotificationType): void
}
export type NotificationTypeFn = (props: NotificationParams) => NotificationHandler

export interface Notification extends NotificationFn {
    success: NotificationTypeFn
    warning: NotificationTypeFn
    info: NotificationTypeFn
    danger: NotificationTypeFn
}
