<template>
    <div class="hy-carousel" :class="{ 'hy-carousel--vertical': direction === 'vertical' }"
        @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
        <div class="hy-carousel__container" :style="{ height: height }">
            <div class="hy-carousel__wrapper" :style="wrapperStyle" @transitionend="onTransitionEnd">
                <slot></slot>
            </div>
        </div>

        <!-- 指示器 -->
        <div v-if="props.indicator" class="hy-carousel__indicators"
            :class="`hy-carousel__indicators--${indicatorPosition}`">
            <button v-for="(item, index) in itemCount" :key="index" class="hy-carousel__indicator"
                @click="setActionItem(index)" :class="{ 'is-active': index === activeIndex }">
            </button>
        </div>

        <!-- 箭头 -->
        <template v-if="props.arrow !== 'never'">
            <button class="hy-carousel__arrow hy-carousel__arrow--left" :class="{ 'always': arrow === 'always' }"
                @click="prev"><</button>
            <button class="hy-carousel__arrow hy-carousel__arrow--right" :class="{ 'always': arrow === 'always' }"
                @click="next">></button>
        </template>
    </div>
</template>

<script setup lang="ts">

import { computed, onBeforeUnmount, onMounted, provide, ref, watch } from 'vue';
import type { CarouselEmits, CarouselProps } from './types';

defineOptions({ name: 'hyCarousel', inheritAttrs: false })
const props = withDefaults(defineProps<CarouselProps>(), {
    height: '300px',
    initialIndex: 0,
    autoplay: true,
    interval: 3000,
    indicator: true,
    indicatorPosition: 'outside',
    arrow: 'hover',
    direction: 'horizontal',
    pauseOnHover: true,
    loop: true
})

const emits = defineEmits<CarouselEmits>()

const activeIndex = ref(props.initialIndex)

const itemCount = ref(0)

const timer = ref<number | null>(null)

const isTransitioning = ref(false)

const isHover = ref(false)

provide('carousel', {
    activeIndex,
    itemCount,
    direction: props.direction
})

const wrapperStyle = computed(() => {
    const style: Record<string, string> = {}
    const translateValue = -activeIndex.value * 100
    if (props.direction === 'horizontal') {
        style.transform = `translateX(${translateValue}%)`
    } else {
        style.transform = `translateY(${translateValue}%)`
    }
    return style
})

function setActionItem(index: number) {
    if (index === activeIndex.value || isTransitioning.value) return

    const oldIndex = activeIndex.value
    activeIndex.value = index
    isTransitioning.value = true
    emits('change', index, oldIndex)
}

function prev() {
    if (isTransitioning.value) return
    let newIndex = activeIndex.value - 1
    if (newIndex < 0) {
        newIndex = props.loop ? itemCount.value - 1 : 0
    }
    setActionItem(newIndex)
}

function next() {
    if (isTransitioning.value) return
    let newIndex = activeIndex.value + 1
    if (newIndex >= itemCount.value) {
        newIndex = props.loop ? 0 : itemCount.value - 1
    }
    setActionItem(newIndex)
}

function onTransitionEnd() {
    isTransitioning.value = false
}

function startTimer() {
    if (!props.autoplay || itemCount.value <= 1) return
    stopTimer()
    timer.value = window.setInterval(() => {
        next()
    }, props.interval)
}

function stopTimer() {
    if (timer.value) {
        clearInterval(timer.value)
        timer.value = null
    }
}

function handleMouseEnter() {
    isHover.value = true
    if (!props.pauseOnHover) return
    stopTimer()
}

function handleMouseLeave() {
    isHover.value = false
    if (props.pauseOnHover && props.autoplay) {
        startTimer()
    }
}
defineExpose({
    setActionItem,
    prev,
    next
})

watch(() => props.autoplay, (val) => {
    if (val) startTimer()
    else stopTimer()
})

watch(activeIndex, () => {
    if (props.autoplay) startTimer()
})

onMounted(() => {
    if (props.autoplay) startTimer()
})

onBeforeUnmount(() => {
    stopTimer()
})
</script>

<style>
.hy-carousel {
    position: relative;
    overflow: hidden;
    border-radius: 8px;
}

.hy-carousel__container {
    position: relative;
    width: 100%;
    overflow: hidden;
}

.hy-carousel__wrapper {
    display: flex;
    transition: transform 0.5s ease-in-out;
    height: 100%;
}

.hy-carousel--vertical .hy-carousel__wrapper {
    flex-direction: column;
}

.hy-carousel__indicators {
    position: absolute;
    display: flex;
    gap: 8px;
    z-index: 10;
}

.hy-carousel__indicators--outside {
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
}

.hy-carousel__indicators--inside {
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
}

.hy-carousel__indicator {
    width: 10px;
    height: 10px;
    border: none;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.5);
    cursor: pointer;
    transition: all 0.3s ease;
    padding: 0;
}

.hy-carousel__indicator.is-active {
    background-color: #fff;
    transform: scale(1.2);
}

.hy-carousel__arrow {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 40px;
    height: 40px;
    border: none;
    background-color: rgba(0, 0, 0, 0.3);
    color: white;
    font-size: 18px;
    cursor: pointer;
    border-radius: 50%;
    z-index: 10;
    transition: all 0.3s ease;
    opacity: 0;
    display: flex;
    align-items: center;
    justify-content: center;
}

.hy-carousel__arrow:hover {
    background-color: rgba(0, 0, 0, 0.5);
}

.hy-carousel:hover .hy-carousel__arrow {
    opacity: 1;
}

.hy-carousel__arrow.always {
    opacity: 1;
}

.hy-carousel__arrow--left {
    left: 20px;
}

.hy-carousel__arrow--right {
    right: 20px;
}
</style>