declare global {
  interface Window {
    wx: any
    mqq: any
    QZAppExternal: any
    juexiaoAndroid: {
      getUserInfo(): string
      /**
       * app分享
       *
       * @param {string} title 分享标题
       * @param {string} content 分享描述
       * @param {string} url 分享url
       * @param {string} base64 type为1时，必须传入base64
       * @param {(1 | 2)} type 1 分享图片  2 分享url
       */
      shareFunWish(
        title: string,
        content: string,
        url: string,
        base64: string | undefined,
        type: 1 | 2
      ): void
    }
    webkit: any
    setJxUserInfo(info: any): void
  }
}
export {}
