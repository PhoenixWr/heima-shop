<script setup lang="ts">
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import type { BannerItem, CategoryItem, HotItem } from '@/types/home'
import type { XtxGuessInstance } from '@/types/components'
import { getHomeBannerApi, getHomeCategoryApi, getHomeHotApi } from '@/services/home'
// 导入组件
import CustomNavbar from './components/CustomNavbar.vue'
import CategoryPanel from './components/CategoryPanel.vue'
import HotPanel from './components/HotPanel.vue'
import PageSkeleton from './components/PageSkeleton.vue'

const bannerList = ref<BannerItem[]>([]) // 轮播图列表
/** 获取轮播图列表数据 */
const getBannerList = async () => {
  const res = await getHomeBannerApi()
  bannerList.value = res.result
}

const categoryList = ref<CategoryItem[]>([]) // 前台分类列表
/** 获取前台分类列表数据 */
const getCategoryList = async () => {
  const res = await getHomeCategoryApi()
  categoryList.value = res.result
}

const hotList = ref<HotItem[]>([]) // 热门推荐列表
/** 获取热门推荐列表数据 */
const getHotList = async () => {
  const res = await getHomeHotApi()
  hotList.value = res.result
}

// 页面加载状态 控制骨架屏是否展示
const isLoading = ref(false)
// 监听页面加载
onLoad(async () => {
  isLoading.value = true
  await Promise.all([getBannerList(), getCategoryList(), getHotList()])
  isLoading.value = false
})

// 猜你喜欢组件实例
const xtxGuessRef = ref<XtxGuessInstance | null>(null)
// scroll-view 滚动到底部/右边时触发
const onScrollToLower = () => {
  xtxGuessRef.value?.getGuessList()
}

// 当前自定义下拉刷新状态
const isTriggered = ref(false)
// 自定义下拉刷新被触发
const onRefresherRefresh = async () => {
  isTriggered.value = true
  // 重置猜你喜欢分页加载数据
  xtxGuessRef.value?.resetData()
  // 调用 Promise.all 方法同时发起多个异步请求
  await Promise.all([
    getBannerList(),
    getCategoryList(),
    getHotList(),
    xtxGuessRef.value?.getGuessList(),
  ])
  isTriggered.value = false
}
</script>

<template>
  <!-- 自定义导航栏 -->
  <CustomNavbar />
  <scroll-view
    scroll-y
    refresher-enabled
    :refresher-triggered="isTriggered"
    @scrolltolower="onScrollToLower"
    @refresherrefresh="onRefresherRefresh"
  >
    <!-- 骨架屏 -->
    <PageSkeleton v-if="isLoading" />
    <template v-else>
      <!-- 轮播图 -->
      <XtxSwiper :list="bannerList" />
      <!-- 分类面板 -->
      <CategoryPanel :list="categoryList" />
      <!-- 热门推荐 -->
      <HotPanel :list="hotList" />
      <!-- 猜你喜欢 -->
      <XtxGuess ref="xtxGuessRef" />
    </template>
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
