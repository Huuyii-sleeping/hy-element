<template>
    <div class="demo-container">
        <h3>基础树形组件</h3>
        <div class="tree-wrapper">
            <hy-tree v-for="node in treeData" :key="node.id" :node="node" @node-click="handleNodeClick" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const treeData = ref([
    {
        id: 1,
        label: 'Level one 1',
        children: [
            {
                id: 11,
                label: 'Level two 1-1',
                children: [
                    {
                        id: 111,
                        label: 'Level three 1-1-1'
                    }
                ]
            }
        ]
    },
    {
        id: 2,
        label: 'Level one 2',
        children: [
            {
                id: 21,
                label: 'Level two 2-1',
                children: []
            },
            {
                id: 22,
                label: 'Level two 2-2',
                children: []
            }
        ]
    },
    {
        id: 3,
        label: 'Level one 3',
        children: []
    }
])

const handleNodeClick = (node: any) => {
    console.log('点击了节点:', node)
}
</script>

<style scoped>
.demo-container {
    padding: 20px;
    border: 1px solid #e4e7ed;
    border-radius: 4px;
    background-color: #fff;
}

.tree-wrapper {
    margin-top: 10px;
}
</style>