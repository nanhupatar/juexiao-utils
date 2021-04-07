### juexiao-utils

[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release) [![Coverage Status](https://coveralls.io/repos/github/Yechuanjie/juexiao-utils/badge.svg)](https://coveralls.io/github/Yechuanjie/juexiao-utils) ![npm](https://img.shields.io/npm/v/juexiao-utils) ![npm bundle size](https://img.shields.io/bundlephobia/minzip/juexiao-utils) ![GitHub](https://img.shields.io/github/license/yechuanjie/juexiao-utils) ![GitHub top language](https://img.shields.io/github/languages/top/yechuanjie/juexiao-utils) [![Node.js Package](https://github.com/Yechuanjie/juexiao-utils/actions/workflows/action.yml/badge.svg)](https://github.com/Yechuanjie/juexiao-utils/actions/workflows/action.yml)

#### API

#### `JxSetShareInfo(shareData: ShareObj):void`

> 分享通用方法，包括微信分享、qq分享、qq空间分享、觉晓法考法硕App内部分享

##### 用法

```typescript
import { JxSetShareInfo } from 'juexiao-utils'
JxSetShareInfo({
    title: '分享标题',
    summary: '分享描述',
    pic: 'https://www.juexiaotime.com/static/img/logo.png',
    url: location.href,
    type: 1,
    base64: 'base64 ssasdsdasdasdasdasdasa==',
    swapTitleInWX: true
})
```

##### 类型定义

```typescript
export declare type ShareObj = {
    /**
     * 分享标题
     */
    title: string;
    /**
     * 分享内容
     */
    summary: string;
    /**
     * 分享图片
     */
    pic: string;
    /**
     * 分享链接
     */
    url: string;
    /**
     * 分享类型 仅在觉晓app内有效 不传默认为2
     * @type {(1 | 2)} 1 分享图片 2 分享链接
     */
    type?: 1 | 2;
    /**
     * 分享图片的base64 仅在觉晓app内有效 一般用于canvas生成图片后直接分享图片
     */
    base64?: string;
    /**
     * 是否标题内容互换（仅朋友圈，因朋友圈内只显示标题）
     */
    swapTitleInWX?: boolean;
};
```

#### `JxAppLogin(): Promise<UserInfo>`

> app内打开h5，自动获取登录信息

##### 用法

```typescript
import { JxAppLogin } from 'juexiao-utils'
JxAppLogin().then(res=> {
    const userInfo = res
})
```

##### 类型定义

```typescript
declare type UserInfo = {
  /**
   * 用户id
   */
  id: number
  /**
   * 登录token
   */
  token: string | null
  [key: string]: any
}
```

#### `JxWxAuth(redirectURI: string = location.href): Promise<string>`

> 此方法用于统一微信授权，promise返回授权码

##### 用法

```typescript
import { JxWxAuth } from 'juexiao-utils'
JxWxAuth().then(code=> {
    // 通过授权码向服务端换取用户信息
    // loginByCode 需自行封装请求，这里只做演示
    loginByCode({code}).then(res=> {
        const userInfo = res
    })
    
})
```

##### `redirectURI`

授权回调地址，默认为当前页面地址，授权成功后，会在 `redirectURI` 后携带参数 `?code=xxxxx`，请避免回调页面的业务中使用 `code` 作为 `query` 参数

#### `JxSystem`

> 系统基础信息

##### 用法

```typescript
import { JxSystem } from 'juexiao-utils'

if (JxSystem.jsJx && JxSystem.jsIos) {
    console.info('juexiao ios app')
}
```

##### 类型定义

```typescript
/**
 * 系统信息
 */
declare const JxSystem: {
    isJx: boolean; //觉晓法考法硕app
    isAndroid: boolean; // 安卓 
    isWxWork: boolean; // 企业微信
    isIpad: boolean; // ipad
    isIos: boolean; // iphone | ipod
    isWx: boolean; // 微信
    isQq: boolean; // qq
    isQz: boolean; // qq空间
    appVersion: number; // 觉晓法考法硕app版本号，其他环境默认为-1
    isPc: boolean; // pc
    // h5需使用app内环境请求时需要指定为对应端的source，如app内嵌h5支付
    source: string; // ios | ipad | android | h5
};
```

#### `JxUtils`

> 添加一些公用的基础方法，后续有新的方法可以往这里新增

##### 用法

```typescript
import { JxUtils } from 'juexiao-utils'

function getData() {
    return new Promise((resolve) => {
        setTimeout(()=> {resolve([1])}, 500)
    })
}
JxUtils.throttle(getData, 2000)
JxUtils.debounce(getData, 2000, false)
```

##### 类型定义

```typescript
declare const JxUtils: {
    getQueryString: typeof getQueryString;
    throttle: (func: Function, delay: number) => Function;
    debounce: (func: Function, delay: number, immediate?: boolean) => Function;
};
```


