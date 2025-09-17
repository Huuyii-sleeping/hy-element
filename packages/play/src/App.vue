<template>
    <hy-input v-model="form.name" show-password type="password"></hy-input>
    <hy-input v-model="form.desc" type="textarea"></hy-input>
</template>

<script setup lang="ts">
import { reactive } from 'vue';

const form = reactive({
    name: '',
    desc: '',
})
</script>

<style scoped></style>