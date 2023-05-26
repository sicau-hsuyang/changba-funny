import { getQuery } from '@funny/share'
export class Track {
  constructor() {
    this.sensorURL = 'https://res.cdn.changbaimg.com/!/sensorsdata/1.22.7/sensorsdata.min.js'
    this.sensorUtilsURL = 'https://changba.com/njwap/stats/index/entry?auto=no'
    this.retryTimes = {
      sensorURL: 0,
      sensorUtilsURL: 0,
    }
    this.initialized = false
    this.config = {
      retry: 5,
    }
    this.asyncQueue = []
  }
  insertScript(url) {
    return new Promise((resolve, reject) => {
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
  async init() {
    const sensor = this.insertScript(this.sensorURL)
    const sensorUtils = this.insertScript(this.sensorUtilsURL)
    const results = await Promise.all([sensor, sensorUtils])
    if (results.every((v) => v)) {
      this.flushTrack()
      this.initialized = true
    }
  }
  trackEvent(eventType, trackData = {}) {
    var _a
    // 当SDK没有初始化的时候
    if (!this.initialized) {
      this.asyncQueue.push({
        eventType,
        trackData,
      })
      return
    }
    typeof ((_a = window._cbs) === null || _a === void 0 ? void 0 : _a.action) === 'function' &&
      window._cbs.action(
        eventType,
        Object.assign(Object.assign({}, trackData), { enter_source: getQuery('refsrc') || 'none' })
      )
  }
  flushTrack() {
    while (this.asyncQueue.length) {
      const { eventType, trackData } = this.asyncQueue.shift()
      this.trackEvent(eventType, trackData)
    }
  }
}
const _track = new Track()
_track.init()
export const track = _track.trackEvent
export function PV() {
  _track.trackEvent('show_page_H5')
}
export function ElClick(content) {
  _track.trackEvent('click_element_H5_ktv', {
    element_content_ktv: content,
  })
}
