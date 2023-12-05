import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { AddressItem } from '@/types/address'
import { getMemberAddressApi } from '@/services/address'

export const useAddressStore = defineStore('address', () => {
  const addressList = ref<AddressItem[]>([]) // 收货地址列表
  /**
   * 获取收货地址列表数据
   */
  const getAddressList = async () => {
    const res = await getMemberAddressApi()
    addressList.value = res.result
  }

  return {
    addressList,
    getAddressList,
  }
})
