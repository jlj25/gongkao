// 屏幕尺寸工具函数

// 获取屏幕宽度
export function getScreenWidth() {
  return window.screen.width
}

// 获取屏幕高度
export function getScreenHeight() {
  return window.screen.height
}

// 获取窗口宽度
export function getWindowWidth() {
  return window.innerWidth
}

// 获取窗口高度
export function getWindowHeight() {
  return window.innerHeight
}

// 检查是否为小屏幕设备
export function isSmallScreen() {
  return getWindowWidth() < 768
}

// 检查是否为中等屏幕设备
export function isMediumScreen() {
  return getWindowWidth() >= 768 && getWindowWidth() < 992
}

// 检查是否为大屏幕设备
export function isLargeScreen() {
  return getWindowWidth() >= 992
}