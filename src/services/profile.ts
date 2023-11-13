import request from '@/utils/request'
import type { ProfileDetail, ProfileParams } from '@/types/member'

/**
 * 获取个人信息
 */
export const getMemberProfileApi = () =>
  request<ProfileDetail>({
    method: 'GET',
    url: '/member/profile',
  })

/**
 * 修改个人信息
 * @param data 请求体参数
 */
export const putMemberProfileApi = (data: ProfileParams) =>
  request<ProfileDetail>({
    method: 'PUT',
    url: '/member/profile',
    data,
  })
