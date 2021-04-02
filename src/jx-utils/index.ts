/**
 * 获取query中name的值
 *
 * @param {string} name
 * @return {*}  {string}
 */
export function getQueryString(name: string): string {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
  var r = window.location.search.substr(1).match(reg)
  if (r != null) {
    return decodeURIComponent(r[2])
  }
  return ''
}

/**
 * 防抖
 *
 * @param {Function} func 需要包装的函数
 * @param {number} delay 延迟时间 单位ms
 * @param {boolean} immediate 立即执行
 * @return {*}
 */
export const debounce = (func: Function, delay: number, immediate: boolean = false): Function => {
  // 小程序 和 NodeJs环境中，setTimeout 类型为 NodeJs.Timer，浏览器环境中类型为 number
  let timer: ReturnType<typeof setTimeout>
  return function(this: any, ...args: any[]) {
    if (immediate) {
      func.apply(this, args)
      immediate = false
      return
    }
    clearTimeout(timer)
    timer = setTimeout(() => func.apply(this, args), delay)
  }
}

/**
 * 节流
 *
 * @param func 函数
 * @param delay 延迟执行时间 单位ms
 */
export const throttle = (func: Function, delay: number): Function => {
  let previous = 0
  return function(this: any, ...args: any) {
    const now = new Date().getTime()
    if (now - previous < delay) return
    previous = now
    func.apply(this, args)
  }
}
const JxUtils = {
  getQueryString,
  throttle,
  debounce
}
export default JxUtils
