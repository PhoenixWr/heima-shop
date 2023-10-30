<script setup lang="ts">
import { useMemberStore } from '@/stores'
import request from '@/utils/request' // test

const memberStore = useMemberStore()

// 网络请求测试
interface HotItem {
  id: string
  alt: string
  pictures: string[]
  target: string
  title: string
  type: string
}
const getData = async () => {
  const res = await request<HotItem[]>({
    method: 'GET',
    url: '/home/hot/mutli',
  })
  console.log(res)
}
</script>

<template>
  <view class="my">
    <view>会员信息：{{ memberStore.profile }}</view>
    <button
      @tap="
        memberStore.setProfile({
          nickname: '黑马先锋',
        })
      "
      size="mini"
      plain
      type="primary"
    >
      保存用户信息
    </button>
    <button @tap="memberStore.clearProfile()" size="mini" plain type="warn">清理用户信息</button>
    <button size="mini" type="primary" @tap="getData">网络请求测试</button>
  </view>
</template>

<style lang="scss">
//
</style>
