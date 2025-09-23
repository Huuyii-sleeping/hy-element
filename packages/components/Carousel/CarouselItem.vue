<!-- CarouselItem.vue -->
<template>
    <div class="carousel-item" :class="{ 'active': isActive, 'prev': isPrev, 'next': isNext }"
        :style="{ transform: transformStyle }">
        <slot></slot>
    </div>
</template>

<script setup>
import { inject, onMounted, onBeforeUnmount, computed, ref } from 'vue'

// 接收props
const props = defineProps({
    name: {
        type: String,
        default: ''
    }
})

// 定义组件名称
defineOptions({
    name: 'CarouselItem'
})

// 注入父组件提供的carousel实例
const carousel = inject('carousel')

// 当前项的索引
const index = ref(0)

// 计算属性
const isActive = computed(() => carousel.activeIndex.value === index.value)

const isPrev = computed(() =>
    carousel.activeIndex.value === index.value - 1 ||
    (carousel.activeIndex.value === 0 && index.value === carousel.items.value.length - 1)
)

const isNext = computed(() =>
    carousel.activeIndex.value === index.value + 1 ||
    (carousel.activeIndex.value === carousel.items.value.length - 1 && index.value === 0)
)

const transformStyle = computed(() => {
    if (isActive.value) return 'translateX(0)'
    if (isPrev.value) return 'translateX(-100%)'
    if (isNext.value) return 'translateX(100%)'
    return 'translateX(0)'
})

// 生命周期
onMounted(() => {
    carousel.addItem({
        index: index.value,
        updateIndex: (newIndex) => { index.value = newIndex }
    })
})

onBeforeUnmount(() => {
    carousel.removeItem(index.value)
})
</script>

<style scoped>
.carousel-item {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transition: transform 0.5s ease-in-out;
    opacity: 0;
}

.carousel-item.active {
    opacity: 1;
    z-index: 2;
}

.carousel-item.prev,
.carousel-item.next {
    opacity: 1;
    z-index: 1;
}
</style>