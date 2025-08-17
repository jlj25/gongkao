// 浏览器相关工具函数

// 检查是否支持 localStorage
export function isLocalStorageSupported() {
  try {
    const testKey = '__test__'
    localStorage.setItem(testKey, testKey)
    localStorage.removeItem(testKey)
    return true
  } catch (e) {
    return false
  }
}

// 检查是否支持 sessionStorage
export function isSessionStorageSupported() {
  try {
    const testKey = '__test__'
    sessionStorage.setItem(testKey, testKey)
    sessionStorage.removeItem(testKey)
    return true
  } catch (e) {
    return false
  }
}

// 检查是否支持 IndexedDB
export function isIndexedDBSupported() {
  return 'indexedDB' in window
}

// 检查是否支持 Web Workers
export function isWebWorkersSupported() {
  return 'Worker' in window
}

// 检查是否支持 Service Workers
export function isServiceWorkersSupported() {
  return 'serviceWorker' in navigator
}

// 检查是否支持 Notification
export function isNotificationSupported() {
  return 'Notification' in window
}

// 检查是否支持 Geolocation
export function isGeolocationSupported() {
  return 'geolocation' in navigator
}

// 检查是否支持 WebGL
export function isWebGLSupported() {
  try {
    const canvas = document.createElement('canvas')
    return !!(canvas.getContext && canvas.getContext('webgl'))
  } catch (e) {
    return false
  }
}

// 检查是否支持 Canvas
export function isCanvasSupported() {
  const canvas = document.createElement('canvas')
  return !!(canvas.getContext && canvas.getContext('2d'))
}

// 检查是否支持 SVG
export function isSVGSupported() {
  return !!document.implementation.hasFeature('http://www.w3.org/TR/SVG11/feature#Image', '1.1')
}

// 检查是否支持 Video
export function isVideoSupported() {
  return !!document.createElement('video').canPlayType
}

// 检查是否支持 Audio
export function isAudioSupported() {
  return !!document.createElement('audio').canPlayType
}

// 检查是否支持拖拽
export function isDragAndDropSupported() {
  const div = document.createElement('div')
  return 'draggable' in div || ('ondragstart' in div && 'ondrop' in div)
}

// 检查是否支持触摸事件
export function isTouchSupported() {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0
}

// 检查是否支持 Pointer Events
export function isPointerEventsSupported() {
  return window.PointerEvent !== undefined
}

// 检查是否支持 History API
export function isHistoryAPISupported() {
  return !!(window.history && history.pushState)
}

// 检查是否支持 File API
export function isFileAPISupported() {
  return window.File && window.FileReader && window.FileList && window.Blob
}

// 检查是否支持 FileReader
export function isFileReaderSupported() {
  return !!(window.File && window.FileReader)
}

// 检查是否支持 Blob
export function isBlobSupported() {
  try {
    return !!new Blob()
  } catch (e) {
    return false
  }
}

// 检查是否支持 ArrayBuffer
export function isArrayBufferSupported() {
  return 'ArrayBuffer' in window
}

// 检查是否支持 URL.createObjectURL
export function isCreateObjectURLSupported() {
  return 'URL' in window && 'createObjectURL' in window.URL
}

// 检查是否支持 Promise
export function isPromiseSupported() {
  return 'Promise' in window
}

// 检查是否支持 Fetch API
export function isFetchAPISupported() {
  return 'fetch' in window
}

// 检查是否支持 XMLHttpRequest
export function isXMLHttpRequestSupported() {
  return 'XMLHttpRequest' in window
}

// 检查是否支持 WebSocket
export function isWebSocketSupported() {
  return 'WebSocket' in window
}

// 检查是否支持 WebRTC
export function isWebRTCSupported() {
  return 'RTCPeerConnection' in window || 'mozRTCPeerConnection' in window || 'webkitRTCPeerConnection' in window
}

// 检查是否支持 Payment Request API
export function isPaymentRequestSupported() {
  return 'PaymentRequest' in window
}

// 检查是否支持 Credential Management API
export function isCredentialManagementSupported() {
  return 'credentials' in navigator
}

// 检查是否支持 Clipboard API
export function isClipboardAPISupported() {
  return 'clipboard' in navigator
}

// 检查是否支持 Permissions API
export function isPermissionsAPISupported() {
  return 'permissions' in navigator
}

