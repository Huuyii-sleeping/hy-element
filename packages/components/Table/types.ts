export interface TableProps {
    data?: any[]
    border?: boolean
    showHeader?: boolean
    stripe?: boolean
    highlightCurrentRow?: boolean
}

export interface TableEmits {
    (e: 'row-click', row: any, rowIndex: any): void
    (e: 'selection-change'): void
}
