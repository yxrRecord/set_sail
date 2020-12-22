import Vue from 'vue'
import Router from 'vue-router'

let routes = [
  {
    path: '/',
    name: 'layout',
    component: () => import('@/components/common/commonLayout'),
    redirect: {
      name: "home"
    },
    children: [
      {
        path: '/home',
        name: 'home',
        meta: {
          title: '首页',
          showBanner: true
        },
        component: () => import('@/pages/home')
      },
      {
        path: '/transition',
        name: 'transition',
        meta: {
          title: '过渡',
          showBanner: true
        },
        component: () => import('@/pages/home/transition')
      },
      {
        path: '/skill',
        name: 'skill',
        meta: {
          title: '技能',
          showBanner: false
        },
        component: () => import('@/pages/skill')
      },
      {
        path: '/work',
        name: 'work',
        meta: {
          title: '工作',
          showBanner: false
        },
        component: () => import('@/pages/work')
      },
      {
        path: '/project',
        name: 'project',
        meta: {
          title: '项目',
          showBanner: false
        },
        component: () => import('@/pages/project')
      },
      {
        path: '/about',
        name: 'about',
        meta: {
          title: '关于我',
          showBanner: false
        },
        component: () => import('@/pages/about')
      },
    ]
  },
  {
    path: '*',
    name: '404',
    component: () => import('@/pages/404')
  }
]

Vue.use(Router)

let router = new Router({
  routes,
  // mode: 'hash',
})
export default router