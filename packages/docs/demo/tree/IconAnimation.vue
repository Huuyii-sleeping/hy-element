<template>
    <div class="demo-container">
        <h3>图标旋转动画</h3>
        <p>点击节点查看图标旋转动画效果</p>
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
        label: '📁 项目文件夹',
        children: [
            {
                id: 11,
                label: '📂 src',
                children: [
                    {
                        id: 111,
                        label: '📄 main.js'
                    },
                    {
                        id: 112,
                        label: '📄 App.vue'
                    }
                ]
            },
            {
                id: 12,
                label: '📦 package.json',
                children: []
            }
        ]
    }
])

const handleNodeClick = (node: any) => {
    console.log('节点展开/折叠:', node.label)
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