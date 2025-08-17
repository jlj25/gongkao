// 对象操作工具函数

// 检查是否为对象
export function isObject(obj) {
  return obj !== null && typeof obj === 'object' && !Array.isArray(obj)
}

// 检查对象是否为空
export function isEmpty(obj) {
  if (!isObject(obj)) return true
  return Object.keys(obj).length === 0
}

// 检查对象是否包含指定属性
export function has(obj, key) {
  if (!isObject(obj)) return false
  return Object.prototype.hasOwnProperty.call(obj, key)
}

// 获取对象属性值
export function get(obj, path, defaultValue = undefined) {
  if (!isObject(obj)) return defaultValue
  
  // 处理路径字符串，支持 'a.b.c' 和 'a[0].b' 格式
  const keys = Array.isArray(path) ? path : path.replace(/\[(\w*)\]/g, '.$1').split('.').filter(key => key !== '')
  
  let result = obj
  for (let i = 0; i < keys.length; i++) {
    if (isObject(result) && has(result, keys[i])) {
      result = result[keys[i]]
    } else {
      return defaultValue
    }
  }
  
  return result
}

// 设置对象属性值
export function set(obj, path, value) {
  if (!isObject(obj)) return obj
  
  // 处理路径字符串
  const keys = Array.isArray(path) ? path : path.replace(/\[(\w*)\]/g, '.$1').split('.').filter(key => key !== '')
  
  let current = obj
  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i]
    if (!isObject(current[key])) {
      current[key] = {}
    }
    current = current[key]
  }
  
  current[keys[keys.length - 1]] = value
  return obj
}

// 深度克隆对象
export function cloneDeep(obj) {
  if (obj === null || typeof obj !== 'object') return obj
  if (obj instanceof Date) return new Date(obj)
  if (obj instanceof RegExp) return new RegExp(obj)
  if (obj instanceof Array) return obj.map(item => cloneDeep(item))
  
  const clonedObj = {}
  for (let key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      clonedObj[key] = cloneDeep(obj[key])
    }
  }
  return clonedObj
}

// 对象合并
export function merge(target, ...sources) {
  if (!isObject(target)) target = {}
  
  sources.forEach(source => {
    if (isObject(source)) {
      Object.keys(source).forEach(key => {
        if (isObject(source[key])) {
          if (!target[key]) target[key] = {}
          merge(target[key], source[key])
        } else {
          target[key] = source[key]
        }
      })
    }
  })
  
  return target
}

// 对象浅拷贝
export function assign(target, ...sources) {
  if (!isObject(target)) target = {}
  
  sources.forEach(source => {
    if (isObject(source)) {
      Object.keys(source).forEach(key => {
        target[key] = source[key]
      })
    }
  })
  
  return target
}

// 选取对象指定属性
export function pick(obj, keys) {
  if (!isObject(obj) || !Array.isArray(keys)) return {}
  
  const result = {}
  keys.forEach(key => {
    if (has(obj, key)) {
      result[key] = obj[key]
    }
  })
  return result
}

// 排除对象指定属性
export function omit(obj, keys) {
  if (!isObject(obj) || !Array.isArray(keys)) return {}
  
  const result = {}
  Object.keys(obj).forEach(key => {
    if (!keys.includes(key)) {
      result[key] = obj[key]
    }
  })
  return result
}

// 获取对象所有键
export function keys(obj) {
  if (!isObject(obj)) return []
  return Object.keys(obj)
}

// 获取对象所有值
export function values(obj) {
  if (!isObject(obj)) return []
  return Object.values(obj)
}

// 获取对象所有键值对
export function entries(obj) {
  if (!isObject(obj)) return []
  return Object.entries(obj)
}

// 映射对象属性
export function mapValues(obj, mapper) {
  if (!isObject(obj) || typeof mapper !== 'function') return {}
  
  const result = {}
  Object.keys(obj).forEach(key => {
    result[key] = mapper(obj[key], key, obj)
  })
  return result
}

// 过滤对象属性
export function pickBy(obj, predicate) {
  if (!isObject(obj) || typeof predicate !== 'function') return {}
  
  const result = {}
  Object.keys(obj).forEach(key => {
    if (predicate(obj[key], key, obj)) {
      result[key] = obj[key]
    }
  })
  return result
}

// 排除对象属性
export function omitBy(obj, predicate) {
  if (!isObject(obj) || typeof predicate !== 'function') return {}
  
  const result = {}
  Object.keys(obj).forEach(key => {
    if (!predicate(obj[key], key, obj)) {
      result[key] = obj[key]
    }
  })
  return result
}

