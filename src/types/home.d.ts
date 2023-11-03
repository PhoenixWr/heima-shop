import type { GoodsItem } from './global'

/** 首页-轮播图数据类型 */
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

/** 首页-前台分类数据类型 */
export type CategoryItem = {
  /** id */
  id: string
  /** 分类名称 */
  name: string
  /** 图标路径 */
  icon: string
}

/** 首页-热门推荐数据类型 */
export type HotItem = {
  /** id */
  id: string
  /** 推荐说明 */
  alt: string
  /** 图片路径集合 */
  pictures: string[]
  /** 跳转地址 */
  target: string
  /** 推荐标题 */
  title: string
  /** 推荐类型 */
  type: number
}

/** 首页-猜你喜欢-商品类型 */
export type GuessItem = GoodsItem
