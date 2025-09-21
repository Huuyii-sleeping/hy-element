---
title: Link
description: Link 组件文档

next:
  link: /components/loading
  text: Loading 加载

prev:
  link: /components/dropdown
  text: Dropdown 下拉菜单
---

# Link 链接

用于导航跳转或执行操作的文本链接。

## 基础用法

基础的链接用法，支持 `href` 属性。

::: preview
demo-preview=../demo/link/Basic.vue
:::

## 不同类型

Link 组件提供多种类型：`default`、`primary`、`success`、`warning`、`danger`、`info`。

::: preview
demo-preview=../demo/link/Type.vue
:::

## 禁用状态

通过 `disabled` 属性设置链接为禁用状态。

::: preview
demo-preview=../demo/link/Disabled.vue
:::

## 跳转目标

通过 `target` 属性设置链接打开方式，如 `_blank` 在新窗口打开。

::: preview
demo-preview=../demo/link/Target.vue
:::

## 自定义内容

支持通过默认插槽自定义链接内容。

::: preview
demo-preview=../demo/link/Custom.vue
:::

## Link API

### Props

| Name     | Description          | Type                                                                 | Default  |
| -------- | -------------------- | -------------------------------------------------------------------- | -------- |
| href     | 链接地址             | `string`                                                             | —        |
| type     | 链接类型             | `enum` - `'default'\|'primary'\|'success'\|'warning'\|'danger'\|'info'` | default  |
| target   | 链接打开方式         | `string`                                                             | `_self`  |
| disabled | 是否禁用             | `boolean`                                                            | `false`  |

### Events

| Name  | Description       | Type                     |
| ----- | ----------------- | ------------------------ |
| click | 点击链接时触发    | `(event: MouseEvent) => void` |

### Slots

| Name    | Description     |
| ------- | --------------- |
| default | 链接显示内容    |