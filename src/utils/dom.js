// DOM 操作工具函数

// 获取元素
export function getElement(selector, parent = document) {
  if (!selector) return null
  
  if (typeof selector === 'string') {
    return parent.querySelector(selector)
  }
  
  return selector // 如果已经是元素对象
}

// 获取元素列表
export function getElements(selector, parent = document) {
  if (!selector) return []
  
  if (typeof selector === 'string') {
    return Array.from(parent.querySelectorAll(selector))
  }
  
  if (Array.isArray(selector)) return selector
  
  return [selector] // 如果是单个元素对象
}

// 添加 CSS 类
export function addClass(element, className) {
  const el = getElement(element)
  if (!el || !className) return
  
  if (el.classList) {
    el.classList.add(className)
  } else {
    el.className += ' ' + className
  }
}

// 移除 CSS 类
export function removeClass(element, className) {
  const el = getElement(element)
  if (!el || !className) return
  
  if (el.classList) {
    el.classList.remove(className)
  } else {
    el.className = el.className.replace(
      new RegExp('(^|\b)' + className.split(' ').join('|') + '(\b|$)', 'gi'),
      ' '
    )
  }
}

// 切换 CSS 类
export function toggleClass(element, className) {
  const el = getElement(element)
  if (!el || !className) return
  
  if (el.classList) {
    el.classList.toggle(className)
  } else {
    const classes = el.className.split(' ')
    const existingIndex = classes.indexOf(className)
    
    if (existingIndex >= 0) {
      classes.splice(existingIndex, 1)
    } else {
      classes.push(className)
    }
    
    el.className = classes.join(' ')
  }
}

// 检查是否有 CSS 类
export function hasClass(element, className) {
  const el = getElement(element)
  if (!el || !className) return false
  
  if (el.classList) {
    return el.classList.contains(className)
  } else {
    return new RegExp('(^| )' + className + '( |$)', 'gi').test(el.className)
  }
}

// 设置元素样式
export function setStyle(element, styles) {
  const el = getElement(element)
  if (!el || !styles) return
  
  Object.keys(styles).forEach(key => {
    el.style[key] = styles[key]
  })
}

// 获取元素样式
export function getStyle(element, property) {
  const el = getElement(element)
  if (!el) return null
  
  return window.getComputedStyle(el)[property]
}

// 设置元素属性
export function setAttribute(element, name, value) {
  const el = getElement(element)
  if (!el || !name) return
  
  el.setAttribute(name, value)
}

// 获取元素属性
export function getAttribute(element, name) {
  const el = getElement(element)
  if (!el || !name) return null
  
  return el.getAttribute(name)
}

// 移除元素属性
export function removeAttribute(element, name) {
  const el = getElement(element)
  if (!el || !name) return
  
  el.removeAttribute(name)
}

// 设置元素文本内容
export function setText(element, text) {
  const el = getElement(element)
  if (!el) return
  
  el.textContent = text
}

// 设置元素HTML内容
export function setHTML(element, html) {
  const el = getElement(element)
  if (!el) return
  
  el.innerHTML = html
}

// 获取元素文本内容
export function getText(element) {
  const el = getElement(element)
  if (!el) return ''
  
  return el.textContent
}

// 获取元素HTML内容
export function getHTML(element) {
  const el = getElement(element)
  if (!el) return ''
  
  return el.innerHTML
}

// 显示元素
export function show(element) {
  const el = getElement(element)
  if (!el) return
  
  el.style.display = ''
}

// 隐藏元素
export function hide(element) {
  const el = getElement(element)
  if (!el) return
  
  el.style.display = 'none'
}

// 切换元素显示/隐藏
export function toggle(element) {
  const el = getElement(element)
  if (!el) return
  
  if (el.style.display === 'none') {
    show(el)
  } else {
    hide(el)
  }
}

// 检查元素是否可见
export function isVisible(element) {
  const el = getElement(element)
  if (!el) return false
  
  return el.offsetParent !== null
}

// 获取元素位置
export function getPosition(element) {
  const el = getElement(element)
  if (!el) return { x: 0, y: 0 }
  
  return {
    x: el.offsetLeft,
    y: el.offsetTop
  }
}

// 获取元素尺寸
export function getSize(element) {
  const el = getElement(element)
  if (!el) return { width: 0, height: 0 }
  
  return {
    width: el.offsetWidth,
    height: el.offsetHeight
  }
}

// 创建元素
export function createElement(tag, attributes = {}, styles = {}) {
  const el = document.createElement(tag)
  
  // 设置属性
  Object.keys(attributes).forEach(key => {
    el.setAttribute(key, attributes[key])
  })
  
  // 设置样式
  Object.keys(styles).forEach(key => {
    el.style[key] = styles[key]
  })
  
  return el
}

// 添加元素
export function appendElement(parent, child) {
  const parentEl = getElement(parent)
  const childEl = getElement(child)
  
  if (!parentEl || !childEl) return
  
  parentEl.appendChild(childEl)
}

// 移除元素
export function removeElement(element) {
  const el = getElement(element)
  if (!el || !el.parentNode) return
  
  el.parentNode.removeChild(el)
}

// 监听事件
export function on(element, event, handler, options = false) {
  const el = getElement(element)
  if (!el || !event || !handler) return
  
  el.addEventListener(event, handler, options)
}

// 移除事件监听
export function off(element, event, handler, options = false) {
  const el = getElement(element)
  if (!el || !event || !handler) return
  
  el.removeEventListener(event, handler, options)
}

// 触发事件
export function trigger(element, event) {
  const el = getElement(element)
  if (!el || !event) return
  
  const evt = new Event(event)
  el.dispatchEvent(evt)
}

// 获取滚动位置
export function getScrollPosition() {
  return {
    x: window.pageXOffset || document.documentElement.scrollLeft,
    y: window.pageYOffset || document.documentElement.scrollTop
  }
}

// 滚动到指定位置
export function scrollTo(x, y) {
  window.scrollTo(x, y)
}

// 平滑滚动到指定元素
export function smoothScrollTo(element, offset = 0) {
  const el = getElement(element)
  if (!el) return
  
  const y = el.getBoundingClientRect().top + window.pageYOffset - offset
  window.scrollTo({ top: y, behavior: 'smooth' })
}

// 获取视口尺寸
export function getViewportSize() {
  return {
    width: window.innerWidth || document.documentElement.clientWidth,
    height: window.innerHeight || document.documentElement.clientHeight
  }
}

// 防抖函数
export function debounce(func, wait, immediate) {
  let timeout
  return function() {
    const context = this
    const args = arguments
    
    const later = function() {
      timeout = null
      if (!immediate) func.apply(context, args)
    }
    
    const callNow = immediate && !timeout
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
    
    if (callNow) func.apply(context, args)
  }
}

// 节流函数
export function throttle(func, limit) {
  let inThrottle
  return function() {
    const args = arguments
    const context = this
    
    if (!inThrottle) {
      func.apply(context, args)
      inThrottle = true
      setTimeout(() => inThrottle = false, limit)
    }
  }
}