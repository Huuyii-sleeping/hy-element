<template>
    <div class="demo-vertical">
        <h3>垂直轮播</h3>
        <hy-carousel direction="vertical" height="300px" :autoplay="true" :interval="2000">
            <hy-carousel-item>
                <div class="slide-content" style="background-color: #ffeaa7;">
                    <h3>垂直滚动 1</h3>
                    <p>从上到下滚动</p>
                </div>
            </hy-carousel-item>
            <hy-carousel-item>
                <div class="slide-content" style="background-color: #dda0dd;">
                    <h3>垂直滚动 2</h3>
                    <p>流畅的垂直动画</p>
                </div>
            </hy-carousel-item>
            <hy-carousel-item>
                <div class="slide-content" style="background-color: #a8edea;">
                    <h3>垂直滚动 3</h3>
                    <p>不一样的滚动方向</p>
                </div>
            </hy-carousel-item>
        </hy-carousel>
    </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.demo-vertical {
    padding: 20px;
}

.slide-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    color: #333;
    text-align: center;
}

.slide-content h3 {
    font-size: 22px;
    margin-bottom: 10px;
}

.slide-content p {
    font-size: 16px;
}
</style>