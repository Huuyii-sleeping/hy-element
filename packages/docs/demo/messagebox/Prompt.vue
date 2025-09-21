<script setup lang="ts">
import { hyMessageBox, hyMessage } from "hy-element";

function openConfirm() {
    hyMessageBox.prompt("Place input your name", "Tip", { type: "info" })
        .then(({ value }) => {
            hyMessage.info(`your name is: ${value}`);
        })
        .catch((action) => {
            hyMessage.warning(`action: ${action}`);
        });
}
</script>

<template>
    <hy-button @click="openConfirm" plain> Click to open the Confirm</hy-button>
</template>
