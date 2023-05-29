interface ChangbaCaller {
  getDefaultParams?: () => string
  issueShareUrlParams?: (msg: string) => void
  addUrlCache?(url: string): void
}

interface Window {
  // 安卓客户端注入的上下文
  changbaCaller?: ChangbaCaller
  // iOS客户端注入的上下文
  webkit?: WebKit
  /**
   * 神策埋点上下文
   */
  sensorsDataAnalytic201505?: Sensors
  /**
   * 唱吧分享的回调函数
   */
  shareCallback?: () => void
  /**
   * JS Bridge相关的内容
   */
  WebViewJavascriptBridge?: JSBridge
  /**
   * JS Bridge相关的内容，看起来好像是用来存callback的？
   */
  WVJBCallbacks: ((...args: any[]) => any)[]
  /**
   * Flexible挂载的属性
   */
  lib?: {
    flexible?: {
      dpr: number
      rem: number
      px2rem: (...args: any[]) => any
      refreshRem: (...args: any[]) => any
      rem2px: (...args: any[]) => any
    }
  }
  /**
   * 谷歌浏览器的标记
   */
  chrome: any
}
