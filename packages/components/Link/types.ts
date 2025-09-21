export interface LinkProps {
    href?: string
    type?: 'default' | 'primary' | 'success' |  'warning' | 'danger' | 'info'
    target?: string
    disabled?: boolean
}

export interface LinkEmits {
    (e: 'click', event: MouseEvent): void
}