<script setup lang="ts">
/**
 * collapse 只是一个容器组件 不是渲染UI使用的 而是管理多个collaapse的展开状态 并通过provide将状态传递给子组件
 */
import type { CollapseProps, CollapseEmits, CollapseItemName } from './types';
import { ref, provide, watch, watchEffect } from 'vue'
import { COLLAPSE_CONTEXT } from './contants';
import { debugWarn } from '@hy-element/utils';

const COMP_NAME = 'hyCollapse' as const
defineOptions({
    name: COMP_NAME
})
// 定义 组件接收的props和emits事件 
const props = defineProps<CollapseProps>()
// 使用v-model也能接收这个属性 change可以改变面板的变化 
// 这个emits是用来实现双向绑定的
/**
 * <hy-collapse v-model="activeNames"> 两者等价
 * <hy-collapse :modelValue="active" @update:modelValue="activeNames=$event"/>
 */
const emits = defineEmits<CollapseEmits>() 
// 指定对应的activeName
const activeNames = ref(props.modelValue)
// 处理子项的点击事件
function handleItemClick(item: CollapseItemName) {
    // todo 浅拷贝避免直接修改原数组
    let _activeNames = [...activeNames.value]
    if (props.according) {
        _activeNames = [_activeNames[0] === item ? '' : item]
        updateActiveNames(_activeNames)
        return 
    }
    // 改变对应的激活状态
    const index = _activeNames.indexOf(item)
    if(index > -1){
        _activeNames.splice(index, 1)
    } else {
        _activeNames.push(item)
    }
    updateActiveNames(_activeNames)
}
// 更新内部的状态 触发两个事件 外部v-model change 提供用户监听状态变化
function updateActiveNames(newNames: CollapseItemName[]) {
    activeNames.value = newNames
    emits('update:modelValue', newNames)
    emits('change', newNames)
}
// 监听props的变化
watch(() => props.modelValue, (newNames) => updateActiveNames(newNames))
// according 代表只能有一个对应的value 不能是数组
watchEffect(() => {
    if(props.according && activeNames.value.length > 1){
        debugWarn(COMP_NAME, 'according mode should only have one active name')
    }
})
// 提供上下文给子组件
provide(COLLAPSE_CONTEXT, {
    activeNames,
    handleItemClick,
})
</script>

<template>
    <div class="hy-collapse">
        <slot></slot>
    </div>
</template>

<style>
@import './style.css';
</style>