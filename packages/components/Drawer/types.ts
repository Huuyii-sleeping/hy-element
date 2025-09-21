export type DrawerDirection = 'right-to-left' | 'left-to-right' | 'top-to-bottom' | 'bottom-to-top'

export interface DrawerProps {
    title?: string
    modelValue?: boolean
    beforeClose?: Function
    openDelay?: number
    closeDelay?: number
    direction?: DrawerDirection
    size?: string
    showClose?: boolean
}

export interface DrawerEmits {
    (e: 'close'): void
    (e: 'update:modelValue', val: boolean): void
}