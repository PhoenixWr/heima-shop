/** 通用用户信息 */
export type BaseProfile = {
  /** 用户id */
  id: string
  /** 头像 */
  avatar: string
  /** 昵称 */
  nickname: string | null
  /** 账号名称 */
  account: string
}

/** 小程序登录用户信息 */
export type LoginResult = BaseProfile & {
  /** 手机号 */
  mobile: string
  /** 登录凭证 */
  token: string
}

/** 网页登录用户信息 */
export type H5LoginResult = LoginResult & {
  /** 性别 */
  gender: Gender | null
  /** 生日 */
  birthday: string | null
  /** 城市编码 */
  cityCode: string | null
  /** 省份编码 */
  provinceCode: string | null
  /** 职业 */
  profession: string | null
}

/** 性别 */
export type Gender = '男' | '女' | '未知'
/** 个人信息 用户详情信息 */
export type ProfileDetail = BaseProfile & {
  /** 性别 */
  gender: Gender | null
  /** 生日 */
  birthday: string | null
  /** 省市区 */
  fullLocation: string
  /** 职业 */
  profession: string | null
}
