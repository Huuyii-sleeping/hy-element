<script setup lang="ts">
import { hyMessage, hyMessageBox } from "hy-element";

function openMsgBox() {
    hyMessageBox.confirm(
        "proxy will permanently delete the file. Continue?",
        "Warning",
        {
            type: "warning",
            center: true,
            // 这里展示一下 不用 Promise 写法的时候
            callback(action) {
                if (action === "confirm") {
                    hyMessage.info(action);
                } else {
                    hyMessage.warning(action as string);
                }
            },
        }
    );
}
</script>

<template>
    <hy-button @click="openMsgBox" plain>Click to open Message Box</hy-button>
</template>
