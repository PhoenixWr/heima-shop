import request from '@/utils/request'
import type { ProfileDetail } from '@/types/member'

/**
 * 获取个人信息
 */
export const getMemberProfileApi = () =>
  request<ProfileDetail>({
    method: 'GET',
    url: '/member/profile',
  })
