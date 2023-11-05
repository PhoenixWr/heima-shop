import request from '@/utils/request'
import type { CategoryTopItem } from '@/types/category'

/**
 * 获取分类列表数据
 */
export const getCategoryTopApi = () =>
  request<CategoryTopItem[]>({
    method: 'GET',
    url: '/category/top',
  })
