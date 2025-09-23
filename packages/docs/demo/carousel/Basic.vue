<template>
    <div class="demo-basic">
        <h3>基础轮播图</h3>
        <hy-carousel height="300px" @change="handleChange">
            <hy-carousel-item>
                <div class="slide-content" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
                    <h3>第一张幻灯片</h3>
                    <p>美丽的渐变背景</p>
                </div>
            </hy-carousel-item>
            <hy-carousel-item>
                <div class="slide-content" style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);">
                    <h3>第二张幻灯片</h3>
                    <p>粉色系的浪漫风格</p>
                </div>
            </hy-carousel-item>
            <hy-carousel-item>
                <div class="slide-content" style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);">
                    <h3>第三张幻灯片</h3>
                    <p>清新的蓝色调</p>
                </div>
            </hy-carousel-item>
        </hy-carousel>
    </div>
</template>

<script setup lang="ts">
function handleChange(currentIndex: number, oldIndex: number) {
    console.log(`从第${oldIndex + 1}张切换到第${currentIndex + 1}张`)
}
</script>

<style scoped>
.demo-basic {
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
    font-size: 24px;
    margin-bottom: 10px;
}

.slide-content p {
    font-size: 16px;
    opacity: 0.9;
}
</style>