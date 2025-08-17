// 键盘事件工具函数

// 检查是否按下了 Enter 键
export function isEnterKey(event) {
  return event.key === 'Enter' || event.keyCode === 13
}

// 检查是否按下了 Escape 键
export function isEscapeKey(event) {
  return event.key === 'Escape' || event.keyCode === 27
}

// 检查是否按下了空格键
export function isSpaceKey(event) {
  return event.key === ' ' || event.keyCode === 32
}

// 检查是否按下了 Tab 键
export function isTabKey(event) {
  return event.key === 'Tab' || event.keyCode === 9
}

// 检查是否按下了方向键
export function isArrowKey(event) {
  return [
    'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight',
    'Up', 'Down', 'Left', 'Right'
  ].includes(event.key) || (
    event.keyCode >= 37 && event.keyCode <= 40
  )
}