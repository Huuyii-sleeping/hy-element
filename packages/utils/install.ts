import type { App, Plugin } from 'vue'
import { each } from 'lodash-es'

type SFCWithInstall<T> = T & Plugin

export function makeInstaller(component: Plugin[]){
    const installer = (app: App) => each(component, c => app.use(c))

    return installer as Plugin
}

export const withInstall = <T>(component: T) => {
    if(!component)return 
    (component as SFCWithInstall<T>).install = (app: App) => {
        const name = (component as any).name
        app.component(name, component as Plugin)
    }

    return component as SFCWithInstall<T>
}

// 传入导出的部分 这样进行挂载之后凑可以直接使用 this| $ 进行访问对应的方法 
// 比如可以直接使用message放出信息 可以直接进行调用 不需要进行import 直接随意使用
export const withInstallFunction = <T>(fn: T, name: string) => {
    (fn as SFCWithInstall<T>).install = (app: App) => {
        app.config.globalProperties[name] = fn
    }
    return fn as SFCWithInstall<T>
}