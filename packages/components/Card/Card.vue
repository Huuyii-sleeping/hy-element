<script setup lang="ts">
import type { CardProps } from './types';

defineOptions({ name: 'hyCard', inheritAttrs: false })

const props = withDefaults(defineProps<CardProps>(), {
    shadow: 'always'
})
const slots = defineSlots()
</script>

<template>
    <div class="hy-card" :class="`is-${props.shadow}-shadow`">
        <div v-if="slots.header" class="hy-card__header">
            <slot name="header"></slot>
        </div>
        <div v-else class="hy-card__header">
            {{ props.header }}
        </div>

        <div class="hy-card__content">
            <slot name="default"></slot>
        </div>

        <div v-if="slots.footer" class="hy-card__footer">
            <slot name="footer"></slot>
        </div>
        <div v-else class="hy-card__footer">
            {{ props.footer }}
        </div>
    </div>
</template>

<style scoped>
@import './style.css'
</style>