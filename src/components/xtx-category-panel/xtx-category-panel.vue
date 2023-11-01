<script setup lang="ts">
import { ref } from 'vue'
import type { CategoryItem } from '@/types/home'
import { getHomeCategoryApi } from '@/services/home'

const categoryList = ref<CategoryItem[]>([]) // 前台分类列表
/** 获取前台分类列表数据 */
const getCategoryList = async () => {
  const res = await getHomeCategoryApi()
  categoryList.value = res.result
}
getCategoryList()
</script>

<template>
  <view class="category">
    <navigator
      v-for="item in categoryList"
      :key="item.id"
      class="category-item"
      hover-class="none"
      url="/pages/index/index"
    >
      <image class="icon" :src="item.icon"></image>
      <text class="text">{{ item.name }}</text>
    </navigator>
  </view>
</template>

<style lang="scss">
/* 前台类目 */
.category {
  margin: 20rpx 0 0;
  padding: 10rpx 0;
  display: flex;
  flex-wrap: wrap;
  min-height: 328rpx;

  .category-item {
    width: 150rpx;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    box-sizing: border-box;

    .icon {
      width: 100rpx;
      height: 100rpx;
    }
    .text {
      font-size: 26rpx;
      color: #666;
    }
  }
}
</style>
