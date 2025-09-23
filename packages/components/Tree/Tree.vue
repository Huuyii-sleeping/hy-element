<script setup lang="ts">
import { computed, ref } from 'vue'
import hyIcon from '../Icon/Icon.vue'

defineOptions({
    name: 'hyTree',
    inheritAttrs: false
})
const props = defineProps({
    node: {
        type: Object,
        required: true
    }
})

const emit = defineEmits(['node-click'])

const isExpanded = ref(false)

const hasChildren = computed(() => {
    return props.node.children && props.node.children.length > 0
})

const toggle = () => {
    if (hasChildren.value) {
        isExpanded.value = !isExpanded.value
    }
    emit('node-click', props.node)
}

const onChildClick = (childNode: any) => {
    emit('node-click', childNode)
}
</script>

<template>
    <div class="tree-node">
        <div class="node-content" @click="toggle">
            <span v-if="hasChildren" class="expand-icon" :class="{ expanded: isExpanded }">
                <hy-icon icon="arrow-right"></hy-icon>
            </span>
            <span class="node-label">{{ node.label }}</span>
        </div>

        <!-- 临时移除动画，直接显示 -->
        <transition name="tree-fade">
            <div v-if="isExpanded && hasChildren" class="children-container">
                <hy-tree v-for="child in node.children" :key="child.id" :node="child" @node-click="onChildClick" />
            </div>
        </transition>

    </div>
</template>

<style scoped>
.tree-fade-enter-active {
    transition: all 0.3s ease-out;
}

.tree-fade-leave-active {
    transition: all 0.3s ease-in;
}

.tree-fade-enter-from {
    opacity: 0;
    transform: translateY(-5px);
}

.tree-fade-enter-to {
    opacity: 1;
    transform: translateY(0);
}

.tree-fade-leave-from {
    opacity: 1;
    transform: translateY(0);
}

.tree-fade-leave-to {
    opacity: 0;
    transform: translateY(-5px);
}

.expand-icon {
    width: 20px;
    text-align: center;
    margin-right: 8px;
    transition: transform 0.3s cubic-bezier(0.65, 0, 0.35, 1);
    transform: rotate(0deg);
}

.expand-icon.expanded {
    transform: rotate(90deg);
}

.tree-node {
    /* margin-left: 20px; */
    margin: 2px 0;
}

.node-content {
    display: flex;
    align-items: center;
    padding: 4px 0;
    cursor: pointer;
    white-space: nowrap;
}

.node-content:hover {
    background-color: #f5f7fa;
}

.expand-icon,
.leaf-icon {
    width: 20px;
    text-align: center;
    margin-right: 5px;
    font-size: 12px;
}

.node-label {
    user-select: none;
}

.children-container {
    margin-left: 15px;
    border-left: 1px dashed #dcdfe6;
    padding-left: 10px;
}

/* CSS 动画类 */
.slide-fade-enter-active {
    transition: all 0.3s ease-in-out;
}

.slide-fade-leave-active {
    transition: all 0.3s ease-in-out;
}

.slide-fade-enter-from {
    opacity: 0;
    transform: translateY(-10px);
    max-height: 0;
}

.slide-fade-enter-to {
    opacity: 1;
    transform: translateY(0);
    max-height: 1000px;
}

.slide-fade-leave-from {
    opacity: 1;
    transform: translateY(0);
    max-height: 1000px;
}

.slide-fade-leave-to {
    opacity: 0;
    transform: translateY(-10px);
    max-height: 0;
}
</style>