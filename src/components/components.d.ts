// 全局组件类型声明
import XtxNavBar from './xtx-nav-bar/xtx-nav-bar.vue'
import XtxSwiper from './xtx-swiper/xtx-swiper.vue'

declare module 'vue' {
  export interface GlobalComponents {
    XtxNavBar: typeof XtxNavBar
    XtxSwiper: typeof XtxSwiper
  }
}
