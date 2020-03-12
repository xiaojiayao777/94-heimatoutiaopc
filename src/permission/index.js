// 此文件专门处理路由权限的问题
import router from '@/router'
// 进度条包
import progress from 'nprogress'
// 样式文件
import 'nprogress/nprogress.css'
// 去注册全局的前置守卫
// 回调函数会在路由发生改变之前执行
router.beforeEach(function (to, from, next) {
  // 开始之前 开启进度条
  progress.start()
  // next()//表示放过
  // 判断你要去的页面是不是以/home开头
  if (to.path.startsWith('/home')) {
    // 表示你要去主页相关的页面，我要看看你有没有钥匙，没钥匙回到登陆页
    const token = window.localStorage.getItem('user-token')
    if (token) {
      // 有钥匙放过
      next()
    } else {
      // 没钥匙回到登陆页 去拿钥匙
      next('/login')
    }
  } else {
    // 如果不是去主页相关 直接放过
    next()
  }
})
// 在全局后置守卫关闭进度条 此时已经完成了路由的跳转
router.afterEach(() => {
  // 处理进度条关闭的问题
  setTimeout(() => progress.done(), 700)
})
