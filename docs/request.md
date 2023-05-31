# 网络请求

`@funny/request`是封装自`axios`的一个库，使用之前请确保您的项目已经安装`axios`。它抹平了唱吧 App 和火星 App 下一些历史遗留问题的差异，比如火星活动运行在唱吧 App 中需要加`7亿`的问题，提供了统一的封装用于展示请求的 Loading 层，您在业务侧调用时无需再关心此类问题。

`@funny/request`不依赖 vue 的版本，您可以在 vue2 或 vue3 的项目中使用。

`@funny/request`处理了`Mock`，兼容唱吧的`yapi`接口。

## 先决条件

```bash
npm i @funny/request -S
```

## 开始使用

`@funny/request` 提供了一些 API 简化请求调用，`request`方法就是`axios`的实例，`get`方法表示以`GET`方式发送数据，也是最常见的方式。

`post`方法表示以`POST`方式发送数据，`put`方法表示以`PUT`方式发送数据，`delete`方法表示以`DELETE`方式发送数据。

### 1、基本使用

基本使用，`@funny/request`会在合适的时间开启`loading`和关闭`loading`，`loading` 的内容为"加载中..."

```js
import { get } from '@funny/request'

export function getAppInfo() {
  return get('/api/baofang/anniversary11_team/index')
}
```

### 2、传递数据

```js
import { get } from '@funny/request'

export function getAppInfo() {
  return get({
    url: '/api/baofang/anniversary11_team/index',
    data: {
      name: 'ChangbaFE',
      age: 11,
    },
  })
}
```

### 3、关闭自动拼接参数防止 GET 请求缓存

对于`GET`请求，每次发送都会拼一个时间戳的参数，如果您不想它自动给你拼接上这个参数，可以使用 cache 配置关闭

```js
import { get } from '@funny/request'

export function getAppInfo() {
  return get({
    url: '/api/baofang/anniversary11_team/index',
    cache: false,
  })
}
```

### 4、设置 baseURL

对于一些活动，其有着相同的`URL`前缀，您可以提前设置`baseURL`，后续简化方法调用时的 url 字符串。

```js
import { get, setBaseURL } from '@funny/request'

const baseURL = '/api/baofang/anniversary11_team'
// 提前设置baseURL前缀
setBaseURL(baseURL)

export function getAppInfo() {
  return get('/index')
}
// 等价于
/*
export function getAppInfo() {
  return get('/api/baofang/anniversary11_team/index')
}
*/
```

### 5、对于某些接口不应用 baseURL

对于一些接口，您虽然设置了`baseURL`，但是您又不想它自动给你拼接`baseURL`，因此，您可以配置`ignoreBaseURL`关闭它。

```js
/**
 * 获取榜单信息
 */
export function getRankList(rankId) {
  return get({
    url: `/api/automan/rank/getRankList`,
    ignoreBaseURL: true,
    data: {
      rankId,
    },
  })
}
```

### 6、不展示 Loading 层

有些接口，您不想使用默认的`loading`层，您可以手动的关闭它。

```js
import { get } from '@funny/request'

export function getAppInfo() {
  return get({
    url: '/index',
    showLoading: false,
  })
}
```

### 7、修改 Loading 层的配置

有些场景下，您需要`loading`层，但是又不希望它展示位默认文字`加载中...`，您可以手动指定`Loading`的配置。

```js
import { get, post } from '@funny/request'

export function getAppInfo() {
  return get({
    url: '/index',
    loadingConfig: '唱吧11周年快乐呀...',
  })
}

// 或者

export function drawLottery(giftId) {
  return post({
    url: '/draw',
    data: {
      giftId,
    },
    loadingConfig: {
      message: '唱吧11周年快乐呀...',
      // 最多10S之后 即便请求没有完成，Loading也会关闭
      duration: 10000,
    },
  })
}
```

### 8、使用 POST 或 PUT 方式向后端发送数据

`POST` 方式或 `PUT` 方式的 data 参数支持 FormData，不会在底层被处理。

配置`json`为 true 可以使用`application/json`的形式发送数据。