// 检查是否支持 Vibration API
export function isVibrationSupported() {
  return 'vibrate' in navigator
}

// 检查是否支持 Page Visibility API
export function isPageVisibilitySupported() {
  return 'hidden' in document
}

// 检查是否支持 Fullscreen API
export function isFullscreenSupported() {
  return 'fullscreenEnabled' in document || 'webkitFullscreenEnabled' in document || 'mozFullScreenEnabled' in document || 'msFullscreenEnabled' in document
}

// 检查是否支持 Screen Orientation API
export function isScreenOrientationSupported() {
  return 'orientation' in screen
}

// 检查是否支持 Device Motion API
export function isDeviceMotionSupported() {
  return 'DeviceMotionEvent' in window
}

// 检查是否支持 Device Orientation API
export function isDeviceOrientationSupported() {
  return 'DeviceOrientationEvent' in window
}

// 检查是否支持 Battery Status API
export function isBatteryStatusSupported() {
  return 'getBattery' in navigator
}

// 检查是否支持 Network Information API
export function isNetworkInformationSupported() {
  return 'connection' in navigator
}

// 检查是否支持 Online/Offline Events
export function isOnlineOfflineSupported() {
  return 'ononline' in window && 'onoffline' in window
}

// 检查是否支持 Performance API
export function isPerformanceAPISupported() {
  return 'performance' in window
}

// 检查是否支持 User Timing API
export function isUserTimingSupported() {
  return 'mark' in performance && 'measure' in performance
}

// 检查是否支持 Navigation Timing API
export function isNavigationTimingSupported() {
  return 'timing' in performance
}

// 检查是否支持 Resource Timing API
export function isResourceTimingSupported() {
  return 'getEntriesByType' in performance
}

// 检查是否支持 Animation API
export function isAnimationAPISupported() {
  return 'animate' in Element.prototype
}

// 检查是否支持 Intersection Observer API
export function isIntersectionObserverSupported() {
  return 'IntersectionObserver' in window
}

// 检查是否支持 Resize Observer API
export function isResizeObserverSupported() {
  return 'ResizeObserver' in window
}

// 检查是否支持 Mutation Observer API
export function isMutationObserverSupported() {
  return 'MutationObserver' in window
}

// 检查是否支持 Custom Elements API
export function isCustomElementsSupported() {
  return 'customElements' in window
}

// 检查是否支持 Shadow DOM API
export function isShadowDOMSupported() {
  return 'attachShadow' in Element.prototype
}

// 检查是否支持 Template Element
export function isTemplateElementSupported() {
  return 'content' in document.createElement('template')
}

// 检查是否支持 Slot Element
export function isSlotElementSupported() {
  return 'HTMLSlotElement' in window
}

// 检查是否支持 Intl API
export function isIntlSupported() {
  return 'Intl' in window
}

// 检查是否支持 Intl.DateTimeFormat
export function isDateTimeFormatSupported() {
  return 'DateTimeFormat' in Intl
}

// 检查是否支持 Intl.NumberFormat
export function isNumberFormatSupported() {
  return 'NumberFormat' in Intl
}

// 检查是否支持 Intl.RelativeTimeFormat
export function isRelativeTimeFormatSupported() {
  return 'RelativeTimeFormat' in Intl
}

// 检查是否支持 Intl.PluralRules
export function isPluralRulesSupported() {
  return 'PluralRules' in Intl
}

// 检查是否支持 Intl.ListFormat
export function isListFormatSupported() {
  return 'ListFormat' in Intl
}

// 检查是否支持 Intl.DisplayNames
export function isDisplayNamesSupported() {
  return 'DisplayNames' in Intl
}

// 获取浏览器信息
export function getBrowserInfo() {
  const ua = navigator.userAgent
  let tem
  let M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || []
  
  if (/trident/i.test(M[1])) {
    tem = /\brv[ :]+(\d+)/g.exec(ua) || []
    return { name: 'IE', version: (tem[1] || '') }
  }
  
  if (M[1] === 'Chrome') {
    tem = ua.match(/\b(OPR|Edge)\/(\d+)/)
    if (tem != null) return { name: tem[1].replace('OPR', 'Opera'), version: tem[2] }
  }
  
  M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?']
  if ((tem = ua.match(/version\/(\d+)/i)) != null) M.splice(1, 1, tem[1])
  
  return {
    name: M[0],
    version: M[1]
  }
}

