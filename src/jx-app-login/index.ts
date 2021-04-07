/**
 * jx-app-login
 * Released under the MIT license
 * Date: 2021-04-02
 * Author: Yechuanjie
 * Copyright (c) Juexiao Time. All rights reserved.
 */
import JxSystem from '../jx-system'

type UserInfo = {
  /**
   * 用户id
   */
  id: number
  /**
   * 登录token
   */
  token: string | null
  [key: string]: any
}

/**
 * h5在app内打开 自动获取登录信息
 *
 * @export
 * @return {*}  {Promise<Object>}
 */
export default function JxAppLogin(): Promise<UserInfo> {
  // const cutomWindow: ICustomWindow = window
  return new Promise((resolve, reject) => {
    if (JxSystem.isJx) {
      if (JxSystem.isAndroid) {
        const info = window.juexiaoAndroid.getUserInfo()
        resolve(JSON.parse(info))
      }
      if (JxSystem.isIos || JxSystem.isIpad) {
        const userAgent = navigator.userAgent
        const ruserIdReg = /ruserId_[0-9]{1,10}/
        const tokenReg = /token_[A-Za-z0-9]+$/
        if (ruserIdReg.test(userAgent)) {
          const matchRuserId = userAgent.match(ruserIdReg)
          const matchToken = userAgent.match(tokenReg)
          const ruserId = matchRuserId && matchRuserId[0].replace('ruserId_', '')
          const token = matchToken && matchToken[0].replace('token_', '')
          resolve({
            id: Number(ruserId),
            token
          })
        } else {
          window.webkit.messageHandlers.getJxUserInfo.postMessage(null)
          // 提供setJxUserInfo回调方法
          window.setJxUserInfo = info => {
            resolve(JSON.parse(info))
          }
        }
      }
    } else {
      reject('请在APP内调用')
    }
  })
}
