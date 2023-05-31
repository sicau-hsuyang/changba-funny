# 工具方法

SDK 将所有曾经用到的一些工具方法抽离到了一个单独的工具包中，叫做：`@funny/share`

## 先决条件

```bash
npm i @funny/share -S
```

## API List

### env

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

### getQuery

```ts
/**
 * 获取查询字符串的值
 * @param name 指定键
 * @param url 指定从某个字符串上获取查询字符串
 * @returns
 */
export declare function getQuery(name: string, url?: string): string
```

### getUserId

```ts
/**
 * 获取用的userId 已兼容userId在唱吧和火星App中7E的问题
 */
export declare function getUserId(): string
```

### getGlobalParams

```ts
/**
 * 客户端传递的全局参数
 */
export interface ChangbaGlobalParams {
  /**
   * 用户的Token
   */
  token?: string
  /**
   * 用户ID
   */
  userId?: string
  /**
   * App的版本号
   */
  appVersion?: string
  /**
   * 设备唯一性ID
   */
  deviceId?: string
  smDeviceId?: string
  /**
   * "oaid 或 idfa 等类似可以标识设备的信息"
   */
  n4?: string
  macaddress?: string
  /**
   * 地理位置 经度
   */
  longitude?: string
  /**
   * 地理位置 纬度
   */
  latitude?: string
  /**
   * "Android 传 uuid",
   */
  uuid?: string
  /**
   * 当前手机系统版本
   */
  systemVersion?: string
  /**
   * "原 URL 中的 channelsrc 参数"
   */
  channel?: string
  /**
   * "设备信息，原 URL 中的 device 参数",
   */
  device?: string
  /**
   * 数美ID(可选)
   */
  smdeviceid?: string
}

/**
 * 获取来自客户端拼接的全局参数
 * @returns
 */
export declare function getGlobalParams(): Promise<ChangbaGlobalParams>
```

### share

```ts
/**
 * 分享参数
 */
export interface ChangbaShareParams {
  /**
   * 分享标题
   */
  title: string
  /**
   * 分享主文案
   */
  content: string
  /**
   * 分享LOGO图片
   */
  imageurl: string
  /**
   * 缩略图地址
   */
  thumburl: string
  /**
   * 分享的跳转地址
   */
  targeturl: string
  /**
   * 分享的回调函数
   */
  shareCallback: (...arg: any[]) => any
}

/**
 * 设置唱吧分享
 * @param shareParams 分享参数
 */
export declare function share(shareParams: ChangbaShareParams): void
```

### invokeShareByManual

```ts
/**
 * 手动调起分享面板
 * @param shareParams 分享参数
 */
export declare function invokeShareByManual(shareParams: Omit<ChangbaShareParams, 'shareCallback'>): void
```
