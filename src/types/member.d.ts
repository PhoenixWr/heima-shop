/** 小程序登录用户信息 */
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

/** 网页登录用户信息 */
export type H5LoginResult = LoginResult & {
  /** 性别 */
  gender: string | null
  /** 生日 */
  birthday: string | null
  /** 城市编码 */
  cityCode: string | null
  /** 省份编码 */
  provinceCode: string | null
  /** 职业 */
  profession: string | null
}
