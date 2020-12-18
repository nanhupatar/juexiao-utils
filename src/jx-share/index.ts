/**
 * jx-share
 * Released under the MIT license
 * Date: 2020-11-27
 * Author: Yechuanjie
 * Copyright (c) Juexiao Time. All rights reserved.
 *
 * h5第三方分享（微信、qq、qq空间） 以及 app内部分享
 */

import jxSystemInfo from '../jx-system-info'
import { postData } from '../utils'
import { Platform, SdkLink, ShareObj } from './share'

export default class JxShare {
  private shareData: ShareObj
  constructor(shareData: ShareObj) {
    this.shareData = shareData
    jxSystemInfo['isWX'] && this.wxShare()
    jxSystemInfo['isQQ'] && this.qqShare()
    jxSystemInfo['isQZ'] && this.qzShare()
    jxSystemInfo['isJX'] && this.jxShare()
  }
  private wxShare() {}
  private qqShare() {}
  private qzShare() {}
  private jxShare() {}

  private loadScript(url: string) {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script')
      script.type = 'text/javascript'
      script.src = url
      script.async = true
      script.onload = () => resolve()
      script.onerror = () => reject()
    })
  }
  private async getWxJsApi() {
    const apiLink = '//api.juexiaotime.com/userapi/wechat/getJsApi'
    const data = await postData(apiLink, { url: window.location.href })
    console.info(data)
    return data.data
  }
}
