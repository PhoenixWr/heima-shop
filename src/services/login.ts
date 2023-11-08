import request from '@/utils/request'

/** 小程序登录参数类型 */
export type MPLoginParams = {
  /** 用户登录凭证(有效期5分钟) */
  code: string
  /** 包括敏感数据在内的完整用户信息的加密数据 */
  encryptedData: string
  /** 加密算法的初始向量 */
  iv: string
}

/** 网页端登录参数类型 */
type H5LoginParams = {
  /** 用户名或手机号 */
  account: string
  /** 密码 */
  password: string
}

/**
 * 小程序登录
 * @param data 小程序登录参数
 */
export const postLoginWxMinApi = (data: MPLoginParams) =>
  request({
    method: 'POST',
    url: '/login/wxMin',
    data,
  })

/**
 * 小程序登录-内测版
 * @param phoneNumber 模拟手机号码
 */
export const postLoginWxMinSimpleApi = (phoneNumber: string) =>
  request({
    method: 'POST',
    url: '/login/wxMin/simple',
    data: { phoneNumber },
  })

/**
 * 传统登录-用户名+密码
 * @param data 网页端登录参数
 */
export const postLoginApi = (data: H5LoginParams) =>
  request({
    method: 'POST',
    url: '/login',
    data,
  })
