<!-- src/demo/link/Custom.vue -->
<template>
  <div>
    <hy-link href="#">
      <span class="custom-content">自定义内容</span>
    </hy-link>
    <br><br>
    <hy-link href="#" type="primary">
      <i class="icon">🔗</i> 带图标链接
    </hy-link>
  </div>
</template>

<style scoped>
.custom-content {
  color: #409eff;
  font-weight: bold;
  font-size: 16px;
}

.icon {
  margin-right: 5px;
}
</style>