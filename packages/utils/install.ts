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

/**
 * Vue 组件库的安装器的工具函数，用于让Vue组件能够通过app.use()的方式安装
 * 
 * 核心的作用：让vue组件支持插件化安装，就像element Plus Antdesign等等
 *  
 * 第一个函数就是创建批量的安装器：遍历使用的插件，每个都进行安装 实际上是创建了一个新的对象具有install
 * 一下包含多个组件，直接使用app.use() 安装
 * 第二个函数给单个组件添加安装功能 给组件添加install方法
 */