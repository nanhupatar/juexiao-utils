/**
 * jx-share
 * Released under the MIT license
 * Date: 2020-12-21
 * Author: Yechuanjie
 * Copyright (c) Juexiao Time. All rights reserved.
 *
 * h5微信授权
 */
import { ENV, API_LIST } from './wxauth'
import { getQueryString } from '../utils'
import { wxAuth } from '../api/api'

export default function JxWxAuth(env: ENV, redirectURI?: string) {
  return new Promise((resolve, reject) => {
    const authCode = getQueryString('code')
    const domain = API_LIST[env]
    console.info(domain)
    if (authCode) {
      wxAuth({
        code: authCode
      })
        .then(res => {
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
    } else {
      // 微信跳转授权 snsapi_base 禁默 snsapi_userinfo 非禁默
      const href =
        'https://mgame.juexiaotime.com/wxAuth/index.html?appid=wx1b91e59ce3d2c07e' +
        '&redirect_uri=' +
        encodeURIComponent(location.href) +
        '&scope=snsapi_userinfo' +
        '&state='
      window.location.href = href
    }
  })
}
