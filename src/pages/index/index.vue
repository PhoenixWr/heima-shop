<script setup lang="ts">
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import type { BannerItem } from '@/types/home'
import { getHomeBannerApi } from '@/services/home'

const bannerList = ref<BannerItem[]>([]) // 轮播图列表
/** 获取轮播图列表数据 */
const getBannerList = async () => {
  const res = await getHomeBannerApi()
  bannerList.value = res.result
}

// 监听页面加载
onLoad(() => {
  getBannerList()
})
</script>

<template>
  <!-- 自定义导航栏 -->
  <xtx-nav-bar></xtx-nav-bar>
  <!-- 轮播图 -->
  <xtx-swiper :list="bannerList"></xtx-swiper>
  <view class="index">index</view>
</template>

<style lang="scss">
//
</style>
