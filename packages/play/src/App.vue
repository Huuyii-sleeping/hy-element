<template>
    <hy-form ref="formRef" :model="form" :rules="rules">
        <hy-form-item label="Activity Name" prop="name">
            <hy-input v-model="form.name"></hy-input>
        </hy-form-item>
        <hy-form-item label="Activity zone" prop="region">
            <hy-select v-model="form.region" placeholder="please select your zone" :options="options"></hy-select>
        </hy-form-item>
        <hy-form-item label="Instance delivery" prop="delivery">
            <hy-switch v-model="form.delivery"></hy-switch>
        </hy-form-item>
        <hy-form-item label="Activity form" prop="desc">
            <hy-input v-model="form.desc" type="textarea"></hy-input>
        </hy-form-item>
        <hy-form-item>
            <hy-button type="primary" @click="onSubmit"> create </hy-button>
            <hy-button @click="onReset"> reset </hy-button>
        </hy-form-item>
    </hy-form>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { hyMessage, type FormInstance } from 'hy-element';

const formRef = ref<FormInstance>()
const form = reactive({
    name: '',
    region: '',
    delivery: false,
    desc: ''
})

const options = ref([
    { value: 'beijing', label: 'Beijing' },
    { value: 'shanghai', label: 'Shanghai' },
])
const rules = reactive({
    name: [
        { required: true, message: '输出活动名称', trigger: 'blur' },
        { min: 3, max: 5, message: '3-5', trigger: 'blur' },
    ],
    region: [{ required: true, message: '选择活动区域', trigger: 'change' }],
    desc: [{ required: true, message: '活动形式', trigger: 'blur' }]
})

const onSubmit = () => {
    formRef.value?.validate().then((valid) => {
        if (valid) {
            hyMessage.success('submit!')
        }
    })
}
const onReset = () => {
    formRef.value?.resetFields()
}

</script>

<style scoped lang="scss"></style>