// 专门封装一个请求工具
// 对于axios 的二次封装
// 配置拦截器 以及其他

// 引入axios
import axios from 'axios'
// 引入router  这就是路由实例对象
import router from '@/router'
// 引入json-bigint 第三方处理大数字的包
import JSONBig from 'json-bigint'

// 写拦截器及其他操作
// 配置axios的baseURL 公共的请求头地址
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'

// 对axios的返回数据进行自定义处理 用json-bigint替代原来的json、
// transformResponse中要返回处理结果
// transformResponse是所有请求字符串转化成对象的入口 在这个位置如果处理了 相当于所有的接口都处理了
axios.defaults.transformResponse = [function (data) {
  // 这里主要处理ID超过大数字时转化不正确的问题 JSONBig.parse是第三方的包  内部怎么实现的，我们不需要关心，只需要知道它可以帮助我们 转化正确
  // 用json-bigint的转换来做、
  // 需要判断一下data是不是为空 如果为空就不能转换，因为为空转换会报错
  return data ? JSONBig.parse(data) : {}
  // const result = JSONBig.parse(data)
  // return result
}]

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
}, function (error) {
// 失败时执行
  // error是错误对象里边包含了错误的状态码 和 响应信息
  // 401 状态码  表示用户认证失败 用户身份不对
  // 401出现的时候 表示 拿错钥匙/钥匙过期/钥匙没拿/钥匙名不对/钥匙格式不对
  // 之前的导航守卫  校验了token有没有 检查了钥匙有没有
  // 应该换一个新钥匙 项目1 讲一种比较粗暴的换钥匙 项目2 讲一种比较温柔的钥匙
  // 粗暴的换钥匙 回登录页 => 重新登录换一把新的 重来
  // 回登录页之前 应该把旧钥匙给清除掉
  if (error.response.status === 401) {
    localStorage.removeItem('user-token')// 删除钥匙
    // this.$router.push('/login')this是组件 路由实例才能用，在组件中才能用，所以先引入router
    // 直接导入路由实例对象 使用跳转的方式 和组件中的this.$router是一样的
    router.push('/login')
  }
  // 进行错误处理
  return Promise.reject(error)// 所有的axios依然可以在catch中得到错误
})

// 导出
export default axios
