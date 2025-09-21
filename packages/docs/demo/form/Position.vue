<script lang="ts" setup>
import { reactive, ref } from "vue";
import { hyMessage, type FormProps } from "hy-element";

const form = reactive({
    name: "",
    region: "",
    delivery: false,
    desc: "",
});
const options = ref([
    { value: "beijing", label: "Zone One" },
    { value: "shanghai", label: "Zone Two" },
]);
const labelPosition = ref<FormProps["labelPosition"]>("right");

const onSubmit = () => {
    hyMessage.success("submit");
};
</script>

<template>
    <hy-button-group size="small">
        <hy-button @click="labelPosition = 'left'"
            :type="labelPosition === 'left' ? 'primary' : 'info'">Left</hy-button>
        <hy-button @click="labelPosition = 'right'"
            :type="labelPosition === 'right' ? 'primary' : 'info'">Right</hy-button>
        <hy-button @click="labelPosition = 'top'" :type="labelPosition === 'top' ? 'primary' : 'info'">Top</hy-button>
    </hy-button-group>
    <div style="margin: 20px"></div>
    <hy-form :model="form" :label-position="labelPosition">
        <hy-form-item label="Activity name">
            <hy-input v-model="form.name" />
        </hy-form-item>
        <hy-form-item label="Activity zone">
            <hy-select v-model="form.region" placeholder="please select your zone" :options="options" />
        </hy-form-item>
        <hy-form-item label="Instant delivery">
            <hy-switch v-model="form.delivery" />
        </hy-form-item>
        <hy-form-item label="Activity form">
            <hy-input v-model="form.desc" type="textarea" />
        </hy-form-item>
        <hy-form-item>
            <hy-button type="primary" @click="onSubmit">Create</hy-button>
            <hy-button>Cancel</hy-button>
        </hy-form-item>
    </hy-form>
</template>