// 获取操作系统信息
export function getOSInfo() {
  const userAgent = navigator.userAgent
  
  if (userAgent.includes('Win')) return 'Windows'
  if (userAgent.includes('Mac')) return 'MacOS'
  if (userAgent.includes('Linux')) return 'Linux'
  if (userAgent.includes('Android')) return 'Android'
  if (userAgent.includes('iOS') || userAgent.includes('iPhone') || userAgent.includes('iPad')) return 'iOS'
  
  return 'Unknown'
}

// 获取屏幕信息
export function getScreenInfo() {
  return {
    width: screen.width,
    height: screen.height,
    availWidth: screen.availWidth,
    availHeight: screen.availHeight,
    colorDepth: screen.colorDepth,
    pixelDepth: screen.pixelDepth
  }
}

// 获取视口信息
export function getViewportInfo() {
  return {
    width: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
    height: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
  }
}

// 获取滚动信息
export function getScrollInfo() {
  return {
    x: window.pageXOffset || document.documentElement.scrollLeft,
    y: window.pageYOffset || document.documentElement.scrollTop
  }
}

// 滚动到顶部
export function scrollToTop() {
  const c = document.documentElement.scrollTop || document.body.scrollTop
  if (c > 0) {
    window.requestAnimationFrame(scrollToTop)
    window.scrollTo(0, c - c / 8)
  }
}

// 滚动到底部
export function scrollToBottom() {
  window.scrollTo(0, document.body.scrollHeight)
}

// 检查元素是否在视口中
export function isInViewport(element) {
  const rect = element.getBoundingClientRect()
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  )
}

// 获取元素相对于文档的位置
export function getElementPosition(element) {
  const rect = element.getBoundingClientRect()
  const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop
  
  return {
    top: rect.top + scrollTop,
    left: rect.left + scrollLeft
  }
}

// 复制文本到剪贴板
export function copyToClipboard(text) {
  if (navigator.clipboard) {
    return navigator.clipboard.writeText(text)
  } else {
    const textarea = document.createElement('textarea')
    textarea.value = text
    document.body.appendChild(textarea)
    textarea.select()
    const result = document.execCommand('copy')
    document.body.removeChild(textarea)
    return Promise.resolve(result)
  }
}

// 从剪贴板读取文本
export function readFromClipboard() {
  if (navigator.clipboard) {
    return navigator.clipboard.readText()
  } else {
    return Promise.reject(new Error('Clipboard API not supported'))
  }
}

// 全屏切换
export function toggleFullscreen(element = document.documentElement) {
  if (!isFullscreenSupported()) return Promise.reject(new Error('Fullscreen not supported'))
  
  if (
    document.fullscreenElement ||
    document.webkitFullscreenElement ||
    document.mozFullScreenElement ||
    document.msFullscreenElement
  ) {
    if (document.exitFullscreen) {
      return document.exitFullscreen()
    } else if (document.webkitExitFullscreen) {
      return document.webkitExitFullscreen()
    } else if (document.mozCancelFullScreen) {
      return document.mozCancelFullScreen()
    } else if (document.msExitFullscreen) {
      return document.msExitFullscreen()
    }
  } else {
    if (element.requestFullscreen) {
      return element.requestFullscreen()
    } else if (element.webkitRequestFullscreen) {
      return element.webkitRequestFullscreen()
    } else if (element.mozRequestFullScreen) {
      return element.mozRequestFullScreen()
    } else if (element.msRequestFullscreen) {
      return element.msRequestFullscreen()
    }
  }
}

// 检查是否处于全屏模式
export function isFullscreen() {
  return !!(
    document.fullscreenElement ||
    document.webkitFullscreenElement ||
    document.mozFullScreenElement ||
    document.msFullscreenElement
  )
}

// 获取页面可见性状态
export function getPageVisibility() {
  if (typeof document.hidden !== 'undefined') {
    return document.hidden ? 'hidden' : 'visible'
  } else if (typeof document.msHidden !== 'undefined') {
    return document.msHidden ? 'hidden' : 'visible'
  } else if (typeof document.webkitHidden !== 'undefined') {
    return document.webkitHidden ? 'hidden' : 'visible'
  }
  
  return 'visible'
}

