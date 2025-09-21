<!-- src/demo/drawer/Footer.vue -->
<template>
  <div>
    <hy-button type="warning" @click="drawer = true">自定义底部</hy-button>
    
    <hy-drawer v-model="drawer" title="确认操作">
      <p>你确定要执行此操作吗？</p>
      <p>此操作不可逆，请谨慎操作。</p>
      
      <template #footer>
        <div class="footer-actions">
          <hy-button plain @click="drawer = false">取消</hy-button>
          <hy-button type="danger" @click="handleConfirm">确认</hy-button>
        </div>
      </template>
    </hy-drawer>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const drawer = ref(false)

function handleConfirm() {
  alert('操作已执行')
  drawer.value = false
}
</script>

<style scoped>
.footer-actions {
  text-align: right;
  padding: 16px 20px;
  border-top: 1px solid #ebeef5;
  background: #f8f9fa;
}
</style>