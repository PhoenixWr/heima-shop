import request from '@/utils/request'
import type { PageResult } from '@/types/global'
import type { BannerItem, CategoryItem, HotItem, GuessItem } from '@/types/home'

/**
 * 获取轮播图数据
 * @param distributionSite 轮播图展示位置，1: 首页(默认值) 2: 商品分类页
 */
export const getHomeBannerApi = (distributionSite: 1 | 2 = 1) =>
  request<BannerItem[]>({
    method: 'GET',
    url: '/home/banner',
    data: {
      distributionSite,
    },
  })

/**
 * 获取前台分类数据
 */
export const getHomeCategoryApi = () =>
  request<CategoryItem[]>({
    method: 'GET',
    url: '/home/category/mutli',
  })

/**
 * 获取热门推荐数据
 */
export const getHomeHotApi = () =>
  request<HotItem[]>({
    method: 'GET',
    url: '/home/hot/mutli',
  })

/**
 * 获取猜你喜欢数据
 */
export const getHomeGoodsGuessLikeApi = () =>
  request<PageResult<GuessItem>>({
    method: 'GET',
    url: '/home/goods/guessLike',
  })
