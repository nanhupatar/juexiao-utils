/**
 * 第三方分享平台sdk
 * */
export enum SdkLink {
  wx = '//res.wx.qq.com/open/js/jweixin-1.0.0.js',
  qq = '//open.mobile.qq.com/sdk/qqapi.js?_bid=152',
  qz = '//qzonestyle.gtimg.cn/qzone/phone/m/v4/widget/mobile/jsbridge.js?_bid=339'
}
/**
 * 分享平台类型
 * 微信 | qq | qq空间 | 觉晓app
 * */
export type Platform = 'wx' | 'qq' | 'qz' | 'jx'

export type ShareObj = {
  /* 分享标题 */
  title: string
  /* 分享描述 */
  desc: string
  /* 分享链接 */
  url: string
  /* 分享icon */
  icon: string
}
