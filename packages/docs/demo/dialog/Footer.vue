<template>
    <div>
        <hy-button @click="visible = true">自定义底部</hy-button>
        <hy-dialog v-model:visible="visible" title="操作确认">
            <p>你确定要执行此操作吗？</p>
            <template #footer>
                <hy-button type="danger" @click="handleDelete">删除</hy-button>
                <hy-button @click="visible = false">取消</hy-button>
            </template>
        </hy-dialog>
    </div>
</template>

<script setup>
import { ref } from 'vue'
const visible = ref(false)

function handleDelete() {
    alert('已删除')
    visible.value = false
}
</script>