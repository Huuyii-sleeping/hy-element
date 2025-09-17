<script lang="ts" setup>
import { ref } from "vue";

const disabled = ref(false);
</script>

<template>
  <hy-tooltip
    :disabled="disabled"
    content="click to close tooltip function"
    placement="bottom"
  >
    <hy-button @click="disabled = !disabled"
      >click to {{ disabled ? "active" : "close" }} tooltip function</hy-button
    >
  </hy-tooltip>
</template>
