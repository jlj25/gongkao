// 鼠标事件工具函数

// 检查是否为左键点击
export function isLeftClick(event) {
  return event.button === 0
}

// 检查是否为右键点击
export function isRightClick(event) {
  return event.button === 2
}

// 检查是否为中键点击
export function isMiddleClick(event) {
  return event.button === 1
}

// 获取鼠标相对于元素的位置
export function getMousePosition(event, element) {
  const rect = element.getBoundingClientRect()
  return {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top
  }
}

// 检查鼠标是否在元素内部
export function isMouseInsideElement(event, element) {
  const rect = element.getBoundingClientRect()
  return (
    event.clientX >= rect.left &&
    event.clientX <= rect.right &&
    event.clientY >= rect.top &&
    event.clientY <= rect.bottom
  )
}