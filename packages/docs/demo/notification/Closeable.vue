<script lang="ts" setup>
import { hyNotification } from 'hy-element'

const open = () => {
    ((hyNotification as any).success)({
        title: 'Info',
        message: 'This is a message without close button',
        showClose: false,
    })
}
</script>

<template>
    <hy-button plain @click="open"> Hide close button </hy-button>
</template>