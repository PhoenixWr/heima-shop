import { useMemberStore } from '@/stores'

// 请求基地址
const baseURL = 'https://pcapi-xiaotuxian-front-devtest.itheima.net'

// 添加拦截器
const interceptorOptions: UniApp.InterceptorOptions = {
  // 拦截前触发
  invoke(options: UniApp.RequestOptions) {
    // 拼接完整请求地址(非http开头请求地址)
    if (!options.url.startsWith('http')) {
      options.url = baseURL + options.url
    }
    // 设置请求超时时间(单位：ms)
    options.timeout = 10000
    // 添加小程序端请求头标识
    options.header = {
      ...options.header,
      'source-client': 'miniapp',
    }
    // 添加 token 请求头标识
    const memberStore = useMemberStore()
    if (memberStore.token) {
      options.header.Authorization = memberStore.token
    }
  },
} // 普通网络请求和文件上传共用的拦截器配置
uni.addInterceptor('request', interceptorOptions)
uni.addInterceptor('uploadFile', interceptorOptions)

// 后端返回数据通用接口
interface Data<T> {
  code: string
  msg: string
  result: T
}
// 封装请求函数
const request = <T>(options: UniApp.RequestOptions) =>
  new Promise<Data<T>>((resolve, reject) => {
    uni.request({
      ...options,
      // 网络请求成功回调
      success(response) {
        // 响应状态码范围在 200-299 之间 => 获取数据成功(axios设计原理)
        if (response.statusCode >= 200 && response.statusCode < 300) {
          resolve(response.data as Data<T>) // 类型断言指定具体类型
        } else if (response.statusCode === 401) {
          // 401错误(token校验失败) => 清理用户信息跳转登录页
          const memberStore = useMemberStore()
          memberStore.clearProfile()
          uni.navigateTo({ url: '/pages/login/login' })
          reject(response)
        } else {
          // 通用错误 => 根据后端错误消息进行轻提示
          uni.showToast({
            icon: 'none',
            title: (response.data as Data<T>).msg || '请求错误',
          })
          reject(response)
        }
      },
      // 网络请求失败回调
      fail(error) {
        uni.showToast({
          icon: 'none',
          title: '网络异常，稍后再试',
        })
        reject(error)
      },
    })
  })

export default request
