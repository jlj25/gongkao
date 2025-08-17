// 加密解密工具函数

// 简单的 Base64 编码
export function base64Encode(str) {
  if (!str) return ''
  
  try {
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (match, p1) => {
      return String.fromCharCode('0x' + p1)
    }))
  } catch (error) {
    console.error('Base64 编码失败:', error)
    return ''
  }
}

// 简单的 Base64 解码
export function base64Decode(str) {
  if (!str) return ''
  
  try {
    return decodeURIComponent(atob(str).split('').map(c => {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
    }).join(''))
  } catch (error) {
    console.error('Base64 解码失败:', error)
    return ''
  }
}

// 简单的加密函数 (Caesar Cipher)
export function caesarEncrypt(str, shift = 3) {
  if (!str) return ''
  
  return str.split('').map(char => {
    const code = char.charCodeAt(0)
    
    // 处理大写字母
    if (code >= 65 && code <= 90) {
      return String.fromCharCode(((code - 65 + shift) % 26) + 65)
    }
    
    // 处理小写字母
    if (code >= 97 && code <= 122) {
      return String.fromCharCode(((code - 97 + shift) % 26) + 97)
    }
    
    // 其他字符不变
    return char
  }).join('')
}

// 简单的解密函数 (Caesar Cipher)
export function caesarDecrypt(str, shift = 3) {
  if (!str) return ''
  
  return str.split('').map(char => {
    const code = char.charCodeAt(0)
    
    // 处理大写字母
    if (code >= 65 && code <= 90) {
      return String.fromCharCode(((code - 65 - shift + 26) % 26) + 65)
    }
    
    // 处理小写字母
    if (code >= 97 && code <= 122) {
      return String.fromCharCode(((code - 97 - shift + 26) % 26) + 97)
    }
    
    // 其他字符不变
    return char
  }).join('')
}

// 生成随机字符串
export function generateRandomString(length = 16) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  
  return result
}

// 生成 UUID
export function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0
    const v = c == 'x' ? r : (r & 0x3 | 0x8)
    return v.toString(16)
  })
}

// 简单的哈希函数 (用于演示，实际项目中应使用更安全的哈希算法)
export function simpleHash(str) {
  if (!str) return 0
  
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash // 转换为32位整数
  }
  
  return hash
}

// MD5 哈希 (简化版本，实际项目中应使用专门的库)
export function md5(str) {
  // 这里只是一个示例，实际项目中应该使用专门的库如 crypto-js
  console.warn('MD5 哈希需要使用专门的库，如 crypto-js')
  return simpleHash(str).toString()
}

// SHA256 哈希 (简化版本，实际项目中应使用专门的库)
export function sha256(str) {
  // 这里只是一个示例，实际项目中应该使用专门的库如 crypto-js
  console.warn('SHA256 哈希需要使用专门的库，如 crypto-js')
  return simpleHash(str).toString(16)
}

// AES 加密 (简化版本，实际项目中应使用专门的库)
export function aesEncrypt(data, key) {
  // 这里只是一个示例，实际项目中应该使用专门的库如 crypto-js
  console.warn('AES 加密需要使用专门的库，如 crypto-js')
  return base64Encode(data)
}

// AES 解密 (简化版本，实际项目中应使用专门的库)
export function aesDecrypt(encryptedData, key) {
  // 这里只是一个示例，实际项目中应该使用专门的库如 crypto-js
  console.warn('AES 解密需要使用专门的库，如 crypto-js')
  return base64Decode(encryptedData)
}