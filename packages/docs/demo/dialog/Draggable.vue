<template>
  <div>
    <hy-button @click="visible = true">打开可拖拽 Dialog</hy-button>
    <hy-dialog v-model:visible="visible" title="可拖拽" draggable>
      <p>试着拖动标题栏</p>
    </hy-dialog>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const visible = ref(false)
</script>