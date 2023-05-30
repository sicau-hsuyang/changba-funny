import { Goto } from './index'

export class MarsGoto extends Goto {
  topUp(isHalf = 1): void {
    window.location.href = 'xiaochangmars://?ac=payment&is_show_half=' + isHalf
  }

  luboMall(): void {
    throw new Error('this method not be implemented into mars app')
  }

  profile(userId: string): void {
    window.location.href = 'xiaochangmars://?ac=userinfo&uid=' + userId
  }

  baofangMall(): void {
    throw new Error('this method not be implemented into mars app')
  }
}
