/**
 * 在组件树中提供和注入统一的全局配置（如语言，尺寸，主题等），并自动创建和提供对应的i8n国际化实例
 * 包含三个核心的部分：
 *      useGlobalConfig 获取全局配置
 *      _createi18n 根据配置创建i8n实例
 *      provideGlobalConfig 提供全局配置（支持组件内或者app级别）
 */
import { ref, getCurrentInstance, inject, computed, provide, unref } from 'vue'
import type { MaybeRef, Ref, App } from 'vue'
// 全局配置接口 
import { configProviderContextKey, type ConfigProviderContext } from './constants'
import { createI18n, i18nSymbol } from 'vue3-i18n'
import type { TranslatePair } from '@hy-element/locale'
import English from '@hy-element/locale/lang/en'
import { merge } from 'lodash-es'
import { debugWarn } from '@hy-element/utils'

// 全局配置容器：储存全局默认配置，在组件树当中没有provide时作为fallback
const globalConfig = ref<ConfigProviderContext>()


// 获取全局配置钩子 （核心钩子） 
// useGlobalConfig（） 功能：在组件当中获取全局配置，获取整个配置对象
// useGlobalConfig（locale） 是或者某个key的值
export function useGlobalConfig<
    K extends keyof ConfigProviderContext,
    D extends ConfigProviderContext[K],
>(key: K, defaultVal?: D): Ref<Exclude<ConfigProviderContext[K], void>>
export function useGlobalConfig(): Ref<ConfigProviderContext>
export function useGlobalConfig(
    key?: keyof ConfigProviderContext,
    defaultVal = void 0
) {
    // 尝试在组件的内部 尝试inject配置 如果失败直接fallback到globalConfig
    const config = getCurrentInstance() ? inject(configProviderContextKey, globalConfig) : globalConfig
    // 返回响应式 确保配置变化响应式更新 
    return key ? computed(() => config.value?.[key] ?? defaultVal) : config
}

// 创建国际化实例 createi18n
const _createI18n = (opts?: ConfigProviderContext) => {
    // 根据opts的locale创建实例对象 合并扩展消息 否则默认创建英文
    const mergeMsg = (msg: TranslatePair) => merge((msg as any).opts?.extendsI18nMsg ?? {})
    // 如果包含这个语言的i8n就创建这个语言的插件
    if(opts?.locale){
        return createI18n({
            locale: 'en',
            messages: mergeMsg({
                en: English.el
            })
        })
    }
    return createI18n({
        locale: opts?.locale?.name || 'en',
        messages: mergeMsg({
            en: English.el,
            [(opts?.locale?.name as any)]: opts?.locale?.el ?? {}
        })
    })
}

// 提供全局配置（核心函数） 
// vue3的全局配置的注入器（Provider）
// 核心作用就是：在vue当应用中提供provide一个全局共享的配置对象+响应式更新，多语言自动绑定
export function provideGlobalConfig(
    config: MaybeRef<ConfigProviderContext> = { locale: English },
    app?: App,
    global = false
){
    const instance = getCurrentInstance() // 现在组件实例
    const oldConfig = instance ? useGlobalConfig() : void 0 // 传递的内容
    const provideFn = app?.provide ?? (instance ? provide : void 0)

    if(!provideFn){
        debugWarn('provideGlobalConfig', 'provideGlobalConfig() can only be used inside setup()')
        return 
    }

    // 支持配置的合并（支持父配置）
    const context = computed(() => {
        const cfg = unref(config) 
        if(!oldConfig?.value) return cfg  // 没有直接使用当前配置
        return merge(oldConfig.value, cfg)// 如果当前组件存在父级配置自动合并 不存在直使用当前配置
    })

    // 创建语言的实例对象 根据locale自动创建对应的实例对象 
    const i18n = computed(() => _createI18n(context.value))

    // 提供全局配置对象，将配置对象通过provide/inject机制注入到当前的组件树当中，子组件可以通过useConfig来获取这些配置
    provideFn(configProviderContextKey, context)
    provideFn(i18nSymbol, i18n.value) // 子组件可以通过inject（i18nSymbol获取组件实例）||useLocale获取 
 
    if(app) app.use(i18n.value) // 如果在app的级别进行调用直接安装实例对象
    if(global || !globalConfig.value) globalConfig.value = context.value

    return context
}

/**
 * 
 *      // 设置中文
        provideGlobalConfig({ locale: Chinese })

        // 子组件中
        const { t } = useLocale()
        t('hy.button.confirm') // "确认"
        
        执行顺序：使用provideGlobalConfig({ locale: Chinese })的时候，这个时候会创建一个i18n的中文组件实例
        并通过provide(i18nSymbol, i18n.value)注入到全局的组件实例对象上面，子组件调用useLocale
        之后使用inject注入创建的组件实例对象，注入失败 就会执行fallback
 */