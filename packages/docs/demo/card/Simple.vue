<template>
  <div class="demo-card-simple">
    <hy-card>
      <div class="simple-content">
        <p>这是一个简洁的卡片</p>
        <p>只包含内容区域</p>
        <p>没有头部和底部</p>
      </div>
    </hy-card>
  </div>
</template>

<script setup lang="ts">
// 简洁卡片展示
</script>

<style scoped>
.demo-card-simple {
  padding: 20px;
}

.simple-content p {
  margin: 15px 0;
  line-height: 1.6;
  color: #666;
}
</style>