const ua = navigator.userAgent.toLowerCase()
const isJX = /juexiao/i.test(ua)
const isWX = ua.match(/MicroMessenger\/([\d\.]+)/)
const isWXWork = ua.match(/wxwork/) // 企业微信
const isQQ = ua.match(/QQ\/([\d\.]+)/) // QQ
const isQZ = ua.indexOf('Qzone/') !== -1 // QQ空间
const isAndroid = /android/i.test(ua)
let isIos = /iphone|ipod|ios/i.test(ua)
let isIpad = /ipad/i.test(ua)
const isMobile = isAndroid || isIos || isIpad
const appVersion = getAppCode()
// 特殊处理 ios app安装到 ipad 的情况
if (isIpad && appVersion >= 98) {
  isIos = true
  isIpad = false
}

/**
 * 获取app版本号
 */
function getAppCode() {
  if (isJX) {
    try {
      var jxcode = ua.match(/juexiao\s*\d*/g)
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

export default {
  isJX,
  isAndroid,
  isWXWork,
  isIpad,
  isIos,
  isWX,
  isQQ,
  isQZ,
  appVersion,
  isPc: !isMobile
}
