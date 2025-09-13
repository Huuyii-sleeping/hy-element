<script lang="ts" setup>
import { ref } from 'vue'

const alertRef = ref<any>(null)

const openAlert = () => {
    if (alertRef.value) {
        // 调用子组件的 open 方法
        alertRef.value.open()
    }
}

const closeAlert = () => {
    if (alertRef.value) {
        // 调用子组件的 close 方法
        alertRef.value.close()
    }
}
</script>

<template>
	<hy-button @click="openAlert">Open Alert</hy-button>
	<hy-button @click="closeAlert">Close Alert</hy-button>

	<hy-alert ref="alertRef" title="Open & Close" show-icon />
</template>