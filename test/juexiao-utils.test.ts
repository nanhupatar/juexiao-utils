import { JxSetShareInfo, JxSystem, JxUtils, JxWxAuth, JxAppLogin } from '../src/juexiao-utils'

describe('test juexiao-utils', () => {
  test('test JxSetShareInfo', () => {
    expect(
      JxSetShareInfo({
        title: '测试标题',
        summary: '测试副标题',
        url: 'https://www.baidu.com',
        pic: 'https://img.juexiaotime.com/miniprogram/chooseSchool/blue-circle.png',
        type: 1,
        base64: 'base64 dsads==',
        swapTitleInWX: Math.random() > 0.5
      })
    )
  })

  test('test JxSystem', () => {
    expect(JxSystem).toHaveProperty('source')
  })

  test('test JxUtils ', () => {
    const queryName = JxUtils.getQueryString('name')
    expect(queryName)
  })
})
