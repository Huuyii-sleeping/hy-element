<template>
    <hy-button :plain="true" @click="open1">open1</hy-button>
</template>

<script setup lang="ts">
import  { hyNotification }  from 'hy-element';
import { h } from 'vue'
function open1(){
    hyNotification({
        title: 'Title',
        message: h('i', { style: "color: teal" }, "this is a notification"),
        position: 'bottom-right'
    })
}
</script>

<style scoped>
    
</style>