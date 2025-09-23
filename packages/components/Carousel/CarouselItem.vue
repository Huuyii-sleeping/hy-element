<template>
    <div class="hy-carousel__item">
        <slot></slot>
    </div>
</template>

<script setup lang="ts">
import { inject, onBeforeUnmount, onMounted, ref } from 'vue';

defineOptions({
    name: 'hyCarouselItem',
    inheritAttrs: false
})
const carousel = inject('carousel', {
    activeIndex: ref(0),
    itemCount: ref(0),
    direction: 'horizontal'
})

const index = ref(0)

onMounted(() => {
    index.value = carousel.itemCount.value
    carousel.itemCount.value++
})
onBeforeUnmount(() => {
    carousel.itemCount.value--
})
</script>

<style>
.hy-carousel__item {
    flex: 1 0 100%;
    width: 100%;
    height: 100%;
}

.hy-carousel--vertical .hy-carousel__item {
    flex: 1 0 100%;
    height: 100%;
}
</style>