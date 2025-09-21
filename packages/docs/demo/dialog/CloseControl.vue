<!-- demo/dialog/CloseControl.vue -->
<template>
    <div>
        <hy-button type="info" @click="visible = true">不可关闭对话框</hy-button>

        <hy-dialog v-model:visible="visible" title="重要操作" :show-close="false">
            <p>此对话框不能通过点击遮罩或关闭按钮关闭。</p>
            <p>必须通过底部按钮操作。</p>

            <template #footer>
                <div style="text-align: right">
                    <hy-button type="primary" @click="handleConfirm">我已知晓</hy-button>
                </div>
            </template>
        </hy-dialog>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const visible = ref(false)

function handleConfirm() {
    visible.value = false
}
</script>