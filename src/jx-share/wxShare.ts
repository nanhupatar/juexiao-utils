import { SdkLink, ShareDataType } from './share'
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
    jsApiList: [
      'onMenuShareTimeline', // 废弃
      'onMenuShareAppMessage', // 废弃
      'onMenuShareQQ', // 废弃
      'onMenuShareQZone', // 废弃

      'updateAppMessageShareData', // 自定义“分享给朋友”及“分享到QQ”按钮的分享内容（1.4.0）
      'updateTimelineShareData' // 自定义“分享到朋友圈”及“分享到QQ空间”按钮的分享内容（1.4.0）
    ],
    openTagList: ['wx-open-launch-weapp', 'wx-open-launch-app', 'wx-open-subscribe'] // 可选，需要使用的开放标签列表，例如['wx-open-launch-app']
  })
  window.wx.error(err => {
    console.error(err)
  })
  window.wx.ready(() => {
    const config = {
      title: data.title,
      desc: data.summary,
      link: data.url,
      imgUrl: data.pic
    }
    window.wx.updateAppMessageShareData(config)
    window.wx.updateTimelineShareData(config)
    // window.wx.onMenuShareAppMessage(config)
    // window.wx.onMenuShareQQ(config)
    // window.wx.onMenuShareQZone(config)
    // if (conf?.swapTitleInWX) {
    //   window.wx.onMenuShareTimeline({
    //     title: data.summary,
    //     desc: data.title,
    //     link: data.url,
    //     imgUrl: data.pic,
    //     type: '',
    //     dataUrl: '',
    //     success: () => console.info('success'),
    //     cancel: () => console.info('cancel')
    //   })
    // } else {
    //   window.wx.onMenuShareTimeline(config)
    // }
  })
}
