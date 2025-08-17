// 字符串处理工具函数

// 首字母大写
export function capitalize(str) {
  if (!str) return ''
  
  return str.charAt(0).toUpperCase() + str.slice(1)
}

// 驼峰转下划线
export function camelToUnderline(str) {
  if (!str) return ''
  
  return str.replace(/[A-Z]/g, match => `_${match.toLowerCase()}`)
}

// 下划线转驼峰
export function underlineToCamel(str) {
  if (!str) return ''
  
  return str.replace(/_([a-z])/g, (match, letter) => letter.toUpperCase())
}

// 截取字符串并添加省略号
export function truncate(str, length = 50) {
  if (!str) return ''
  
  return str.length > length ? `${str.substring(0, length)}...` : str
}