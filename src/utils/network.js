// 网络状态工具函数

// 检查是否在线
export function isOnline() {
  return navigator.onLine
}

// 监听网络状态变化
export function watchNetworkStatus(callback) {
  window.addEventListener('online', callback)
  window.addEventListener('offline', callback)
}

// 移除网络状态监听
export function unwatchNetworkStatus(callback) {
  window.removeEventListener('online', callback)
  window.removeEventListener('offline', callback)
}

// 获取网络连接类型
export function getNetworkType() {
  if ('connection' in navigator) {
    return navigator.connection.effectiveType
  }
  return 'unknown'
}