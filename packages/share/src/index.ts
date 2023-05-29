import { env } from './env'
import { ChangbaGlobalParams, ChangbaShareParams } from '../types'

/**
 * 获取查询字符串的值
 * @param name 指定键
 * @param url 指定从某个字符串上获取查询字符串
 * @returns
 */
export function getQuery(name: string, url?: string): string {
  name = name.replace(/[\\[]/, '\\[').replace(/[\]]/, '\\]')
  if (!url) {
    url = window.location.href
  }
  const _regexS = '[\\?&]' + name + '=([^&#]*)'
  const _regex = new RegExp(_regexS)
  const _results = _regex.exec(url)
  return _results == null ? '' : decodeURIComponent(_results[1].replace(/\+/g, ' '))
}

function getGlobalParamsForAndroid(): ChangbaGlobalParams {
  const result = window.changbaCaller?.getDefaultParams?.() ?? '{}'
  try {
    return JSON.parse(result)
  } catch (e) {
    return {}
  }
}

function getRandom(min: number, max: number) {
  min = Math.ceil(min)
  max = Math.floor(max)
  // 含最大值，含最小值
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function getGlobalParamsForIOS(): Promise<ChangbaGlobalParams> {
  return new Promise((resolve) => {
    const callbackName =
      '__webkitChangbaCallerGetDefaultParams' + String(new Date().getTime()) + String(getRandom(1000, 9999))
    ;(window as any)[callbackName] = function (result: any) {
      try {
        resolve(JSON.parse(result))
      } catch (e) {
        resolve({})
      }
      ;(window as any)[callbackName] = null
    }
    if (window.webkit?.messageHandlers?.getDefaultParams) {
      window.webkit.messageHandlers.getDefaultParams.postMessage(callbackName)
    } else {
      resolve({})
    }
  })
}

// 各种兼容性处理
function compatibility(params: ChangbaGlobalParams) {
  if (!params.macaddress && params.n4) {
    // 新版本没有 macaddress 使用 n4 代替
    params.macaddress = params.n4
  } else if (params.macaddress && !params.n4) {
    // 旧版本没有 n4 使用 macaddress 代替
    params.n4 = params.macaddress
  } else if (!params.macaddress && !params.n4) {
    const macAddress = getQuery('macaddress')
    const deviceId = getQuery('deviceid')
    const n4 = getQuery('global_params_n4')

    params.n4 = n4 || macAddress || deviceId
    params.macaddress = params.n4
  }

  if (!params.userId) {
    params.userId = getQuery('curuserid')
  }

  if (!params.token) {
    params.token = getQuery('token')
  }

  if (!params.appVersion) {
    const match = /\s+changba\/([\d.]+)/.exec(env.ua)
    if (match) {
      params.appVersion = match[1]
    }
  }

  if (!params.smdeviceid) {
    params.smdeviceid = getQuery('shuMeiId')
  }

  if (!params.longitude) {
    params.longitude = getQuery('longitude')
  }

  if (!params.latitude) {
    params.latitude = getQuery('latitude')
  }

  params.smDeviceId = params.smdeviceid

  params.deviceId = params.n4 || params.uuid

  return params
}

/**
 * 获取全局参数
 * @returns
 */
export function getGlobalParams(): Promise<ChangbaGlobalParams> {
  return new Promise((resolve) => {
    if (env.browser.isOutChangba) {
      resolve(compatibility({}))
      return
    }
    if (env.browser.isAndroid) {
      resolve(compatibility(getGlobalParamsForAndroid()))
    } else if (env.browser.isIOS) {
      getGlobalParamsForIOS().then((result) => {
        resolve(compatibility(result))
      })
    } else {
      resolve(compatibility({}))
    }
  })
}

/**
 * 设置唱吧分享
 * @param shareParams 分享参数
 */
export function share(shareParams: ChangbaShareParams) {
  try {
    if (env.browser.isIOS) {
      window.webkit?.messageHandlers?.issueShareUrlParams?.postMessage?.(JSON.stringify(shareParams))
    } else {
      window.changbaCaller?.issueShareUrlParams?.(JSON.stringify(shareParams))
    }
    window.shareCallback = () => {
      typeof shareParams.shareCallback === 'function' && shareParams.shareCallback()
    }
  } catch (exp) {
    console.log(exp)
  }
}

/**
 * 手动调起分享面板
 * @param shareParams 分享参数
 */
export function invokeShareByManual(shareParams: Omit<ChangbaShareParams, 'shareCallback'>) {
  const title = encodeURIComponent(shareParams.title)
  const content = encodeURIComponent(shareParams.content)
  const targetUrl = encodeURIComponent(shareParams.targeturl)
  const imageUrl = encodeURIComponent(shareParams.imageurl)
  window.location.href = `changba://?ac=addshare&title=${title}&content=${content}&targeturl=${targetUrl}&imageurl=${imageUrl}`
}

export { env }
