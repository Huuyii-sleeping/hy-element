<!-- src/demo/drawer/Direction.vue -->
<template>
  <div>
    <hy-button @click="drawer1 = true">从左往右</hy-button>
    <hy-button @click="drawer2 = true">从上往下</hy-button>
    <hy-button @click="drawer3 = true">从下往上</hy-button>

    <hy-drawer v-model="drawer1" title="左侧抽屉" direction="left-to-right">
      <p>从左侧滑入</p>
    </hy-drawer>

    <hy-drawer v-model="drawer2" title="顶部抽屉" direction="top-to-bottom" size="200px">
      <p>从顶部滑入</p>
    </hy-drawer>

    <hy-drawer v-model="drawer3" title="底部抽屉" direction="bottom-to-top" size="25%">
      <p>从底部滑入</p>
    </hy-drawer>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const drawer1 = ref(false)
const drawer2 = ref(false)
const drawer3 = ref(false)
</script>