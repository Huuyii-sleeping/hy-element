<template>
    <div class="demo-no-indicator">
        <h3>隐藏指示器</h3>
        <hy-carousel :indicator="false" height="250px">
            <hy-carousel-item>
                <div class="slide-content" style="background-color: #9b59b6;">
                    <h3>无指示器 1</h3>
                </div>
            </hy-carousel-item>
            <hy-carousel-item>
                <div class="slide-content" style="background-color: #3498db;">
                    <h3>无指示器 2</h3>
                </div>
            </hy-carousel-item>
        </hy-carousel>
    </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.demo-no-indicator {
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