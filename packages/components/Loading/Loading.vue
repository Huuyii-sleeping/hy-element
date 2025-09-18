<script setup lang="ts">
import { computed, type Ref } from 'vue';
import type { LoadingOptions } from './types';
import { isString } from 'lodash-es';
import hyIcon from '../Icon/Icon.vue'
defineOptions({
    name: 'hyLoading',
    inheritAttrs: false,
})
const props = defineProps<LoadingOptions>()
const iconName = computed(() => {
    if (isString(props.spinner)) {
        return props.spinner
    }
    return 'spinner'
})
</script>

<template>
    <transition name="fade-in-linear" @after-leave="onAfterLeave">
        <div v-show="(props.visible as Ref).value" class="hy-loading hy-loading__mask"
            :class="{ 'is-fullscreen': fullscreen }">
            <div class="hy-loading__spinner">
                <hy-icon v-if="props.spinner !== false" :icon="iconName" spin></hy-icon>
                <p v-if="text" class="hy-loading-text">{{ text }}</p>
            </div>
        </div>
    </transition>
</template>

<style scoped>
@import './style.css';

/* vue3 新特性 */
.hy-loading {
    --hy-loading-bg-color: v-bind(background) !important;
    --hy-loading-z-index: v-bind(zIndex) !important;
}
</style>