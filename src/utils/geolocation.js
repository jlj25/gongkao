// 地理位置工具函数

// 检查是否支持地理位置
export function isGeolocationSupported() {
  return 'geolocation' in navigator
}

// 获取当前位置
export function getCurrentPosition(options = {}) {
  return new Promise((resolve, reject) => {
    if (!isGeolocationSupported()) {
      reject(new Error('浏览器不支持地理位置功能'))
      return
    }
    
    navigator.geolocation.getCurrentPosition(
      position => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy
        })
      },
      error => {
        reject(error)
      },
      options
    )
  })
}

// 监听位置变化
export function watchPosition(callback, options = {}) {
  if (!isGeolocationSupported()) {
    return Promise.reject(new Error('浏览器不支持地理位置功能'))
  }
  
  return navigator.geolocation.watchPosition(callback, options)
}