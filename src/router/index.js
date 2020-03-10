import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
// 用一种简写的方式替换原有的方式
import Home from '@/views/home'
import Login from '@/views/login'
// 引入二级路由的默认组件文件
// import SecondHome from '@/views/home/second_home'
import SecondHome from '@/views/home/second_home'

Vue.use(VueRouter)

const routes = [
  {
    // 强制跳转到home页
    path: '/',
    redirect: 'home'

  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    // 在一级路由的路由表下配置二级路由表
    // 在一级路由组件下边放上二级路由组件，使用children
    children: [
      {
      // 二级路由的path后边什么都不放 代表二级路由的默认组件
        path: '',
        // 默认的二级路由组件
        component: SecondHome

      }, {
        // 地址 简写path：‘comment’ 不写/
        path: '/home/comment',
        // 组件 按需加载的方式
        component: () => import('@/views/comment')
      }, {
        // 按需加载的方式
        path: '/home/material',
        component: () => import('@/views/material')
      }, {
        path: '/home/articles',
        component: () => import('@/views/articles')
      }, {
        path: '/home/publish',
        component: () => import('@/views/publish')
      }

    ]
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  }
  // {
  //   // 按需加载
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  routes
})

export default router
