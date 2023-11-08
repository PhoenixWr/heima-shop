import request from '@/utils/request'

/** 小程序登录参数类型 */
export type LoginParams = {
  /** 用户登录凭证(有效期5分钟) */
  code: string
  /** 包括敏感数据在内的完整用户信息的加密数据 */
  encryptedData: string
  /** 加密算法的初始向量 */
  iv: string
}

/**
 * 小程序登录
 * @param data 小程序登录参数
 */
export const postLoginWxMinApi = (data: LoginParams) =>
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
 * @param account 用户名或手机号
 * @param password 密码
 */
export const postLoginApi = (account: string, password: string) =>
  request({
    method: 'POST',
    url: '/login',
    data: { account, password },
  })
