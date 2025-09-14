import type { ButtonType } from "../Button";

export interface PopconfirmProps {
    title?: string
    confirmButtonType?: ButtonType
    cancelButtonType?: ButtonType
    confirmButtonText?: string
    cancelButtonText?: string
    icon?: string
    iconColor?: string
    hideIcon?: boolean
    hideAfter?: number
    width?: number|string
}

export interface PopconfirmEmits {
    (e: 'confirm', value: MouseEvent): void
    (e: 'cancel', value: MouseEvent): void
}
