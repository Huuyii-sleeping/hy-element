<template>
  <div class="demo-container">
    <h3>节点点击事件</h3>
    <div class="info-panel">
      <p>当前点击的节点: {{ (currentNode as any)?.label || '无' }}</p>
    </div>
    <div class="tree-wrapper">
      <hy-tree
        v-for="node in treeData"
        :key="node.id"
        :node="node"
        @node-click="handleNodeClick"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const currentNode = ref(null)

const treeData = ref([
  {
    id: 1,
    label: '根目录',
    children: [
      {
        id: 11,
        label: 'src',
        children: [
          {
            id: 111,
            label: 'main.js'
          },
          {
            id: 112,
            label: 'App.vue'
          }
        ]
      },
      {
        id: 12,
        label: 'public',
        children: [
          {
            id: 121,
            label: 'index.html'
          }
        ]
      }
    ]
  }
])

const handleNodeClick = (node: any) => {
  currentNode.value = node
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

.info-panel {
  padding: 10px;
  background-color: #f5f7fa;
  border-radius: 4px;
  margin-bottom: 10px;
}

.tree-wrapper {
  margin-top: 10px;
}
</style>