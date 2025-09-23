<template>
    <div class="demo-no-loop">
        <h3>禁用循环</h3>
        <hy-carousel :loop="false" height="250px" :autoplay="false">
            <hy-carousel-item>
                <div class="slide-content" style="background-color: #e74c3c;">
                    <h3>非循环 1</h3>
                    <p>到达边界后不会循环</p>
                </div>
            </hy-carousel-item>
            <hy-carousel-item>
                <div class="slide-content" style="background-color: #f39c12;">
                    <h3>非循环 2</h3>
                    <p>最后一张后停止</p>
                </div>
            </hy-carousel-item>
            <hy-carousel-item>
                <div class="slide-content" style="background-color: #27ae60;">
                    <h3>非循环 3</h3>
                    <p>第一张前停止</p>
                </div>
            </hy-carousel-item>
        </hy-carousel>
    </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.demo-no-loop {
    padding: 20px;
}

.slide-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    color: white;
    text-align: center;
}

.slide-content h3 {
    font-size: 20px;
    margin-bottom: 10px;
}

.slide-content p {
    font-size: 14px;
    opacity: 0.9;
}
</style>