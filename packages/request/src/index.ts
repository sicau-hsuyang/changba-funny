import {
  ChangbaGetConfig,
  ChangbaRequestConfig,
  ChangbaPostConfig,
  ChangbaResponse,
  AxiosProgressEvent,
} from '../types'
import { omit } from 'lodash-es'
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import qs from 'qs'
import { getGlobalParams, getQuery, env } from '@funny/share'

const symbolJson = '__cb__request_json__'

const isDev = process.env.NODE_ENV !== 'production'

function getMockPrefix() {
  const address = {
    changba: 'https://yapi.changbaops.com/mock/32/www',
    mars: 'https://yapi.changbaops.com/mock/39/mars',
  }
  const type = env.browser.isMars ? 'mars' : 'changba'
  return address[type]
}

class Request {
  // 创建axios实例
  private instance = axios.create({
    timeout: 30000,
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
    },
    transformRequest: [
      function (data, headers) {
        // 对于FormData不进行任何转换
        if (data instanceof FormData) {
          return data
        }
        // 指定以JSON的形式传递给后端
        if (data?.[symbolJson] === true) {
          headers['Content-Type'] = 'application/json; charset=utf-8'
          // 删除这个临时字段，不发送给后端
          delete data?.[symbolJson]
          return JSON.stringify(data)
        }
        // 以www-urlencoded的形式传递给后端
        return qs.stringify(data)
      },
    ],
  })

  constructor() {
    this.instance.interceptors.request.use(
      (config) => {
        if (config.method === 'get') {
          config.params = config.data
        }
        return config
      },
      (error) => {
        // Do something with request error
        if (isDev) {
          // for debug
          console.log(error)
        }
        Promise.reject(error)
      }
    )
  }

  async request<T extends unknown | Array<unknown>>(
    url: string,
    manualOptions: AxiosRequestConfig & ChangbaRequestConfig = {}
  ): Promise<ChangbaResponse<T>> {
    const options = { ...manualOptions }
    if (!options.method) {
      options.method = 'get'
    }
    if (!options.data) {
      options.data = {}
    }
    const globalParams = await getGlobalParams()
    // 自动添加 userId, token 参数
    if (!options.data.userid) {
      options.data.userid = globalParams.userId
    }
    if (!options.data.token) {
      options.data.token = globalParams.token
    }

    if (options.upload === true) {
      const formData = new FormData()
      // eslint-disable-next-line no-restricted-syntax
      for (const key in options.data) {
        if (Object.prototype.hasOwnProperty.call(options.data, key)) {
          const value = options.data[key]
          if (value === undefined) {
            // eslint-disable-next-line no-continue
            continue
          }
          if (Array.isArray(value)) {
            value.forEach((item) => {
              formData.append(`${key}[]`, item)
            })
          } else {
            formData.append(key, value)
          }
        }
      }
      options.data = formData
    } else if (options.method === 'post' && options.json === true) {
      options.data[symbolJson] = true
    }

    if (options.method.toLowerCase() === 'get' && options.cache !== true) {
      options.data._ = String(+new Date()) + String(Math.floor(Math.random() * 9999))
    }

    if (!options.onUploadProgress && options.onUploadPercent) {
      options.onUploadProgress = ((progressEvent: AxiosProgressEvent & ProgressEvent) => {
        if (progressEvent.lengthComputable) {
          typeof options.onUploadPercent === 'function' &&
            options.onUploadPercent(Math.floor((progressEvent.loaded / progressEvent.total) * 100), progressEvent)
        }
      }) as (progressEvent: AxiosProgressEvent) => void
    }

    const isMock = getQuery('isMock')
    if (isDev && isMock) {
      // 根据env决定mock的前缀
      url = getMockPrefix() + url
    }
    return this.instance(url, options)
      .then((response: AxiosResponse<T>) => {
        let data = response.data as ChangbaResponse<T>
        if (!data) {
          data = {} as any
        }
        data.$response = response
        return data as ChangbaResponse<T>
      })
      .catch((error) => {
        return {
          code: -99999,
          data: {},
          msg: error.message,
          $response: error,
        }
      })
  }
}

/**
 * 统一封装的请求对象
 */
const request = new Request()

/**
 * 统一封装的get请求方法
 * @param options 请求参数
 * @returns
 */
export function get<T extends unknown | Array<unknown>>(
  options: ChangbaGetConfig | string
): Promise<Omit<ChangbaResponse<T>, '$response'>> {
  if (typeof options === 'string') {
    options = {
      url: options,
    }
  }
  const { url } = options
  const getOptions = omit(options, ['url'])
  return request.request<T>(url, { ...getOptions, method: 'get' }) as Promise<Omit<ChangbaResponse<T>, '$response'>>
}
/**
 * 统一封装的post请求方法
 * @param options 请求参数
 * @returns
 */
export function post<T extends unknown | Array<unknown>>(
  options: ChangbaPostConfig | string
): Promise<Omit<ChangbaResponse<T>, '$response'>> {
  if (typeof options === 'string') {
    options = {
      url: options,
    }
  }
  const { url } = options
  const postOptions = omit(options, ['url'])
  return request.request(url, { ...postOptions, method: 'post' }) as Promise<ChangbaResponse<T>>
}

/**
 * 统一封装的delete请求方法
 * @param options 请求参数
 * @returns
 */
function _delete<T extends unknown | Array<unknown>>(
  options: ChangbaGetConfig | string
): Promise<Omit<ChangbaResponse<T>, '$response'>> {
  if (typeof options === 'string') {
    options = {
      url: options,
    }
  }
  const { url } = options
  const deleteOptions = omit(options, ['url'])
  return request.request(url, { ...deleteOptions, method: 'delete' }) as Promise<ChangbaResponse<T>>
}

/**
 * 统一封装的put请求参数
 * @param options 请求参数
 * @returns
 */
export function put<T extends unknown | Array<unknown>>(
  options: ChangbaPostConfig | string
): Promise<Omit<ChangbaResponse<T>, '$response'>> {
  if (typeof options === 'string') {
    options = {
      url: options,
    }
  }
  const { url } = options
  const putOptions = omit(options, ['url'])
  return request.request(url, { ...putOptions, method: 'put' }) as Promise<ChangbaResponse<T>>
}

const _request = request.request.bind(request)

export { _delete as delete, _request as request }
