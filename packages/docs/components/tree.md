---
title: Tree
description: Tree 树形组件文档

next:
  link: /components/upload
  text: Upload 上传

prev:
  link: /components/tabs
  text: Tabs 标签页
---

# Tree 树形组件

用于展示层级数据结构，支持递归渲染、图标动画和展开/折叠功能。

## 基础用法

Tree 组件通过递归方式渲染多层级数据结构，每个节点都可以展开或折叠其子节点。

::: preview
demo-preview=../demo/tree/Basic.vue
:::

## 节点点击事件

点击节点时会触发 `node-click` 事件，可以获取当前节点信息。

::: preview
demo-preview=../demo/tree/NodeClick.vue
:::

## 图标旋转动画

展开/折叠节点时，图标会平滑旋转 90 度，提供良好的视觉反馈。

::: preview
demo-preview=../demo/tree/IconAnimation.vue
:::

## 展开/折叠动画

节点展开和折叠时具有平滑的过渡动画效果。

::: preview
demo-preview=../demo/tree/Transition.vue
:::

## Tree API

### Props

| Name | Description | Type | Default |
| ---- | ----------- | ---- | ------- |
| node | 树节点数据对象，必须包含 id 和 label 属性 | `object` | — |

### TreeNode 数据结构

```typescript
interface TreeNode {
  id: string | number
  label: string
  children?: TreeNode[]
  [key: string]: any
}