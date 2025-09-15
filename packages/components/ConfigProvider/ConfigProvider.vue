<template>
    <slot name="default" :config="config"></slot>
</template>

<script setup lang="ts">
import type { ConfigProviderProps } from './types';
import { provideGlobalConfig } from './hooks';
defineOptions({
    name: 'hyConfigProvider',
})
const props = defineProps<ConfigProviderProps>()
const config = provideGlobalConfig(props)
</script>

<style scoped>
    
</style>