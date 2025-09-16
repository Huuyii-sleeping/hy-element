<template>
    <hy-button :plain="true" @click="open1">open1</hy-button>
    <hy-button :plain="true" @click="open2"></hy-button>
</template>

<script setup lang="ts">
import { hyMessage } from 'hy-element';
const open1 = () => {
    hyMessage({
        showClose: true,
        message: 'this is a message'
    })
}
const open2 = () => {
    hyMessage({
        showClose: true,
        message: 'message2',
        type: 'success',
        plain: true,
    })
}
</script>

<style scoped>
    
</style>