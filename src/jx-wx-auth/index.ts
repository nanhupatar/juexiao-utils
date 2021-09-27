/**
 * jx-wx-auth
 * Released under the MIT license
 * Date: 2021-04-01
 * Author: Yechuanjie
 * Copyright (c) Juexiao Time. All rights reserved.
 */

import { getQueryString } from '../jx-utils'
/**
 * h5统一微信授权
 *
 * @export
 * @param {string} [redirectURI=location.href] 授权登录后的回调地址
 * @return {*}  {Promise<string>}
 */
export default function JxWxAuth(redirectURI: string = location.href): Promise<string> {
  return new Promise(resolve => {
    const authCode = getQueryString('code')
    if (authCode) {
      // 直接抛出授权码给其他应用使用，不处理具体业务逻辑
      resolve(authCode)
    } else {
      // 微信跳转授权 snsapi_base 禁默 snsapi_userinfo 非禁默
      const href =
        'https://img.juexiaotime.com/userAdmin/wechat_login.html?appid=wx1b91e59ce3d2c07e' +
        '&redirect_uri=' +
        encodeURIComponent(redirectURI) +
        '&scope=snsapi_userinfo' +
        '&state='
      window.location.href = href
    }
  })
}
