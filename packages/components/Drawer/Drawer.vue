<script setup lang="ts">
import { computed } from 'vue';
import type { DrawerEmits, DrawerProps } from './types';
import { useZindex } from '@hy-element/hooks';
import hyIcon from '../Icon/Icon.vue';
import hyOverlay from '../Overlay/Overlay.vue'
import hyButton from '../Button/Button.vue'

defineOptions({ name: 'hyDrawer', inheritAttrs: false })

const props = withDefaults(defineProps<DrawerProps>(), {
    showClose: true,
    DrawerDirection: 'rtl',
    size: '360px',
    title: '',
})

const modelValue = computed({
    get: () => props.modelValue,
    set: (val) => emits('update:modelValue', val)
})

const emits = defineEmits<DrawerEmits>()

const { nextZindex } = useZindex()

const zIndex = nextZindex()

const slots = defineSlots()

function toggleVisible() {
    const newVal = !modelValue.value
    modelValue.value = newVal
}

function handleWrapperClick() {
    if (!props.showClose) return
    toggleVisible()
}


</script>

<template>
    <transition>
        <hy-overlay v-show="modelValue" :z-index="zIndex" mask @click.stop="handleWrapperClick">
            <div class="hy-overlay-drawer">
                <div class="hy-drawer" :class="`hy-drawer--${props.direction}`" @click.stop>
                    <div class="hy-drawer__header">
                        <div v-if="!slots.title" class="hy-drawer__title">
                            {{ title }}
                        </div>
                        <div v-else class="hy-drawer__title">
                            <slot name="title"></slot>
                        </div>
                        <hy-button v-if="showClose" class="hy-drawer__header-btn" @click.prevent="toggleVisible()">
                            <hy-icon icon="xmark" class="hy-dialog__header-icon"></hy-icon>
                        </hy-button>
                    </div>

                    <div class="hy-drawer__content">
                        <slot name="default"></slot>
                    </div>

                    <div class="hy-drawer__foooter">
                        <slot name="footer"></slot>
                    </div>
                </div>
            </div>
        </hy-overlay>
    </transition>
</template>

<style scoped>
@import './style.css'
</style>
