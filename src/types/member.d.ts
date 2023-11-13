/** 通用用户信息 */
export type BaseProfile = {
  /** 用户id */
  id: string
  /** 头像 */
  avatar: string
  /** 昵称 */
  nickname?: string
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
  gender?: Gender
  /** 生日 */
  birthday?: string
  /** 城市编码 */
  cityCode?: string
  /** 省份编码 */
  provinceCode?: string
  /** 职业 */
  profession?: string
}

/** 性别 */
export type Gender = '男' | '女' | '未知'
/** 个人信息 用户详情信息 */
export type ProfileDetail = BaseProfile & {
  /** 性别 */
  gender?: Gender
  /** 生日 */
  birthday?: string
  /** 省市区 */
  fullLocation?: string
  /** 职业 */
  profession?: string
}

/** 修改个人信息请求体参数类型 */
export type ProfileParams = Pick<
  ProfileDetail,
  'nickname' | 'gender' | 'birthday' | 'profession'
> & {
  /** 省份编码 */
  provinceCode?: string
  /** 城市编码 */
  cityCode?: string
  /** 区/县编码 */
  countyCode?: string
}
