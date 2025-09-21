<!-- src/demo/drawer/Basic.vue -->
<template>
    <div>
        <hy-button type="primary" @click="drawer = true">打开抽屉</hy-button>

        <hy-drawer v-model="drawer" title="基础抽屉">
            <p>这是抽屉的内容区域</p>
            <p>可以放置表单、列表、或其他复杂组件</p>
        </hy-drawer>
    </div>
</template>

<script setup>
import { ref } from 'vue'
const drawer = ref(false)
</script>