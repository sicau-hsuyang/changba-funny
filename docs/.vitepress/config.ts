import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Changba Funny',
  description: 'Changba 日常活动开发SDK',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '主页', link: '/' },
      { text: '埋点', link: '/track' },
      { text: '网络请求', link: '/request' },
      { text: '端内跳转', link: '/goto' },
      { text: 'JS Bridge', link: '/bridge' },
      { text: '其它工具方法', link: '/share' },
    ],

    sidebar: [
      {
        text: '文档列表',
        items: [{ text: 'API List', link: '/api-list' }],
      },
    ],

    socialLinks: [{ icon: 'github', link: 'https://github.com/sicau-hsuyang/changba-funny' }],
  },
})
