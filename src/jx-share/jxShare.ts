import JxSystem from '../jx-system'
import { ShareDataType } from './share'
/**
 * 觉晓app内分享
 *
 * @export
 * @param {ShareObj} data
 */
export default async function JxShare(data: ShareDataType) {
  if (JxSystem.isJx && JxSystem.isAndroid) {
    window.juexiaoAndroid.shareFunWish(
      data.title,
      data.summary,
      data.url,
      data.base64,
      data.type || 2
    )
  }
  if (JxSystem.isJx && (JxSystem.isIos || JxSystem.isIpad)) {
    window.webkit.messageHandlers.shareFunWish.postMessage({
      title: data.title,
      content: data.summary,
      type: data.type || 2,
      url: data.url,
      img: data.base64
    })
  }
}
