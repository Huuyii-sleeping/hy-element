import { defineConfig } from 'vitepress'
import { containerPreview, componentPreview } from '@vitepress-demo-preview/plugin' 
// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "hy-element",
  description: "ElementPlus",
  base: '/hy-element/',
  appearance: false,
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '开始使用', link: '/get-started' },
      { text: '组件', link: '/component/button' }
    ],
    search: {
      provider: 'local'
    },
    sidebar: [
      {
        text: '指南',
        collapsed: false,
        items: [
          { text: '快速开始', link: '/get-started' },
        ]
      },
      {
        text: '基础组件',
        collapsed: false,
        items: [{ text: 'Button 按钮', link: 'components/button' }]
      }
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/Huuyii-sleeping/hy-element' }
    ]
  },
  markdown: {
    config:(md) => {
      md.use(containerPreview)
      md.use(componentPreview)
    },
  }
})
