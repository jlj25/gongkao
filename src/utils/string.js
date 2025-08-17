// 字符串操作工具函数

// 检查字符串是否为空或仅包含空白字符
export function isEmpty(str) {
  return !str || str.trim().length === 0
}

// 去除字符串两端的空白字符
export function trim(str) {
  return str ? str.trim() : ''
}

// 去除字符串左侧的空白字符
export function trimLeft(str) {
  return str ? str.replace(/^\s+/, '') : ''
}

// 去除字符串右侧的空白字符
export function trimRight(str) {
  return str ? str.replace(/\s+$/, '') : ''
}

// 将字符串转换为驼峰命名
export function toCamelCase(str) {
  return str.replace(/[-_\s]+(.)?/g, (match, chr) => chr ? chr.toUpperCase() : '')
}

// 将字符串转换为短横线命名
export function toKebabCase(str) {
  return str.replace(/[A-Z]/g, match => `-${match.toLowerCase()}`)
}

// 将字符串转换为下划线命名
export function toSnakeCase(str) {
  return str.replace(/[A-Z]/g, match => `_${match.toLowerCase()}`)
}

// 首字母大写
export function capitalize(str) {
  return str ? str.charAt(0).toUpperCase() + str.slice(1) : ''
}

// 首字母小写
export function uncapitalize(str) {
  return str ? str.charAt(0).toLowerCase() + str.slice(1) : ''
}

// 所有单词首字母大写
export function titleCase(str) {
  return str.replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase())
}

// 重复字符串
export function repeat(str, count) {
  return str.repeat(count)
}

// 截取字符串
export function truncate(str, length, suffix = '...') {
  if (!str || str.length <= length) return str
  return str.substring(0, length - suffix.length) + suffix
}

// 生成随机字符串
export function randomString(length = 16) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

// 生成随机数字字符串
export function randomNumberString(length = 6) {
  const chars = '0123456789'
  let result = ''
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

// 生成随机字母字符串
export function randomLetterString(length = 6) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
  let result = ''
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

// 检查字符串是否包含中文
export function hasChinese(str) {
  return /[一-龥]/.test(str)
}

// 检查字符串是否为有效的邮箱格式
export function isEmail(str) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(str)
}

// 检查字符串是否为有效的手机号格式
export function isMobile(str) {
  const mobileRegex = /^1[3-9]\d{9}$/
  return mobileRegex.test(str)
}

// 检查字符串是否为有效的电话号码格式
export function isTelephone(str) {
  const telephoneRegex = /^(0\d{2,3}-?)?\d{7,8}(\d{1,4})?$/
  return telephoneRegex.test(str)
}

// 检查字符串是否为有效的身份证号格式
export function isIdCard(str) {
  const idCardRegex = /(^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}$)/
  return idCardRegex.test(str)
}

// 检查字符串是否为有效的URL格式
export function isUrl(str) {
  const urlRegex = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/
  return urlRegex.test(str)
}

// 检查字符串是否为有效的IPv4地址
export function isIPv4(str) {
  const ipv4Regex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
  return ipv4Regex.test(str)
}

// 检查字符串是否为有效的IPv6地址
export function isIPv6(str) {
  const ipv6Regex = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/
  return ipv6Regex.test(str)
}

// 检查字符串是否为有效的MAC地址
export function isMacAddress(str) {
  const macRegex = /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/
  return macRegex.test(str)
}

// 检查字符串是否为有效的邮政编码
export function isPostalCode(str) {
  const postalCodeRegex = /^[1-9]\d{5}$/
  return postalCodeRegex.test(str)
}

// 检查字符串是否为有效的车牌号
export function isLicensePlate(str) {
  const licensePlateRegex = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/
  return licensePlateRegex.test(str)
}

// 格式化手机号（隐藏中间四位）
export function formatMobile(str) {
  if (!str) return ''
  return str.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
}

// 格式化身份证号（隐藏中间部分）
export function formatIdCard(str) {
  if (!str) return ''
  return str.replace(/(\d{6})\d{8}(\d{4})/, '$1********$2')
}

// 格式化银行卡号（每4位添加空格）
export function formatBankCard(str) {
  if (!str) return ''
  return str.replace(/(\d{4})/g, '$1 ').trim()
}

// 格式化金额
export function formatCurrency(amount, decimals = 2, currency = '¥') {
  if (isNaN(amount)) return ''
  return currency + Number(amount).toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

// 模糊匹配
export function fuzzyMatch(str, pattern) {
  if (!str || !pattern) return false
  
  const escapeRegExp = (string) => {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  }
  
  const regex = new RegExp(escapeRegExp(pattern).split('').join('.*'), 'i')
  return regex.test(str)
}

// 计算字符串字节长度（支持中文）
export function byteLength(str) {
  if (!str) return 0
  
  let length = 0
  for (let i = 0; i < str.length; i++) {
    const code = str.charCodeAt(i)
    if (code >= 0x0000 && code <= 0x007f) {
      length += 1
    } else if (code >= 0x0080 && code <= 0x07ff) {
      length += 2
    } else if (code >= 0x0800 && code <= 0xffff) {
      length += 3
    } else {
      length += 4
    }
  }
  return length
}

// 限制字符串字节长度（支持中文）
export function limitByteLength(str, maxLength) {
  if (!str) return ''
  
  let length = 0
  let result = ''
  
  for (let i = 0; i < str.length; i++) {
    const char = str.charAt(i)
    const code = str.charCodeAt(i)
    let charLength = 1
    
    if (code >= 0x0000 && code <= 0x007f) {
      charLength = 1
    } else if (code >= 0x0080 && code <= 0x07ff) {
      charLength = 2
    } else if (code >= 0x0800 && code <= 0xffff) {
      charLength = 3
    } else {
      charLength = 4
    }
    
    if (length + charLength > maxLength) {
      break
    }
    
    length += charLength
    result += char
  }
  
  return result
}