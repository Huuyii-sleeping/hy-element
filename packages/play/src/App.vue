<!-- App.vue -->
<template>
  <div class="app">
    <h2>手动实现的树形控件</h2>
    <div class="tree-wrapper">
      <hyTree v-for="node in treeData" :key="node.id" :node="node" @node-click="handleNodeClick" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { hyTree } from 'hy-element'

// 树形数据
const treeData = ref([
  {
    id: 1,
    label: 'Level one 1',
    children: [
      {
        id: 11,
        label: 'Level two 1-1',
        children: [
          { id: 111, label: 'Level three 1-1-1', children: [] },
          { id: 112, label: 'Level three 1-1-2', children: [] }
        ]
      }
    ]
  },
  {
    id: 2,
    label: 'Level one 2',
    children: [
      { id: 21, label: 'Level two 2-1' },
      { id: 22, label: 'Level two 2-2' }
    ]
  },
  {
    id: 3,
    label: 'Level one 3',
    children: []
  }
])

// 处理节点点击
const handleNodeClick = (node) => {
  console.log('点击了节点:', node)
}
</script>

<style>
.app {
  padding: 20px;
  font-family: Arial, sans-serif;
}

.tree-wrapper {
  border: 1px solid #e4e7ed;
  border-radius: 4px;
  padding: 15px;
  max-width: 400px;
}
</style>