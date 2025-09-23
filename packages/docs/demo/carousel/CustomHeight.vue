<template>
    <div class="demo-height">
        <h3>自定义高度</h3>
        <hy-carousel height="200px" :autoplay="true">
            <hy-carousel-item>
                <div class="slide-content" style="background-color: #f1c40f;">
                    <h3>200px高度</h3>
                </div>
            </hy-carousel-item>
            <hy-carousel-item>
                <div class="slide-content" style="background-color: #e67e22;">
                    <h3>200px高度</h3>
                </div>
            </hy-carousel-item>
            <hy-carousel-item>
                <div class="slide-content" style="background-color: #e74c3c;">
                    <h3>200px高度</h3>
                </div>
            </hy-carousel-item>
        </hy-carousel>
    </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.demo-height {
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