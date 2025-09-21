<!-- ParentComponent.vue -->
<template>
    <div>
        <hy-button @click="showDialog = true">打开对话框</hy-button>

        <hy-dialog v-model:visible="showDialog" title="提示" draggable>
            <span> test nested Dialog </span>
            <template #footer>
                <hy-button type="primary" @click="innerVisible = true">open inner dialog</hy-button>
            </template>
            <hy-dialog v-model:visible="innerVisible" title="inner dialog">
                <template #footer>
                    <hy-button @click="handleCancel" type="default">cancel</hy-button>
                    <hy-button @click="handleConfirm" type="primary">confirm</hy-button>
                </template>
            </hy-dialog>
        </hy-dialog>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const showDialog = ref(false)
const innerVisible = ref(false)

function handleConfirm() {
    console.log('用户点击了确认')
}

function handleCancel() {
    console.log('用户点击了取消')
}
</script>