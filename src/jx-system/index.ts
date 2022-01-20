/**
 * jx-system
 * Released under the MIT license
 * Date: 2021-04-02
 * Author: Yechuanjie
 * Copyright (c) Juexiao Time. All rights reserved.
 *
 */

export const JxSystemInfo = () => {
  const ua = navigator.userAgent.toLowerCase()
  const isAndroid = /android/i.test(ua)
  const isJx = /juexiao/i.test(ua) // 觉晓app
  const isWx = /micromessenger/i.test(ua) // 微信
  const isWxWork = /wxwork/.test(ua) // 企业微信
  const isQq = /QQ\/([\d\.]+)/.test(ua) // QQ
  const isQz = ua.indexOf('Qzone/') > -1 // QQ空间
  const isIos = /iphone|ipod|ios/i.test(ua)
  const isIpad = /ipad/i.test(ua)
  const isByteDance = /bytedancewebview/i.test(ua) // 字节跳动
  const isTickTok = /ttwebview/i.test(ua) // 抖音
  const isMobile = isAndroid || isIos || isIpad
  const appVersion = getAppCode()
  const source = getSource()
  const sysId = getSysId()
  const mockType = getMockTypeInApp()
  /**
   * 获取app内的系统id
   *
   * @returns {number | null} sysId
   */
  function getSysId() {
    if (!isJx) return null
    const userAgent = navigator.userAgent
    const sysIdReg = /sysId_[0-9]{1,10}/
    if (sysIdReg.test(userAgent)) {
      const sysIdString = userAgent.match(sysIdReg)
      const sysId = sysIdString && sysIdString[0].replace('sysId_', '')
      return Number(sysId)
    }
    return null // 默认返回null
  }

  /**
   * 获取app内的mockType
   *
   * @returns {number} mockType 法考 1 法硕 2 cpa null
   */
  function getMockTypeInApp() {
    const sysIds = {
      5: 1,
      3: 2,
      6: null
    }
    return sysId ? sysIds[sysId] : null
  }

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
  /**
   * 系统信息
   */
  return {
    isJx,
    isAndroid,
    isWxWork,
    isIpad,
    isIos,
    isWx,
    isQq,
    isQz,
    isByteDance,
    isTickTok,
    appVersion,
    isMobile,
    isPc: !isMobile,
    source,
    sysId,
    mockType
  }
}

export default JxSystemInfo()
