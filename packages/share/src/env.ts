import { invalidVersionList } from './config'
import { getQuery } from './index'

const ua = navigator.userAgent.toLowerCase()

function getAppVersion(platform: string) {
  // 获取APP版本号，获取格式为 changeba/8.4.0
  const str = platform + '\\/([\\d\\.\\w]+)'
  const regex = new RegExp(str, 'i')
  const results = ua.match(regex)
  const cbVersion = Array.isArray(results) && results.length >= 2 ? results[1] : null
  return cbVersion
}

const mars = getAppVersion('easylive') || ''
const cb = getAppVersion('changba') || ''
const isInvalidChangba = /changba/.test(navigator.userAgent.toLowerCase()) && invalidVersionList.includes(cb as any)

export const env = {
  get ua() {
    return ua
  },
  get version() {
    return {
      mars,
      cb,
    } as const
  },
  get browser() {
    const isAndroid = ua.indexOf('android') > 0
    const isIOS = /iphone|ipad|ipod/.test(ua)
    const isQQorWeChat = /micromessenger|qq\//.test(ua)
    const isWeibo = /weibo/.test(ua)
    const isOutChangba = ua.indexOf('changba') < 0 || isQQorWeChat || isWeibo || /cblive/.test(ua)
    const isMars = /easylive/.test(navigator.userAgent.toLowerCase()) || isInvalidChangba
    const isChangba = /changba/.test(navigator.userAgent.toLowerCase()) && !isInvalidChangba
    return {
      isAndroid,
      isIOS,
      isQQorWeChat,
      isWeibo,
      isOutChangba,
      isInvalidChangba,
      isMars,
      isChangba,
    } as const
  },
  get userInfo() {
    const token = getQuery('token')
    const userId = getQuery('curuserid') || getQuery('uuid') || getQuery('curuser')
    const businessName = getQuery('business_name')
    // 如果是火星业务线，并且活动跑在唱吧里，需要对userid追加7E
    let tmpUserId = Number.parseInt(userId, 10)
    if (!Number.isNaN(tmpUserId) && tmpUserId < 700000000) {
      tmpUserId += 700000000
    }
    return {
      token,
      userId: businessName === 'mars' && window.location.host === 'mars.changba.com' ? tmpUserId : userId,
    }
  },
} as const
