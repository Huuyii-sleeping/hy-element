<template>
    <hy-select v-model="value" filterable clearable>
        <hy-option value="beijing" label="Beijing" />
        <hy-option value="hangzhou" label="Hangzhou" disabled/>
        <hy-option value="hebei" label="Hebei" />
    </hy-select>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const options = ref([
    { value: 'beijing', label: 'Beijing' },
    { value: 'shanghai' , label: 'Shanghai', disabled: true },
    { value: 'hebei', label: 'Hebei' },
])
const value = ref('')
</script>