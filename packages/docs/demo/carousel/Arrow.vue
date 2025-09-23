<template>
    <div class="demo-arrow">
        <h3>箭头始终显示</h3>
        <hy-carousel arrow="always" height="250px" :autoplay="false">
            <hy-carousel-item>
                <div class="slide-content" style="background-color: #1abc9c;">
                    <h3>箭头始终显示 1</h3>
                </div>
            </hy-carousel-item>
            <hy-carousel-item>
                <div class="slide-content" style="background-color: #2ecc71;">
                    <h3>箭头始终显示 2</h3>
                </div>
            </hy-carousel-item>
            <hy-carousel-item>
                <div class="slide-content" style="background-color: #3498db;">
                    <h3>箭头始终显示 3</h3>
                </div>
            </hy-carousel-item>
        </hy-carousel>
    </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.demo-arrow {
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