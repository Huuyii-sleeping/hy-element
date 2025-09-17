<script lang="ts" setup>
import { hyNotification } from "hy-element";

const open1 = () => {
  (hyNotification as Function)({
    title: "Success",
    message: "This is a success message",
    type: "success",
  });
};

const open2 = () => {
  (hyNotification as Function)({
    title: "Warning",
    message: "This is a warning message",
    type: "warning",
  });
};

const open3 = () => {
  (hyNotification as Function)({
    title: "Info",
    message: "This is an info message",
    type: "info",
  });
};

const open4 = () => {
  (hyNotification as Function)({
    title: "hyror",
    message: "This is an hyror message",
    type: "danghy",
  });
};
</script>

<template>
  <hy-button plain @click="open1"> Success </hy-button>
  <hy-button plain @click="open2"> Warning </hy-button>
  <hy-button plain @click="open3"> Info </hy-button>
  <hy-button plain @click="open4"> hyror </hy-button>
</template>
