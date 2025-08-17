// Cookie 工具函数

// 设置 Cookie
export function setCookie(name, value, days) {
  if (!name) return
  
  let expires = ''
  if (days) {
    const date = new Date()
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000))
    expires = `; expires=${date.toUTCString()}`
  }
  
  document.cookie = `${name}=${value || ''}${expires}; path=/`
}

// 获取 Cookie
export function getCookie(name) {
  if (!name) return null
  
  const nameEQ = `${name}=`
  const ca = document.cookie.split(';')
  
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i]
    while (c.charAt(0) === ' ') c = c.substring(1, c.length)
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length)
  }
  
  return null
}

// 删除 Cookie
export function eraseCookie(name) {
  if (!name) return
  
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
}