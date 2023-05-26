import { getQuery } from '@funny/share'

type EventType = 'show_page_H5' | 'click_element_H5_ktv'

interface AsyncNode {
  eventType: string
  trackData: Record<string, unknown>
}

export class Track {
  private sensorURL = 'https://res.cdn.changbaimg.com/!/sensorsdata/1.22.7/sensorsdata.min.js'

  private sensorUtilsURL = 'https://changba.com/njwap/stats/index/entry?auto=no'

  private retryTimes: Record<PropertyKey, number> = {
    sensorURL: 0,
    sensorUtilsURL: 0,
  }

  private initialized = false

  private config = {
    retry: 5,
  }

  private asyncQueue: AsyncNode[] = []

  private insertScript(url: string) {
    return new Promise<boolean>((resolve, reject) => {
      const script = document.createElement('script')
      script.onload = () => {
        resolve(true)
      }
      script.onerror = () => {
        // 超过了最大重复次数
        if (this.retryTimes[url] >= this.config.retry) {
          reject()
        } else {
          this.insertScript(url)
        }
      }
      script.src = url
      document.body.appendChild(script)
    })
  }

  public async init() {
    const sensor = this.insertScript(this.sensorURL)
    const sensorUtils = this.insertScript(this.sensorUtilsURL)
    const results = await Promise.all([sensor, sensorUtils])
    if (results.every((v) => v)) {
      this.initialized = true
      this.flushTrack()
    }
  }

  public trackEvent(eventType: EventType, trackData: Record<string, unknown> = {}) {
    // 当SDK没有初始化的时候
    if (!this.initialized) {
      this.asyncQueue.push({
        eventType,
        trackData,
      })
      return
    }
    typeof window._cbs?.action === 'function' &&
      window._cbs.action(eventType, {
        ...trackData,
        enter_source: getQuery('refsrc') || 'none',
      })
  }

  flushTrack() {
    while (this.asyncQueue.length) {
      const { eventType, trackData } = this.asyncQueue.shift()!
      this.trackEvent(eventType as EventType, trackData)
    }
  }
}

const _track = new Track()
_track.init()

export const track = _track.trackEvent

export function PV() {
  _track.trackEvent('show_page_H5')
}

export function ElClick(content: string) {
  _track.trackEvent('click_element_H5_ktv', {
    element_content_ktv: content,
  })
}
