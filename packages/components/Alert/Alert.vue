<template>
    <transition name="hy-alert-fade">
        <div v-show="visible" class="hy-alert" role="alert" :class="{
            [`hy-alert--${type}`]: type,
            ['hy-alert--${effect}']: effect,
            'text-center': center
        }">
            <hy-icon v-if="showIcon" class="hy-alert__icon" :class="{ 'big-icon': withDescription }" :icon="iconName" />
            <div class="hy-alert__content">
                <span class="hy-alert__title" :class="{ 'with-desc': withDescription }"
                    :style="{ display: center && !showIcon ? 'flow' : 'inline' }">
                    <slot name="title">{{ title }}</slot>
                </span>
                <p class="hy-alert__description">
                    <slot>{{ description }}</slot>
                </p>
                <div class="hy-alert__close" v-if="closable">
                    <hy-icon @click.stop="close" icon="xmark"></hy-icon>
                </div>
            </div>
        </div>
    </transition>
</template>

<script setup lang="ts">
import type { AlertEmits, AlertInstance, AlertProps } from './types';
import { typeIconMap } from '@hy-element/utils';
import { computed, ref } from 'vue';
import hyIcon from '../Icon/Icon.vue';
// 可以直接设置组件的元信息
defineOptions({
    name: 'hyAlert'
})
const props = withDefaults(defineProps<AlertProps>(), {
    effect: 'light',
    type: 'info',
    closable: true
})
const emits = defineEmits<AlertEmits>()

const slots = defineSlots()

const withDescription = computed(() => props.description || slots.default)

const visible = ref(true)

const iconName = computed(() => typeIconMap.get(props.type) ?? 'circle-info')

function close() {
    visible.value = false
    emits('close')
}

function open() {
    visible.value = true
}
// 是用来定义哪些方法能够被父亲使用ref进行访问
defineExpose<AlertInstance>({
    close, open
})

</script>

<style scoped>
@import './style.css'
</style>