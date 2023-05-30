import { LoadingConfig } from '../types'

export class Loading {
  /**
   * loading动画的css地址
   */
  private cssURL = 'https://res.cdn.changbaimg.com/-/70ba49c2fceb1657/loading.rem.min.css'

  /**
   * loading的配置
   */
  private config: LoadingConfig = this.createDefaultLoadingConfig()

  /**
   * 用于关闭loading的定时器
   */
  private timer: NodeJS.Timeout | null = null

  constructor(config?: LoadingConfig) {
    this.config = config || this.createDefaultLoadingConfig()
    // 初始化的时候就插入样式，为的是loading第一次展示的时候避免还没有
    this.insertStyleSheet()
  }

  /**
   * 生成默认的loading配置
   * @returns
   */
  private createDefaultLoadingConfig(): LoadingConfig {
    return {
      duration: 3000,
      message: '加载中',
    }
  }

  /**
   * 展示loading动画
   * @param message loading动画显示的内容
   * @param duration loading动画在多久后关闭
   */
  public show(message: string, duration?: number): void {
    let loadingEle = document.querySelector('#loading') as HTMLElement
    if (!loadingEle) {
      this.insertElement(message)
      loadingEle = document.querySelector('#loading') as HTMLElement
    }
    loadingEle.style.display = 'block'
    const messageEle = loadingEle.querySelector('.weui_toast_content')!
    messageEle.innerHTML = message
    // 3S之后自动关闭
    this.timer = setTimeout(this.hide.bind(this), duration || this.config.duration)
  }

  /**
   * 关闭loading动画
   * @returns
   */
  public hide(): void {
    const loadingEle = document.querySelector('#loading') as HTMLElement
    if (!loadingEle) {
      return
    }
    loadingEle.style.display = 'none'
    this.clearTimer()
  }

  private clearTimer() {
    if (this.timer) {
      clearTimeout(this.timer)
      this.timer = null
    }
  }

  /**
   * 向DOM中插入loading动画所需样式
   */
  private insertStyleSheet() {
    const loadingStyleNode = document.createElement('link')
    loadingStyleNode.type = 'text/css'
    loadingStyleNode.rel = 'stylesheet'
    loadingStyleNode.href = this.cssURL
    document.body.appendChild(loadingStyleNode)
  }

  /**
   * 向DOM节点中插入loading节点
   * @param message loading动画展示的文本
   */
  private insertElement(message?: string) {
    const content = `
      <div class="weui_mask_transparent"></div>
      <div class="weui_toast">
        <div class="weui_loading">
          <div class="weui_loading_leaf weui_loading_leaf_0"></div>
          <div class="weui_loading_leaf weui_loading_leaf_1"></div>
          <div class="weui_loading_leaf weui_loading_leaf_2"></div>
          <div class="weui_loading_leaf weui_loading_leaf_3"></div>
          <div class="weui_loading_leaf weui_loading_leaf_4"></div>
          <div class="weui_loading_leaf weui_loading_leaf_5"></div>
          <div class="weui_loading_leaf weui_loading_leaf_6"></div>
          <div class="weui_loading_leaf weui_loading_leaf_7"></div>
          <div class="weui_loading_leaf weui_loading_leaf_8"></div>
          <div class="weui_loading_leaf weui_loading_leaf_9"></div>
          <div class="weui_loading_leaf weui_loading_leaf_10"></div>
          <div class="weui_loading_leaf weui_loading_leaf_11"></div>
        </div>
        <p class="weui_toast_content">
          ${message || this.config.message}
        </p>
      </div>`
    const wrapperEle = document.createElement('div')
    wrapperEle.classList.add('weui_loading_toast')
    wrapperEle.id = 'loading'
    wrapperEle.innerHTML = content
    document.body.appendChild(wrapperEle)
  }
}
