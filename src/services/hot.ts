import request from '@/utils/request'
import type { PageParams } from '@/types/global'
import type { HotResult } from '@/types/hot'

/** 通用热门推荐接口参数类型 */
type HotParams = PageParams & {
  /** Tab项id */
  subType?: string
}
/**
 * 获取热门推荐数据通用接口 (默认查询全部 Tab 项的第1页数据)
 * @param url 请求地址
 * @param data 请求参数
 */
export const getHotRecommendApi = (url: string, data?: HotParams) =>
  request<HotResult>({
    method: 'GET',
    url,
    data,
  })
