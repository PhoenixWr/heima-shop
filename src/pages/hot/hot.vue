<script setup lang="ts">
import { ref, computed } from 'vue'
import { onLoad, onReady } from '@dcloudio/uni-app'
import type { SubTypeItem } from '@/types/hot'
import { getHotRecommendApi } from '@/services/hot'

// 热门推荐页 标题和url
const hotMap = [
  { type: '1', title: '特惠推荐', url: '/hot/preference' },
  { type: '2', title: '爆款推荐', url: '/hot/inVogue' },
  { type: '3', title: '一站买全', url: '/hot/oneStop' },
  { type: '4', title: '新鲜好物', url: '/hot/new' },
]

// uniapp 获取页面参数
const query = defineProps<{
  type: string
}>()
// 页面信息 包含导航栏标题以及url
const pageInfo = computed(() => hotMap.find((item) => item.type === query.type))
// 监听页面初次渲染完成
onReady(() => {
  // 动态设置页面导航栏标题
  uni.setNavigationBarTitle({
    title: pageInfo.value!.title,
  })
})

/** 子类选项追加用于优化的字段 */
type SubTypeItemPerf = SubTypeItem & {
  /** 分页数据加载完成标识 */
  isFinished?: boolean
  /** 分页加载节流阀 */
  isLoading?: boolean
}
const bannerPicture = ref('') // 推荐封面图
const subTypes = ref<SubTypeItemPerf[]>([]) // 推荐选项
const activeIndex = ref(0) // 推荐选项激活项索引
// 获取热门推荐数据
const getHotRecommendData = async () => {
  const res = await getHotRecommendApi(pageInfo.value!.url, {
    // 技巧：使用 Vite 环境变量 => 开发环境下修改页码值方便调试
    // page: import.meta.env.DEV ? 30 : 1,
  })
  bannerPicture.value = res.result.bannerPicture
  subTypes.value = res.result.subTypes
}
// 监听页面加载
onLoad(() => {
  getHotRecommendData()
})

/**
 * scroll-view 滚动到底部/右边触发回调函数
 * @param item 当前被激活的推荐选项对象的引用变量
 */
const onScrolltolower = async (item: SubTypeItemPerf) => {
  if (item.isLoading) return
  if (item.isFinished) {
    return uni.showToast({
      icon: 'none',
      title: '没有更多数据了~',
    })
  }
  // 页码值加1
  item.goodsItems.page++
  try {
    item.isLoading = true
    // 请求分页数据
    const res = await getHotRecommendApi(pageInfo.value!.url, {
      subType: item.id,
      page: item.goodsItems.page,
      pageSize: item.goodsItems.pageSize,
    })
    item.isLoading = false
    const { items, page, pages } = res.result.subTypes[activeIndex.value].goodsItems
    // 追加分页数据
    item.goodsItems.items.push(...items)
    // 分页结束判断条件
    if (page >= pages) {
      // 修改分页加载结束标识
      item.isFinished = true
    }
  } catch (error) {
    // 重置分页加载节流阀状态
    item.isLoading = false
  }
}
</script>

<template>
  <view class="viewport">
    <!-- 推荐封面图 -->
    <view class="cover">
      <image :src="bannerPicture"></image>
    </view>
    <!-- 推荐选项 -->
    <view class="tabs">
      <text
        v-for="(item, index) in subTypes"
        :key="item.id"
        class="text"
        :class="{ active: index === activeIndex }"
        @tap="activeIndex = index"
        >{{ item.title }}</text
      >
    </view>
    <!-- 推荐列表 -->
    <scroll-view
      v-show="index === activeIndex"
      v-for="(item, index) in subTypes"
      :key="item.id"
      scroll-y
      class="scroll-view"
      @scrolltolower="onScrolltolower(item)"
    >
      <view class="goods">
        <navigator
          hover-class="none"
          class="navigator"
          v-for="goods in item.goodsItems.items"
          :key="goods.id"
          :url="`/pages/goods/goods?id=${goods.id}`"
        >
          <image class="thumb" :src="goods.picture"></image>
          <view class="name ellipsis">{{ goods.name }}</view>
          <view class="price">
            <text class="symbol">¥</text>
            <text class="number">{{ goods.price }}</text>
          </view>
        </navigator>
      </view>
      <view class="loading-text">
        {{ item.isFinished ? '没有更多数据了' : '正在加载...' }}
      </view>
    </scroll-view>
  </view>
</template>

<style lang="scss">
page {
  height: 100%;
  background-color: #f4f4f4;
}
.viewport {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 180rpx 0 0;
  position: relative;
}
.cover {
  width: 750rpx;
  height: 225rpx;
  border-radius: 0 0 40rpx 40rpx;
  overflow: hidden;
  position: absolute;
  left: 0;
  top: 0;
}
.scroll-view {
  flex: 1;
}
.tabs {
  display: flex;
  justify-content: space-evenly;
  height: 100rpx;
  line-height: 90rpx;
  margin: 0 20rpx;
  font-size: 28rpx;
  border-radius: 10rpx;
  box-shadow: 0 4rpx 5rpx rgba(200, 200, 200, 0.3);
  color: #333;
  background-color: #fff;
  position: relative;
  z-index: 9;
  .text {
    margin: 0 20rpx;
    position: relative;
  }
  .active {
    &::after {
      content: '';
      width: 40rpx;
      height: 4rpx;
      transform: translate(-50%);
      background-color: #27ba9b;
      position: absolute;
      left: 50%;
      bottom: 24rpx;
    }
  }
}
.goods {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 0 20rpx 20rpx;
  .navigator {
    width: 345rpx;
    padding: 20rpx;
    margin-top: 20rpx;
    border-radius: 10rpx;
    background-color: #fff;
  }
  .thumb {
    width: 305rpx;
    height: 305rpx;
  }
  .name {
    height: 88rpx;
    font-size: 26rpx;
  }
  .price {
    line-height: 1;
    color: #cf4444;
    font-size: 30rpx;
  }
  .symbol {
    font-size: 70%;
  }
  .decimal {
    font-size: 70%;
  }
}

.loading-text {
  text-align: center;
  font-size: 28rpx;
  color: #666;
  padding: 20rpx 0 50rpx;
}
</style>
