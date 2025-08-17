// 数组操作工具函数

// 检查是否为数组
export function isArray(arr) {
  return Array.isArray(arr)
}

// 检查数组是否为空
export function isEmpty(arr) {
  return !arr || arr.length === 0
}

// 获取数组第一个元素
export function first(arr) {
  return isArray(arr) && arr.length > 0 ? arr[0] : undefined
}

// 获取数组最后一个元素
export function last(arr) {
  return isArray(arr) && arr.length > 0 ? arr[arr.length - 1] : undefined
}

// 获取数组中指定索引的元素，支持负数索引
export function at(arr, index) {
  if (!isArray(arr)) return undefined
  
  const len = arr.length
  if (index < 0) {
    index = len + index
  }
  
  return arr[index]
}

// 数组去重
export function unique(arr) {
  if (!isArray(arr)) return []
  return [...new Set(arr)]
}

// 数组去重（对象数组，根据指定属性）
export function uniqueBy(arr, key) {
  if (!isArray(arr)) return []
  
  const seen = new Set()
  return arr.filter(item => {
    const value = item[key]
    if (seen.has(value)) {
      return false
    } else {
      seen.add(value)
      return true
    }
  })
}

// 数组扁平化
export function flatten(arr, depth = 1) {
  if (!isArray(arr)) return []
  
  if (depth <= 0) return arr.slice()
  
  return arr.reduce((acc, val) => {
    return acc.concat(isArray(val) && depth > 1 ? flatten(val, depth - 1) : val)
  }, [])
}

// 深度扁平化
export function flattenDeep(arr) {
  if (!isArray(arr)) return []
  
  return arr.reduce((acc, val) => {
    return acc.concat(isArray(val) ? flattenDeep(val) : val)
  }, [])
}

// 数组分块
export function chunk(arr, size) {
  if (!isArray(arr) || size <= 0) return []
  
  const result = []
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size))
  }
  return result
}

// 数组交集
export function intersection(arr1, arr2) {
  if (!isArray(arr1) || !isArray(arr2)) return []
  
  const set2 = new Set(arr2)
  return arr1.filter(item => set2.has(item))
}

// 数组并集
export function union(arr1, arr2) {
  if (!isArray(arr1) && !isArray(arr2)) return []
  if (!isArray(arr1)) return arr2.slice()
  if (!isArray(arr2)) return arr1.slice()
  
  return unique([...arr1, ...arr2])
}

// 数组差集
export function difference(arr1, arr2) {
  if (!isArray(arr1)) return []
  if (!isArray(arr2)) return arr1.slice()
  
  const set2 = new Set(arr2)
  return arr1.filter(item => !set2.has(item))
}

// 数组对称差集
export function symmetricDifference(arr1, arr2) {
  if (!isArray(arr1) && !isArray(arr2)) return []
  if (!isArray(arr1)) return arr2.slice()
  if (!isArray(arr2)) return arr1.slice()
  
  const set1 = new Set(arr1)
  const set2 = new Set(arr2)
  
  return [
    ...arr1.filter(item => !set2.has(item)),
    ...arr2.filter(item => !set1.has(item))
  ]
}

// 数组排序（数字）
export function sortNumeric(arr, order = 'asc') {
  if (!isArray(arr)) return []
  
  return arr.slice().sort((a, b) => {
    return order === 'asc' ? a - b : b - a
  })
}

// 数组排序（字符串）
export function sortString(arr, order = 'asc') {
  if (!isArray(arr)) return []
  
  return arr.slice().sort((a, b) => {
    const comparison = a.localeCompare(b)
    return order === 'asc' ? comparison : -comparison
  })
}

// 数组排序（对象，根据指定属性）
export function sortBy(arr, key, order = 'asc') {
  if (!isArray(arr)) return []
  
  return arr.slice().sort((a, b) => {
    const aVal = a[key]
    const bVal = b[key]
    
    // 处理数字
    if (typeof aVal === 'number' && typeof bVal === 'number') {
      return order === 'asc' ? aVal - bVal : bVal - aVal
    }
    
    // 处理字符串
    if (typeof aVal === 'string' && typeof bVal === 'string') {
      const comparison = aVal.localeCompare(bVal)
      return order === 'asc' ? comparison : -comparison
    }
    
    // 其他情况转换为字符串比较
    const comparison = String(aVal).localeCompare(String(bVal))
    return order === 'asc' ? comparison : -comparison
  })
}

// 随机打乱数组
export function shuffle(arr) {
  if (!isArray(arr)) return []
  
  const result = arr.slice()
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    [result[i], result[j]] = [result[j], result[i]]
  }
  return result
}

// 随机取数组中的一个元素
export function random(arr) {
  if (!isArray(arr) || arr.length === 0) return undefined
  
  const index = Math.floor(Math.random() * arr.length)
  return arr[index]
}

// 随机取数组中的多个元素（不重复）
export function randomMultiple(arr, count) {
  if (!isArray(arr) || arr.length === 0 || count <= 0) return []
  
  const shuffled = shuffle(arr)
  return shuffled.slice(0, count)
}

// 数组求和
export function sum(arr) {
  if (!isArray(arr)) return 0
  
  return arr.reduce((acc, val) => acc + (typeof val === 'number' ? val : 0), 0)
}

