<template>
    <div style="dis主要用play: none;">
        <!-- 这个组件于配置，不需要实际渲染 -->
    </div>
</template>

<script setup>
defineOptions({
    name: 'TableColumn'
})

// 定义props
const props = defineProps({
    prop: {
        type: String,
        default: ''
    },
    label: {
        type: String,
        default: ''
    },
    width: {
        type: [String, Number],
        default: ''
    },
    minWidth: {
        type: [String, Number],
        default: ''
    },
    align: {
        type: String,
        default: 'left',
        validator: value => ['left', 'center', 'right'].includes(value)
    },
})
defineExpose({
    props
})
</script>