import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'layout',
    redirect: "home",
    component: () => import('@components/common/Layout'),
    children: [
      {
        path: '/home',
        name: 'home',
        meta: {
          title: '首页',
          showBanner: true
        },
        component: () => import('@pages/home/index')
      },
      {
        path: '/test',
        name: 'test',
        meta: {
          title: 'test',
          showBanner: true
        },
        component: () => import('@pages/test/index')
      },
      {
        path: '/transition',
        name: 'transition',
        meta: {
          title: '过渡',
          showBanner: true
        },
        component: () => import('@pages/home/transition')
      },
      {
        path: '/skill',
        name: 'skill',
        meta: {
          title: '技能',
          showBanner: false
        },
        component: () => import('@pages/skill/index')
      },
      {
        path: '/work',
        name: 'work',
        meta: {
          title: '工作',
          showBanner: false
        },
        component: () => import('@pages/work/index')
      },
      {
        path: '/project',
        name: 'project',
        meta: {
          title: '项目',
          showBanner: false
        },
        component: () => import('@pages/project/index')
      },
      {
        path: '/about',
        name: 'about',
        meta: {
          title: '关于我',
          showBanner: false
        },
        component: () => import('@pages/about/index')
      }
    ]
  }
];

// 在 Vue-router新版本中，需要使用createRouter来创建路由
const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router;
