export type DrawerDirection = 'rtl' | 'ltr' | 'ttb' | 'btt'

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