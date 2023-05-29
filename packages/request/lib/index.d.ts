import { ChangbaGetConfig, ChangbaRequestConfig, ChangbaPostConfig, ChangbaResponse } from './types'
import { AxiosRequestConfig } from 'axios'
/**
 * 统一封装的get请求方法
 * @param options 请求参数
 * @returns
 */
export declare function get<T extends unknown | Array<unknown>>(
  options: ChangbaGetConfig | string
): Promise<Omit<ChangbaResponse<T>, '$response'>>
/**
 * 统一封装的post请求方法
 * @param options 请求参数
 * @returns
 */
export declare function post<T extends unknown | Array<unknown>>(
  options: ChangbaPostConfig | string
): Promise<Omit<ChangbaResponse<T>, '$response'>>
/**
 * 统一封装的delete请求方法
 * @param options 请求参数
 * @returns
 */
declare function _delete<T extends unknown | Array<unknown>>(
  options: ChangbaGetConfig | string
): Promise<Omit<ChangbaResponse<T>, '$response'>>
/**
 * 统一封装的put请求参数
 * @param options 请求参数
 * @returns
 */
export declare function put<T extends unknown | Array<unknown>>(
  options: ChangbaPostConfig | string
): Promise<Omit<ChangbaResponse<T>, '$response'>>
declare const _request: <T extends unknown>(
  url: string,
  manualOptions?: AxiosRequestConfig & ChangbaRequestConfig
) => Promise<ChangbaResponse<T>>
export { _delete as delete, _request as request }