// 监听页面可见性变化
export function onPageVisibilityChange(callback) {
  if (typeof document.hidden !== 'undefined') {
    document.addEventListener('visibilitychange', callback)
  } else if (typeof document.msHidden !== 'undefined') {
    document.addEventListener('msvisibilitychange', callback)
  } else if (typeof document.webkitHidden !== 'undefined') {
    document.addEventListener('webkitvisibilitychange', callback)
  }
}

// 获取网络连接信息
export function getNetworkInfo() {
  if (navigator.connection) {
    return {
      effectiveType: navigator.connection.effectiveType,
      downlink: navigator.connection.downlink,
      rtt: navigator.connection.rtt,
      saveData: navigator.connection.saveData
    }
  }
  
  return null
}

// 检查是否在线
export function isOnline() {
  return navigator.onLine
}

// 监听在线/离线状态变化
export function onOnlineStatusChange(callback) {
  window.addEventListener('online', callback)
  window.addEventListener('offline', callback)
}

// 获取电池信息
export async function getBatteryInfo() {
  if (!isBatteryStatusSupported()) return null
  
  try {
    const battery = await navigator.getBattery()
    return {
      charging: battery.charging,
      level: battery.level,
      chargingTime: battery.chargingTime,
      dischargingTime: battery.dischargingTime
    }
  } catch (error) {
    console.error('获取电池信息失败:', error)
    return null
  }
}

// 监听电池状态变化
export async function onBatteryStatusChange(callback) {
  if (!isBatteryStatusSupported()) return
  
  try {
    const battery = await navigator.getBattery()
    battery.addEventListener('chargingchange', callback)
    battery.addEventListener('levelchange', callback)
    battery.addEventListener('chargingtimechange', callback)
    battery.addEventListener('dischargingtimechange', callback)
  } catch (error) {
    console.error('监听电池状态变化失败:', error)
  }
}

// 震动设备
export function vibrate(pattern) {
  if (!isVibrationSupported()) return false
  
  return navigator.vibrate(pattern)
}

// 获取地理位置
export function getLocation(options = {}) {
  return new Promise((resolve, reject) => {
    if (!isGeolocationSupported()) {
      reject(new Error('Geolocation is not supported'))
      return
    }
    
    navigator.geolocation.getCurrentPosition(resolve, reject, options)
  })
}

// 监听地理位置变化
export function watchLocation(callback, options = {}) {
  if (!isGeolocationSupported()) return null
  
  return navigator.geolocation.watchPosition(callback, error => {
    console.error('获取地理位置失败:', error)
  }, options)
}

// 清除地理位置监听
export function clearLocationWatch(watchId) {
  if (!isGeolocationSupported()) return
  
  navigator.geolocation.clearWatch(watchId)
}

// 获取用户媒体（摄像头/麦克风）
export function getUserMedia(constraints = { video: true, audio: true }) {
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    return Promise.reject(new Error('getUserMedia is not supported'))
  }
  
  return navigator.mediaDevices.getUserMedia(constraints)
}

// 检查媒体设备
export async function getMediaDevices() {
  if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
    return Promise.reject(new Error('enumerateDevices is not supported'))
  }
  
  return navigator.mediaDevices.enumerateDevices()
}

// 下载文件
export function downloadFile(url, filename) {
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

// 创建并下载 Blob 文件
export function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob)
  downloadFile(url, filename)
  URL.revokeObjectURL(url)
}

// 在新窗口中打开 URL
export function openInNewWindow(url, target = '_blank', features = '') {
  return window.open(url, target, features)
}

// 在新标签页中打开 URL
export function openInNewTab(url) {
  return openInNewWindow(url, '_blank')
}

// 打印页面
export function printPage() {
  window.print()
}

// 获取当前页面 URL 信息
export function getCurrentURLInfo() {
  return {
    href: window.location.href,
    origin: window.location.origin,
    protocol: window.location.protocol,
    host: window.location.host,
    hostname: window.location.hostname,
    port: window.location.port,
    pathname: window.location.pathname,
    search: window.location.search,
    hash: window.location.hash
  }
}

// 解析 URL 查询参数
export function parseURLParams(url) {
  const params = {}
  const parser = document.createElement('a')
  parser.href = url
  const query = parser.search.substring(1)
  const vars = query.split('&')
  
  for (let i = 0; i < vars.length; i++) {
    const pair = vars[i].split('=')
    params[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1])
  }
  
  return params
}

// 获取 URL 查询参数
export function getURLParams() {
  return parseURLParams(window.location.href)
}

