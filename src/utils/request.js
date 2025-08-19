import axios from 'axios'
import JSONBig from 'json-bigint'
import { ElMessage } from 'element-plus'

// 创建axios实例（启用大整数安全解析）
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API || '', // url = base url + request url
  timeout: 10000, // 请求超时时间
  transformResponse: [function (data) {
    // 空响应直接返回
    if (!data) return data
    try {
      // 使用 json-bigint 将长整型以字符串保留
      return JSONBig({ storeAsString: true }).parse(data)
    } catch (e) {
      // 解析失败则回退到原生 JSON
      try {
        return JSON.parse(data)
      } catch (e2) {
        return data
      }
    }
  }]
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    if (!config.headers) config.headers = {}
    
    // 只为非FormData请求设置JSON Content-Type
    // FormData请求需要浏览器自动设置multipart/form-data和boundary
    if (!(config.data instanceof FormData)) {
      config.headers['Content-Type'] = config.headers['Content-Type'] || 'application/json'
    }

    // 在发送请求之前附带 token（兼容多种后台约定）
    const token = localStorage.getItem('token')
    if (token) {
      // 常见三种写法全部带上，避免后端约定不一致
      config.headers['Authorization'] = `Bearer ${token}`
      config.headers['token'] = token
      config.headers['X-Token'] = token
    }
    return config
  },
  error => {
    console.log(error)
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  response => {
    const res = response.data
    const code = Number(res && res.code)

    if (code !== 200) {
      ElMessage({
        message: res.message || '请求失败',
        type: 'error',
        duration: 5 * 1000
      })

      // token 相关
      if (code === 11011 || code === 401 || code === 50008 || code === 50012 || code === 50014) {
        // 可选：清理本地并跳登录
        // localStorage.removeItem('token')
        // localStorage.removeItem('userInfo')
        // location.href = '#/login'
      }
      return Promise.reject(new Error(res.message || '请求失败'))
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error)
    ElMessage({
      message: (error.response && error.response.data && error.response.data.message) || error.message || '请求失败',
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service