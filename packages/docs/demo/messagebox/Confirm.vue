<script setup lang="ts">
import { hyMessageBox, hyMessage } from "hy-element";

function openConfirm() {
    hyMessageBox.confirm("proxy will permanently delete the file. Continue?", "Warning", { type: "warning" })
        .then((action) => {
            hyMessage.info(`action: ${action}`);
        })
        .catch((action) => {
            hyMessage.warning(`action: ${action}`);
        });
}
</script>

<template>
    <hy-button @click="openConfirm" plain> Click to open the Confirm</hy-button>
</template>
