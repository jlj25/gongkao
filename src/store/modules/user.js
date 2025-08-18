const savedToken = localStorage.getItem('token') || ''
let savedUserInfo = null
try { savedUserInfo = JSON.parse(localStorage.getItem('userInfo') || 'null') } catch (e) { savedUserInfo = null }

const state = {
  token: savedToken,
  name: savedUserInfo && savedUserInfo.name ? savedUserInfo.name : '',
  avatar: '',
  userInfo: savedUserInfo
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_USER_INFO: (state, userInfo) => {
    state.userInfo = userInfo
    state.name = userInfo && userInfo.name ? userInfo.name : ''
  }
}

const actions = {
  // 用户登录
  login({ commit }) {
    return new Promise((resolve) => {
      setTimeout(() => {
        commit('SET_TOKEN', 'mock-token')
        resolve()
      }, 1000)
    })
  },

  // 获取用户信息
  getInfo({ commit }) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const data = {
          name: '管理员',
          avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif'
        }
        commit('SET_NAME', data.name)
        commit('SET_AVATAR', data.avatar)
        resolve(data)
      }, 1000)
    })
  },

  // 用户登出
  logout({ commit }) {
    return new Promise((resolve) => {
      commit('SET_TOKEN', '')
      commit('SET_NAME', '')
      commit('SET_AVATAR', '')
      commit('SET_USER_INFO', null)
      resolve()
    })
  },

  // 重置token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_NAME', '')
      commit('SET_AVATAR', '')
      commit('SET_USER_INFO', null)
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}