import { defineComponent } from 'vue'
import { isFunction } from 'lodash-es'

export const typeIconMap = new Map([
    ['info', 'circle-info'],
    ['success', 'check-circle'],
    ['warning', 'circle-exclamation'],
    ['danger', 'circle-xamrk'],
    ['error', 'circle-xamrk']
])

export const RenderVnode = defineComponent({
    props: {
        vNode: {
            // 主要是返回vode的类型
            type: [String, Object, Function],
            required: true
        }
    },
    // 返回的是render函数 可以进行渲染
    setup(props){
        return () => (isFunction(props.vNode) ? props.vNode() : props.vNode)
    }
})

export * from './install'
export * from './error'
export * from './style'
export * from './test'