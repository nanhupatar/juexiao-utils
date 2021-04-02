/**
 * jx-share
 * Released under the MIT license
 * Date: 2021-04-02
 * Author: Yechuanjie
 * Copyright (c) Juexiao Time. All rights reserved.
 *
 * h5第三方分享（微信、qq、qq空间） 以及 app内部分享
 */

import JxSystem from '../jx-system'
import { postData } from '../utils'
import { ShareObj, JsApiConfig, ShareDataType } from './share'
import WxShare from './wxShare'
import QQShare from './qqShare'
import QZShare from './qzShare'
import JxShare from './jxShare'

class Share {
  private async getJsApi() {
    const apiLink = '//api.juexiaotime.com/userapi/wechat/getJsApi'
    const data = await postData<JsApiConfig>(apiLink, { url: window.location.href })
    return data.data
  }
  private init(shareData: ShareDataType) {
    JxSystem.isWx && WxShare(shareData)
    JxSystem.isQq && QQShare(shareData)
    JxSystem.isQz && QZShare(shareData)
    JxSystem.isJx && JxShare(shareData)
  }
  public setShareInfo(shareData: ShareObj) {
    if (JxSystem.isWx) {
      this.getJsApi().then(config => {
        const data = {
          ...shareData,
          WXconfig: {
            swapTitleInWX: shareData.swapTitleInWX,
            ...config
          }
        }
        this.init(data)
      })
    } else {
      this.init(shareData)
    }
  }
}

export default function JxSetShareInfo(shareData: ShareObj) {
  const shareInstance = new Share()
  shareInstance.setShareInfo(shareData)
}
