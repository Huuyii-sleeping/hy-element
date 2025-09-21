<!-- demo/dialog/Custom.vue -->
<template>
    <div>
        <hy-button type="success" @click="visible = true">自定义内容</hy-button>

        <hy-dialog v-model:visible="visible">
            <template #title>
                <span class="text-red-500 font-bold">⚠️ 自定义标题</span>
            </template>

            <div class="p-4 bg-gray-50 rounded">
                <p>这里是自定义内容区域</p>
                <hy-input v-model="inputValue" placeholder="试试输入点什么" />
            </div>

            <template #footer>
                <hy-button @click="visible = false">关闭</hy-button>
            </template>
        </hy-dialog>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const visible = ref(false)
const inputValue = ref('')
</script>

<style scoped>
.text-red-500 {
    color: #ef4444;
}

.font-bold {
    font-weight: bold;
}
</style>