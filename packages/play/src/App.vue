<!-- ParentComponent.vue -->
<template>
    <div>
        <hy-button @click="showDialog = true">打开对话框</hy-button>

        <hy-dialog v-model:visible="showDialog" title="提示">
            <span> test nested Dialog </span>
            <template #footer>
                <hy-button type="primary" @click="innerVisible = true">open inner dialog</hy-button>
            </template>
        </hy-dialog>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const showDialog = ref(false)
const innerVisible = ref(false)

</script>