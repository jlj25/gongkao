import { constantRoutes } from '@/router'

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  },
  SET_ALL_ROUTES: (state) => {
    // 过滤掉不需要显示在侧边栏的路由
    const sidebarRoutes = constantRoutes.filter(route => {
      // 过滤掉登录、404、根路径等不需要显示的路由
      if (route.hidden || route.path === '/login' || route.path === '/404' || route.path === '/') {
        return false
      }
      return true
    })
    state.routes = sidebarRoutes
  }
}

const actions = {
  generateRoutes({ commit }, roles) {
    return new Promise(resolve => {
      let accessedRoutes
      if (roles.includes('admin')) {
        // 管理员可以看到所有路由
        accessedRoutes = []
      } else {
        // 其他角色过滤路由
        accessedRoutes = constantRoutes.filter(route => {
          if (hasPermission(roles, route)) {
            if (route.children) {
              route.children = route.children.filter(child => {
                if (hasPermission(roles, child)) {
                  return child
                }
                return false
              })
            }
            return true
          }
          return false
        })
      }
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  },
  initRoutes({ commit }) {
    // 初始化所有路由，用于侧边栏显示
    commit('SET_ALL_ROUTES')
  }
}

function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
