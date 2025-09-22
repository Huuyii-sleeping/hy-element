---
title: Card
description: Card 组件文档

prev:
  link: components/button
  text: Button 按钮

next:
  link: components/form
  text: Form 表单
---

# Card 卡片

Card 组件用于展示信息块，通常包含头部、内容和底部三个部分。

## 基本用法

最基础的卡片包括头部、内容和底部三个部分。可以通过具名插槽来定义各个部分的内容。

::: preview
demo-preview=../demo/card/Basic.vue
:::

## 简洁卡片

不包含头部和底部的简洁卡片。

::: preview
demo-preview=../demo/card/Simple.vue
:::

## 阴影效果

通过 `shadow` 属性可以控制卡片的阴影效果。

::: preview
demo-preview=../demo/card/Shadow.vue
:::

## Card API

### Props

| Name   | Description | Type                    | Default  |
| ------ | ----------- | ----------------------- | -------- |
| header | 卡片头部    | `string`                | -        |
| footer | 卡片底部    | `string`                | -        |
| shadow | 阴影效果    | `enum` - `'always' \| 'hover' \| 'never'` | `always` |

### Slots

| Name    | Description | Sub Component |
| ------- | ----------- | ------------- |
| default | 内容插槽    | -             |
| header  | 头部插槽    | -             |
| footer  | 底部插槽    | -             |

### Events

| Name | Description | Type |
| ---- | ----------- | ---- |
| -    | -           | -    |

### Expose

| Name | Description | Type |
| ---- | ----------- | ---- |
| -    | -           | -    |