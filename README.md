# hy-element

Vue3 + TS 高仿 ElementPlus 打造自己的组件库

一款功能全面、易用性强、文档丰富的UI组件库，完美兼容Element Plus，为开发者提供高效的界面构建解决方案。

## 特性

### 🎯 功能覆盖和兼容性
- **广泛兼容**：本组件库能够广泛覆盖Element Plus的所有功能，确保无缝迁移。
- **API一致性**：与Element Plus的API保持高度兼容，提供相同的功能和使用体验。

### ⚡ 易用性和简化开发流程
- **简洁API**：提供简洁明了的API和组件结构，助力开发者快速上手。
- **高效构建**：优化组件设计，减少开发时间和工作量，提升开发效率。
- **多范式兼容**：部分组件支持多种开发范式，满足不同开发者的需求。

### 📚 文档和示例丰富
- **详细文档**：在线文档包含对每个组件的详尽描述，帮助用户深入理解。
- **实用示例**：提供清晰的示例代码和演示，加速用户的学习和应用过程。
- **易于理解**：通过解释和演示，帮助用户掌握组件的用途、属性和事件。

## 🚀 快速开始

### 安装

```bash
# npm
npm install hy-element

# yarn
yarn add hy-element

# pnpm
pnpm add hy-element
```
## 全量引入
```bash
import { createApp } from 'vue'
import App from './App.vue'
import HyElement from 'hy-element'
import 'hy-element/dist/style.css'

const app = createApp(App)
app.use(HyElement)
app.mount('#app')
```
## 按需引入
```bash
import { createApp } from 'vue'
import App from './App.vue'
import { HyButton, HyInput } from 'hy-element'
import 'hy-element/dist/style.css'

const app = createApp(App)
app.component('HyButton', HyButton)
app.component('HyInput', HyInput)
app.mount('#app')
```
## 基础使用
```bash
<template>
  <div>
    <hy-button type="primary" @click="handleClick">
      点击我
    </hy-button>
    
    <hy-input v-model="inputValue" placeholder="请输入内容" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const inputValue = ref('')

const handleClick = () => {
  console.log('按钮被点击了！')
}
</script>
```

