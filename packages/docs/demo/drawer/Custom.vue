<!-- src/demo/drawer/Custom.vue -->
<template>
  <div>
    <hy-button type="success" @click="drawer = true">自定义内容</hy-button>
    
    <hy-drawer v-model="drawer">
      <template #title>
        <span class="custom-title">🎨 自定义标题</span>
      </template>
      
      <div class="custom-content">
        <hy-input v-model="inputValue" placeholder="输入内容" />
        <p class="mt-4">当前输入：{{ inputValue }}</p>
      </div>
    </hy-drawer>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const drawer = ref(false)
const inputValue = ref('')
</script>

<style scoped>
.custom-title {
  color: #007bff;
  font-weight: bold;
  font-size: 18px;
}

.custom-content {
  padding: 20px;
  background: #f8f9fa;
  border-radius: 8px;
}

.mt-4 {
  margin-top: 1rem;
}
</style>