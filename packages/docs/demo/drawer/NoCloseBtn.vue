<!-- src/demo/drawer/NoCloseBtn.vue -->
<template>
  <div>
    <hy-button type="danger" @click="drawer = true">无关闭按钮</hy-button>
    
    <hy-drawer v-model="drawer" title="强制阅读" :show-close="false">
      <div class="read-content">
        <h4>📜 使用条款</h4>
        <ol>
          <li>请仔细阅读以下条款</li>
          <li>同意后方可继续使用</li>
          <li>如有疑问请联系客服</li>
        </ol>
      </div>
      
      <template #footer>
        <div class="footer-actions">
          <hy-button type="primary" @click="drawer = false">同意并继续</hy-button>
        </div>
      </template>
    </hy-drawer>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const drawer = ref(false)
</script>

<style scoped>
.read-content {
  padding: 20px;
}

.read-content h4 {
  color: #67c23a;
  margin: 0 0 15px 0;
}

.read-content ol {
  padding-left: 20px;
}

.read-content li {
  margin: 5px 0;
}

.footer-actions {
  text-align: right;
  padding: 16px 20px;
  border-top: 1px solid #ebeef5;
  background: #f8f9fa;
}
</style>