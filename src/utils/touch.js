// 触摸事件工具函数

// 检查是否支持触摸事件
export function isTouchSupported() {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0
}

// 获取触摸点数量
export function getTouchCount(event) {
  return event.touches ? event.touches.length : 0
}

// 获取第一个触摸点的位置
export function getFirstTouchPosition(event) {
  if (!event.touches || event.touches.length === 0) return null
  
  const touch = event.touches[0]
  return {
    x: touch.clientX,
    y: touch.clientY
  }
}

// 检查是否为单指触摸
export function isSingleTouch(event) {
  return getTouchCount(event) === 1
}

// 检查是否为多指触摸
export function isMultiTouch(event) {
  return getTouchCount(event) > 1
}