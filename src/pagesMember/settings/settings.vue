<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useMemberStore } from '@/stores'

const memberStore = useMemberStore()
const { isLogin } = storeToRefs(memberStore)
// 退出登录
const logout = async () => {
  // 显示模态弹窗
  const res = await uni.showModal({
    content: '确认要退出吗',
    confirmText: '确认',
    confirmColor: '#e64340',
  })
  // 用户点击确认
  if (res.confirm) {
    // 清除用户信息
    memberStore.clearProfile()
    // 返回上一页
    uni.navigateBack()
  }
}
</script>

<template>
  <view class="viewport">
    <!-- 列表1 -->
    <view v-if="isLogin" class="list">
      <navigator url="/pagesMember/address/address" hover-class="none" class="item arrow">
        我的收货地址
      </navigator>
    </view>
    <!-- 列表2 -->
    <view class="list">
      <button hover-class="none" class="item arrow" open-type="openSetting">授权管理</button>
      <button hover-class="none" class="item arrow" open-type="feedback">问题反馈</button>
      <button hover-class="none" class="item arrow" open-type="contact">联系我们</button>
    </view>
    <!-- 列表3 -->
    <view class="list">
      <navigator hover-class="none" class="item arrow" url=" ">关于小兔鲜儿</navigator>
    </view>
    <!-- 操作按钮 -->
    <view v-if="isLogin" class="action">
      <button class="button" type="warn" hover-class="none" @tap="logout">退出登录</button>
    </view>
  </view>
</template>

<style lang="scss">
page {
  background-color: #f4f4f4;
}

.viewport {
  padding: 20rpx;
}

/* 列表 */
.list {
  padding: 0 20rpx;
  background-color: #fff;
  margin-bottom: 20rpx;
  border-radius: 10rpx;
  .item {
    line-height: 90rpx;
    padding-left: 10rpx;
    font-size: 30rpx;
    color: #333;
    border-top: 1rpx solid #ddd;
    position: relative;
    text-align: left;
    border-radius: 0;
    background-color: #fff;
    &::after {
      width: auto;
      height: auto;
      left: auto;
      border: none;
    }
    &:first-child {
      border: none;
    }
    &::after {
      right: 5rpx;
    }
  }
  .arrow::after {
    content: '\e6c2';
    position: absolute;
    top: 50%;
    color: #ccc;
    font-family: 'erabbit' !important;
    font-size: 32rpx;
    transform: translateY(-50%);
  }
}

/* 操作按钮 */
.action {
  text-align: center;
  line-height: 90rpx;
  margin-top: 40rpx;
  font-size: 32rpx;
  color: #333;
  .button {
    font-size: 32rpx;
  }
}
</style>
