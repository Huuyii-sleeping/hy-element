<script setup lang="ts">
import { hyMessageBox, hyMessage } from "hy-element";

function openAlert() {
    hyMessageBox.alert("This is a message", "Title")
        .then((action) => {
            hyMessage.info(`action: ${action}`);
        })
        .catch((action) => {
            hyMessage.warning(`action: ${action}`);
        });
}
</script>

<template>
    <hy-button @click="openAlert" plain> Click to open the Alert</hy-button>
</template>
