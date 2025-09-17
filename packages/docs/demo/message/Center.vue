<script lang="ts" setup>
import { hyMessage } from "hy-element";

const openCenter = () => {
    hyMessage({
        showClose: true,
        message: "Centered text",
        center: true
    });
};
</script>

<template>
    <hy-button plain @click="openCenter">Centered text</hy-button>
</template>
