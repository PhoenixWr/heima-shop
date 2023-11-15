<script setup lang="ts">
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import dayjs from 'dayjs'
import type { Data } from '@/types/global'
import type { Gender, ProfileDetail, ProfileParams } from '@/types/member'
import { useMemberStore } from '@/stores'
import { getMemberProfileApi, putMemberProfileApi } from '@/services/profile'
import { useNavBarAdaptive } from '@/composables'

// 自定义导航栏安全区域自适应处理
const { paddingTop } = useNavBarAdaptive()

// 点击返回按钮返回上一页
const navigateBack = () => {
  // H5端页面刷新后页面栈会消失，导致 uni.navigateBack 失效
  // #ifdef H5
  history.back()
  // #endif
  // #ifndef H5
  uni.navigateBack()
  // #endif
}

// 注意：修改个人信息涉及双向绑定必须提供初始值
// 使用类型断言指定空对象的类型
const profile = ref({} as ProfileDetail) // 个人信息数据
// 获取个人信息数据
const getMemberProfileData = async () => {
  const res = await getMemberProfileApi()
  profile.value = res.result
}

// 监听页面加载
onLoad(() => {
  getMemberProfileData()
})

const memberStore = useMemberStore()
// 修改头像
const modifyAvatar = () => {
  // #ifdef MP-WEIXIN
  uni.chooseMedia({
    count: 1, // 最多可以选择的文件个数
    mediaType: ['image'], // 文件类型
    success: async (res) => {
      // 本地临时文件路径
      const { tempFilePath } = res.tempFiles[0]
      uploadFile(tempFilePath)
    },
  })
  // #endif

  // #ifdef H5 || APP-PLUS
  uni.chooseImage({
    count: 1,
    success: (res) => {
      const filePath = res.tempFilePaths[0]
      uploadFile(filePath)
    },
  })
  // #endif
}

// 上传头像文件
const uploadFile = async (filePath: string) => {
  const response = await uni.uploadFile({
    url: '/member/profile/avatar',
    name: 'file',
    filePath,
  })
  if (response.statusCode !== 200) {
    return uni.showToast({ icon: 'error', title: '头像更新失败' })
  }
  const data: Data<{ avatar: string }> = JSON.parse(response.data)
  const avatar = data.result.avatar // 服务器返回头像信息
  // 个人信息页数据更新
  profile.value!.avatar = avatar
  // store个人信息用户头像同步更新
  memberStore.setAvatar(avatar)
  uni.showToast({ icon: 'success', title: '头像更新成功' })
}

// 修改性别
const onRadioGroupChange: UniHelper.RadioGroupOnChange = (event) => {
  profile.value.gender = event.detail.value as Gender
}

// 修改生日
const onDatePickerChange: UniHelper.DatePickerOnChange = (event) => {
  profile.value.birthday = event.detail.value
}

// 修改城市
let regionCode: [string, string, string] | null = null // 统计用区划代码
const onRegionPickerChange: UniHelper.RegionPickerOnChange = (event) => {
  // 页面展示用户选择的地区信息
  profile.value.fullLocation = event.detail.value.join(' ')
  // 存储统计用区划代码(用于后端请求修改城市)
  regionCode = event.detail.code!
}

// 保存按钮 loading 效果
const isLoading = ref(false)
// 点击保存修改个人信息
const modifyProfile = async () => {
  const { nickname, gender, birthday, profession } = profile.value
  // 修改个人信息接口请求参数
  const params: ProfileParams = {
    nickname: nickname?.trim(),
    gender,
    birthday,
    profession: profession?.trim(),
  }
  // 用户修改城市信息时请求参数再追加相关字段
  if (regionCode) {
    const [provinceCode, cityCode, countyCode] = regionCode
    Object.assign(params, { provinceCode, cityCode, countyCode })
  }
  try {
    isLoading.value = true
    const res = await putMemberProfileApi(params)
    isLoading.value = false
    // store个人信息昵称同步更新
    memberStore.setNickname(res.result.nickname!)
    uni.showToast({ icon: 'success', title: '保存成功' })
    setTimeout(() => {
      // #ifdef H5
      history.back()
      // #endif
      // #ifndef H5
      uni.navigateBack()
      // #endif
    }, 600)
  } catch (error) {
    isLoading.value = false
  }
}

// #ifdef H5 || APP-PLUS
// H5端和APP点击城市信息提示用户
const onRegionPickerTap = () => {
  uni.showToast({ icon: 'none', title: '当前平台不支持修改城市' })
}
// #endif
</script>

