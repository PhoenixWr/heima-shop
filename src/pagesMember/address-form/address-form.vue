<script setup lang="ts">
import { ref, computed } from 'vue'
import { onReady } from '@dcloudio/uni-app'
import type { AddressParams } from '@/types/address'
import { postMemberAddressApi } from '@/services/address'

// 表单数据
const form = ref<AddressParams & { fullLocation: string }>({
  receiver: '', // 收货人
  contact: '', // 联系方式
  fullLocation: '', // 省市区(前端展示)
  provinceCode: '', // 省份编码(后端参数)
  cityCode: '', // 城市编码(后端参数)
  countyCode: '', // 区/县编码(后端参数)
  address: '', // 详细地址
  isDefault: 0, // 默认地址，1为是，0为否
})

// 获取页面参数
const query = defineProps<{
  id?: string
}>()
// 导航栏标题
const navigationBarTitle = computed(() => {
  return query.id ? '修改地址' : '新建地址'
})
// 动态设置标题
onReady(() => {
  uni.setNavigationBarTitle({ title: navigationBarTitle.value })
})

// 收集所在地区信息
const onRegionPickerChange: UniHelper.RegionPickerOnChange = (event) => {
  // 收货地址所在地区(前端展示)
  form.value.fullLocation = event.detail.value.join(' ')
  // 收货地址所在地区(后端参数)
  const [provinceCode, cityCode, countyCode] = event.detail.code!
  Object.assign(form.value, { provinceCode, cityCode, countyCode })
}

// 设置默认收货地址
const onSwitchChange: UniHelper.SwitchOnChange = (event) => {
  form.value.isDefault = event.detail.value ? 1 : 0
}

// 表单校验提示信息映射
const validateMap = {
  receiver: '请填写收货人姓名',
  contact: '请填写手机号码',
  provinceCode: '请填写所在地区',
  cityCode: '请填写所在地区',
  countyCode: '请填写所在地区',
  address: '请填写详细地址',
}
// 保存收货地址
const onSubmit = async () => {
  // 表单校验
  const validateKeys = Object.keys(validateMap) as (keyof typeof validateMap)[]
  const key = validateKeys.find((item) => !form.value[item].trim())
  if (key) {
    return uni.showToast({ icon: 'none', title: validateMap[key] })
  }
  // 添加收货地址请求
  await postMemberAddressApi({
    ...form.value,
    receiver: form.value.receiver.trim(),
    contact: form.value.contact.trim(),
    address: form.value.address.trim(),
  })
  // 添加成功提示
  uni.showToast({ title: '添加成功' })
  // 返回上一页
  setTimeout(() => {
    uni.navigateBack()
  }, 600)
}
</script>

<template>
  <view class="content">
    <form>
      <!-- 表单内容 -->
      <view class="form-item">
        <text class="label">收货人</text>
        <input v-model="form.receiver" class="input" placeholder="请填写收货人姓名" />
      </view>
      <view class="form-item">
        <text class="label">手机号码</text>
        <input v-model="form.contact" class="input" placeholder="请填写收货人手机号码" />
      </view>
      <view class="form-item">
        <text class="label">所在地区</text>
        <picker
          class="picker"
          mode="region"
          :value="form.fullLocation.split(' ')"
          @change="onRegionPickerChange"
        >
          <view v-if="form.fullLocation">{{ form.fullLocation }}</view>
          <view v-else class="placeholder">请选择省/市/区(县)</view>
        </picker>
      </view>
      <view class="form-item">
        <text class="label">详细地址</text>
        <input v-model="form.address" class="input" placeholder="街道、楼牌号等信息" />
      </view>
      <view class="form-item">
        <label class="label">设为默认地址</label>
        <switch
          class="switch"
          color="#27ba9b"
          :checked="form.isDefault === 1"
          @change="onSwitchChange"
        />
      </view>
    </form>
  </view>
  <!-- 提交按钮 -->
  <button class="button" @tap="onSubmit">保存并使用</button>
  <!-- ! test -->
  {{ form }}
</template>

<style lang="scss">
page {
  background-color: #f4f4f4;
}

.content {
  margin: 20rpx 20rpx 0;
  padding: 0 20rpx;
  border-radius: 10rpx;
  background-color: #fff;

  .form-item,
  .uni-forms-item {
    display: flex;
    align-items: center;
    min-height: 96rpx;
    padding: 25rpx 10rpx 40rpx;
    background-color: #fff;
    font-size: 28rpx;
    border-bottom: 1rpx solid #ddd;
    position: relative;
    margin-bottom: 0;

    // 调整 uni-forms 样式
    .uni-forms-item__content {
      display: flex;
    }

    .uni-forms-item__error {
      margin-left: 200rpx;
    }

    &:last-child {
      border: none;
    }

    .label {
      width: 200rpx;
      color: #333;
    }

    .input {
      flex: 1;
      display: block;
      height: 46rpx;
    }

    .switch {
      position: absolute;
      right: -20rpx;
      transform: scale(0.8);
    }

    .picker {
      flex: 1;
    }

    .placeholder {
      color: #808080;
    }
  }
}

.button {
  height: 80rpx;
  margin: 30rpx 20rpx;
  color: #fff;
  border-radius: 80rpx;
  font-size: 30rpx;
  background-color: #27ba9b;
}
</style>
