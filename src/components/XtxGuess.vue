<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { PageParams } from '@/types/global'
import type { GuessItem } from '@/types/home'
import { getHomeGoodsGuessLikeApi } from '@/services/home'

// 分页参数
const pageParams: Required<PageParams> = {
  page: 1,
  pageSize: 10,
}
// 猜你喜欢列表
const guessList = ref<GuessItem[]>([])
// 分页加载节流阀
const isLoading = ref(false)
// 分页数据加载完成标识
const isFinished = ref(false)
/** 获取猜你喜欢列表数据 */
const getGuessList = async () => {
  if (isLoading.value) return
  if (isFinished.value) {
    return uni.showToast({
      icon: 'none',
      title: '没有更多数据了~',
    })
  }
  try {
    isLoading.value = true
    const res = await getHomeGoodsGuessLikeApi(pageParams)
    isLoading.value = false
    guessList.value.push(...res.result.items)
    // 分页条件
    if (pageParams.page < res.result.pages) pageParams.page++
    else isFinished.value = true
  } catch (error) {
    isLoading.value = false
  }
}
// 直接在 setup 函数内发起的请求，因骨架屏和 template 条件渲染原因
// 会导致发起多次，这里改造为组件挂载完毕再发起请求
onMounted(() => {
  getGuessList()
})

/** 重置分页加载相关数据 */
const resetData = () => {
  pageParams.page = 1
  guessList.value = []
  isLoading.value = false
  isFinished.value = false
}

// 暴露方法
defineExpose({
  getGuessList,
  resetData,
})
</script>

<template>
  <!-- 猜你喜欢 -->
  <view class="caption">
    <text class="text">猜你喜欢</text>
  </view>
  <view class="guess">
    <navigator
      v-for="item in guessList"
      :key="item.id"
      :url="`/pages/goods/goods?id=${item.id}`"
      class="guess-item"
    >
      <image class="image" mode="aspectFill" :src="item.picture"></image>
      <view class="name">{{ item.name }}</view>
      <view class="price">
        <text class="small">¥</text>
        <text>{{ item.price }}</text>
      </view>
    </navigator>
  </view>
  <view class="loading-text">
    {{ isFinished ? '没有更多数据了' : '正在加载...' }}
  </view>
</template>

<style lang="scss">
:host {
  display: block;
}
/* 分类标题 */
.caption {
  display: flex;
  justify-content: center;
  line-height: 1;
  padding: 36rpx 0 40rpx;
  font-size: 32rpx;
  color: #262626;
  .text {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 28rpx 0 30rpx;

    &::before,
    &::after {
      content: '';
      width: 20rpx;
      height: 20rpx;
      background-image: url(@/static/images/bubble.png);
      background-size: contain;
      margin: 0 10rpx;
    }
  }
}

/* 猜你喜欢 */
.guess {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 0 20rpx;
  .guess-item {
    width: 345rpx;
    padding: 24rpx 20rpx 20rpx;
    margin-bottom: 20rpx;
    border-radius: 10rpx;
    overflow: hidden;
    background-color: #fff;
  }
  .image {
    width: 304rpx;
    height: 304rpx;
  }
  .name {
    height: 75rpx;
    margin: 10rpx 0;
    font-size: 26rpx;
    color: #262626;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .price {
    line-height: 1;
    padding-top: 4rpx;
    color: #cf4444;
    font-size: 26rpx;
  }
  .small {
    font-size: 80%;
  }
}
// 加载提示文字
.loading-text {
  text-align: center;
  font-size: 28rpx;
  color: #666;
  padding: 20rpx 0;
}
</style>
