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
    // TODO 添加token请求头标识
  },
} // 普通网络请求和文件上传共用的拦截器配置
uni.addInterceptor('request', interceptorOptions)
uni.addInterceptor('uploadFile', interceptorOptions)
