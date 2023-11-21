import request from '@/utils/request'
import type { AddressParams } from '@/types/address'

/**
 * 添加收货地址
 * @param data 请求体参数
 */
export const postMemberAddressApi = (data: AddressParams) =>
  request({
    method: 'POST',
    url: '/member/address',
    data,
  })
