// 正则表达式工具函数

// 检查字符串是否匹配正则表达式
export function matches(str, pattern, flags = '') {
  if (!str || !pattern) return false
  
  const regex = typeof pattern === 'string' ? new RegExp(pattern, flags) : pattern
  return regex.test(str)
}

// 从字符串中提取匹配的文本
export function extract(str, pattern, flags = '') {
  if (!str || !pattern) return []
  
  const regex = typeof pattern === 'string' ? new RegExp(pattern, flags) : pattern
  const matches = str.match(regex)
  return matches ? (matches.length > 1 ? matches.slice(1) : [matches[0]]) : []
}

// 从字符串中提取所有匹配的文本
export function extractAll(str, pattern, flags = 'g') {
  if (!str || !pattern) return []
  
  const regex = typeof pattern === 'string' ? new RegExp(pattern, flags) : pattern
  const matches = str.matchAll ? Array.from(str.matchAll(regex)) : []
  return matches.map(match => match.length > 1 ? match.slice(1) : [match[0]])
}

// 替换字符串中的匹配文本
export function replace(str, pattern, replacement, flags = '') {
  if (!str || !pattern) return str
  
  const regex = typeof pattern === 'string' ? new RegExp(pattern, flags) : pattern
  return str.replace(regex, replacement)
}

// 全局替换字符串中的匹配文本
export function replaceAll(str, pattern, replacement, flags = 'g') {
  if (!str || !pattern) return str
  
  const regex = typeof pattern === 'string' ? new RegExp(pattern, flags) : pattern
  return str.replace(regex, replacement)
}

// 分割字符串
export function split(str, pattern, flags = '') {
  if (!str || !pattern) return [str]
  
  const regex = typeof pattern === 'string' ? new RegExp(pattern, flags) : pattern
  return str.split(regex)
}

// 转义正则表达式特殊字符
export function escapeRegExp(str) {
  if (!str) return str
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

// 创建正则表达式
export function createRegExp(pattern, flags = '') {
  try {
    return new RegExp(pattern, flags)
  } catch (error) {
    console.error('创建正则表达式失败:', error)
    return null
  }
}

// 验证邮箱格式
export function isEmail(str) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return matches(str, emailRegex)
}

// 验证手机号格式
export function isMobile(str) {
  const mobileRegex = /^1[3-9]\d{9}$/
  return matches(str, mobileRegex)
}

// 验证电话号码格式
export function isTelephone(str) {
  const telephoneRegex = /^(0\d{2,3}-?)?\d{7,8}(\d{1,4})?$/
  return matches(str, telephoneRegex)
}

// 验证身份证号格式
export function isIdCard(str) {
  const idCardRegex = /(^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}$)/
  return matches(str, idCardRegex)
}

// 验证URL格式
export function isUrl(str) {
  const urlRegex = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/
  return matches(str, urlRegex)
}

// 验证IPv4地址
export function isIPv4(str) {
  const ipv4Regex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
  return matches(str, ipv4Regex)
}

// 验证IPv6地址
export function isIPv6(str) {
  const ipv6Regex = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/
  return matches(str, ipv6Regex)
}

// 验证MAC地址
export function isMacAddress(str) {
  const macRegex = /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/
  return matches(str, macRegex)
}

// 验证邮政编码
export function isPostalCode(str) {
  const postalCodeRegex = /^[1-9]\d{5}$/
  return matches(str, postalCodeRegex)
}

// 验证车牌号
export function isLicensePlate(str) {
  const licensePlateRegex = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/
  return matches(str, licensePlateRegex)
}

// 验证中文
export function isChinese(str) {
  const chineseRegex = /^[一-龥]+$/
  return matches(str, chineseRegex)
}

// 验证英文
export function isEnglish(str) {
  const englishRegex = /^[A-Za-z]+$/
  return matches(str, englishRegex)
}

// 验证数字
export function isNumber(str) {
  const numberRegex = /^[0-9]+$/
  return matches(str, numberRegex)
}

// 验证字母数字
export function isAlphanumeric(str) {
  const alphanumericRegex = /^[A-Za-z0-9]+$/
  return matches(str, alphanumericRegex)
}

// 验证强密码（至少8位，包含大小写字母、数字和特殊字符）
export function isStrongPassword(str) {
  const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/
  return matches(str, strongPasswordRegex)
}

// 验证日期格式（YYYY-MM-DD）
export function isDate(str) {
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/
  if (!matches(str, dateRegex)) return false
  
  const date = new Date(str)
  return date.toISOString().slice(0, 10) === str
}

// 验证时间格式（HH:mm:ss）
export function isTime(str) {
  const timeRegex = /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/i
  return matches(str, timeRegex)
}

// 验证十六进制颜色
export function isHexColor(str) {
  const hexColorRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/
  return matches(str, hexColorRegex)
}

// 验证RGB颜色
export function isRgbColor(str) {
  const rgbColorRegex = /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/i
  const match = extract(str, rgbColorRegex)
  if (!match || match.length !== 3) return false
  
  return match.every(val => parseInt(val, 10) >= 0 && parseInt(val, 10) <= 255)
}

// 验证RGBA颜色
export function isRgbaColor(str) {
  const rgbaColorRegex = /^rgba\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(0|1|0?\.\d+)\s*\)$/i
  const match = extract(str, rgbaColorRegex)
  if (!match || match.length !== 4) return false
  
  const [r, g, b, a] = match.map(val => parseFloat(val))
  return r >= 0 && r <= 255 && g >= 0 && g <= 255 && b >= 0 && b <= 255 && a >= 0 && a <= 1
}

// 验证HSL颜色
export function isHslColor(str) {
  const hslColorRegex = /^hsl\(\s*(\d{1,3})\s*,\s*(\d{1,3})%\s*,\s*(\d{1,3})%\s*\)$/i
  const match = extract(str, hslColorRegex)
  if (!match || match.length !== 3) return false
  
  const [h, s, l] = match.map(val => parseInt(val, 10))
  return h >= 0 && h <= 360 && s >= 0 && s <= 100 && l >= 0 && l <= 100
}

// 验证HSLA颜色
export function isHslaColor(str) {
  const hslaColorRegex = /^hsla\(\s*(\d{1,3})\s*,\s*(\d{1,3})%\s*,\s*(\d{1,3})%\s*,\s*(0|1|0?\.\d+)\s*\)$/i
  const match = extract(str, hslaColorRegex)
  if (!match || match.length !== 4) return false
  
  const [h, s, l, a] = match.map(val => parseFloat(val))
  return h >= 0 && h <= 360 && s >= 0 && s <= 100 && l >= 0 && l <= 100 && a >= 0 && a <= 1
}