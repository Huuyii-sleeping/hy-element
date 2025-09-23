---
title: Table
description: Table 表格组件文档

next:
  link: /components/pagination
  text: Pagination 分页

prev:
  link: /components/tabs
  text: Tabs 标签页
---

# Table 表格

用于展示多条结构类似的数据，可对数据进行排序、筛选、对比或其他自定义操作。

## 基础用法

基础的表格展示用法。

::: preview
demo-preview=../demo/table/Basic.vue
:::

## 带边框表格

添加 `border` 属性即可展示边框表格。

::: preview
demo-preview=../demo/table/Border.vue
:::

## 斑马纹表格

添加 `stripe` 属性可以创建斑马纹表格，使表格更具可读性。

::: preview
demo-preview=../demo/table/Stripe.vue
:::

## 自定义列宽

通过设置 TableColumn 的 `width` 或 `min-width` 属性来定义列宽。

::: preview
demo-preview=../demo/table/ColumnWidth.vue
:::

## 对齐方式

通过设置 TableColumn 的 `align` 属性来定义列内容的对齐方式。

::: preview
demo-preview=../demo/table/Align.vue
:::

## 隐藏表头

通过设置 `show-header` 属性为 `false` 可以隐藏表