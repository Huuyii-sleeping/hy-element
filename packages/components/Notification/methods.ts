import { h, isVNode, render, shallowReactive } from 'vue'
import { type NotificationType, type CreateNotificationProps, type NotificationFn, type NotificationHandler, type NotificationInstance, type NotificationParams, type NotificationProps, notificationTypes } from './types'
import { useZindex, useId } from '@hy-element/hooks'
import { each, findIndex, get, isString, set } from 'lodash-es'
import NotificationConstructor from './Notification.vue'

// 监听最浅层的变化 push ...
const instances: NotificationInstance[] = shallowReactive([])
const { nextZindex } = useZindex()

export const notificationDefault = {
    type: 'info',
    duration: 3000,
    offset: 20,
    transitionName: 'fade',
    showClose: true
}

export function getLastBottomOffset(this: NotificationProps) {
    const index = findIndex(instances, { id: this.id })
    if (index <= 0) return 0
    return get(instances, [index - 1, 'vm', 'exposed', 'bottomOffset', 'value'])
}

export const notification: NotificationFn & Partial<Notification> = (options = {}) => {
    const normalized = normalizedOptions(options)
    const instance = createNotification(normalized)
    return instance.handler
}

export function closeAll(type?: NotificationType) {
    each(instances, (instance) => {
        if (type) {
            instance.props.type === type && instance.handler.close()
            return
        }
        instance.handler.close()
    })
}

const normalizedOptions = (opts: NotificationParams): CreateNotificationProps => {
    const result = !opts || isVNode(opts) || isString(opts)
        ? {
            message: opts
        } : opts
    return { ...notificationDefault, ...result } as CreateNotificationProps
}

const createNotification = (props: CreateNotificationProps): NotificationInstance => {
    const id = useId().value
    const container = document.createElement('div')
    const destory = () => {
        const index = findIndex(instances, { id })
        if (index === -1) return
        instances.splice(index, 1)
        render(null, container)
    }
    const _props: NotificationProps = {
        ...props,
        id,
        zIndex: nextZindex(),
        onDestory: destory
    }
    const vnode = h(NotificationConstructor, _props)
    render(vnode, container)
    document.body.appendChild(container.firstElementChild!)

    const vm = vnode.component!
    const handler: NotificationHandler = {
        close: () => vm.exposed!.close()
    }
    const instance: NotificationInstance = {
        id,
        vnode,
        handler,
        vm,
        props: _props
    }
    instances.push(instance)
    return instance
}

each(notificationTypes, (type) => {
    set(notification, type, (opts: NotificationParams) => {
        const normalized = normalizedOptions(opts)
        return notification({ ...normalized, type })
    })
})

notification.closeAll = closeAll

export default notification as Notification

