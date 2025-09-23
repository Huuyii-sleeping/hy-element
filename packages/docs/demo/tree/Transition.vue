<template>
    <div class="demo-container">
        <h3>展开/折叠动画</h3>
        <p>观察节点展开和折叠时的平滑过渡效果</p>
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
        label: '🏢 公司组织架构',
        children: [
            {
                id: 11,
                label: '👨‍💻 技术部',
                children: [
                    {
                        id: 111,
                        label: ' frontend 前端组'
                    },
                    {
                        id: 112,
                        label: ' backend 后端组'
                    }
                ]
            },
            {
                id: 12,
                label: '🎨 设计部',
                children: [
                    {
                        id: 121,
                        label: ' UI设计组'
                    },
                    {
                        id: 122,
                        label: ' UX研究组'
                    }
                ]
            }
        ]
    }
])

const handleNodeClick = (node: any) => {
    console.log('动画演示:', node.label)
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