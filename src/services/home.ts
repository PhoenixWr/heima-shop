// 首页接口请求模块
import request from '@/utils/request'
import type { BannerItem } from '@/types/home'

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
