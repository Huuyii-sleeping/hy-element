<template>
  <div class="demo-card-shadow">
    <div class="shadow-demo-row">
      <hy-card shadow="always">
        <template #header>
          <div class="card-header">总是显示阴影</div>
        </template>
        <div class="card-body">
          <p>shadow="always"</p>
        </div>
      </hy-card>
    </div>
    
    <div class="shadow-demo-row">
      <hy-card shadow="hover">
        <template #header>
          <div class="card-header">悬停显示阴影</div>
        </template>
        <div class="card-body">
          <p>shadow="hover"</p>
        </div>
      </hy-card>
    </div>
    
    <div class="shadow-demo-row">
      <hy-card shadow="never">
        <template #header>
          <div class="card-header">从不显示阴影</div>
        </template>
        <div class="card-body">
          <p>shadow="never"</p>
        </div>
      </hy-card>
    </div>
  </div>
</template>

<script setup lang="ts">
// 阴影效果展示
</script>

<style scoped>
.demo-card-shadow {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.shadow-demo-row {
  width: 300px;
}

.card-header {
  font-weight: 500;
  color: #333;
}

.card-body p {
  margin: 0;
  color: #666;
}
</style>