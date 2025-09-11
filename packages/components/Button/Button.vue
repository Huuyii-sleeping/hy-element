<template>
    <component :autofocus="autofocus" :is="tag" ref="_ref" class="hy-button"
        :type="tag === 'button' ? nativeType : void 0" :disabled="disabled || loading ? true : void 0" :class="{
            [`hy-button--${type}`]: type,
            [`hy-button--${size}`]: size,
            'is-plain': plain,
            'is-round': round,
            'is-circle': circle,
            'is-disabled': disabled,
            'is-loading': loading,
        }" @click="(e: MouseEvent) => useThrottle ? handleBtnClickThrottle(e) : handleBtnClick(e)">
        <template v-if="loading">
            <slot name="loading">
                <hy-icon class="loading-icon" :icon="loadingIcon ?? 'spinner'" spin :style="iconStyle" size="1x"/>
            </slot>
        </template>
        <hy-icon v-if="icon && !loading" :icon="icon" size="1x" :style="iconStyle"/>
        <slot></slot>
    </component>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import type { ButtonProps, ButtonInstance, ButtonEmits } from './types';
import { throttle } from 'lodash-es';
import { hyIcon } from 'hy-element';
defineOptions({ // 给组件主动添加名字
    name: 'hyButton'
})
const props = withDefaults(defineProps<ButtonProps>(), {
    tag: 'button',
    nativeType: 'button',
    useThrottle: true,
    throttleDuration: 500
})
const emits = defineEmits<ButtonEmits>()

const slots = defineSlots()

const _ref = ref<HTMLButtonElement>()
const iconStyle = computed(() => ({ marginRight: slots.default ? '6px' : '0px' }))
const handleBtnClick = (e: MouseEvent) => {
    console.log('按钮点击')
    emits('click', e)
}
const handleBtnClickThrottle = throttle(handleBtnClick, props.throttleDuration)

defineExpose<ButtonInstance>({
    ref: _ref
})
</script>

<style scoped>
@import './style.css'
</style>
