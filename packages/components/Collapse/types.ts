import type { Ref } from "vue"
export type CollapseItemName = string | number

// 折叠面板
export interface CollapseProps {
    modelValue: CollapseItemName[]
    according?: boolean
}

// 子组件
export interface CollapseItemProps {
    name: CollapseItemName
    title?: string
    disabled?: boolean
}

export interface CollapseEmits {
    (e: 'update:modelValue', value: CollapseItemName[]): void
    (e: 'change', value: CollapseItemName[]): void
}

export interface CollapseContext {
    activeNames: Ref<CollapseItemName[]>
    handleItemClick(name: CollapseItemName): void
}