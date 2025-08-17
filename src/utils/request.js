import axios from 'axios'
import { ElMessage } from 'element-plus'

// 创建axios实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API || '', // url = base url + request url
  timeout: 10000 // 请求超时时间
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    // 在发送请求之前做些什么
    const token = localStorage.getItem('token')
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  error => {
    // 对请求错误做些什么
    console.log(error)
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  response => {
    const res = response.data

    // 如果返回的状态码不是200，说明接口有问题，把错误信息显示给用户
    if (res.code !== '200') {
      ElMessage({
        message: res.message || '请求失败',
        type: 'error',
        duration: 5 * 1000
      })

      // 50008: 非法的token; 50012: 其他客户端登录; 50014: Token过期;
      if (res.code === '50008' || res.code === '50012' || res.code === '50014') {
        // 重新登录
        // store.dispatch('user/resetToken').then(() => {
        //   location.reload()
        // })
      }
      return Promise.reject(new Error(res.message || '请求失败'))
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error)
    
    // 开发环境，如果是404错误，返回mock数据
    if (error.response && error.response.status === 404 && process.env.NODE_ENV === 'development') {
      console.log('开发环境：API未启动，返回mock数据')
      // 这里可以返回mock数据，暂时返回错误
    }
    
    ElMessage({
      message: error.message || '请求失败',
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service