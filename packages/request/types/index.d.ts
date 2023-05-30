import { AxiosResponse } from 'axios'

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
}

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
  /**
   * 用于调试返回信息
   */
  $response: AxiosResponse<T>
}

export interface ChangbaGetConfig {
  /**
   * 请求地址
   */
  url: string
  /* 是否缓存请求 */
  cache?: boolean
  /**
   * GET请求需要发送的数据
   */
  data?: {
    [prop: string]: any
  }
}

export interface ChangbaPostConfig {
  /**
   * 请求地址
   */
  url: string
  /* 是否使用application/json的形式发送给后端 */
  json?: boolean
  /**
   * POST请求需要发送给后端的数据
   */
  data?: {
    [prop: string]: any
  }
  /**
   * 是否是上传
   */
  upload?: boolean
  /**
   * 上传的回调函数
   */
  onUploadPercent?: (percentage: number, event: ProgressEvent) => void
}

export interface AxiosProgressEvent {
  loaded: number
  total?: number
  progress?: number
  bytes: number
  rate?: number
  estimated?: number
  upload?: boolean
  download?: boolean
  event?: unknown
}
