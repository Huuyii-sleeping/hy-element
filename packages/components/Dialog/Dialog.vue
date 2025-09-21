<!-- Dialog.vue -->
<script setup lang="ts">
import { computed, ref, onUnmounted, onMounted } from 'vue'
import type { DialogEmits, DialogProps } from './types'
import { useZindex } from '@hy-element/hooks'
import hyIcon from '../Icon/Icon.vue'
import hyOverlay from '../Overlay/Overlay.vue'

defineOptions({
    name: 'hyDialog',
    inheritAttrs: false,
})

const props = withDefaults(defineProps<DialogProps>(), {
    title: 'default title',
    showClose: true,
    closeIcon: 'xmark',
    top: '10px'
})

const dialogRef = ref<HTMLElement>()

const headerRef = ref<HTMLElement>()

const emits = defineEmits<DialogEmits>()

const slots = defineSlots()

const { nextZindex } = useZindex()

const visible = computed({
    get: () => props.visible,
    set: (val) => emits('update:visible', val)
})

function toggleVisible() {
    visible.value = !visible.value
}

function handleWrapperClick() {
    if (!props.showClose) return
    toggleVisible()
}

function destory() {
    console.log('对话框已销毁')
}

const position = ref({ x: 0, y: 0 })
const isDragging = ref(false)
const startX = ref(0) // 鼠标按下时的 clientX
const startY = ref(0) // 鼠标按下时的 clientY

function onMouseDown(e: MouseEvent) {
    if (!props.draggable) return

    isDragging.value = true
    startX.value = e.clientX
    startY.value = e.clientY

    e.preventDefault()
}

function onMouseMove(e: MouseEvent) {
    if (!isDragging.value) return

    // 计算鼠标移动的距离
    const deltaX = e.clientX - startX.value
    const deltaY = e.clientY - startY.value

    // 累加到当前位置
    position.value = {
        x: position.value.x + deltaX,
        y: position.value.y + deltaY
    }

    // 更新起始点（关键！）
    startX.value = e.clientX
    startY.value = e.clientY
}

function onMouseUp() {
    isDragging.value = false
}

onMounted(() => {
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)
})

onUnmounted(() => {
    window.removeEventListener('mousemove', onMouseMove)
    window.removeEventListener('mouseup', onMouseUp)
})

</script>

<template>
    <transition name="fade-in-linear" @after-leave="destory()">
        <hy-overlay v-show="visible" :z-index="nextZindex()" mask>
            <div class="hy-overlay-dialog" :style="{
                position: 'fixed',
                top: 0,
                left: 0,
                transform: `translate(${position.x}px, ${position.y}px)`,
                cursor: isDragging ? 'grabbing' : 'grab'
            }" @click="handleWrapperClick">
                <div ref="dialogRef" :class="['hy-dialog', { 'is-center': props.center }]">
                    <div ref="headerRef" class="hy-dialog__header" @mousedown="onMouseDown"
                        :style="{ cursor: isDragging ? 'grabbing' : 'grab' }">
                        <div v-if="slots.title" class="hy-dialog__title">
                            <slot name="title"></slot>
                        </div>
                        <div v-else class="hy-dialog__title">
                            {{ props.title }}
                        </div>
                        <hy-button v-if="props.showClose" class="hy-dialog__header-btn" @click.prevent="toggleVisible">
                            <hy-icon :icon="props.closeIcon" class="hy-dialog__header-icon"></hy-icon>
                        </hy-button>
                    </div>
                    <div ref="contentRef" class="hy-dialog__content">
                        <slot name="default"></slot>
                    </div>
                    <div ref="footerRef" class="hy-dialog__footer">
                        <div v-if="slots.footer">
                            <slot name="footer"></slot>
                        </div>
                    </div>
                </div>
            </div>
        </hy-overlay>
    </transition>
</template>

<style scoped>
@import './style.css';
</style>