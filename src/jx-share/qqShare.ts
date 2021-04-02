import { SdkLink, ShareDataType } from './share'
import { loadScript } from '../utils/index'
/**
 * qq分享
 *
 * @export
 * @param {ShareObj} data
 */
export default async function QQShare(data: ShareDataType) {
  const info = {
    title: data.title,
    desc: data.summary,
    share_url: data.url,
    image_url: data.pic
  }
  const setShare = () => window.mqq.data.setShareInfo(info)
  if (window.mqq) {
    window.mqq && setShare()
  } else {
    await loadScript(SdkLink.qq)
    setShare()
  }
}
