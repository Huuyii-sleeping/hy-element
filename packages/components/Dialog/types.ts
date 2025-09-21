import type { Component } from "vue"

export type DialogAction = 'confirm' | 'cancel' | 'close'
export type DialogAcionCallback = (
    action: DialogAction
) => void

export interface DialogProps {
    title?: string
    visible?: boolean
    openDelay?: number
    top?: string | number
    draggable?: boolean
    closeDelay?: number
    center?: boolean
    showClose?: boolean
    closeIcon?: string | Component
    confirmButtonText?: string
    cancelButtonText?: string
    confirmButtonType?: string
    cancelButtonType?: string
    destory?(): void
}

export interface DialogEmits {
    (e: 'update:visible', val: boolean): void
}
