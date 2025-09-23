<template>
  <div class="carousel-demo">
    <h1>Carousel 轮播图组件演示</h1>

    <!-- 基础轮播图 -->
    <div class="demo-section">
      <h2>1. 基础轮播图</h2>
      <hyCarousel height="350px" :autoplay="true" :interval="3000" arrow="hover" @change="handleSlideChange">
        <hyCarouselItem>
          <div class="slide-content" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
            <h3>第一张幻灯片</h3>
            <p>这是一个美丽的渐变背景</p>
          </div>
        </hyCarouselItem>
        <hyCarouselItem>
          <div class="slide-content" style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);">
            <h3>第二张幻灯片</h3>
            <p>粉色系的浪漫风格</p>
          </div>
        </hyCarouselItem>
        <hyCarouselItem>
          <div class="slide-content" style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);">
            <h3>第三张幻灯片</h3>
            <p>清新的蓝色调</p>
          </div>
        </hyCarouselItem>
        <hyCarouselItem>
          <div class="slide-content" style="background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);">
            <h3>第四张幻灯片</h3>
            <p>生机勃勃的绿色</p>
          </div>
        </hyCarouselItem>
      </hyCarousel>
    </div>

    <!-- 手动控制轮播图 -->
    <div class="demo-section">
      <h2>2. 手动控制轮播图</h2>
      <div class="control-panel">
        <button @click="goToPrev" class="control-btn">上一张</button>
        <button @click="goToNext" class="control-btn">下一张</button>
        <button @click="goToSlide(2)" class="control-btn">跳转到第3张</button>
        <button @click="toggleAutoplay" class="control-btn">
          {{ isAutoplay ? '暂停' : '开始' }}自动播放
        </button>
      </div>
      <hyCarousel ref="manualCarousel" height="300px" :autoplay="isAutoplay" :interval="2500" arrow="always"
        indicator-position="inside">
        <hyCarouselItem>
          <div class="slide-content manual-slide" style="background-color: #ff6b6b;">
            <h3>手动控制 1</h3>
          </div>
        </hyCarouselItem>
        <hyCarouselItem>
          <div class="slide-content manual-slide" style="background-color: #4ecdc4;">
            <h3>手动控制 2</h3>
          </div>
        </hyCarouselItem>
        <hyCarouselItem>
          <div class="slide-content manual-slide" style="background-color: #45b7d1;">
            <h3>手动控制 3</h3>
          </div>
        </hyCarouselItem>
        <hyCarouselItem>
          <div class="slide-content manual-slide" style="background-color: #96ceb4;">
            <h3>手动控制 4</h3>
          </div>
        </hyCarouselItem>
      </hyCarousel>
    </div>

    <!-- 垂轮流播图 -->
    <div class="demo-section">
      <h2>3. 垂直轮播图</h2>
      <hyCarousel height="300px" direction="vertical" :autoplay="true" :interval="2000" arrow="always">
        <hyCarouselItem>
          <div class="slide-content vertical-slide" style="background-color: #ffeaa7;">
            <h3>垂直滚动 1</h3>
            <p>从上到下滚动</p>
          </div>
        </hyCarouselItem>
        <hyCarouselItem>
          <div class="slide-content vertical-slide" style="background-color: #dda0dd;">
            <h3>垂直滚动 2</h3>
            <p>流畅的垂直动画</p>
          </div>
        </hyCarouselItem>
        <hyCarouselItem>
          <div class="slide-content vertical-slide" style="background-color: #a8edea;">
            <h3>垂直滚动 3</h3>
            <p>不一样的滚动方向</p>
          </div>
        </hyCarouselItem>
      </hyCarousel>
    </div>

    <!-- 无循环轮播图 -->
    <div class="demo-section">
      <h2>4. 无循环轮播图</h2>
      <hyCarousel height="250px" :loop="false" :autoplay="false" arrow="always">
        <hyCarouselItem>
          <div class="slide-content no-loop-slide" style="background-color: #f1c40f;">
            <h3>非循环 1</h3>
            <p>到达边界后不会循环</p>
          </div>
        </hyCarouselItem>
        <hyCarouselItem>
          <div class="slide-content no-loop-slide" style="background-color: #e67e22;">
            <h3>非循环 2</h3>
            <p>最后一张后停止</p>
          </div>
        </hyCarouselItem>
        <hyCarouselItem>
          <div class="slide-content no-loop-slide" style="background-color: #e74c3c;">
            <h3>非循环 3</h3>
            <p>第一张前停止</p>
          </div>
        </hyCarouselItem>
      </hyCarousel>
    </div>

    <!-- 图片轮播 -->
    <div class="demo-section">
      <h2>5. 图片轮播</h2>
      <hyCarousel height="400px" :autoplay="true" :interval="4000" indicator-position="inside">
        <hyCarouselItem>
          <div class="image-slide">
            <div class="image-placeholder" style="background: linear-gradient(45deg, #ff9a9e, #fecfef);">
              <h3>自然风光 1</h3>
              <p>美丽的山水景色</p>
            </div>
          </div>
        </hyCarouselItem>
        <hyCarouselItem>
          <div class="image-slide">
            <div class="image-placeholder" style="background: linear-gradient(45deg, #a8edea, #fed6e3);">
              <h3>自然风光 2</h3>
              <p>壮观的山脉</p>
            </div>
          </div>
        </hyCarouselItem>
        <hyCarouselItem>
          <div class="image-slide">
            <div class="image-placeholder" style="background: linear-gradient(45deg, #ffecd2, #fcb69f);">
              <h3>自然风光 3</h3>
              <p>宁静的湖泊</p>
            </div>
          </div>
        </hyCarouselItem>
      </hyCarousel>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
