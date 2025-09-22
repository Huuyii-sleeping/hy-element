<template>
  <div class="demo-card">
    <hy-card>
      <template #header>
        <div class="card-header">
          <span>卡片名称</span>
        </div>
      </template>
      
      <div class="card-content">
        <p>卡片内容</p>
        <p>卡片内容</p>
        <p>卡片内容</p>
      </div>
      
      <template #footer>
        <div class="card-footer">
          <el-button>取消</el-button>
          <el-button type="primary">确定</el-button>
        </div>
      </template>
    </hy-card>
  </div>
</template>

<script setup lang="ts">
// 基本用法展示
</script>

<style scoped>
.demo-card {
  padding: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-content p {
  margin: 10px 0;
  line-height: 1.5;
}

.card-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}
</style>