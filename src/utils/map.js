// 地图工具函数

// 检查是否支持地图
export function isMapSupported() {
  return 'geolocation' in navigator
}

// 获取当前位置并显示在地图上
export function showCurrentLocationOnMap(mapInstance, options = {}) {
  if (!isMapSupported()) {
    return Promise.reject(new Error('浏览器不支持地理位置功能'))
  }
  
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      position => {
        const lat = position.coords.latitude
        const lng = position.coords.longitude
        
        // 在地图上标记当前位置
        if (mapInstance) {
          // 这里需要根据具体使用的地图库来实现
          // 例如使用高德地图、百度地图或谷歌地图的 API
          // mapInstance.setCenter([lng, lat])
          // mapInstance.addMarker([lng, lat])
        }
        
        resolve({ lat, lng })
      },
      error => {
        reject(error)
      },
      options
    )
  })
}

// 计算两点之间的距离
export function calculateDistance(lat1, lng1, lat2, lng2) {
  const R = 6371 // 地球半径（公里）
  const dLat = (lat2 - lat1) * Math.PI / 180
  const dLon = (lng2 - lng1) * Math.PI / 180
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
  const d = R * c
  return d
}

// 格式化坐标
export function formatCoordinate(coord, type = 'lat') {
  if (typeof coord !== 'number') return ''
  
  const direction = type === 'lat' ? 
    (coord >= 0 ? 'N' : 'S') : 
    (coord >= 0 ? 'E' : 'W')
  
  return `${Math.abs(coord).toFixed(6)}°${direction}`
}