<!-- App.vue -->
<template>
    <div id="app">
        <h1>Vue 3 Carousel Demo</h1>

        <!-- 基础轮播图 -->
        <div class="demo-section">
            <h2>基础轮播图</h2>
            <Carousel height="350px" :autoplay="true" :interval="3000" arrow="hover" indicators @change="onSlideChange">
                <CarouselItem v-for="(slide, index) in slides" :key="index">
                    <div class="slide-content" :style="{ backgroundColor: slide.color }">
                        <h3>{{ slide.title }}</h3>
                        <p>{{ slide.description }}</p>
                    </div>
                </CarouselItem>
            </Carousel>
        </div>

        <!-- 图片轮播 -->
        <div class="demo-section">
            <h2>图片轮播</h2>
            <Carousel height="400px" :autoplay="true" :interval="4000" arrow="always" indicators>
                <CarouselItem>
                    <div class="image-slide" style="background: linear-gradient(45deg, #ff9a9e, #fecfef);">
                        <h3>Beautiful Nature 1</h3>
                    </div>
                </CarouselItem>
                <CarouselItem>
                    <div class="image-slide" style="background: linear-gradient(45deg, #a8edea, #fed6e3);">
                        <h3>Beautiful Nature 2</h3>
                    </div>
                </CarouselItem>
                <CarouselItem>
                    <div class="image-slide" style="background: linear-gradient(45deg, #ffecd2, #fcb69f);">
                        <h3>Beautiful Nature 3</h3>
                    </div>
                </CarouselItem>
                <CarouselItem>
                    <div class="image-slide" style="background: linear-gradient(45deg, #a8c8ec, #7fcdff);">
                        <h3>Beautiful Nature 4</h3>
                    </div>
                </CarouselItem>
            </Carousel>
        </div>

        <!-- 淡入淡出效果 -->
        <div class="demo-section">
            <h2>淡入淡出效果</h2>
            <Carousel height="300px" :fade="true" :autoplay="true" :interval="2500" arrow="hover">
                <CarouselItem>
                    <div class="fade-slide" style="background-color: #ff6b6b;">
                        <h3>Fade Effect 1</h3>
                    </div>
                </CarouselItem>
                <CarouselItem>
                    <div class="fade-slide" style="background-color: #4ecdc4;">
                        <h3>Fade Effect 2</h3>
                    </div>
                </CarouselItem>
                <CarouselItem>
                    <div class="fade-slide" style="background-color: #45b7d1;">
                        <h3>Fade Effect 3</h3>
                    </div>
                </CarouselItem>
            </Carousel>
        </div>

        <!-- 手动控制 -->
        <div class="demo-section">
            <h2>手动控制轮播</h2>
            <div class="control-panel">
                <button @click="prevSlide">上一张</button>
                <button @click="nextSlide">下一张</button>
                <button @click="toggleAutoplay">
                    {{ isAutoplay ? '暂停' : '开始' }}自动播放
                </button>
            </div>
            <Carousel ref="manualCarousel" height="250px" :autoplay="isAutoplay" :interval="2000" arrow="never"
                indicators>
                <CarouselItem v-for="(color, index) in colors" :key="index">
                    <div class="manual-slide" :style="{ backgroundColor: color }">
                        <h3>Manual Control {{ index + 1 }}</h3>
                    </div>
                </CarouselItem>
            </Carousel>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import Carousel from 'hy-element'
import CarouselItem from 'hy-element'

// 数据
const slides = ref([
    {
        title: '欢迎使用轮播图组件',
        description: '这是一个功能强大的Vue 3轮播图组件',
        color: '#42b983'
    },
    {
        title: '多种切换效果',
        description: '支持滑动和淡入淡出两种切换效果',
        color: '#ff6b6b'
    },
    {
        title: '丰富的配置选项',
        description: '可自定义高度、自动播放、指示器等',
        color: '#4ecdc4'
    },
    {
        title: '响应式设计',
        description: '适配各种屏幕尺寸，用户体验优秀',
        color: '#45b7d1'
    }
])

const colors = ref(['#96ceb4', '#ffeaa7', '#dda0dd', '#f1c40f', '#e17055'])

const isAutoplay = ref(true)
const manualCarousel = ref(null)

// 方法
function onSlideChange(newIndex, oldIndex) {
    console.log(`从第${oldIndex + 1}张切换到第${newIndex + 1}张`)
}

function prevSlide() {
    if (manualCarousel.value) {
        manualCarousel.value.prev()
    }
}

function nextSlide() {
    if (manualCarousel.value) {
        manualCarousel.value.next()
    }
}

function toggleAutoplay() {
    isAutoplay.value = !isAutoplay.value
}
</script>

<style>
#app {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    font-family: 'Arial', sans-serif;
}

.demo-section {
    margin-bottom: 40px;
}

.demo-section h2 {
    color: #333;
    margin-bottom: 20px;
    border-bottom: 2px solid #eee;
    padding-bottom: 10px;
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
    font-size: 28px;
    margin-bottom: 15px;
}

.slide-content p {
    font-size: 18px;
    max-width: 80%;
    line-height: 1.6;
}

.image-slide {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    color: white;
    font-size: 24px;
    font-weight: bold;
}

.fade-slide {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    color: white;
    font-size: 24px;
}

.manual-slide {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    color: white;
    font-size: 20px;
}

.control-panel {
    margin-bottom: 20px;
    text-align: center;
}

.control-panel button {
    margin: 0 10px;
    padding: 10px 20px;
    background-color: #42b983;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 14px;
    transition: background-color 0.3s;
}

.control-panel button:hover {
    background-color: #359c6d;
}
</style>