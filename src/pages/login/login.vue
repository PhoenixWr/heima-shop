<script setup lang="ts">
import { ref } from 'vue'
import { onUnload } from '@dcloudio/uni-app'
import { useMemberStore } from '@/stores'
import type { LoginResult } from '@/types/member'
import { postLoginWxMinSimpleApi } from '@/services/login'
// #ifdef H5
import { postLoginApi } from '@/services/login'
// #endif
// #ifdef MP
import { onLoad } from '@dcloudio/uni-app'
import { postLoginWxMinApi } from '@/services/login'
// #endif

// 登录按钮加载状态
const isLoading = ref(false)
// #ifdef H5
const account = ref('') // 账号
const password = ref('') // 密码
// 网页端登录
const h5Login = async () => {
  const trimAccount = account.value.trim()
  const trimPassword = password.value.trim()
  if (!trimAccount || !trimPassword) {
    return uni.showToast({ icon: 'none', title: '请输入用户名和密码' })
  }
  if (trimPassword.length < 6 || trimPassword.length > 20) {
    return uni.showToast({ icon: 'none', title: '密码长度在 6-20 位之间' })
  }
  try {
    isLoading.value = true
    const res = await postLoginApi(trimAccount, trimPassword)
    isLoading.value = false
    loginSuccess(res.result)
  } catch (error) {
    isLoading.value = false
  }
}
// #endif

// #ifdef MP
// 获取用户登录凭证
let code = '' // 用户登录凭证
onLoad(async () => {
  const res = await uni.login()
  code = res.code
})

// 小程序端授权登录
const mpLogin: UniHelper.ButtonOnGetphonenumber = async (event) => {
  if (event.detail.errMsg) {
    return uni.showToast({ icon: 'error', title: '登录失败' })
  }
  try {
    isLoading.value = true
    // 调用小程序登录接口
    const res = await postLoginWxMinApi({
      code,
      encryptedData: event.detail.encryptedData!,
      iv: event.detail.iv!,
    })
    isLoading.value = false
    loginSuccess(res.result)
  } catch (error) {
    isLoading.value = false
  }
}
// #endif

// 模拟手机号快捷登录(开发测试)
const mpLoginSimple = async () => {
  const res = await postLoginWxMinSimpleApi('13592028823')
  loginSuccess(res.result)
}

let timer: number | null = null // 定时器id
// 通用登录成功后业务处理函数
const loginSuccess = (profile: LoginResult) => {
  // 存储用户信息
  const { setProfile } = useMemberStore()
  setProfile(profile)
  // 登录成功提示
  uni.showToast({ icon: 'success', title: '登录成功' })
  timer = setTimeout(() => {
    // 页面跳转
    uni.switchTab({ url: '/pages/my/my' })
  }, 600)
}

// 监听页面卸载
onUnload(() => {
  timer && clearTimeout(timer)
})
</script>

<template>
  <view class="viewport">
    <view class="logo">
      <image
        src="https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/images/logo_icon.png"
      ></image>
    </view>
    <view class="login">
      <!-- #ifdef H5 -->
      <!-- 网页端表单登录 -->
      <input
        v-model="account"
        class="input"
        type="text"
        :maxlength="11"
        placeholder="请输入用户名/手机号码"
      />
      <input
        v-model="password"
        class="input"
        type="text"
        :maxlength="20"
        password
        placeholder="请输入密码"
      />
      <button class="button phone" :loading="isLoading" @tap="h5Login">登录</button>
      <!-- #endif -->

      <!-- #ifdef MP -->
      <!-- 小程序端授权登录 -->
      <button
        class="button phone"
        :loading="isLoading"
        open-type="getPhoneNumber"
        @getphonenumber="mpLogin"
      >
        <text class="icon icon-phone"></text>
        手机号快捷登录
      </button>
      <!-- #endif -->
      <view class="extra">
        <view class="caption">
          <text>其他登录方式</text>
        </view>
        <view class="options">
          <!-- 通用模拟登录 -->
          <button @tap="mpLoginSimple">
            <text class="icon icon-phone">模拟快捷登录</text>
          </button>
        </view>
      </view>
      <view class="tips">登录/注册即视为你同意《服务条款》和《小兔鲜儿隐私协议》</view>
    </view>
  </view>
</template>

<style lang="scss">
page {
  height: 100%;
}

.viewport {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 20rpx 40rpx;
}

.logo {
  flex: 1;
  text-align: center;
  image {
    width: 220rpx;
    height: 220rpx;
    margin-top: 15vh;
  }
}

.login {
  display: flex;
  flex-direction: column;
  height: 60vh;
  padding: 40rpx 20rpx 20rpx;

  .input {
    width: 100%;
    height: 80rpx;
    font-size: 28rpx;
    border-radius: 72rpx;
    border: 1px solid #ddd;
    padding-left: 30rpx;
    margin-bottom: 20rpx;
  }

  .button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 80rpx;
    font-size: 28rpx;
    border-radius: 72rpx;
    color: #fff;
    .icon {
      font-size: 40rpx;
      margin-right: 6rpx;
    }
  }

  .phone {
    background-color: #28bb9c;
  }

  .wechat {
    background-color: #06c05f;
  }

  .extra {
    flex: 1;
    padding: 70rpx 70rpx 0;
    .caption {
      width: 440rpx;
      line-height: 1;
      border-top: 1rpx solid #ddd;
      font-size: 26rpx;
      color: #999;
      position: relative;
      text {
        transform: translate(-40%);
        background-color: #fff;
        position: absolute;
        top: -12rpx;
        left: 50%;
      }
    }

    .options {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 70rpx;
      button {
        padding: 0;
        background-color: transparent;
        /* #ifdef H5 */
        &::after {
          border: none;
        }
        /* #endif */
      }
    }

    .icon {
      font-size: 24rpx;
      color: #444;
      display: flex;
      flex-direction: column;
      align-items: center;

      &::before {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 80rpx;
        height: 80rpx;
        margin-bottom: 6rpx;
        font-size: 40rpx;
        border: 1rpx solid #444;
        border-radius: 50%;
      }
    }
    .icon-weixin::before {
      border-color: #06c05f;
      color: #06c05f;
    }
  }
}

.tips {
  position: absolute;
  bottom: 80rpx;
  left: 20rpx;
  right: 20rpx;
  font-size: 22rpx;
  color: #999;
  text-align: center;
}
</style>
