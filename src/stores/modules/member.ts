import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { LoginResult } from '@/types/member'

export const useMemberStore = defineStore(
  'member',
  () => {
    // 会员信息
    const profile = ref<LoginResult>()

    // 登录凭证
    const token = computed(() => profile.value?.token)
    // 登录状态
    const isLogin = computed(() => !!token.value)

    /**
     * 保存会员信息 - 用户登录
     * @param value 会员信息
     */
    const setProfile = (value: LoginResult) => {
      profile.value = value
    }
    /**
     * 清除会员信息 - 用户退出
     */
    const clearProfile = () => {
      profile.value = undefined
    }

    return { profile, token, isLogin, setProfile, clearProfile }
  },
  {
    persist: true,
  },
)
