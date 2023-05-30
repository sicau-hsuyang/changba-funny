import { env } from '@funny/share'
import { Goto } from './index'

export class ChangbaGoto extends Goto {
  baofangMall(): void {
    const { userId, token } = env.userInfo
    window.location.href = `//changba.com/njwap/baofang/mall/index/main?&curuserid=${userId}&token=${token}`
  }

  luboMall() {
    const { userId, token } = env.userInfo
    window.location.href = `//changba.com/njwap/chanpin/home-mall/index/main?&curuserid=${userId}&token=${token}`
  }

  profile(userId: string, subTub = 1) {
    window.location.href = 'changba://?ac=personalpage&index=' + subTub + '&userid=' + userId
  }

  topUp(isHalf = 1) {
    window.location.href = 'changba://?ac=mycoins&is_show_half=' + isHalf
  }
}
