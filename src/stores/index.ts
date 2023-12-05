import { createPinia } from 'pinia'
import { createPersistedState } from 'pinia-plugin-persistedstate'

// 创建 pinia 实例
const pinia = createPinia()
// 使用持久化存储插件
pinia.use(
  // 全局持久化配置
  createPersistedState({
    // ! 默认使用 localStorage 进行持久化存储
    // uni-app持久化存储方式适配
    storage: {
      getItem(key) {
        return uni.getStorageSync(key)
      },
      setItem(key, value) {
        uni.setStorageSync(key, value)
      },
    },
    // 仓库存储键名添加统一前缀
    key: (id) => `xtx_${id}`,
  }),
)

// 默认导出，给 main.ts 使用
export default pinia

// 模块统一导出
export * from './modules/member'
export * from './modules/address'
