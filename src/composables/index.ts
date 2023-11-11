import { ref } from 'vue'
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
