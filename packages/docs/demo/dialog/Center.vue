<!-- demo/dialog/Center.vue -->
<template>
    <div>
        <hy-button @click="visible = true">居中对话框</hy-button>

        <hy-dialog v-model:visible="visible" title="居中显示" :center="true">
            <p>对话框已垂直水平居中显示。</p>
            <p>适用于重要提示或全局操作。</p>
        </hy-dialog>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const visible = ref(false)
</script>