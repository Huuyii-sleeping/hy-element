export type CardShadow = 'always' | 'never' | 'hover'

export interface CardProps {
    header?: string
    footer?: string
    shadow?: CardShadow
}
