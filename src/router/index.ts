import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  
  {
    path: '/',
    name: 'layout',
    redirect: "home",
    component: () => import('@components/common/Layout.vue'),
    // component: () => import('@pages/home/index.vue'),
    children: [
      {
        path: '/home',
        name: 'home',
        meta: {
          title: '首页',
          showBanner: true
        },
        component: () => import('@pages/home/index.vue')
      },
      {
        path: '/transition',
        name: 'transition',
        meta: {
          title: '过渡',
          showBanner: true
        },
        component: () => import('@pages/home/transition.vue')
      },
      {
        path: '/skill',
        name: 'skill',
        meta: {
          title: '技能',
          showBanner: false
        },
        component: () => import('@pages/skill/index.vue')
      },
      {
        path: '/work',
        name: 'work',
        meta: {
          title: '工作',
          showBanner: false
        },
        component: () => import('@pages/work/index.vue')
      },
      {
        path: '/project',
        name: 'project',
        meta: {
          title: '项目',
          showBanner: false
        },
        component: () => import('@pages/project/index.vue')
      },
      {
        path: '/about',
        name: 'about',
        meta: {
          title: '关于我',
          showBanner: false
        },
        component: () => import('@pages/about/index.vue')
      },
    ]
  },
  /* {
    path: '*',
    name: '404',
    component: () => import('@pages/404/index.vue')
  } */
];

// 在 Vue-router新版本中，需要使用createRouter来创建路由
const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router;
