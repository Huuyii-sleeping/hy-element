import { type Ref } from "vue";
import useEventListener from "./useEventListener";

// 当调用指定元素的外部的时候自动触发回调函数 
// 常用来关闭弹窗 下拉菜单,等浮层组件
export default function useClickOutside(
    elementRef: Ref<HTMLElement | void>,
    callback: (e: MouseEvent) => void
) {
    useEventListener(document, 'click', (e: Event) => {
        if (elementRef.value && e.target) {
            // 判断的原理是不在点击元素的内部
            if (!elementRef.value.contains(e.target as HTMLElement)) {
                callback(e as MouseEvent)
            }
        }
    })
}