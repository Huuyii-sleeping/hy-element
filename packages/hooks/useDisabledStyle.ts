import { assign, cloneDeep, each, isFunction } from 'lodash-es'
import { watchEffect, useSlots, getCurrentInstance, type VNode } from 'vue'

// dfs 深度优先遍历DOM树  对每个节点执行对应的回调
const _dfs = (nodes: VNode[], cb: (node: VNode) => void) => each(nodes, (node) => {
    isFunction(cb) && cb(node)
    node.children && _dfs(node.children as VNode[], cb)
})

// 用来封装”禁用状态自动样式注入“的通用逻辑
export function useDisabledStyle() {
    const nodePropsMap = new Map() // 保存原始的props用来恢复

    const instance = getCurrentInstance() // 组件实例
    const children = useSlots()?.default?.() // 默认插槽的Vnode数组

    watchEffect(() => {
        if (!instance?.props.disabled) {
            // 启用状态：恢复每个节点的原始props
            _dfs(children ?? [], (node) => {
                if (!nodePropsMap.has(node)) return
                node.props = nodePropsMap.get(node)
            })
            return
        }
        // 禁用状态，保存原始的props，并注入禁用样式
        _dfs(children ?? [], (node) => {
            if (!node?.props) return
            nodePropsMap.set(node, cloneDeep(node.props))
            node.props = assign(node?.props, {
                style: {
                    cursor: 'not-allowed',
                    color: 'var(--hy-text-color-placeholder)'
                }
            })
        })
    })
}

export default useDisabledStyle