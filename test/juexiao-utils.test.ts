import { JxShare, JxAppLogin } from '../src/juexiao-utils'

/**
 * test
 */
describe('test', () => {
  it('works if true is truthy', () => {
    expect(true).toBeTruthy()
  })

  it('Class is instantiable', () => {
    const jsShare = new JxShare({
      title: '',
      desc: '',
      url: '',
      icon: ''
    })
    expect(jsShare).toBeInstanceOf(JxShare)
  })
})
