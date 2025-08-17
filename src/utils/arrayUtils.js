// 数组处理工具函数

// 数组去重
export function uniqueArray(arr) {
  if (!Array.isArray(arr)) return []
  
  return [...new Set(arr)]
}

// 根据属性值查找数组中的对象
export function findObjectByProperty(arr, property, value) {
  if (!Array.isArray(arr)) return null
  
  return arr.find(item => item[property] === value) || null
}

// 根据属性值过滤数组中的对象
export function filterObjectsByProperty(arr, property, value) {
  if (!Array.isArray(arr)) return []
  
  return arr.filter(item => item[property] === value)
}

// 数组排序
export function sortArray(arr, property, ascending = true) {
  if (!Array.isArray(arr)) return []
  
  return arr.sort((a, b) => {
    const aVal = a[property]
    const bVal = b[property]
    
    if (aVal < bVal) {
      return ascending ? -1 : 1
    }
    if (aVal > bVal) {
      return ascending ? 1 : -1
    }
    return 0
  })
}