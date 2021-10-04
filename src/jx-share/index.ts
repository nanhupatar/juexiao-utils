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
import { ShareObj, JsApiConfig, ShareDataType, ShareOption } from './share'
import WxShare from './wxShare'
import QQShare from './qqShare'
import QZShare from './qzShare'
import JXShare from './jxShare'

export class JxShare {
  private static instance: JxShare
  private apiLink = ''
  private appKey = 'wx'
  constructor(options: ShareOption) {
    if (!JxShare.instance) {
      this.apiLink = this.getApiLink(options.env)
      console.info(this.apiLink)
      this.appKey = options.appKey
      JxShare.instance = this
    }
    return JxShare.instance
  }
  private getApiLink(env: ShareOption['env']) {
    let domain = env === 'production' ? 'userapi' : 'inuserdevapi'
    return `https://${domain}.juexiaotime.com/jxuserapi/wechat/getJsApi`
  }
  private async getJsApi() {
    const data = await postData<JsApiConfig>(this.apiLink, {
      url: window.location.href,
      appKey: this.appKey
    })
    return data.data
  }
  private init(shareData: ShareDataType) {
    JxSystem.isWx && WxShare(shareData)
    JxSystem.isQq && QQShare(shareData)
    JxSystem.isQz && QZShare(shareData)
    JxSystem.isJx && JXShare(shareData)
  }
  public setShareInfo(shareData: ShareObj) {
    if (JxSystem.isWx) {
      this.getJsApi()
        .then(config => {
          const data = {
            ...shareData,
            WXconfig: {
              swapTitleInWX: shareData.swapTitleInWX,
              ...config
            }
          }
          this.init(data)
        })
        .catch(err => {
          throw new Error(err)
        })
    } else {
      this.init(shareData)
    }
  }
}

export default function JxSetShareInfo(shareData: ShareObj) {
  const shareInstance = new JxShare({ appKey: 'wx', env: 'production' })
  shareInstance.setShareInfo(shareData)
}
