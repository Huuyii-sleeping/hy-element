<template>
    <transition :name="`hy-notification-${transitionName}`" @after-leave="!visible && onDestory()"
        @enter="boxHeight = notificationRef!.getBoundingClientRect().height">
        <div ref="notificationRef" class="hy-notification" :class="{
            [`hy-notification--${type}`]: type,
            'show-close': showClose,
            [horizontalClass]: true
        }"  :style="cssStyle" v-show="visible" role="alert" @click="onClick" @mouseenter="clearTimer"
            @mouseleave="startTimmer">
            <hy-icon v-if="iconName" :icon="iconName" class="hy-notification__icon"></hy-icon>
            <div class="hy-notification__text">
                <div class="hy-notification__title">{{ title }}</div>
                <div class="hy-notification__content">
                    <slot>
                        <render-vnode v-if="message" :vNode="message"></render-vnode>
                    </slot>
                </div>
            </div>
            <div class="hy-notification__close" v-if="showClose">
                <hy-icon icon="xmark" @click.stop="close"></hy-icon>
            </div>
        </div>
    </transition>
</template>

<script setup lang="ts">
import type { NotificationProps, NotificationComponmentInstance } from './types';
import { computed, onMounted, ref } from 'vue'
import { delay, bind } from 'lodash-es'
import { useEventListener, useOffset } from '@hy-element/hooks'
import { addUnit, RenderVnode, typeIconMap } from '@hy-element/utils'
import hyIcon from '../Icon/Icon.vue'
import { getLastBottomOffset } from './methods';

defineOptions({
    name: 'hyNotification'
})
const props = withDefaults(defineProps<NotificationProps>(), {
    type: 'info',
    duration: 3000,
    position: 'top-right',
    offset: 20,
    transitionName: 'fade',
    showClose: true
})

const visible = ref(false)
const notificationRef = ref<HTMLDivElement>()

const iconName = computed(() => typeIconMap.get(props.type) ?? 'circle-info')

const horizontalClass = computed(() => props.position.endsWith('right') ? 'right' : 'left')
const verticalProperty = computed(() => props.position.startsWith('top') ? 'top' : 'bottom')
// div 的高度
const boxHeight = ref(0)

const { topOffset, bottomOffset } = useOffset({
    getLastBottomOffset: bind(getLastBottomOffset, props),
    offset: props.offset,
    boxHeight,
})
const cssStyle = computed(() => ({
    [verticalProperty.value]: addUnit(topOffset.value),
    zIndex: props.zIndex,
}))

let timer: number
function startTimmer() {
    if (props.duration === 0) return
    timer = delay(close, props.duration)
}

function clearTimer() {
    clearTimeout(timer)
}

function close() {
    visible.value = false
}
onMounted(() => {
    visible.value = true
    startTimmer()
})
useEventListener(document, 'keydown', (e: Event) => {
    const { code } = e as KeyboardEvent
    if (code === 'Escape') {
        close()
    }
})

defineExpose<NotificationComponmentInstance>({
    bottomOffset,
    close,
})
</script>

<style scoped>
@import './style.css'
</style>
