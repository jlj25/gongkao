// 通知工具函数

// 检查是否支持通知
export function isNotificationSupported() {
  return 'Notification' in window
}

// 请求通知权限
export function requestNotificationPermission() {
  if (!isNotificationSupported()) {
    return Promise.reject(new Error('浏览器不支持通知功能'))
  }
  
  return Notification.requestPermission()
}

// 显示通知
export function showNotification(title, options = {}) {
  if (!isNotificationSupported()) {
    console.warn('浏览器不支持通知功能')
    return
  }
  
  if (Notification.permission === 'granted') {
    new Notification(title, options)
  } else if (Notification.permission !== 'denied') {
    requestNotificationPermission().then(permission => {
      if (permission === 'granted') {
        new Notification(title, options)
      }
    })
  }
}

// 显示成功通知
export function showSuccess(message, options = {}) {
  // 默认配置
  const defaultOptions = {
    title: '成功',
    duration: 3000,
    position: 'top-right'
  }
  
  // 合并配置
  const config = Object.assign({}, defaultOptions, options)
  
  // 这里只是一个示例，实际项目中应该使用专门的通知库，如 Element UI 的 Notification
  console.log(`[成功] ${config.title}: ${message}`)
  
  // 如果在浏览器环境中，可以创建一个简单的通知
  if (typeof window !== 'undefined') {
    createNotificationElement('success', config.title, message, config)
  }
}

// 显示错误通知
export function showError(message, options = {}) {
  // 默认配置
  const defaultOptions = {
    title: '错误',
    duration: 5000,
    position: 'top-right'
  }
  
  // 合并配置
  const config = Object.assign({}, defaultOptions, options)
  
  // 这里只是一个示例，实际项目中应该使用专门的通知库
  console.error(`[错误] ${config.title}: ${message}`)
  
  // 如果在浏览器环境中，可以创建一个简单的通知
  if (typeof window !== 'undefined') {
    createNotificationElement('error', config.title, message, config)
  }
}

// 显示警告通知
export function showWarning(message, options = {}) {
  // 默认配置
  const defaultOptions = {
    title: '警告',
    duration: 4000,
    position: 'top-right'
  }
  
  // 合并配置
  const config = Object.assign({}, defaultOptions, options)
  
  // 这里只是一个示例，实际项目中应该使用专门的通知库
  console.warn(`[警告] ${config.title}: ${message}`)
  
  // 如果在浏览器环境中，可以创建一个简单的通知
  if (typeof window !== 'undefined') {
    createNotificationElement('warning', config.title, message, config)
  }
}

// 显示信息通知
export function showInfo(message, options = {}) {
  // 默认配置
  const defaultOptions = {
    title: '信息',
    duration: 3000,
    position: 'top-right'
  }
  
  // 合并配置
  const config = Object.assign({}, defaultOptions, options)
  
  // 这里只是一个示例，实际项目中应该使用专门的通知库
  console.info(`[信息] ${config.title}: ${message}`)
  
  // 如果在浏览器环境中，可以创建一个简单的通知
  if (typeof window !== 'undefined') {
    createNotificationElement('info', config.title, message, config)
  }
}

// 创建通知元素
function createNotificationElement(type, title, message, options) {
  // 创建通知容器
  const container = document.createElement('div')
  container.style.position = 'fixed'
  container.style.zIndex = '9999'
  container.style.padding = '15px'
  container.style.borderRadius = '4px'
  container.style.boxShadow = '0 2px 12px 0 rgba(0,0,0,.1)'
  container.style.maxWidth = '300px'
  container.style.wordWrap = 'break-word'
  
  // 设置位置
  switch (options.position) {
    case 'top-left':
      container.style.top = '20px'
      container.style.left = '20px'
      break
    case 'top-right':
      container.style.top = '20px'
      container.style.right = '20px'
      break
    case 'bottom-left':
      container.style.bottom = '20px'
      container.style.left = '20px'
      break
    case 'bottom-right':
      container.style.bottom = '20px'
      container.style.right = '20px'
      break
    default:
      container.style.top = '20px'
      container.style.right = '20px'
  }
  
  // 设置样式
  switch (type) {
    case 'success':
      container.style.backgroundColor = '#f0f9ff'
      container.style.borderColor = '#b2ebf2'
      container.style.color = '#007a7a'
      break
    case 'error':
      container.style.backgroundColor = '#fef0f0'
      container.style.borderColor = '#fbc4c4'
      container.style.color = '#c00000'
      break
    case 'warning':
      container.style.backgroundColor = '#fffbe6'
      container.style.borderColor = '#ffe58f'
      container.style.color = '#8a6d3b'
      break
    case 'info':
      container.style.backgroundColor = '#f4f4f5'
      container.style.borderColor = '#d3dce6'
      container.style.color = '#5a5e66'
      break
    default:
      container.style.backgroundColor = '#ffffff'
      container.style.borderColor = '#ebeef5'
      container.style.color = '#606266'
  }
  
  // 创建标题
  const titleElement = document.createElement('div')
  titleElement.style.fontWeight = 'bold'
  titleElement.style.marginBottom = '5px'
  titleElement.textContent = title
  
  // 创建消息
  const messageElement = document.createElement('div')
  messageElement.textContent = message
  
  // 添加到容器
  container.appendChild(titleElement)
  container.appendChild(messageElement)
  
  // 添加到页面
  document.body.appendChild(container)
  
  // 自动移除
  if (options.duration > 0) {
    setTimeout(() => {
      if (container.parentNode) {
        container.parentNode.removeChild(container)
      }
    }, options.duration)
  }
  
  // 点击移除
  container.addEventListener('click', () => {
    if (container.parentNode) {
      container.parentNode.removeChild(container)
    }
  })
}

// 显示桌面通知
export function showDesktopNotification(title, options = {}) {
  if (!('Notification' in window)) {
    console.warn('此浏览器不支持桌面通知')
    return
  }
  
  if (Notification.permission === 'granted') {
    new Notification(title, options)
  } else if (Notification.permission !== 'denied') {
    Notification.requestPermission().then(permission => {
      if (permission === 'granted') {
        new Notification(title, options)
      }
    })
  }
}