---
title: Carousel
description: Carousel 轮播图组件文档

next:
  link: /components/pagination
  text: Pagination 分页

prev:
  link: /components/table
  text: Table 表格
---

# Carousel 轮播图

用于循环播放一组图片或内容区域，支持自动播放、手动切换、指示器等多种功能。

## 基础用法

基础的轮播图用法，包含自动播放、指示器和箭头按钮。

::: preview
demo-preview=../demo/carousel/Basic.vue
:::

## 禁用自动播放

通过设置 `autoplay` 属性为 `false` 来禁用自动播放功能。

::: preview
demo-preview=../demo/carousel/NoAutoplay.vue
:::

## 垂轮播

通过设置 `direction` 属性为 `vertical` 来实现垂直轮播。

::: preview
demo-preview=../demo/carousel/Vertical.vue
:::

## 自定义高度

通过 `height` 属性设置轮播图的高度。

::: preview
demo-preview=../demo/carousel/CustomHeight.vue
:::

## 隐藏指示器

通过设置 `indicator` 属性为 `false` 来隐藏指示器。

::: preview
demo-preview=../demo/carousel/NoIndicator.vue
:::

## 箭头显示方式

通过 `arrow` 属性控制箭头的显示方式：`always` | `hover` | `never`。

::: preview
demo-preview=../demo/carousel/Arrow.vue
:::

## 禁用循环

通过设置 `loop` 属性为 `false` 来禁用循环播放。

::: preview
demo-preview=../demo/carousel/NoLoop.vue
:::

## Carousel API

### Props

| Name              | Description    | Type                                        | Default   |
| ----------------- | -------------- | ------------------------------------------- | --------- |
| height            | 轮播图高度     | `string`                                    | `'300px'` |
| initialIndex      | 初始索引       | `number`                                    | `0`       |
| autoplay          | 是否自动播放   | `boolean`                                   | `true`    |
| interval          | 自动播放间隔   | `number`                                    | `3000`    |
| indicator         | 是否显示指示器 | `boolean`                                   | `true`    |
| indicatorPosition | 指示器位置     | `enum` - `'outside' \| 'inside'`            | `'outside'`|
| arrow             | 箭头显示方式   | `enum` - `'always' \| 'hover' \| 'never'`   | `'hover'` |
| direction         | 轮播方向       | `enum` - `'horizontal' \| 'vertical'`       | `'horizontal'`|
| pauseOnHover      | 悬停时暂停     | `boolean`                                   | `true`    |
| loop              | 是否循环播放   | `boolean`                                   | `true`    |

### Events

| Name   | Description           | Type                                    |
| ------ | --------------------- | --------------------------------------- |
| change | 轮播图切换时触发      | `(currentIndex: number, oldIndex: number) => void` |

### Slots

| Name    | Description          |
| ------- | -------------------- |
| default | 轮播项内容插槽       |

### Expose

| Name         | Description | Type                    |
| ------------ | ----------- | ----------------------- |
| setActionItem| 设置活动项  | `(index: number) => void`|
| prev         | 上一项      | `() => void`            |
| next         | 下一项      | `() => void`            |

### CarouselItem Props

| Name | Description | Type     | Default |
| ---- | ----------- | -------- | ------- |
| —    | —           | —        | —       |

### CarouselItem Slots

| Name    | Description          |
| ------- | -------------------- |
| default | 轮播项内容           |