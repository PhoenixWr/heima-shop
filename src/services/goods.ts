import request from '@/utils/request'

/**
 * 获取商品详情数据
 * @param id 商品id
 */
export const getGoodsByIdApi = (id: string) =>
  request({
    method: 'GET',
    url: '/goods',
    data: { id },
  })
