import type { Ref } from "vue"

// types.ts
export interface CarouselProps {
    height?: string
    initialIndex?: number
    autoplay?: boolean
    interval?: number
    indicator?: boolean
    indicatorPosition?: 'outside' | 'inside'
    arrow?: 'always' | 'hover' | 'never'
    direction?: 'horizontal' | 'vertical'
    pauseOnHover?: boolean
    loop?: boolean
}

export interface CarouselEmits {
    (e: 'change', currentIndex: number, oldIndex: number): void
}

export interface CarouselProvide {
    activeIndex: Ref<number>
    itemsCount: Ref<number>
    direction: 'horizontal' | 'vertical'
}