import { ChangbaConfig } from './types'
/**
 * 不符合要求的火星App端版本号
 */
export const invalidVersionList = [
  '4.9.0.3',
  '4.9.0.4',
  '4.10.0',
  '4.11.0.1',
  '4.11.0.2',
  '4.12.0',
  '4.14.0',
  '4.9.0.3.debug',
  '4.9.0.4.debug',
  '4.10.0.debug',
  '4.11.0.1.debug',
  '4.11.0.2.debug',
  '4.12.0.debug',
  '4.14.0.debug',
] as const

const _config: ChangbaConfig = {}

/**
 * 获取配置
 * @returns
 */
export function getConfig(): ChangbaConfig {
  return _config
}

/**
 * 设置配置
 * @param config
 */
export function setConfig(config: ChangbaConfig) {
  Object.assign(_config, config)
}
