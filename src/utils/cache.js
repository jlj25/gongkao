// 缓存工具函数

// 设置本地存储
export function setLocalStorage(key, value) {
  if (!key) return
  
  try {
    if (typeof value === 'object') {
      localStorage.setItem(key, JSON.stringify(value))
    } else {
      localStorage.setItem(key, value)
    }
  } catch (error) {
    console.error('设置本地存储失败:', error)
  }
}

// 获取本地存储
export function getLocalStorage(key, defaultValue = null) {
  if (!key) return defaultValue
  
  try {
    const value = localStorage.getItem(key)
    if (value === null) return defaultValue
    
    try {
      return JSON.parse(value)
    } catch (e) {
      return value
    }
  } catch (error) {
    console.error('获取本地存储失败:', error)
    return defaultValue
  }
}

// 删除本地存储
export function removeLocalStorage(key) {
  if (!key) return
  
  try {
    localStorage.removeItem(key)
  } catch (error) {
    console.error('删除本地存储失败:', error)
  }
}

// 清空本地存储
export function clearLocalStorage() {
  try {
    localStorage.clear()
  } catch (error) {
    console.error('清空本地存储失败:', error)
  }
}

// 设置会话存储
export function setSessionStorage(key, value) {
  if (!key) return
  
  try {
    if (typeof value === 'object') {
      sessionStorage.setItem(key, JSON.stringify(value))
    } else {
      sessionStorage.setItem(key, value)
    }
  } catch (error) {
    console.error('设置会话存储失败:', error)
  }
}

// 获取会话存储
export function getSessionStorage(key, defaultValue = null) {
  if (!key) return defaultValue
  
  try {
    const value = sessionStorage.getItem(key)
    if (value === null) return defaultValue
    
    try {
      return JSON.parse(value)
    } catch (e) {
      return value
    }
  } catch (error) {
    console.error('获取会话存储失败:', error)
    return defaultValue
  }
}

// 删除会话存储
export function removeSessionStorage(key) {
  if (!key) return
  
  try {
    sessionStorage.removeItem(key)
  } catch (error) {
    console.error('删除会话存储失败:', error)
  }
}

// 清空会话存储
export function clearSessionStorage() {
  try {
    sessionStorage.clear()
  } catch (error) {
    console.error('清空会话存储失败:', error)
  }
}

// 设置 Cookie
export function setCookie(name, value, days = 7) {
  if (!name) return
  
  let expires = ''
  if (days) {
    const date = new Date()
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000))
    expires = '; expires=' + date.toUTCString()
  }
  
  document.cookie = name + '=' + (value || '') + expires + '; path=/'
}

// 获取 Cookie
export function getCookie(name) {
  if (!name) return null
  
  const nameEQ = name + '='
  const ca = document.cookie.split(';')
  
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i]
    while (c.charAt(0) === ' ') c = c.substring(1, c.length)
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length)
  }
  
  return null
}

// 删除 Cookie
export function removeCookie(name) {
  if (!name) return
  
  document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
}