// 对象转换为查询字符串
export function toQueryString(obj) {
  if (!isObject(obj)) return ''
  
  return Object.keys(obj)
    .map(key => {
      const value = obj[key]
      if (value === null || value === undefined) return ''
      return encodeURIComponent(key) + '=' + encodeURIComponent(value)
    })
    .filter(param => param !== '')
    .join('&')
}

// 查询字符串转换为对象
export function fromQueryString(queryString) {
  if (!queryString) return {}
  
  const params = {}
  const pairs = queryString.replace(/^\?/, '').split('&')
  
  pairs.forEach(pair => {
    if (!pair) return
    const [key, value] = pair.split('=')
    params[decodeURIComponent(key)] = decodeURIComponent(value || '')
  })
  
  return params
}

// 对象转换为表单数据
export function toFormData(obj, formData = new FormData(), parentKey = '') {
  if (!isObject(obj)) return formData
  
  Object.keys(obj).forEach(key => {
    const value = obj[key]
    const fullKey = parentKey ? `${parentKey}[${key}]` : key
    
    if (value instanceof Date) {
      formData.append(fullKey, value.toISOString())
    } else if (value instanceof File) {
      formData.append(fullKey, value)
    } else if (Array.isArray(value)) {
      value.forEach((item, index) => {
        if (isObject(item)) {
          toFormData(item, formData, `${fullKey}[${index}]`)
        } else {
          formData.append(`${fullKey}[${index}]`, item)
        }
      })
    } else if (isObject(value)) {
      toFormData(value, formData, fullKey)
    } else {
      formData.append(fullKey, value)
    }
  })
  
  return formData
}

// 深度比较两个对象是否相等
export function isEqual(obj1, obj2) {
  if (obj1 === obj2) return true
  
  if (obj1 == null || obj2 == null) return obj1 === obj2
  
  if (typeof obj1 !== 'object' || typeof obj2 !== 'object') return obj1 === obj2
  
  if (obj1 instanceof Date && obj2 instanceof Date) {
    return obj1.getTime() === obj2.getTime()
  }
  
  if (obj1 instanceof RegExp && obj2 instanceof RegExp) {
    return obj1.toString() === obj2.toString()
  }
  
  if (Array.isArray(obj1) !== Array.isArray(obj2)) return false
  
  const keys1 = Object.keys(obj1)
  const keys2 = Object.keys(obj2)
  
  if (keys1.length !== keys2.length) return false
  
  for (let key of keys1) {
    if (!keys2.includes(key)) return false
    if (!isEqual(obj1[key], obj2[key])) return false
  }
  
  return true
}

// 冻结对象（深度）
export function deepFreeze(obj) {
  if (!isObject(obj)) return obj
  
  Object.freeze(obj)
  
  Object.keys(obj).forEach(key => {
    if (obj[key] !== null && (typeof obj[key] === 'object' || typeof obj[key] === 'function')) {
      deepFreeze(obj[key])
    }
  })
  
  return obj
}

// 对象属性计数
export function size(obj) {
  if (!isObject(obj)) return 0
  return Object.keys(obj).length
}

// 检查对象是否有值
export function hasValues(obj) {
  return size(obj) > 0
}

// 清空对象属性
export function clear(obj) {
  if (!isObject(obj)) return obj
  
  Object.keys(obj).forEach(key => {
    delete obj[key]
  })
  
  return obj
}

// 删除对象属性
export function unset(obj, path) {
  if (!isObject(obj)) return false
  
  // 处理路径字符串
  const keys = Array.isArray(path) ? path : path.replace(/\[(\w*)\]/g, '.$1').split('.').filter(key => key !== '')
  
  let current = obj
  for (let i = 0; i < keys.length - 1; i++) {
    if (!isObject(current[keys[i]])) return false
    current = current[keys[i]]
  }
  
  delete current[keys[keys.length - 1]]
  return true
}

// 创建对象
export function create(proto, propertiesObject) {
  const obj = Object.create(proto)
  if (isObject(propertiesObject)) {
    Object.defineProperties(obj, propertiesObject)
  }
  return obj
}

// 对象属性遍历
export function forIn(obj, iteratee) {
  if (!isObject(obj) || typeof iteratee !== 'function') return obj
  
  Object.keys(obj).forEach(key => {
    iteratee(obj[key], key, obj)
  })
  
  return obj
}

// 对象属性遍历（包含原型链）
export function forOwn(obj, iteratee) {
  if (!isObject(obj) || typeof iteratee !== 'function') return obj
  
  for (let key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      iteratee(obj[key], key, obj)
    }
  }
  
  return obj
}

// 查找对象属性
export function findKey(obj, predicate) {
  if (!isObject(obj) || typeof predicate !== 'function') return undefined
  
  for (let key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key) && predicate(obj[key], key, obj)) {
      return key
    }
  }
  
  return undefined
}