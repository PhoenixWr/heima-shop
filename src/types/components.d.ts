// 全局组件类型声明
import XtxNavBar from '@/components/xtx-nav-bar/xtx-nav-bar.vue'
import XtxSwiper from '@/components/xtx-swiper/xtx-swiper.vue'
import XtxCategoryPanel from '@/components/xtx-category-panel/xtx-category-panel.vue'

/**
 * declare module '@vue/runtime-core'
 *   现调整为
 * declare module 'vue'
 */
import 'vue'
declare module 'vue' {
  export interface GlobalComponents {
    XtxNavBar: typeof XtxNavBar
    XtxSwiper: typeof XtxSwiper
    XtxCategoryPanel: typeof XtxCategoryPanel
  }
}
