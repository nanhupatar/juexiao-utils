export interface ResponseType<T> {
  code: number
  data: T
  message: string
}

/**
 * 发送post请求
 *
 * @export
 * @param {string} url
 * @param {*} [data={}]
 * @return {*}  {Promise<any>}
 */
export function postData<T>(url: string, data = {}): Promise<ResponseType<T>> {
  // Default options are marked with *
  return fetch(url, {
    body: JSON.stringify(data), // must match 'Content-Type' header
    headers: {
      'content-type': 'application/json'
    },
    method: 'POST' // *GET, POST, PUT, DELETE, etc.
  }).then(response => response.json()) // parses response to JSON
}

/**
 * 动态加载js
 *
 * @export
 * @param {string} url
 * @return {*}  {Promise<boolean>}
 */
export function loadScript(url: string): Promise<boolean> {
  return new Promise((resolve, reject) => {
    const head = document.head || document.getElementsByTagName('head')[0]
    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = url
    script.async = true
    head.appendChild(script)
    script.onload = () => resolve(true)
    script.onerror = err => reject(err)
  })
}
