import { env } from '@funny/share'
import { MarsGoto } from './mars'
import { ChangbaGoto } from './changba'

export abstract class Goto {
  /**
   * 跳转包房活动兑换中心
   */
  abstract baofangMall(): void

  /**
   * 跳转录播活动兑换中心
   */
  abstract luboMall(): void

  /**
   * 跳转用户详情
   * @param userId 用户的唱吧ID
   * @param subTub 默认进入的子Tab
   */
  abstract profile(userId: string, subTub: number): void

  /**
   * 跳转充值页面
   * @param isHalf 是否半屏显示，默认为true
   */
  abstract topUp(isHalf: number): void
}

function getGotoInstance() {
  return env.browser.isMars ? new MarsGoto() : new ChangbaGoto()
}

export const goto = getGotoInstance()

// TODO: 增加一个调整任意地址 自动拼接参数的方法
