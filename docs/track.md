# 活动埋点

唱吧活动埋点有好几套体系，要弄清楚这些埋点的设计没有什么必要，反正只要运营能够正确查找到埋点结果即可，因此，封装了一套通用的埋点体系。

使用这个 SDK 确保已经告知运营前端已经使用统一的埋点体现，因为在追踪元素点击的时候，sdk 内部统一使用`click_element_H5_ktv`这个 key。

埋点 SDK 在发送数据的时候，会自动读取页面的 title 和 url，您无需关心。

## 先决条件

首先需要保证您已正确安装埋点的`SDK`。

```bash
npm i @funny/track -S
```

## 开始使用

### 1、在唱吧 App 中使用

活动曝光埋点

```vue
<script lang="ts" setup>
import { trackPv } from '@funny/track'
import { onMounted } from 'vue'
onMounted(() => {
  // 在页面渲染的时候，将会发送出show_page_H5的埋点事件
  trackPv()
})
</script>
```

元素点击埋点

```vue
<template>
  <button @click="handleClick">我是一个按钮</button>
</template>
<script lang="ts" setup>
import { trackElClick } from '@funny/track'

function trackElClick() {
  // 将会发送出click_element_H5_ktv的埋点事件，并且element_content_ktv的值为`按钮被点击`
  trackElClick('按钮被点击')
}
</script>
```

自由埋点，不使用预设的方法，根据文档埋点（**在唱吧 App 内不推荐**）

```js
import { track } from '@funny/track'

function someHandler() {
  track('xxx_event_type', {
    title: '唱吧11周年快乐',
    url: 'https://changba.com',
    click_element_H5_ktv: '欢庆周年点击',
  })
}
```

### 2、在火星 App 中使用

目前火星 App 尚未形成一个统一的埋点规范，因此在火星业务下埋点使用`track`方法按运营的产品文档开发即可。

如：

```js
import { track } from '@funny/track'

function someHandler() {
  track('xxx_event_type', {
    title: '唱吧11周年快乐',
    url: 'https://changba.com',
    congratulation: '唱吧越来越好',
    click_element_H5_ktv: '欢庆周年点击',
  })
}
```

## API List

```ts
/**
 * 通用埋点方法
 * @param eventType 埋点事件类型
 * @param trackData 埋点数据
 */
export declare const track: (eventType: string, trackData?: Record<string, unknown>) => void

/**
 * 页面曝光埋点统计
 */
export declare function trackPv(): void

/**
 * 元素点击埋点统计
 * @param content 点击的内容
 */
export declare function trackElClick(content: string): void
```
