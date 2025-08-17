// 对象处理工具函数

// 深拷贝对象
export function deepClone(obj) {
  if (!obj || typeof obj !== 'object') return obj
  
  if (obj instanceof Date) return new Date(obj)
  if (obj instanceof RegExp) return new RegExp(obj)
  
  const clonedObj = Array.isArray(obj) ? [] : {}
  
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      clonedObj[key] = deepClone(obj[key])
    }
  }
  
  return clonedObj
}

// 合并对象
export function mergeObjects(target, source) {
  if (!target || !source) return target || source
  
  const merged = deepClone(target)
  
  for (const key in source) {
    if (source.hasOwnProperty(key)) {
      if (typeof source[key] === 'object' && typeof merged[key] === 'object') {
        merged[key] = mergeObjects(merged[key], source[key])
      } else {
        merged[key] = source[key]
      }
    }
  }
  
  return merged
}

// 检查对象是否为空
export function isEmptyObject(obj) {
  if (!obj || typeof obj !== 'object') return true
  
  return Object.keys(obj).length === 0
}