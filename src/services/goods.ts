import request from '@/utils/request'
import type { GoodsResult } from '@/types/goods'

/**
 * 获取商品详情数据
 * @param id 商品id
 */
export const getGoodsByIdApi = (id: string) =>
  request<GoodsResult>({
    method: 'GET',
    url: '/goods',
    data: { id },
  })
