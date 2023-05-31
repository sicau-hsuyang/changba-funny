# API List

## @funny/track

通用埋点方法

```ts
/**
 * 通用埋点方法
 * @param eventType 埋点事件类型
 * @param trackData 埋点数据
 */
export declare const track: (eventType: string, trackData?: Record<string, unknown>) => void
```

页面曝光埋点统计方法

```ts
/**
 * 页面曝光埋点统计
 */
export declare function trackPv(): void
```

元素点击埋点统计方法

```ts
/**
 * 元素点击埋点统计
 * @param content 点击的内容
 */
export declare function trackElClick(content: string): void
```

## @funny/request

设置接口请求`URL`前缀

```ts
/**
 * 设置请求的URL前缀
 */
export declare const setBaseURL: (baseURL: string) => void
```

统一封装的请求接口方法

```ts
/**
 * 统一封装的请求接口
 */
export declare const request: <T extends unknown>(
  url: string,
  manualOptions?: AxiosRequestConfig & ChangbaRequestConfig
) => Promise<ChangbaResponse<T>>
```

get 请求方法

```ts
/**
 * 统一封装的get请求方法
 * @param options 请求参数
 * @returns
 */
export declare function get<T extends unknown>(options: ChangbaGetConfig | string): Promise<ChangbaResponse<T>>
```

post 请求方法

```ts
/**
 * 统一封装的post请求方法
 * @param options 请求参数
 * @returns
 */
export declare function post<T extends unknown>(options: ChangbaPostConfig | string): Promise<ChangbaResponse<T>>
```

delete 请求方法

```ts

/**
 * 统一封装的delete请求方法
 * @param options 请求参数
 * @returns
 */
export declare function delete<T extends unknown>(options: ChangbaGetConfig | string): Promise<ChangbaResponse<T>>

```

put 请求方法

```ts
/**
 * 统一封装的put请求参数
 * @param options 请求参数
 * @returns
 */
export declare function put<T extends unknown>(options: ChangbaPostConfig | string): Promise<ChangbaResponse<T>>
```

## @funny/share

获取当前页面运行的环境

```ts
export declare const env: {
  // 当前的UserAgent
  readonly ua: string
  // 当前运行系统的版本
  readonly version: {
    // 如运行在火星，则mars字段存储的是火星app的版本
    readonly mars: string
    // 如运行在唱吧，则cb字段存储的是唱吧app的版本
    readonly cb: string
  }
  readonly browser: {
    // 当前页面是否运行在Android系统
    readonly isAndroid: boolean
    // 当前页面是否运行在iOS系统
    readonly isIOS: boolean
    // 当前页面是否运行在QQ或者微信的内置浏览器中
    readonly isQQorWeChat: boolean
    // 当前页面是否运行在微博内置浏览器中
    readonly isWeibo: boolean
    // 当前页面是否运行在唱吧App以外
    readonly isOutChangba: boolean
    // 当前唱吧的版本号是否是在黑名单列表
    readonly isInvalidChangba: boolean
    // 当前页面是否运行在火星App中
    readonly isMars: boolean
    // 当前页面是否运行在火星App中
    readonly isChangba: boolean
  }
  // 用户的信息
  readonly userInfo: {
    // 读取自客户端的token
    token: string
    // 读取自客户端的userId，已兼容userId在唱吧和火星App中7E的问题
    userId: string
  }
}
```

获取查询字符串某个`key`的值

```ts
/**
 * 获取查询字符串的值
 * @param name 指定键
 * @param url 指定从某个字符串上获取查询字符串
 * @returns
 */
export declare function getQuery(name: string, url?: string): string
```

获取用户的 ID

```ts
/**
 * 获取用的userId 已兼容userId在唱吧和火星App中7E的问题
 */
export declare function getUserId(): string
```

获取客户端传递给 H5 页面的参数

```ts
/**
 * 获取来自客户端拼接的全局参数
 * @returns
 */
export declare function getGlobalParams(): Promise<ChangbaGlobalParams>
```

分享回调执行的方法

```ts
/**
 * 设置唱吧分享
 * @param shareParams 分享参数
 */
export declare function share(shareParams: ChangbaShareParams): void
```

手动调起分享方法

```ts
/**
 * 手动调起分享面板
 * @param shareParams 分享参数
 */
export declare function invokeShareByManual(shareParams: Omit<ChangbaShareParams, 'shareCallback'>): void
```