```js
import { post } from '@funny/request'

// 以application/json的形式发送数据给后端
export function unlockSeat() {
  return post({
    url: '/index',
    data: {
      a: 1,
      b: 2,
      c: 3,
    },
    json: true,
  })
}
```

### 9、文件上传

```js
import { post } from '@funny/request'

const formData = new FormData()

export function unlockSeat() {
  return post({
    url: '/index',
    data: formData,
    upload: true,
    // 上传的回调函数
    onUploadPercent(percentage, event) {
      console.log(percentage, event)
    },
  })
}
```

## API List

以下内部预设的一些类型：

请求响应接口类型定义

```ts
/**
 * 请求响应
 */
export interface ChangbaResponse<T> {
  /**
   * 响应码
   */
  code: number
  /**
   * 响应信息
   */
  msg: string
  /**
   * 响应数据
   */
  data: T | unknown
}
```

基本的请求类型定义：

```ts
export interface LoadingConfig {
  /**
   * loading动画展示的时长
   */
  duration: number
  /**
   * loading加载时展示的 文字
   */
  message: string
}

interface HttpBaseConfig {
  /**
   * 请求地址
   */
  url: string
  /**
   * HTTP请求需要发送给后端的数据
   */
  data?: {
    [prop: string]: any
  }
  /**
   * 是否显示loading加载层， 默认true
   */
  showLoading?: boolean
  /**
   * 显示loading加载层的时候的配置，传文本则为加载的文字
   */
  loadingConfig?: string | LoadingConfig
  /**
   * 是否忽略baseURL，默认false
   */
  ignoreBaseURL?: boolean
}

export interface ChangbaGetConfig extends HttpBaseConfig {
  /* 是否缓存请求 */
  cache?: boolean
}

export interface ChangbaPostConfig extends HttpBaseConfig {
  /* 是否使用application/json的形式发送给后端 */
  json?: boolean
  /**
   * 是否是上传
   */
  upload?: boolean
  /**
   * 上传的回调函数
   */
  onUploadPercent?: (percentage: number, event: ProgressEvent) => void
}
```

请求配置接口类型定义：

```ts
export interface ChangbaRequestConfig {
  /**
   * 是否配置上传
   */
  upload?: boolean
  /**
   * 上传的回调函数
   */
  onUploadPercent?: (percentage: number, event: ProgressEvent) => void
  /**
   * 是否以ContentType: application/json的形式发送数据
   */
  json?: boolean
  /**
   * 是否允许缓存，该配置针对GET请求有效
   */
  cache?: boolean
  /**
   * 是否忽略baseURL，默认false
   */
  ignoreBaseURL?: boolean
  /**
   * 是否显示loading加载层， 默认true
   */
  showLoading?: boolean
  /**
   * 显示loading加载层的时候的配置，传文本则为加载的文字
   */
  loadingConfig?: string | LoadingConfig
}
```

`@funny/request`暴露的方法如下：

```ts
/**
 * 统一封装的get请求方法
 * @param options 请求参数
 * @returns
 */
export declare function get<T extends unknown>(options: ChangbaGetConfig | string): Promise<ChangbaResponse<T>>

/**
 * 统一封装的post请求方法
 * @param options 请求参数
 * @returns
 */
export declare function post<T extends unknown>(options: ChangbaPostConfig | string): Promise<ChangbaResponse<T>>

/**
 * 统一封装的delete请求方法
 * @param options 请求参数
 * @returns
 */
export declare function delete<T extends unknown>(options: ChangbaGetConfig | string): Promise<ChangbaResponse<T>>

/**
 * 统一封装的put请求参数
 * @param options 请求参数
 * @returns
 */
export declare function put<T extends unknown>(
  options: ChangbaPostConfig | string
): Promise<ChangbaResponse<T>>

/**
 * 统一封装的请求接口
 */
export declare const request: <T extends unknown>(
  url: string,
  manualOptions?: AxiosRequestConfig & ChangbaRequestConfig
) => Promise<ChangbaResponse<T>>

/**
 * 设置请求的URL前缀
 */
export declare const setBaseURL: (baseURL: string) => void
```
