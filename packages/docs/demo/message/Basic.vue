<script lang="ts" setup>
import { h } from "vue";
import { hyMessage } from "hy-element";

const open = () => {
  hyMessage("This is a message.");
};

const openVn = () => {
  hyMessage({
    message: h("p", { style: "line-height: 1; font-size: 14px" }, [
      h("span", null, "Message can be "),
      h("i", { style: "color: teal" }, "VNode"),
    ]),
  });
};
</script>

<template>
  <hy-button :plain="true" @click="open">Show message</hy-button>
  <hy-button :plain="true" @click="openVn">VNode</hy-button>
</template>