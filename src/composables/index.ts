import { ref, computed } from 'vue'
import type { XtxGuessInstance } from '@/types/components'

/**
 * 猜你喜欢组件滚动触底加载数据组合式函数
 */
export const useScrollToLoad = () => {
  // 猜你喜欢组件实例
  const xtxGuessRef = ref<XtxGuessInstance | null>(null)
  // scroll-view 滚动到底部/右边时触发
  const onScrollToLower = () => {
    xtxGuessRef.value?.getGuessList()
  }

  return {
    xtxGuessRef,
    onScrollToLower,
  }
}

/**
 * 自定义导航栏自适应安全区域组合式函数
 */
export const useNavBarAdaptive = () => {
  // 获取屏幕边界到安全区域距离 手机状态栏高度
  const { safeAreaInsets, statusBarHeight } = uni.getSystemInfoSync()
  // 自定义导航栏顶部内边距 适配不同机型
  const paddingTop = computed(() => {
    if (safeAreaInsets!.top) return `${safeAreaInsets!.top}px`
    if (statusBarHeight) return `${statusBarHeight}px`
    return '20px'
  })

  return {
    paddingTop,
  }
}
