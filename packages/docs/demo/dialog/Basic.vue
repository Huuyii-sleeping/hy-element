<template>
  <div>
    <hy-button @click="visible = true">打开 Dialog</hy-button>
    <hy-dialog v-model:visible="visible" title="提示">
      <p>这是对话框内容</p>
    </hy-dialog>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const visible = ref(false)
</script>