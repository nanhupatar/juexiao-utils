/**
 * jx-system
 * Released under the MIT license
 * Date: 2021-04-02
 * Author: Yechuanjie
 * Copyright (c) Juexiao Time. All rights reserved.
 *
 * 系统相关内容
 */

const ua = navigator.userAgent.toLowerCase()
const isAndroid = /android/i.test(ua)
const isJx = /juexiao/i.test(ua) // 觉晓app
const isWx = /micromessenger/i.test(ua) // 微信
const isWxWork = /wxwork/.test(ua) // 企业微信
const isQq = /QQ\/([\d\.]+)/.test(ua) // QQ
const isQz = ua.indexOf('Qzone/') > -1 // QQ空间
const isIos = /iphone|ipod|ios/i.test(ua)
const isIpad = /ipad/i.test(ua)
const isMobile = isAndroid || isIos || isIpad
const appVersion = getAppCode()
const source = getSource()

function getSource() {
  if (isJx) {
    if (isIos) return 'ios'
    if (isAndroid) return 'android'
    if (isIpad) return 'ipad'
  }
  return 'h5'
}

/**
 * 获取app版本号
 */
function getAppCode() {
  if (isJx) {
    try {
      let jxcode = ua.match(/juexiao\s*\d*/g)
      if (jxcode && jxcode[0]) {
        return Number(jxcode[0].replace(/juexiao\s*/g, ''))
      } else {
        return 0
      }
    } catch (e) {
      return -2
    }
  } else {
    return -1
  }
}

const JxSystem = {
  isJx,
  isAndroid,
  isWxWork,
  isIpad,
  isIos,
  isWx,
  isQq,
  isQz,
  appVersion,
  isPc: !isMobile,
  source
}
export default JxSystem
