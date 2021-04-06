import { SdkLink, ShareDataType } from './share'
import { loadScript } from '../utils/index'
/**
 * qq空间分享
 *
 * @export
 * @param {ShareObj} data
 */
export default async function QZShare(data: ShareDataType) {
  const setShare = () => {
    if (window.QZAppExternal && window.QZAppExternal.setShare) {
      const imageArr: string[] = []
      const titleArr: string[] = []
      const summaryArr: string[] = []
      const shareURLArr: string[] = []
      for (let i = 0; i < 5; i++) {
        imageArr.push(data.pic)
        shareURLArr.push(data.url)
        if (i === 4 && data.WXconfig && data.WXconfig.swapTitleInWX) {
          titleArr.push(data.summary)
          summaryArr.push(data.title)
        } else {
          titleArr.push(data.title)
          summaryArr.push(data.summary)
        }
      }
      window.QZAppExternal.setShare(
        () => {
          console.log('QZAppExternal setShare')
        },
        {
          type: 'share',
          image: imageArr,
          title: titleArr,
          summary: summaryArr,
          shareURL: shareURLArr
        }
      )
    }
  }
  if (window.QZAppExternal) {
    setShare()
  } else {
    await loadScript(SdkLink.qz)
    setShare()
  }
}
