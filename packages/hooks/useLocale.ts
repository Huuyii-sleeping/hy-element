import { inject, type Ref } from "vue";
import { omit } from "lodash-es";
import { createI18n, i18nSymbol, type I18nInstance } from 'vue3-i18n'
import type { Language } from "@hy-element/locale";
import English from '@hy-element/locale/lang/en'


// 获取或者创建一个国际化实例，支持全局注入或者局部覆盖语言配置 
// 创建一个局部语言覆盖的独立实例 没有传入，默认英文实例
export function useLocale(localeOverrides?: Ref<Language>) {
    if (!localeOverrides) {
        return omit(
            <I18nInstance>(
                inject(
                    i18nSymbol,
                    createI18n({ locale: English.name, messages: { en: English.el } })
                )
            ),
            'install'
        )
    }
    // 没传，自己新建哟一个组件实例，移除install方法，包含其他的函数
    return omit(
        createI18n({
            locale: localeOverrides.value.name,
            messages: {
                en: English.el,
                [localeOverrides.value.name]: localeOverrides.value.el
            }
        }),
        'install'
    )
}

export default useLocale
/**
 *  为什么删除install方法：
 *  组件当中调用intall是没有意义的
 *  组件内部没有app实例对象，可能会报错
 *  可能会破坏应用状态
 *  提高类型安全 开发体验
 */
