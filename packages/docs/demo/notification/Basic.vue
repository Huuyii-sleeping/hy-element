<script setup lang="ts">
import { h } from "vue";
import { hyNotification } from "hy-element";

function openNotify1() {
  (hyNotification as Function)({
    title: "Title",
    message: h("i", { style: "color:teal" }, "This is a remidhy"),
    position:'bottom-right'
  });
}

function openNotify2() {
  (hyNotification as Function)({
    title: "Prompt",
    message: "This is a message that does not auto close",
    duration: 0,
    position:'top-left'
  });
}
</script>

<template>
  <hy-button @click="openNotify1" plain>Closes automatically</hy-button>
  <hy-button @click="openNotify2" plain>Won't closes automatically</hy-button>
</template>
