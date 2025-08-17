// 主题切换工具函数

// 存储当前主题
let currentTheme = 'light'

// 设置主题
export function setTheme(theme) {
  if (theme !== 'light' && theme !== 'dark') return
  
  currentTheme = theme
  document.body.className = `theme-${theme}`
  
  // 保存到本地存储
  localStorage.setItem('theme', theme)
}

// 获取当前主题
export function getCurrentTheme() {
  return currentTheme
}

// 切换主题
export function toggleTheme() {
  const newTheme = currentTheme === 'light' ? 'dark' : 'light'
  setTheme(newTheme)
}

// 初始化主题
export function initTheme() {
  // 从本地存储获取主题
  const savedTheme = localStorage.getItem('theme')
  
  if (savedTheme) {
    setTheme(savedTheme)
  } else {
    // 根据系统偏好设置主题
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
    setTheme(prefersDark ? 'dark' : 'light')
  }
}