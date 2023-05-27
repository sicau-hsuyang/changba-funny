import { getQuery } from '@funny/share'

type EventType = 'show_page_H5' | 'click_element_H5_ktv'

interface AsyncNode {
  eventType: string
  trackData: Record<string, unknown>
}
/**
 * 埋点SDK的配置项
 */
interface TrackConfig {
  retry: number
}

/**
 * 神策埋点
 */
export class Track {
  /**
   * 神策的CDN地址
   */
  private sensorURL = 'https://res.cdn.changbaimg.com/!/sensorsdata/1.22.7/sensorsdata.min.js'

  /**
   * 唱吧的埋点SDK CDN地址
   */
  private sensorUtilsURL = 'https://changba.com/njwap/stats/index/entry?auto=no'

  /**
   * 重试的次数
   */
  private retryTimes: Record<PropertyKey, number> = {
    sensorURL: 0,
    sensorUtilsURL: 0,
  }

  /**
   * 是否加载SDK失败
   */
  private hasError = false

  /**
   * 是否初始化完毕，没有初始化之前的调用将全部用队列记录下来
   */
  private initialized = false

  private config: TrackConfig = {
    retry: 5,
  }

  /**
   * 异步任务队列，用于记录SDK初始化之前想要发送的埋点数据
   */
  private asyncQueue: AsyncNode[] = []

  constructor(config?: Partial<TrackConfig>) {
    Object.assign(this.config, config || {})
    this.init()
  }

  /**
   * 向页面中插入一段脚本
   * @param url 脚本地址
   * @returns
   */
  private insertScript(url: string) {
    return new Promise<boolean>((resolve) => {
      const script = document.createElement('script')
      script.onload = () => {
        resolve(true)
      }
      script.onerror = () => {
        // 超过了最大重复次数
        if (this.retryTimes[url] >= this.config.retry) {
          resolve(false)
        } else {
          // 重试次数增加
          this.retryTimes[url]++
          this.insertScript(url).then(resolve)
        }
      }
      script.src = url
      document.body.appendChild(script)
    })
  }

  /**
   * 初始化埋点
   */
  public async init() {
    const sensor = this.insertScript(this.sensorURL)
    const sensorUtils = this.insertScript(this.sensorUtilsURL)
    const results = await Promise.all([sensor, sensorUtils])
    if (!results.every((v) => v)) {
      this.hasError = true
    } else {
      this.initialized = true
      this.flushTrack()
    }
  }

  /**
   * 埋点方法
   * @param eventType 事件类型
   * @param trackData 埋点数据
   * @returns
   */
  public trackEvent(eventType: EventType, trackData: Record<string, unknown> = {}) {
    if (this.hasError) {
      console.error('神策埋点初始化错误，埋点工具将不能正确上报')
    }
    // 当SDK没有初始化的时候
    if (!this.initialized) {
      this.asyncQueue.push({
        eventType,
        trackData,
      })
      return
    }
    if (!window._cbs) {
      console.error('神策埋点SDK加载错误，请确保您的脚步是否被篡改')
      return
    }
    window._cbs.action(eventType, {
      ...trackData,
      enter_source: getQuery('refsrc') || 'none',
    })
  }

  /**
   * 清理在SDK初始化之前的调用
   */
  flushTrack() {
    while (this.asyncQueue.length) {
      const { eventType, trackData } = this.asyncQueue.shift()!
      this.trackEvent(eventType as EventType, trackData)
    }
  }
}

const _track = new Track()
/**
 * 埋点方法
 */
export const track = _track.trackEvent
/**
 * 页面曝光埋点统计
 */
export function trackPv() {
  _track.trackEvent('show_page_H5')
}
/**
 * 元素点击埋点统计
 * @param content 点击的内容
 */
export function trackElClick(content: string) {
  _track.trackEvent('click_element_H5_ktv', {
    element_content_ktv: content,
  })
}