<template>
  <view class="viewport">
    <!-- 导航栏 -->
    <view class="navbar" :style="{ paddingTop: paddingTop }">
      <view class="back icon-left" @tap="navigateBack"></view>
      <view class="title">个人信息</view>
    </view>
    <!-- 头像 -->
    <view class="avatar">
      <view class="avatar-content" @tap="modifyAvatar">
        <image class="image" :src="profile?.avatar" mode="aspectFill" />
        <text class="text">点击修改头像</text>
      </view>
    </view>
    <!-- 表单 -->
    <view class="form">
      <!-- 表单内容 -->
      <view class="form-content">
        <view class="form-item">
          <text class="label">账号</text>
          <text class="account">{{ profile?.account }}</text>
        </view>
        <view class="form-item">
          <text class="label">昵称</text>
          <input
            v-model="profile.nickname"
            class="input"
            type="nickname"
            placeholder="请填写昵称"
          />
        </view>
        <view class="form-item">
          <text class="label">性别</text>
          <radio-group @change="onRadioGroupChange">
            <label class="radio">
              <radio value="男" color="#27ba9b" :checked="profile?.gender === '男'" />
              男
            </label>
            <label class="radio">
              <radio value="女" color="#27ba9b" :checked="profile?.gender === '女'" />
              女
            </label>
          </radio-group>
        </view>
        <view class="form-item">
          <text class="label">生日</text>
          <picker
            class="picker"
            mode="date"
            start="1900-01-01"
            :end="dayjs().format('YYYY-MM-DD')"
            :value="profile?.birthday"
            @change="onDatePickerChange"
          >
            <view v-if="profile?.birthday">{{ profile.birthday }}</view>
            <view class="placeholder" v-else>请选择日期</view>
          </picker>
        </view>
        <!-- #ifdef MP-WEIXIN -->
        <view class="form-item">
          <text class="label">城市</text>
          <picker
            class="picker"
            mode="region"
            :value="profile?.fullLocation?.split(' ')"
            @change="onRegionPickerChange"
          >
            <view v-if="profile?.fullLocation">{{ profile.fullLocation }}</view>
            <view class="placeholder" v-else>请选择城市</view>
          </picker>
        </view>
        <!-- #endif -->
        <!-- #ifdef H5 || APP-PLUS -->
        <view class="form-item">
          <text class="label">城市</text>
          <view class="picker" @tap="onRegionPickerTap">
            <text class="region">
              {{ profile.fullLocation || '暂无城市信息' }}
            </text>
          </view>
        </view>
        <!-- #endif -->
        <view class="form-item">
          <text class="label">职业</text>
          <input v-model="profile.profession" class="input" type="text" placeholder="请填写职业" />
        </view>
      </view>
      <!-- 提交按钮 -->
      <button class="form-button" :loading="isLoading" @tap="modifyProfile">保 存</button>
    </view>
  </view>
</template>

<style lang="scss">
page {
  background-color: #f4f4f4;
}

.viewport {
  display: flex;
  flex-direction: column;
  height: 100%;
  background-image: url(https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/images/order_bg.png);
  background-size: auto 420rpx;
  background-repeat: no-repeat;
}

// 导航栏
.navbar {
  position: relative;

  .title {
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    font-weight: 500;
    color: #fff;
  }

  .back {
    position: absolute;
    height: 40px;
    width: 40px;
    left: 0;
    font-size: 20px;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

// 头像
.avatar {
  text-align: center;
  width: 100%;
  height: 260rpx;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .image {
    width: 160rpx;
    height: 160rpx;
    border-radius: 50%;
    background-color: #eee;
  }

  .text {
    display: block;
    padding-top: 20rpx;
    line-height: 1;
    font-size: 26rpx;
    color: #fff;
  }
}

// 表单
.form {
  background-color: #f4f4f4;

  &-content {
    margin: 20rpx 20rpx 0;
    padding: 0 20rpx;
    border-radius: 10rpx;
    background-color: #fff;
  }

  &-item {
    display: flex;
    height: 96rpx;
    line-height: 46rpx;
    padding: 25rpx 10rpx;
    background-color: #fff;
    font-size: 28rpx;
    border-bottom: 1rpx solid #ddd;

    &:last-child {
      border: none;
    }

    .label {
      width: 180rpx;
      color: #333;
    }

    .account,
    .region {
      color: #666;
    }

    .input {
      flex: 1;
      display: block;
      height: 46rpx;
    }

    .radio {
      margin-right: 20rpx;
    }

    .picker {
      flex: 1;
    }
    .placeholder {
      color: #808080;
    }
  }

  &-button {
    height: 80rpx;
    text-align: center;
    line-height: 80rpx;
    margin: 30rpx 20rpx;
    color: #fff;
    border-radius: 80rpx;
    font-size: 30rpx;
    background-color: #27ba9b;
  }
}
</style>
