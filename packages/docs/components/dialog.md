---
title: Dialog
description: Dialog 组件文档

next:
  link: /components/loading
  text: Loading 加载

prev:
  link: /components/dropdown
  text: Dropdown 下拉菜单
---

# Dialog 对话框

在保留当前页面状态的情况下，告知用户并承载相关操作。

## 基础用法

Dialog 弹出一个对话框，适合需要用户交互或确认的场景。

通过 `v-model:visible` 控制显示/隐藏。支持标题、内容、底部按钮区域。

::: preview
demo-preview=../demo/dialog/Basic.vue
:::

## 自定义标题和内容

支持通过 `#title` 和默认插槽自定义标题和内容区域。

::: preview
demo-preview=../demo/dialog/Custom.vue
:::

## 可拖拽对话框

设置 `draggable` 属性即可启用拖拽功能（默认开启）。

::: preview
demo-preview=../demo/dialog/Draggable.vue
:::

## 自定义底部按钮

通过 `#footer` 插槽完全自定义底部区域，或使用 `confirmButtonText` / `cancelButtonText` 等 props 简单配置。

::: preview
demo-preview=../demo/dialog/Footer.vue
:::

## 居中显示

设置 `center` 属性让对话框垂直水平居中（默认非居中）。

::: preview
demo-preview=../demo/dialog/Center.vue
:::

## 关闭控制

支持点击遮罩关闭（`showClose`），或完全禁用关闭（需通过按钮控制）。

::: preview
demo-preview=../demo/dialog/CloseControl.vue
:::

## 主题与尺寸

可通过 CSS 变量或 class 自定义样式，组件本身不内置主题切换。

::: preview
demo-preview=../demo/dialog/Themed.vue
:::

## Dialog API

### Props

| Name               | Description                  | Type      | Default         |
| ------------------ | ---------------------------- | --------- | --------------- |
| visible            | 是否显示 Dialog              | `boolean` | `false`         |
| title              | Dialog 标题                  | `string`  | `'default title'` |
| show-close         | 是否显示关闭按钮             | `boolean` | `true`          |
| close-icon         | 关闭图标名称                 | `string`  | `'xmark'`       |
| confirm-button-text| 确认按钮文字                 | `string`  | `'Confirm'`     |
| cancel-button-text | 取消按钮文字                 | `string`  | `'Cancel'`      |
| confirm-button-type| 确认按钮类型                 | `string`  | `'primary'`     |
| cancel-button-type | 取消按钮类型                 | `string`  | `'default'`     |
| center             | 是否垂直水平居中             | `boolean` | `false`         |
| draggable          | 是否可拖拽                   | `boolean` | `true`          |
| top                | Dialog 距离顶部距离（非居中时）| `string`  | `'10px'`        |

### Events

| Name    | Description           | Type                         |
| ------- | --------------------- | ---------------------------- |
| update:visible | Dialog 显示状态更新 | `(visible: boolean) => void` |
| confirm | 点击确认按钮时触发     | `() => void`                 |
| cancel  | 点击取消按钮时触发     | `() => void`                 |
| close   | Dialog 完全关闭后触发  | `() => void`                 |

### Slots

| Name    | Description             |
| ------- | ----------------------- |
| default | Dialog 内容区域         |
| title   | 自定义标题内容          |
| footer  | 自定义底部按钮区域      |

### Expose

| Name         | Description      | Type         |
| ------------ | ---------------- | ------------ |
| toggleVisible| 切换显示/隐藏     | `() => void` |
| open         | 打开 Dialog      | `() => void` |
| close        | 关闭 Dialog      | `() => void` |
