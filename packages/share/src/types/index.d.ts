/**
 * 客户端传递的全局参数
 */
export interface ChangbaGlobalParams {
  /**
   * 用户的Token
   */
  token?: string
  /**
   * 用户ID
   */
  userId?: string
  /**
   * App的版本号
   */
  appVersion?: string
  /**
   * 设备唯一性ID
   */
  deviceId?: string
  smDeviceId?: string
  /**
   * "oaid 或 idfa 等类似可以标识设备的信息"
   */
  n4?: string
  macaddress?: string
  /**
   * 地理位置 经度
   */
  longitude?: string
  /**
   * 地理位置 纬度
   */
  latitude?: string
  /**
   * "Android 传 uuid",
   */
  uuid?: string
  /**
   * 当前手机系统版本
   */
  systemVersion?: string
  /**
   * "原 URL 中的 channelsrc 参数"
   */
  channel?: string
  /**
   * "设备信息，原 URL 中的 device 参数",
   */
  device?: string
  /**
   * 数美ID(可选)
   */
  smdeviceid?: string
}

/**
 * 唱吧的一些配置
 */
export interface ChangbaConfig {
  /**
   * ios 渠道名称
   */
  iosChannelName?: string
  /**
   * 安卓的渠道名称
   */
  androidChannelName?: string
  /**
   * 有用，但是不知道是干嘛的一个字段
   */
  iosUMName?: string
}
