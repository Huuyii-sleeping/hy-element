import { type Ref, computed } from 'vue'

interface useOffsetOptions {
    offset: number
    boxHeight: Ref<number>
    getLastBottomOffset(): number
}

interface useOffsetResult {
    topOffset: Ref<number>
    bottomOffset: Ref<number>
}

export function useOffset(opts: useOffsetOptions): useOffsetResult {
    const lastBottomOffset = computed(() => {
        return opts.getLastBottomOffset()
    })
    const topOffset = computed(() => {
        return opts.offset + lastBottomOffset.value
    })
    const bottomOffset = computed(() => {
        return topOffset.value + opts.boxHeight.value
    })
    return {
        topOffset,
        bottomOffset
    }
}

export default useOffset