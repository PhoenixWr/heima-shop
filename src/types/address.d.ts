/** 添加收货地址请求体参数类型 */
export type AddressParams = {
  /** 收货人姓名 */
  receiver: string
  /** 联系方式 */
  contact: string
  /** 省份编码 */
  provinceCode: string
  /** 城市编码 */
  cityCode: string
  /** 区/县编码 */
  countyCode: string
  /** 详细地址 */
  address: string
  /** 是否为默认地址 (0: 否 1: 是) */
  isDefault: 0 | 1
}

/** 收货地址项 */
export type AddressItem = AddressParams & {
  /** 收货地址id */
  id: string
  /** 省市区 */
  fullLocation: string
}
