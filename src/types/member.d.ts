/** 小程序登录 登录用户信息 */
export type LoginResult = {
  /** 用户id */
  id: string
  /** 手机号 */
  mobile: string
  /** 登录凭证 */
  token: string
  /** 昵称 */
  nickname: string | null
  /** 头像 */
  avatar: string
  /** 用户名 */
  account: string
}
