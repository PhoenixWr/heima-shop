// 首页数据类型声明

/** 首页轮播图数据类型 */
export type BannerItem = {
  /** id */
  id: string
  /** 图片链接 */
  imgUrl: string
  /** 跳转链接 */
  hrefUrl: string
  /** 跳转类型 1: 页面 2: H5 3: 小程序 */
  type: number
}
