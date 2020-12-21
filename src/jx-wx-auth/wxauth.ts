/**
 * 所在环境
 * 本地 | release | dev | 线上
 * */
export type ENV = 'development' | 'release' | 'dev' | 'production'

export enum API_LIST {
  dev = '//devapi.juexiaotime.com',
  release = '//relmb.juexiaotime.com',
  production = '//api.juexiaotime.com',
  development = '//relmb.juexiaotime.com'
}
