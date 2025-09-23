<script setup lang="ts">
import { computed } from 'vue';
import type { TableEmits, TableProps } from './types';
import { each } from 'lodash-es';

defineOptions({
    name: 'hy-table',
    inheritAttrs: false
})

const props = withDefaults(defineProps<TableProps>(), {
    data: <any>[],
    border: false,
    showHeader: true,
    stripe: false,
    highlightCurrentRow: false
})

const emits = defineEmits<TableEmits>()

const slots = defineSlots()

// 计算配置
const columns = computed(() => {
    const result = <any>[]
    if (slots.default) {
        const children = slots.default()
        each(children, (child) => {
            // if (child.type && child.type.name === 'TableColumn') {
            const props = child.props || {}
            result.push({
                prop: props.prop,
                label: props.label,
                width: props.width,
                minWidth: props.minWidth,
                align: props.align,
            })
            // }
        })
    }
    return result
})


function getHeaderClass(column: any) {
    return [
        `my-table__header-cell`, column.align ? `is-${column.align}` : ''
    ]
}

function getHeaderStyle(column: any) {
    const style = {} as any
    if (!column) return style
    if (column.width) {
        style.width = `${column.width}px`
    }
    if (column.minWidth) {
        style.minWidth = `${column.minWidth}px`
    }
    return style
}

function getCellClass(column: any) {
    if (!column) return ['my-table__cell']
    return [
        `my-table__cell`,
        column.align ? `is-${column.align}` : ''
    ]
}

function getCellStyle(column: any) {
    const style = {} as any
    if (!column) return style
    if (column.width) {
        style.width = `${column.width}px`
    }
    if (column.minWidth) {
        style.minWidth = `${column.minWidth}px`
    }
    return style
}

function getRowClass(rowIndex: any) {
    return [
        `my-table__row`,
        props.stripe && rowIndex % 2 === 1 ? 'my-table__row--striped' : '',
        props.highlightCurrentRow ? 'my-table__row--header' : ''
    ]
}

function handleRowClick(row: any, rowIndex: any) {
    emits('row-click', row, rowIndex)
}

defineExpose({
    columns
})
</script>

<template>
    <div class="my-table" :class="{ 'my-table--border': border }">
        <div class="my-table__wrapper">
            <table class="my-table__body" cellpadding="0" cellspacing="0">
                <thead v-if="showHeader">
                    <tr>
                        <th v-for="(key, index) in columns" :key="index" :class="getHeaderClass(key)"
                            :style="getHeaderStyle(key)">
                            <div class="cell">{{ key.label }}</div>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(row, index) in data" :key="index" :class="getRowClass(index)"
                        @click="handleRowClick(row, index)">
                        <th v-for="(key, index) in Object.keys(row)" :key="key" :class="getCellClass(columns[index])"
                            :style="getCellStyle(columns[index])">
                            {{ row[key] }}
                        </th>
                    </tr>
                </tbody>
            </table>

        </div>
    </div>
</template>

<style scoped>
@import './style.css'
</style>