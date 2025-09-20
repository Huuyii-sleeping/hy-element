import { watch, computed, inject, onMounted, ref, toRef, unref, type MaybeRef, type WatchStopHandle, onUnmounted } from "vue"
import { FORM_ITEM_CTX_KEY, FORM_CTX_EKY } from "./constants"
import { useId, useProp } from "@hy-element/hooks"
import type { FormItemContext } from "./types"

// inject从上层组件获取注入的数据，一般都是表单的验证数据，获取上下文对象
export function useFormItem() {
    const form = inject(FORM_CTX_EKY, void 0)
    const formItem = inject(FORM_ITEM_CTX_KEY, void 0)
    return { form, formItem }
}

// 确定组件的禁用状态，逐步计算禁用状态
export function useFormDisabled(fallback?: MaybeRef<boolean | void>) {
    const disabled = useProp<boolean>('disabled')
    const form = inject(FORM_CTX_EKY, void 0)
    const formItem = inject(FORM_ITEM_CTX_KEY, void 0)
    return computed(() => disabled.value || unref(fallback) || form?.disabled || formItem?.disabled || false)
}

interface UseFormItemInputCommenProps extends Record<string, any> {
    id?: string
}

// 实现自动输入控件（如输入框，选择器等）DOM ID 并和上下文联系，确保id的正确注册
export function useFormInputId(
    props: UseFormItemInputCommenProps,
    formItemContext?: FormItemContext
) {
    const inputId = ref<string>('')
    let unwatch: WatchStopHandle | void
    onMounted(() => {
        unwatch = watch(
            toRef(() => props.id),
            (id) => {
                const newId = id ?? useId().value
                if(newId !== inputId.value){
                    inputId.value && formItemContext?.removeInputId(inputId.value)
                    formItemContext?.addInputId(newId)
                    inputId.value = newId
                }
            },
            { immediate: true }
        )
    })

    onUnmounted(() => {
        unwatch && unwatch()
        inputId.value && formItemContext?.removeInputId(inputId.value)
    })

    return {
        inputId
    }
}