// 数组平均值
export function average(arr) {
  if (!isArray(arr) || arr.length === 0) return 0
  
  const total = sum(arr)
  return total / arr.length
}

// 数组最大值
export function max(arr) {
  if (!isArray(arr) || arr.length === 0) return undefined
  
  return arr.reduce((acc, val) => (val > acc ? val : acc), arr[0])
}

// 数组最小值
export function min(arr) {
  if (!isArray(arr) || arr.length === 0) return undefined
  
  return arr.reduce((acc, val) => (val < acc ? val : acc), arr[0])
}

// 数组最大值（对象数组，根据指定属性）
export function maxBy(arr, key) {
  if (!isArray(arr) || arr.length === 0) return undefined
  
  return arr.reduce((max, current) => (current[key] > max[key] ? current : max), arr[0])
}

// 数组最小值（对象数组，根据指定属性）
export function minBy(arr, key) {
  if (!isArray(arr) || arr.length === 0) return undefined
  
  return arr.reduce((min, current) => (current[key] < min[key] ? current : min), arr[0])
}

// 数组分组
export function groupBy(arr, key) {
  if (!isArray(arr)) return {}
  
  return arr.reduce((groups, item) => {
    const group = item[key]
    if (!groups[group]) {
      groups[group] = []
    }
    groups[group].push(item)
    return groups
  }, {})
}

// 数组计数
export function countBy(arr, key) {
  if (!isArray(arr)) return {}
  
  return arr.reduce((counts, item) => {
    const group = item[key]
    counts[group] = (counts[group] || 0) + 1
    return counts
  }, {})
}

// 数组索引映射
export function keyBy(arr, key) {
  if (!isArray(arr)) return {}
  
  return arr.reduce((obj, item) => {
    obj[item[key]] = item
    return obj
  }, {})
}

// 数组转换为树结构
export function arrayToTree(arr, id = 'id', parentId = 'parentId', children = 'children') {
  if (!isArray(arr)) return []
  
  const map = {}
  const result = []
  
  // 构建映射
  arr.forEach(item => {
    map[item[id]] = { ...item }
    map[item[id]][children] = []
  })
  
  // 构建树结构
  arr.forEach(item => {
    const node = map[item[id]]
    if (item[parentId] && map[item[parentId]]) {
      map[item[parentId]][children].push(node)
    } else {
      result.push(node)
    }
  })
  
  return result
}

// 树结构转换为数组
export function treeToArray(tree, children = 'children') {
  if (!tree) return []
  
  const result = []
  
  const traverse = (nodes) => {
    if (!isArray(nodes)) return
    
    nodes.forEach(node => {
      const { [children]: childNodes, ...rest } = node
      result.push(rest)
      if (childNodes && childNodes.length > 0) {
        traverse(childNodes)
      }
    })
  }
  
  traverse(isArray(tree) ? tree : [tree])
  return result
}

// 根据条件过滤数组
export function filter(arr, predicate) {
  if (!isArray(arr)) return []
  
  return arr.filter(predicate)
}

// 根据条件查找数组元素
export function find(arr, predicate) {
  if (!isArray(arr)) return undefined
  
  return arr.find(predicate)
}

// 根据条件查找数组元素的索引
export function findIndex(arr, predicate) {
  if (!isArray(arr)) return -1
  
  return arr.findIndex(predicate)
}

// 检查数组是否包含满足条件的元素
export function some(arr, predicate) {
  if (!isArray(arr)) return false
  
  return arr.some(predicate)
}

// 检查数组是否所有元素都满足条件
export function every(arr, predicate) {
  if (!isArray(arr)) return false
  
  return arr.every(predicate)
}

// 数组映射
export function map(arr, mapper) {
  if (!isArray(arr)) return []
  
  return arr.map(mapper)
}

// 数组归约
export function reduce(arr, reducer, initialValue) {
  if (!isArray(arr)) return initialValue !== undefined ? initialValue : undefined
  
  return arr.reduce(reducer, initialValue)
}

// 数组反转
export function reverse(arr) {
  if (!isArray(arr)) return []
  
  return arr.slice().reverse()
}

// 获取数组中指定范围的元素
export function slice(arr, start, end) {
  if (!isArray(arr)) return []
  
  return arr.slice(start, end)
}

// 移除数组中指定索引的元素
export function removeAt(arr, index) {
  if (!isArray(arr)) return []
  
  const result = arr.slice()
  result.splice(index, 1)
  return result
}

// 移除数组中满足条件的元素
export function remove(arr, predicate) {
  if (!isArray(arr)) return []
  
  const result = []
  const removed = []
  
  arr.forEach(item => {
    if (predicate(item)) {
      removed.push(item)
    } else {
      result.push(item)
    }
  })
  
  return { result, removed }
}

// 插入元素到数组指定位置
export function insertAt(arr, index, item) {
  if (!isArray(arr)) return []
  
  const result = arr.slice()
  result.splice(index, 0, item)
  return result
}

// 替换数组中指定索引的元素
export function replaceAt(arr, index, item) {
  if (!isArray(arr)) return []
  
  const result = arr.slice()
  result[index] = item
  return result
}