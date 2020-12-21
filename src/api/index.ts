import axios from 'axios'

let withCredentials = true
const timeout = 5000

const initAxios = () => {
  const AxiosInstance = axios.create({
    timeout,
    withCredentials
  })
  // 状态码错误信息
  AxiosInstance.interceptors.request.use(
    config => {
      config.headers = {
        common: {
          source: 'admin'
        }
      }
      return config
    },
    err => {
      return Promise.reject(err)
    }
  )
  AxiosInstance.interceptors.response.use(
    data => {
      if (data.data.code === 0 || data.data.code === '0') {
        return Promise.resolve(data.data)
      } else {
        if (data.data.code == '99999') {
          console.warn('该账号在其他地方登录')
        }
        return Promise.reject(data.data)
      }
    },
    err => {
      return Promise.reject(err)
    }
  )
  return AxiosInstance
}

export function setPublicParams() {
  return {
    mockType: 1,
    source: 'admin',
    env: 'production'
  }
}
/**
 * 统一封装request
 *
 * @export
 * @param {*} url
 * @param {*} method
 * @param {*} data
 * @returns
 */
export default function request(url, method, data) {
  const publicParams = setPublicParams()
  // 合并公共参数
  data = Object.assign({}, publicParams, data)
  const options = {
    url,
    method,
    params: method.toUpperCase() === 'GET' || method.toUpperCase() === 'DELETE' ? data : null,
    data: method.toUpperCase() === 'POST' || method.toUpperCase() === 'PUT' ? data : null
  }
  const AxiosInstance = initAxios()
  return new Promise((resolve, reject) => {
    AxiosInstance(options)
      .then(res => resolve(res.data))
      .catch(err => reject(err))
  })
}
