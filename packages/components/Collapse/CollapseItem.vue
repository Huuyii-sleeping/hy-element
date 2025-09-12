<script setup lang="ts">
import type { CollapseItemProps } from './types';
import { COLLAPSE_CONTEXT } from './contants';
import { inject, computed } from 'vue';
import hyIcon from '../Icon/Icon.vue';
import transitionEvents from './transitionEvents';
defineOptions({
    name: 'hyCollapseItem'
})
const ctx = inject(COLLAPSE_CONTEXT, void 0)
const props = defineProps<CollapseItemProps>()
const isActive = computed(() => {
    return ctx?.activeNames.value?.includes(props.name)
})

function handleClick() {
    if (props.disabled) return
    ctx?.handleItemClick(props.name)
}
</script>

<template>
    <div class="hy-collapse-item" :class="{ 'is-disabled': disabled }">
        <div class="hy-collapse-item__header" :id="`item-header-${name}`"
            :class="{ 'is-disabled': disabled, 'is-active': isActive }" @click="handleClick">
            <span class="hy-collapse-item__title">
                <slot name="title">{{ title }}</slot>
            </span>
            <hy-icon icon="angle-right" class="header-angle"></hy-icon>
        </div>
        <transition name="slide" v-on="transitionEvents">
            <div class="hy-collapse-item__wapper" v-show="isActive">
                <div class="hy-collapse-item__content" :id="`item-content-${name}`">
                    <slot></slot>
                </div>
            </div>
        </transition>

    </div>
</template>

<style>
@import './style.css'
</style>