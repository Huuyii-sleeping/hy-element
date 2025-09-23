<!-- Carousel.vue -->
<template>
    <div class="carousel" :class="{ 'carousel-fade': fade }" @mouseenter="pause" @mouseleave="play">
        <div class="carousel-wrapper" :style="{ height: height }">
            <slot></slot>

            <!-- 指示器 -->
            <div class="carousel-indicators" v-if="indicators">
                <span v-for="(item, index) in items" :key="index" class="indicator"
                    :class="{ 'active': index === activeIndex }" @click="setActiveItem(index)"></span>
            </div>

            <!-- 切换按钮 -->
            <template v-if="arrow !== 'never'">
                <button class="carousel-arrow carousel-arrow-left" :class="{ 'always': arrow === 'always' }"
                    @click="prev">
                    < </button>
                        <button class="carousel-arrow carousel-arrow-right" :class="{ 'always': arrow === 'always' }"
                            @click="next">
                            >
                        </button>
            </template>
        </div>
    </div>
</template>

<script setup>
import {
    ref,
    provide,
    watch,
    onMounted,
    onBeforeUnmount,
    computed
} from 'vue'

// 定义组件名称
defineOptions({
    name: 'Carousel'
})

// 定义props
const props = defineProps({
    height: {
        type: String,
        default: '300px'
    },
    initialIndex: {
        type: Number,
        default: 0
    },
    trigger: {
        type: String,
        default: 'hover',
        validator: value => ['click', 'hover'].includes(value)
    },
    autoplay: {
        type: Boolean,
        default: true
    },
    interval: {
        type: Number,
        default: 3000
    },
    indicators: {
        type: Boolean,
        default: true
    },
    arrow: {
        type: String,
        default: 'hover',
        validator: value => ['always', 'hover', 'never'].includes(value)
    },
    fade: {
        type: Boolean,
        default: false
    }
})

// 定义emits
const emit = defineEmits(['change', 'active-change'])

// 响应式数据
const items = ref([])
const activeIndex = ref(props.initialIndex)
const timer = ref(null)
const isHover = ref(false)

// 提供给子组件的数据
provide('carousel', {
    items,
    activeIndex,
    addItem,
    removeItem
})

// 方法定义
function addItem(item) {
    items.value.push(item)
}

function removeItem(index) {
    const itemIndex = items.value.findIndex((_, i) => i === index)
    if (itemIndex !== -1) {
        items.value.splice(itemIndex, 1)
    }
}

function setActiveItem(index) {
    if (index === activeIndex.value) return
    const oldIndex = activeIndex.value
    activeIndex.value = index
    emit('change', index, oldIndex)
    emit('active-change', index)
}

function prev() {
    if (items.value.length <= 1) return
    const newIndex = activeIndex.value === 0
        ? items.value.length - 1
        : activeIndex.value - 1
    setActiveItem(newIndex)
}

function next() {
    if (items.value.length <= 1) return
    const newIndex = activeIndex.value === items.value.length - 1
        ? 0
        : activeIndex.value + 1
    setActiveItem(newIndex)
}

function play() {
    if (!props.autoplay || items.value.length <= 1) return
    pause()
    timer.value = setInterval(() => {
        next()
    }, props.interval)
}

function pause() {
    if (timer.value) {
        clearInterval(timer.value)
        timer.value = null
    }
}

// 监听器
watch(activeIndex, (newIndex, oldIndex) => {
    emit('change', newIndex, oldIndex)
})

watch(() => props.autoplay, (val) => {
    if (val) {
        play()
    } else {
        pause()
    }
}, { immediate: true })

// 生命周期
onMounted(() => {
    if (props.autoplay) {
        play()
    }
})

onBeforeUnmount(() => {
    pause()
})
</script>

<style scoped>
.carousel {
    position: relative;
    overflow: hidden;
}

.carousel-wrapper {
    position: relative;
    width: 100%;
}

.carousel-indicators {
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 8px;
    z-index: 10;
}

.indicator {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.5);
    cursor: pointer;
    transition: all 0.3s ease;
}

.indicator.active {
    background-color: #fff;
    transform: scale(1.2);
}

.carousel-arrow {
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
}

.carousel-arrow:hover {
    background-color: rgba(0, 0, 0, 0.5);
}

.carousel:hover .carousel-arrow {
    opacity: 1;
}

.carousel-arrow.always {
    opacity: 1;
}

.carousel-arrow-left {
    left: 20px;
}

.carousel-arrow-right {
    right: 20px;
}

/* 淡入淡出效果 */
.carousel-fade .carousel-item {
    transition: opacity 0.5s ease-in-out;
    transform: none !important;
}

.carousel-fade .carousel-item.active {
    opacity: 1;
}

.carousel-fade .carousel-item.prev,
.carousel-fade .carousel-item.next {
    opacity: 0;
}
</style>