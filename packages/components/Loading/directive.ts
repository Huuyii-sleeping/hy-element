import type { Directive, DirectiveBinding, MaybeRef } from 'vue'
import type { LoadingOptions } from './types'
import { Loading, type LoadingInstance } from './service'

const INSTANCE_KEY = Symbol('loading')
export interface ElementLoading extends HTMLElement {
    [INSTANCE_KEY]?: {
        instance: LoadingInstance
        options: LoadingOptions
    }
}

function createInstance(
    el: ElementLoading,
    binding: DirectiveBinding<boolean> // 描述指令绑定的相关信息
) {
    // 能使用 hy-loading-xxx的形式传递参数(props)
    const getProp = <K extends keyof LoadingOptions>(name: K) => el.getAttribute(`hy-loading-${name}`) as MaybeRef<string>
    // 能使用.xxx的形式拿到对应的参数(props)
    const getModifier = <K extends keyof LoadingOptions>(name: K) => binding.modifiers[name]

    const fullscreen = getModifier('fullscreen')
    const options: LoadingOptions = {
        text: getProp('text'),
        spinner: getProp('spinner'),
        background: getProp('background'),
        target: fullscreen ? void 0 : el,
        body: getModifier('body'),
        lock: getModifier('lock'),
        fullscreen
    }
    el[INSTANCE_KEY] = {
        options,
        instance: Loading(options)
    }
}

export const vLoading: Directive<ElementLoading, boolean> = {
    mounted(el, binding) {
        if (binding) createInstance(el, binding)
    },
    updated(el, binding){
        if(binding.oldValue === binding.value) return 
        if(binding.value && !binding.oldValue){
            createInstance(el, binding)
            return 
        }
        
    },
    unmounted(el){
        el[INSTANCE_KEY]?.instance.close()
        el[INSTANCE_KEY] = void 0 
    }
}