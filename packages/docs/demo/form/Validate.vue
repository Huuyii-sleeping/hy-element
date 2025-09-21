<script lang="ts" setup>
import { reactive, ref } from "vue";
import { hyMessage, type FormInstance } from "hy-element";

const formRef = ref<FormInstance>();
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

const rules = reactive({
    name: [
        { required: true, message: "请输入活动名称", trigger: "blur" },
        { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
    ],
    region: [{ required: true, message: "请选择活动区域", trigger: "change" }],
    desc: [{ required: true, message: "请填写活动形式", trigger: "blur" }],
});

const onSubmit = () => {
    formRef.value?.validate().then((valid: any) => {
        if (valid) {
            hyMessage.success("submit!");
        }
    });
};

const onReset = () => {
    formRef.value?.resetFields();
};
</script>

<template>
    <hy-form ref="formRef" :model="form" :rules="rules">
        <hy-form-item label="Activity name" prop="name">
            <hy-input v-model="form.name" />
        </hy-form-item>
        <hy-form-item label="Activity zone" prop="region">
            <hy-select v-model="form.region" placeholder="please select your zone" :options="options" />
        </hy-form-item>
        <hy-form-item label="Instant delivery" prop="delivery">
            <hy-switch v-model="form.delivery" />
        </hy-form-item>
        <hy-form-item label="Activity form" prop="desc">
            <hy-input v-model="form.desc" type="textarea" />
        </hy-form-item>
        <hy-form-item>
            <hy-button type="primary" @click="onSubmit">Create</hy-button>
            <hy-button @click="onReset">Reset</hy-button>
        </hy-form-item>
    </hy-form>
</template>
