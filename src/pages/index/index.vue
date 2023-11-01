<script setup lang="ts">
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import type { BannerItem } from '@/types/home'
import { getHomeBannerApi } from '@/services/home'
// 导入组件
import CustomNavbar from './components/CustomNavbar.vue'
import CategoryPanel from './components/CategoryPanel.vue'
import HotPanel from './components/HotPanel.vue'

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
  <CustomNavbar />
  <scroll-view scroll-y>
    <!-- 轮播图 -->
    <XtxSwiper :list="bannerList" />
    <!-- 分类面板 -->
    <CategoryPanel />
    <!-- 热门推荐 -->
    <HotPanel />
    <!-- 猜你喜欢 -->
    <XtxGuess />
  </scroll-view>
</template>

<style lang="scss">
page {
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: #f7f7f7;
}
</style>