// 设置 URL 查询参数
export function setURLParams(params, replace = false) {
  const url = new URL(window.location)
  
  Object.keys(params).forEach(key => {
    if (params[key] === null || params[key] === undefined) {
      url.searchParams.delete(key)
    } else {
      url.searchParams.set(key, params[key])
    }
  })
  
  if (replace) {
    window.history.replaceState({}, '', url)
  } else {
    window.history.pushState({}, '', url)
  }
}

// 删除 URL 查询参数
export function removeURLParams(...keys) {
  const url = new URL(window.location)
  
  keys.forEach(key => {
    url.searchParams.delete(key)
  })
  
  window.history.replaceState({}, '', url)
}

// 重新加载页面
export function reloadPage(force = false) {
  window.location.reload(force)
}

// 重定向到指定 URL
export function redirectTo(url) {
  window.location.href = url
}

// 替换当前页面
export function replacePage(url) {
  window.location.replace(url)
}

// 后退
export function goBack() {
  window.history.back()
}

// 前进
export function goForward() {
  window.history.forward()
}

// 前进/后退指定步数
export function go(steps) {
  window.history.go(steps)
}

// 获取历史记录长度
export function getHistoryLength() {
  return window.history.length
}

// 设置页面标题
export function setPageTitle(title) {
  document.title = title
}

// 获取页面标题
export function getPageTitle() {
  return document.title
}

// 设置页面描述
export function setPageDescription(description) {
  let metaDescription = document.querySelector('meta[name="description"]')
  
  if (!metaDescription) {
    metaDescription = document.createElement('meta')
    metaDescription.name = 'description'
    document.getElementsByTagName('head')[0].appendChild(metaDescription)
  }
  
  metaDescription.content = description
}

// 获取页面描述
export function getPageDescription() {
  const metaDescription = document.querySelector('meta[name="description"]')
  return metaDescription ? metaDescription.content : ''
}

// 设置页面关键字
export function setPageKeywords(keywords) {
  let metaKeywords = document.querySelector('meta[name="keywords"]')
  
  if (!metaKeywords) {
    metaKeywords = document.createElement('meta')
    metaKeywords.name = 'keywords'
    document.getElementsByTagName('head')[0].appendChild(metaKeywords)
  }
  
  metaKeywords.content = keywords
}

// 获取页面关键字
export function getPageKeywords() {
  const metaKeywords = document.querySelector('meta[name="keywords"]')
  return metaKeywords ? metaKeywords.content : ''
}

// 添加 CSS 样式
export function addCSS(css) {
  const style = document.createElement('style')
  style.type = 'text/css'
  
  if (style.styleSheet) {
    style.styleSheet.cssText = css
  } else {
    style.appendChild(document.createTextNode(css))
  }
  
  document.getElementsByTagName('head')[0].appendChild(style)
}

// 添加 CSS 文件
export function addCSSFile(href) {
  const link = document.createElement('link')
  link.rel = 'stylesheet'
  link.type = 'text/css'
  link.href = href
  document.getElementsByTagName('head')[0].appendChild(link)
}

// 添加 JavaScript 文件
export function addJSFile(src) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = src
    
    script.onload = resolve
    script.onerror = reject
    
    document.getElementsByTagName('head')[0].appendChild(script)
  })
}

// 获取元素计算样式
export function getComputedStyle(element, pseudoElement = null) {
  return window.getComputedStyle(element, pseudoElement)
}

// 获取元素实际样式
export function getElementStyle(element, property) {
  return getComputedStyle(element).getPropertyValue(property)
}

// 设置元素样式
export function setElementStyle(element, styles) {
  Object.keys(styles).forEach(property => {
    element.style.setProperty(property, styles[property])
  })
}

// 添加 CSS 类
export function addClass(element, className) {
  element.classList.add(className)
}

// 移除 CSS 类
export function removeClass(element, className) {
  element.classList.remove(className)
}

// 切换 CSS 类
export function toggleClass(element, className) {
  element.classList.toggle(className)
}

// 检查是否包含 CSS 类
export function hasClass(element, className) {
  return element.classList.contains(className)
}

// 获取元素属性
export function getAttribute(element, name) {
  return element.getAttribute(name)
}

// 设置元素属性
export function setAttribute(element, name, value) {
  element.setAttribute(name, value)
}

