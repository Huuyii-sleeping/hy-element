<script setup lang="ts">
import { computed } from 'vue';
import type { LinkProps, LinkEmits } from './types';
defineOptions({ name: 'hyLink', inheritAttrs: false })

const props = withDefaults(defineProps < LinkProps > (), {
    href: '',
    type: 'default' as const,
    target: '_self',
    disabled: false
})

const emits = defineEmits < LinkEmits > ()

const linkClass = computed(() => [
    'hy-link',
    `hy-link--${props.type}`,
    { 'hy-link--disabled': props.disabled }
])

function handleClick(e: MouseEvent) {
    if (props.disabled) {
        e.preventDefault()
        return
    }
    emits('click', e)
}
</script>

<template>
    <a :href="props.href" :target="props.target" :class="linkClass" @click="handleClick" :disabled="props.disabled">
        <slot></slot>
    </a>
</template>

<style scoped>
@import './style.css'
</style>