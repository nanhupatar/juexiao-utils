/**
 * 第三方分享平台sdk
 */
export enum SdkLink {
  wx = '//res.wx.qq.com/open/js/jweixin-1.0.0.js',
  qq = '//open.mobile.qq.com/sdk/qqapi.js?_bid=152',
  qz = '//qzonestyle.gtimg.cn/qzone/phone/m/v4/widget/mobile/jsbridge.js?_bid=339'
}
/**
 * 分享平台类型
 * 微信 | qq | qq空间 | 觉晓app
 */
export type Platform = 'wx' | 'qq' | 'qz' | 'jx'

export type ShareObj = {
  /**
   * 分享标题
   */
  title: string
  /**
   * 分享内容
   */
  summary: string
  /**
   * 分享图片
   */
  pic: string
  /**
   * 分享链接
   */
  url: string
  /**
   * 分享类型 仅在觉晓app内有效
   * @type {(1 | 2)} 1 分享图片 2 分享链接
   */
  type?: 1 | 2
  /**
   * 分享图片的base64 仅在觉晓app内有效 一般用于canvas生成图片后直接分享图片
   */
  base64?: string
  /**
   * 是否标题内容互换（仅朋友圈，因朋友圈内只显示标题）
   */
  swapTitleInWX?: boolean
}

export type SwapTitle = {
  /* 是否标题内容互换（仅朋友圈，因朋友圈内只显示标题） */
  swapTitleInWX?: boolean
}

export type ShareDataType = ShareObj & {
  WXconfig?: WxConfig & SwapTitle
}

export type WxConfig = {
  /**
   * 公众号的唯一标识
   */
  appId: string
  /**
   * 生成签名的时间戳
   */
  timestamp: number
  /**
   * 生成签名的随机串
   */
  nonceStr: string
  /**
   * 签名
   */
  signature: string
}

/**
 * jsapi配置
 *
 * @interface JsApiConfig
 */
export interface JsApiConfig extends WxConfig {
  url: string
}

/**
 * wx.config
 *
 * @export
 * @interface Config
 * @extends {WxConfig}
 */
export interface Config extends WxConfig {
  debug: boolean
  jsApiList: string[]
}