// 移除元素属性
export function removeAttribute(element, name) {
  element.removeAttribute(name)
}

// 检查元素是否包含指定属性
export function hasAttribute(element, name) {
  return element.hasAttribute(name)
}

// 获取元素数据属性
export function getData(element, key) {
  return element.dataset[key]
}

// 设置元素数据属性
export function setData(element, key, value) {
  element.dataset[key] = value
}

// 移除元素数据属性
export function removeData(element, key) {
  delete element.dataset[key]
}

// 获取元素内容
export function getText(element) {
  return element.textContent || element.innerText
}

// 设置元素内容
export function setText(element, text) {
  element.textContent = text
}

// 获取元素 HTML 内容
export function getHTML(element) {
  return element.innerHTML
}

// 设置元素 HTML 内容
export function setHTML(element, html) {
  element.innerHTML = html
}

// 获取表单数据
export function getFormData(form) {
  const formData = new FormData(form)
  const data = {}
  
  for (const [key, value] of formData.entries()) {
    if (data[key]) {
      if (Array.isArray(data[key])) {
        data[key].push(value)
      } else {
        data[key] = [data[key], value]
      }
    } else {
      data[key] = value
    }
  }
  
  return data
}

// 序列化表单数据
export function serializeFormData(form) {
  const formData = new FormData(form)
  const params = new URLSearchParams()
  
  for (const [key, value] of formData.entries()) {
    params.append(key, value)
  }
  
  return params.toString()
}

// 提交表单
export function submitForm(form, options = {}) {
  const { method = 'POST', action = form.action, target = '_self' } = options
  
  const newForm = document.createElement('form')
  newForm.method = method
  newForm.action = action
  newForm.target = target
  
  const formData = new FormData(form)
  for (const [key, value] of formData.entries()) {
    const input = document.createElement('input')
    input.type = 'hidden'
    input.name = key
    input.value = value
    newForm.appendChild(input)
  }
  
  document.body.appendChild(newForm)
  newForm.submit()
  document.body.removeChild(newForm)
}

// 阻止事件默认行为
export function preventDefault(event) {
  event.preventDefault()
}

// 阻止事件冒泡
export function stopPropagation(event) {
  event.stopPropagation()
}

// 阻止事件默认行为和冒泡
export function stopEvent(event) {
  preventDefault(event)
  stopPropagation(event)
}

// 添加事件监听器
export function addEventListener(element, event, handler, options = false) {
  element.addEventListener(event, handler, options)
}

// 移除事件监听器
export function removeEventListener(element, event, handler, options = false) {
  element.removeEventListener(event, handler, options)
}

// 创建自定义事件
export function createCustomEvent(name, detail = null, bubbles = false, cancelable = false) {
  const event = document.createEvent('CustomEvent')
  event.initCustomEvent(name, bubbles, cancelable, detail)
  return event
}

// 触发自定义事件
export function dispatchCustomEvent(element, name, detail = null, bubbles = false, cancelable = false) {
  const event = createCustomEvent(name, detail, bubbles, cancelable)
  return element.dispatchEvent(event)
}

// 获取事件目标
export function getEventTarget(event) {
  return event.target || event.srcElement
}

// 获取事件当前目标
export function getEventCurrentTarget(event) {
  return event.currentTarget
}

// 获取事件类型
export function getEventType(event) {
  return event.type
}

// 获取事件时间戳
export function getEventTimestamp(event) {
  return event.timeStamp
}

// 获取鼠标事件坐标
export function getMouseEventCoordinates(event) {
  return {
    x: event.clientX,
    y: event.clientY
  }
}

// 获取键盘事件键值
export function getKeyboardEventKey(event) {
  return event.key
}

// 获取键盘事件键码
export function getKeyboardEventKeyCode(event) {
  return event.keyCode || event.which
}

// 检查键盘事件是否按下特定键
export function isKeyPressed(event, key) {
  return event.key === key
}

// 检查键盘事件是否按下 Ctrl 键
export function isCtrlPressed(event) {
  return event.ctrlKey
}

// 检查键盘事件是否按下 Shift 键
export function isShiftPressed(event) {
  return event.shiftKey
}

// 检查键盘事件是否按下 Alt 键
export function isAltPressed(event) {
  return event.altKey
}

// 检查键盘事件是否按下 Meta 键（Cmd/Ctrl）
export function isMetaPressed(event) {
  return event.metaKey
}