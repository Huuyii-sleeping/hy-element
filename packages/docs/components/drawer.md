---
title: Drawer
description: Drawer 组件文档

next:
  link: /components/loading
  text: Loading 加载

prev:
  link: /components/dropdown
  text: Dropdown 下拉菜单
---

# Drawer 抽屉

抽屉从屏幕边缘滑入，用于承载复杂操作或展示额外内容，不影响当前页面主体。

## 基础用法

通过 `v-model` 控制显示状态。默认从右侧滑入。

::: preview
demo-preview=../demo/drawer/Basic.vue
:::

## 不同方向

通过 `direction` 属性设置抽屉弹出方向：`left-to-right`、`right-to-left`（默认）、`top-to-bottom`、`bottom-to-top`。

::: preview
demo-preview=../demo/drawer/Direction.vue
:::

## 自定义标题和内容

支持通过 `#title` 和默认插槽自定义标题和内容区域。

::: preview
demo-preview=../demo/drawer/Custom.vue
:::

## 自定义底部区域

通过 `#footer` 插槽自定义底部操作按钮。

::: preview
demo-preview=../demo/drawer/Footer.vue
:::

## 禁用关闭按钮

设置 `:show-close="false"` 可隐藏右上角关闭按钮。

::: preview
demo-preview=../demo/drawer/NoCloseBtn.vue
:::

## 自定义尺寸

通过 `size` 属性设置抽屉宽度（左右方向）或高度（上下方向），支持 `px` / `%`。

::: preview
demo-preview=../demo/drawer/Size.vue
:::

## Drawer API

### Props

| Name          | Description              | Type                                                                 | Default       |
| ------------- | ------------------------ | -------------------------------------------------------------------- | ------------- |
| modelValue    | 是否显示抽屉             | `boolean`                                                            | `false`       |
| title         | 抽屉标题                 | `string`                                                             | —             |
| direction     | 弹出方向                 | `enum` - `'left-to-right'\|'right-to-left'\|'top-to-bottom'\|'bottom-to-top'` | `right-to-left` |
| size          | 抽屉尺寸（宽/高）        | `string`                                                             | `360px`       |
| show-close    | 是否显示关闭按钮         | `boolean`                                                            | `true`        |
| mask-closable | 是否允许点击遮罩关闭     | `boolean`                                                            | `true`        |

### Events

| Name             | Description             | Type                     |
| ---------------- | ----------------------- | ------------------------ |
| update:modelValue| 抽屉显示状态更新        | `(value: boolean) => void` |
| close            | 抽屉关闭时触发          | `() => void`             |

### Slots

| Name    | Description             |
| ------- | ----------------------- |
| default | 抽屉内容区域            |
| title   | 自定义标题内容          |
| footer  | 自定义底部操作区域      |

### Expose

| Name  | Description | Type         |
| ----- | ----------- | ------------ |
| open  | 打开抽屉    | `() => void` |
| close | 关闭抽屉    | `() => void` |