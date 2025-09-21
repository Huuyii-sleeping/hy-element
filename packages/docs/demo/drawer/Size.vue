<!-- src/demo/drawer/Size.vue -->
<template>
  <div>
    <hy-button @click="drawer1 = true">窄抽屉 (200px)</hy-button>
    <hy-button @click="drawer2 = true">宽抽屉 (50%)</hy-button>
    <hy-button @click="drawer3 = true">高抽屉 (30%)</hy-button>

    <hy-drawer v-model="drawer1" title="窄抽屉" size="200px">
      <div class="size-content">
        <p>宽度: 200px</p>
        <p>适合显示简洁内容</p>
      </div>
    </hy-drawer>

    <hy-drawer v-model="drawer2" title="宽抽屉" direction="left-to-right" size="50%">
      <div class="size-content">
        <p>宽度: 50%</p>
        <p>适合显示复杂表单或列表</p>
      </div>
    </hy-drawer>

    <hy-drawer v-model="drawer3" title="高抽屉" direction="top-to-bottom" size="30%">
      <div class="size-content">
        <p>高度: 30%</p>
        <p>适合显示通知或快捷操作</p>
      </div>
    </hy-drawer>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const drawer1 = ref(false)
const drawer2 = ref(false)
const drawer3 = ref(false)
</script>

<style scoped>
.size-content {
  padding: 20px;
}

.size-content p {
  margin: 5px 0;
}
</style>