// 手动控制相关
const manualCarousel = ref<any>(null)
const isAutoplay = ref(true)

// 方法
function handleSlideChange(currentIndex: number, oldIndex: number) {
  console.log(`幻灯片从第${oldIndex + 1}张切换到第${currentIndex + 1}张`)
}

function goToPrev() {
  if (manualCarousel.value) {
    manualCarousel.value.prev()
  }
}

function goToNext() {
  if (manualCarousel.value) {
    manualCarousel.value.next()
  }
}

function goToSlide(index: number) {
  if (manualCarousel.value) {
    manualCarousel.value.setActiveItem(index)
  }
}

function toggleAutoplay() {
  isAutoplay.value = !isAutoplay.value
}
</script>

<style scoped>
.carousel-demo {
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
  padding: 20px;
  box-sizing: border-box;
}

.slide-content h3 {
  font-size: 28px;
  margin-bottom: 15px;
  font-weight: 600;
}

.slide-content p {
  font-size: 18px;
  max-width: 80%;
  line-height: 1.6;
  opacity: 0.9;
}

.manual-slide h3 {
  font-size: 24px;
}

.vertical-slide {
  flex-direction: row;
}

.vertical-slide h3 {
  margin-right: 20px;
}

.no-loop-slide h3 {
  font-size: 22px;
}

.image-slide {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.image-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
}

.image-placeholder h3 {
  font-size: 26px;
  margin-bottom: 10px;
}

.image-placeholder p {
  font-size: 16px;
  opacity: 0.9;
}

.control-panel {
  margin-bottom: 20px;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.control-btn {
  padding: 10px 20px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s ease;
}

.control-btn:hover {
  background-color: #359c6d;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(66, 185, 131, 0.3);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .carousel-demo {
    padding: 15px;
  }

  .demo-section h2 {
    font-size: 20px;
  }

  .slide-content h3 {
    font-size: 22px;
  }

  .slide-content p {
    font-size: 16px;
  }

  .control-panel {
    flex-direction: column;
  }

  .control-btn {
    width: 100%;
  }
}
</style>