import { ShareObj, SdkLink, ShareDataType } from './share'
import { loadScript } from '../utils/index'
/**
 * 微信分享
 *
 * @export
 * @param {ShareObj} data
 */
export default async function WxShare(data: ShareDataType) {
  await loadScript(SdkLink.wx)
  const conf = data.WXconfig
  window.wx.config({
    debug: false,
    appId: conf?.appId,
    timestamp: conf?.timestamp,
    nonceStr: conf?.nonceStr,
    signature: conf?.signature,
    jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareQZone']
  })
  window.wx.error(err => {
    throw new Error(err)
  })
  window.wx.ready(() => {
    const config = {
      title: data.title,
      desc: data.summary,
      link: data.url,
      imgUrl: data.pic,
      type: '',
      dataUrl: '',
      cancel: () => {}
    }
    window.wx.onMenuShareAppMessage(config)
    window.wx.onMenuShareQQ(config)
    window.wx.onMenuShareQZone(config)
    if (conf?.swapTitleInWX) {
      window.wx.onMenuShareTimeline({
        title: data.summary,
        desc: data.title,
        link: data.url,
        imgUrl: data.pic,
        type: '',
        dataUrl: '',
        success: () => {},
        cancel: () => {}
      })
    } else {
      window.wx.onMenuShareTimeline(config)
    }
  })
}
