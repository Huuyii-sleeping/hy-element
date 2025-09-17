<template>
    <hy-button :plain="true" @click="open1">open1</hy-button>
    <hy-button :plain="true" @click="open2">open2</hy-button>
</template>

<script setup lang="ts">
import { hyNotification } from 'hy-element';
import { h } from 'vue'
function open1() {
    (hyNotification as Function)({
        title: 'Title',
        message: h('i', { style: "color: teal" }, "this is a notification"),
        position: 'bottom-right'
    })

}
function open2() {
    (hyNotification as Function)({
        title: 'Title',
        message: h('i', { style: "color: teal" }, "this is a notification"),
        position: 'top-left',
        duration: 0,
    })
}
</script>

<style scoped></style>