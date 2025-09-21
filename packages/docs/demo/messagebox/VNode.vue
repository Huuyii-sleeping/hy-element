<script setup lang="ts">
import { h, ref } from "vue";
import { hyMessageBox, hySwitch, type SwitchValueType } from "hy-element";

function open1() {
    hyMessageBox({
        title: "Message",
        message: h("p", null, [
            h("span", null, "Message can be "),
            h("i", { style: "color: teal" }, "VNode"),
        ]),
    });
}

function open2() {
    const checked = ref<SwitchValueType>(false);
    hyMessageBox({
        title: "Message",
        message: () =>
            h(hySwitch as any, {
                modelValue: checked.value,
                "onUpdate:modelValue": (val: SwitchValueType) => {
                    checked.value = val;
                },
            }),
    });
}
</script>

<template>
    <hy-button @click="open1" plain>Common VNode</hy-button>
    <hy-button @click="open2" plain>Dynamic props</hy-button>
</template>
