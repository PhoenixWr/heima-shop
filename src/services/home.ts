import request from '@/utils/request'
import type { BannerItem, CategoryItem } from '@/types/home'

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
