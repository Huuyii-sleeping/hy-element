<template>
    <hy-button @click="openConfirm" plain>MessageBox</hy-button>
</template>

<script setup lang="ts">
import { hyMessageBox, hyMessage } from 'hy-element'
function openConfirm(){
    hyMessageBox.confirm('property will parmently delete the file')
    .then((action: any) => {
        hyMessage.info(`action: ${action}`)
    }).catch((action: any) => {
        hyMessage.awrning(`action: ${action}`)
    })
}
</script>

<style scoped></style>