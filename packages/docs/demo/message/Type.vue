<script lang="ts" setup>
import { hyMessage } from "hy-element";

const open1 = () => {
  hyMessage("This is a message.");
};
const open2 = () => {
  hyMessage({
    message: "Congrats, this is a success message.",
    type: "success",
  });
};
const open3 = () => {
  hyMessage({
    message: "Warning, this is a warning message.",
    type: "warning",
  });
};
const open4 = () => {
  hyMessage.error("Oops, this is a error message.");
};
</script>

<template>
  <hy-button :plain="true" @click="open2">Success</hy-button>
  <hy-button :plain="true" @click="open3">Warning</hy-button>
  <hy-button :plain="true" @click="open1">Message</hy-button>
  <hy-button :plain="true" @click="open4">Error</hy-button>
</template>
