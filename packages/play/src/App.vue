<template>
    <hy-switch size="default" v-model="switchRef" :active-value="0" :inactive-value="1"></hy-switch>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// const loading = ref(false)
const switchRef = ref(1)

</script>

<style scoped lang="scss">
    
</style>