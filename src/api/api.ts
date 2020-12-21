import http from './index'
/**
 * 通过code 授权登录
 */
export const wxAuth = params => http('/userapi/login/wx/login/code', 'GET', params)
