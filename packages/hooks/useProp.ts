import { debugWarn } from "@hy-element/utils";
import { computed, getCurrentInstance } from "vue";

export function useProp<T>(propName: string) {
    const instance = getCurrentInstance()
    if (!instance) debugWarn(new Error('useProp must be called within a component'))
    return computed(() => (instance?.proxy?.$props as any)?.[propName] as T)
}

export default useProp