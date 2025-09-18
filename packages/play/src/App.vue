<template>
    <hy-button type="primary" @click="openLoading2">
        as a service
    </hy-button>
    <hy-button v-loading.fullscreen.lock="loading" type="primary" @click="openLoading1">
        as a directive
    </hy-button>
</template>

<script setup lang="ts">
import { hyLoading } from 'hy-element';
import { ref } from 'vue';

const loading = ref(false)

function openLoading1() {
    loading.value = true
    setTimeout(() => {
        loading.value = false
    }, 2000)
}
function openLoading2() {
    const _loading = hyLoading.service({
        lock: true,
        spinner: 'circle-notch',
        text: '加载中...',
        background: 'rgba(0,0,0,0.5)',
    })
    setTimeout(() => {
        _loading.close()
    }, 2000)
}
</script>

<style scoped></style>