// HTTP 请求工具函数

// 创建 XMLHttpRequest 对象
function createXHR() {
  if (typeof XMLHttpRequest !== 'undefined') {
    return new XMLHttpRequest()
  } else if (typeof ActiveXObject !== 'undefined') {
    // IE6 及以下版本
    return new ActiveXObject('Microsoft.XMLHTTP')
  } else {
    throw new Error('当前浏览器不支持 XMLHttpRequest')
  }
}

// 发送 GET 请求
export function get(url, options = {}) {
  return request('GET', url, null, options)
}

// 发送 POST 请求
export function post(url, data, options = {}) {
  return request('POST', url, data, options)
}

// 发送 PUT 请求
export function put(url, data, options = {}) {
  return request('PUT', url, data, options)
}

// 发送 DELETE 请求
export function del(url, options = {}) {
  return request('DELETE', url, null, options)
}

// 通用请求函数
export function request(method, url, data, options = {}) {
  return new Promise((resolve, reject) => {
    const xhr = createXHR()
    
    // 默认配置
    const defaultOptions = {
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
      }
    }
    
    // 合并配置
    const config = Object.assign({}, defaultOptions, options)
    
    // 设置请求方法和URL
    xhr.open(method, url, true)
    
    // 设置超时时间
    xhr.timeout = config.timeout
    
    // 设置请求头
    Object.keys(config.headers).forEach(key => {
      xhr.setRequestHeader(key, config.headers[key])
    })
    
    // 设置响应类型
    if (config.responseType) {
      xhr.responseType = config.responseType
    }
    
    // 设置 withCredentials
    if (config.withCredentials !== undefined) {
      xhr.withCredentials = config.withCredentials
    }
    
    // 请求成功
    xhr.onload = function() {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const response = xhr.responseType === 'json' || xhr.responseType === '' ? 
            JSON.parse(xhr.responseText) : xhr.response
          resolve(response)
        } catch (e) {
          resolve(xhr.responseText)
        }
      } else {
        reject(new Error(`请求失败: ${xhr.status} ${xhr.statusText}`))
      }
    }
    
    // 请求错误
    xhr.onerror = function() {
      reject(new Error('网络错误'))
    }
    
    // 请求超时
    xhr.ontimeout = function() {
      reject(new Error('请求超时'))
    }
    
    // 发送请求
    if (data) {
      if (typeof data === 'object' && !(data instanceof FormData)) {
        xhr.send(JSON.stringify(data))
      } else {
        xhr.send(data)
      }
    } else {
      xhr.send()
    }
  })
}

// 并发请求
export function all(requests) {
  return Promise.all(requests)
}

// 竞速请求（哪个先完成就用哪个）
export function race(requests) {
  return Promise.race(requests)
}

// 带重试机制的请求
export function requestWithRetry(method, url, data, options = {}) {
  const { retries = 3, retryDelay = 1000 } = options
  
  return new Promise((resolve, reject) => {
    const attempt = (n) => {
      request(method, url, data, options)
        .then(resolve)
        .catch(error => {
          if (n === 1) {
            reject(error)
          } else {
            setTimeout(() => attempt(n - 1), retryDelay)
          }
        })
    }
    
    attempt(retries)
  })
}

// 带缓存的 GET 请求
export function getCached(url, options = {}) {
  // 这里只是一个示例，实际项目中应该使用更完善的缓存策略
  const cacheKey = `http_cache_${url}`
  const cached = sessionStorage.getItem(cacheKey)
  
  if (cached) {
    try {
      const parsed = JSON.parse(cached)
      // 检查缓存是否过期（这里简单设置为5分钟）
      if (Date.now() - parsed.timestamp < 5 * 60 * 1000) {
        return Promise.resolve(parsed.data)
      }
    } catch (e) {
      // 解析缓存失败，继续请求
    }
  }
  
  return get(url, options).then(response => {
    // 缓存响应
    const cacheData = {
      timestamp: Date.now(),
      data: response
    }
    sessionStorage.setItem(cacheKey, JSON.stringify(cacheData))
    return response
  })
}

// 取消请求
export function cancelRequest(xhr) {
  if (xhr && typeof xhr.abort === 'function') {
    xhr.abort()
  }
}

// 设置默认配置
let defaultConfig = {
  baseURL: '',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
}

export function setDefaultConfig(config) {
  defaultConfig = Object.assign({}, defaultConfig, config)
}

// 获取默认配置
export function getDefaultConfig() {
  return defaultConfig
}

// 创建实例
export function createInstance(config = {}) {
  const instanceConfig = Object.assign({}, defaultConfig, config)
  
  return {
    get(url, options = {}) {
      const finalURL = instanceConfig.baseURL + url
      const finalOptions = Object.assign({}, instanceConfig, options)
      return get(finalURL, finalOptions)
    },
    
    post(url, data, options = {}) {
      const finalURL = instanceConfig.baseURL + url
      const finalOptions = Object.assign({}, instanceConfig, options)
      return post(finalURL, data, finalOptions)
    },
    
    put(url, data, options = {}) {
      const finalURL = instanceConfig.baseURL + url
      const finalOptions = Object.assign({}, instanceConfig, options)
      return put(finalURL, data, finalOptions)
    },
    
    del(url, options = {}) {
      const finalURL = instanceConfig.baseURL + url
      const finalOptions = Object.assign({}, instanceConfig, options)
      return del(finalURL, finalOptions)
    },
    
    request(method, url, data, options = {}) {
      const finalURL = instanceConfig.baseURL + url
      const finalOptions = Object.assign({}, instanceConfig, options)
      return request(method, finalURL, data, finalOptions)
    }
  }
}