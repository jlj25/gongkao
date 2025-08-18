import { createRouter, createWebHashHistory } from 'vue-router'

// 注意：在Vue 3中，不再需要Vue.use(Router)
// Router会在创建时直接配置

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
 *   roles: ['admin','editor']    control the page roles (you can set multiple roles)
 *   title: 'title'               the name show in sidebar and breadcrumb (recommend set)
 *   icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
 *   breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
 *   activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
 * }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/user/list',
    hidden: true
  },

  // 用户管理
  {
    path: '/user',
    component: Layout,
    redirect: '/user/list',
    meta: { title: '用户管理', icon: 'User' },
    children: [
      {
        path: 'list',
        name: 'UserList',
        component: () => import('@/views/user/list'),
        meta: { title: '管理员列表' }
      }
    ]
  },

  // 时政管理
  {
    path: '/politics',
    component: Layout,
    redirect: '/politics/list',
    meta: { title: '时政管理', icon: 'Document' },
    children: [
      {
        path: 'list',
        name: 'PoliticsList',
        component: () => import('@/views/politics/list'),
        meta: { title: '时政列表' }
      }
    ]
  },

  // 模拟题管理
  {
    path: '/simulation',
    component: Layout,
    redirect: '/simulation/list',
    meta: { title: '模拟题管理', icon: 'Files' },
    children: [
      {
        path: 'list',
        name: 'SimulationList',
        component: () => import('@/views/simulation/list'),
        meta: { title: '模拟题列表' }
      }
    ]
  },

  // 招聘公告管理
  {
    path: '/recruit',
    component: Layout,
    redirect: '/recruit/list',
    meta: { title: '招聘公告', icon: 'Bell' },
    children: [
      {
        path: 'list',
        name: 'RecruitList',
        component: () => import('@/views/recruit/list'),
        meta: { title: '招聘列表' }
      }
    ]
  },

  // 自习室管理 - 暂时隐藏，后续开发
  {
    path: '/studio',
    component: Layout,
    redirect: '/studio/list',
    meta: { title: '自习室管理', icon: 'House', hidden: true },
    children: [
      {
        path: 'list',
        name: 'StudioList',
        component: () => import('@/views/studio/list'),
        meta: { title: '自习室列表' }
      },
      {
        path: 'add',
        name: 'StudioAdd',
        component: () => import('@/views/studio/add'),
        meta: { title: '新增自习室' }
      },
      {
        path: 'seats',
        name: 'StudioSeats',
        component: () => import('@/views/studio/seats'),
        meta: { title: '座位管理' }
      }
    ]
  },

  // 卡券管理 - 暂时隐藏，后续开发
  {
    path: '/card',
    component: Layout,
    redirect: '/card/list',
    meta: { title: '卡券管理', icon: 'CreditCard', hidden: true },
    children: [
      {
        path: 'list',
        name: 'CardList',
        component: () => import('@/views/card/list'),
        meta: { title: '卡券列表' }
      },
      {
        path: 'add',
        name: 'CardAdd',
        component: () => import('@/views/card/add'),
        meta: { title: '新增卡券' }
      }
    ]
  },



  // 404 page must be placed at the end !!!
  { path: '/:pathMatch(.*)*', redirect: '/404', hidden: true }
]

const routerHistory = createWebHashHistory()

const router = createRouter({
  history: routerHistory,
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

// 路由守卫
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  
  if (to.path === '/login') {
    if (token) {
      next('/user/list')
    } else {
      next()
    }
  } else {
    if (token) {
      next()
    } else {
      next('/login')
    }
  }
})

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter({
    history: routerHistory,
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
  })
  router.matcher = newRouter.matcher // reset router
}

export default router