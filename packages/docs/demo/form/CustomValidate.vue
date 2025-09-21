<script lang="ts" setup>
import { reactive, ref } from "vue";
import { hyMessage, type FormInstance } from "hy-element";

const formRef = ref<FormInstance>();
const form = reactive({
    name: "",
    password: "",
    passwordConfirm: "",
});

const rules: any = reactive({
    name: [
        { required: true, message: "请输入活动名称", trigger: "blur" },
        { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
    ],
    password: [{ required: true, trigger: "blur", message: "请输入密码" }],
    passwordConfirm: [
        {
            required: true,
            trigger: "blur",
            message: "请再次输入密码",
        },
        {
            validator: (_: typeof rules, value: string) => value === form.password,
            trigger: "blur",
            message: "两个密码必须相同",
        },
    ],
});

const onSubmit = async (instance?: FormInstance) => {
    const valid = await instance?.validate();
    if (!valid) return;
    hyMessage.success("submit!");
};

const onReset = () => {
    formRef.value?.resetFields();
};
</script>

<template>
    <hy-form ref="formRef" :model="form" :rules="rules" label-position="top" @submit.prevent="onSubmit(formRef)">
        <hy-form-item label="Activity name" prop="name">
            <hy-input v-model="form.name" />
        </hy-form-item>
        <hy-form-item label="Password" prop="password">
            <hy-input v-model="form.password" type="password" />
        </hy-form-item>
        <hy-form-item label="Password Confirm" prop="passwordConfirm">
            <hy-input v-model="form.passwordConfirm" type="password" />
        </hy-form-item>
        <hy-form-item>
            <hy-button type="primary" native-type="submit">Create</hy-button>
            <hy-button @click="onReset">Reset</hy-button>
        </hy-form-item>
    </hy-form>
</template>
