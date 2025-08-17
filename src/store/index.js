import { createStore } from 'vuex'
import getters from './getters'
import user from './modules/user'
import app from './modules/app'
import settings from './modules/settings'
import permission from './modules/permission'

// 注意：在Vue 3中，不再需要Vue.use(Vuex)
// Vuex会在创建store时直接使用

const store = createStore({
  modules: {
    user,
    app,
    settings,
    permission
  },
  getters
})

export default store