<template>
  <hy-button type="primary" size="small">我是按钮</hy-button>

  <hy-popconfirm title="确定要删除吗？" placement="bottom" @confirm="handleConfirm" @cancel="handleCancel"
    @click-outside="visible = false">
    <template #reference>
      <button>点击我弹出确认框</button>
    </template>
  </hy-popconfirm>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const visible = ref(false)

function handleConfirm() {
  console.log('确认删除')
  visible.value = false
}

function handleCancel() {
  console.log('取消操作')
  visible.value = false
}
</script>