<template>
    <div class="demo-no-autoplay">
        <h3>禁用自动播放</h3>
        <hy-carousel :autoplay="false" height="250px">
            <hy-carousel-item>
                <div class="slide-content" style="background-color: #42b983;">
                    <h3>手动切换 1</h3>
                </div>
            </hy-carousel-item>
            <hy-carousel-item>
                <div class="slide-content" style="background-color: #ff6b6b;">
                    <h3>手动切换 2</h3>
                </div>
            </hy-carousel-item>
            <hy-carousel-item>
                <div class="slide-content" style="background-color: #4ecdc4;">
                    <h3>手动切换 3</h3>
                </div>
            </hy-carousel-item>
        </hy-carousel>
    </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.demo-no-autoplay {
    padding: 20px;
}

.slide-content {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    color: white;
    font-size: 20px;
}
</style>