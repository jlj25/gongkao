import permission from './permission'

const directives = {
  permission
}

// 注册全局指令
export default {
  install(Vue) {
    Object.keys(directives).forEach(key => {
      Vue.directive(key, directives[key])
    })
  }
}