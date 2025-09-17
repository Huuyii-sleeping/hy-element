<script lang="ts" setup>
import { hyMessage } from "hy-element";

const open1 = () => {
  hyMessage({
    message: "Congrats, this is a success message.",
    type: "success",
  });
};
const open2 = () => {
  hyMessage.success("Congrats, this is a success message.");
};
</script>
<template>
  <div>
    <hy-button @click="open1">插件式调用</hy-button>
    <hy-button @click="open2">函数式调用</hy-button>
    <hy-button @click="$message.success('Congrats, this is a success message.')"
      >全局方法调用</hy-button>
  </div>
</template>
