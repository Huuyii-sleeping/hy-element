import type { Ref } from 'vue'

export interface InputProps {
    id?: string
    modelValue: string
    type?: string
    size?: 'small' | 'large'
    disabled?: boolean
    clearable?: boolean
    showPassword?: boolean
    placeholder?: string
    reasonly?: boolean
    autocomplete?: string
    autofocus?: boolean
    form?: string
}


export interface InputEmits {
    (e: 'update:modelValue', value: string): void
    (e: 'input', value: string): void
    (e: 'change', value: string): void
    (e: 'focus', value: FocusEvent): void
    (e: 'blur', value: FocusEvent): void
    (e: 'clear'): void
}

export interface InputInstance {
    ref: Ref<HTMLElement | HTMLTextAreaElement | void>
    focus(): Promise<void>
    blur(): void
    select(): void
    clear(): void
}
