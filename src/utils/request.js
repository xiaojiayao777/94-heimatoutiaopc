// 专门封装一个请求工具
// 对于axios 的二次封装
// 配置拦截器 以及其他

// 引入axios
import axios from 'axios'
// 写拦截器及其他操作
// 配置axios的baseURL 公共的请求头地址
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'

// 请求拦截器的开发  回调函数 成功时执行第一个 失败时执行第二个
axios.interceptors.request.use(function (config) {
  // 成功时的参数会有一个config config就是所有的axios的请求信息
  // 在第一个函数中 需要将配置进行返回 返回的配置 会作为 请求参数 进行请求
  // 在返回之前就是我们统一注入token 的最佳时机
// 先获取token
  const token = localStorage.getItem('user-token')
  // 统一注入token
  config.headers.Authorization = `Bearer ${token}`
  return config
}, function (error) {
  // 失败时会有一个错误 直接reject错误即可
  //  axios是支持promise的  如果失败了，我们应该直接reject  reject会直接进入到axios的catch中
  return Promise.reject(error)
})

// 响应拦截器的开发
axios.interceptors.response.use(function (response) {
  // 回调函数的第一个参数 是响应体
  // 在拦截器中需要 将数据返回 将数据进行解构
  return response.data ? response.data : {}// 有的接口没有任何的响应数据
}, function () {
// 失败时执行
})

// 导出
export default axios
