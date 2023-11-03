import request from '@/utils/request'
import type { PageParams } from '@/types/global'

/** 通用热门推荐接口参数类型 */
type HotParams = PageParams & {
  /** Tab项id */
  subType?: string
}
/**
 * 获取热门推荐数据通用接口
 * @param url 请求地址
 * @param data 请求参数
 */
export const getHotRecommendApi = (url: string, data?: HotParams) =>
  request({
    method: 'GET',
    url,
    data,
  })
