// 函数操作工具函数

// 防抖函数
export function debounce(func, wait, immediate = false) {
  let timeout
  return function(...args) {
    const context = this
    const later = () => {
      timeout = null
      if (!immediate) func.apply(context, args)
    }
    const callNow = immediate && !timeout
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
    if (callNow) func.apply(context, args)
  }
}

// 节流函数
export function throttle(func, limit) {
  let inThrottle
  return function(...args) {
    const context = this
    if (!inThrottle) {
      func.apply(context, args)
      inThrottle = true
      setTimeout(() => inThrottle = false, limit)
    }
  }
}

// 函数组合
export function compose(...funcs) {
  if (funcs.length === 0) return arg => arg
  if (funcs.length === 1) return funcs[0]
  return funcs.reduce((a, b) => (...args) => a(b(...args)))
}

// 函数管道
export function pipe(...funcs) {
  if (funcs.length === 0) return arg => arg
  if (funcs.length === 1) return funcs[0]
  return funcs.reduce((a, b) => (...args) => b(a(...args)))
}

// 柯里化函数
export function curry(func) {
  return function curried(...args) {
    if (args.length >= func.length) {
      return func.apply(this, args)
    } else {
      return function(...args2) {
        return curried.apply(this, args.concat(args2))
      }
    }
  }
}

// 记忆化函数
export function memoize(func, resolver) {
  if (typeof func !== 'function' || (resolver && typeof resolver !== 'function')) {
    throw new TypeError('Expected a function')
  }
  
  const memoized = function(...args) {
    const key = resolver ? resolver.apply(this, args) : args[0]
    const cache = memoized.cache
    
    if (cache.has(key)) {
      return cache.get(key)
    }
    
    const result = func.apply(this, args)
    memoized.cache = cache.set(key, result) || cache
    return result
  }
  
  memoized.cache = new Map()
  return memoized
}

// 缓存函数
export function cache(func, ttl = 60000) {
  const cache = new Map()
  
  return function(...args) {
    const key = JSON.stringify(args)
    const cached = cache.get(key)
    
    if (cached && Date.now() - cached.timestamp < ttl) {
      return cached.value
    }
    
    const result = func.apply(this, args)
    cache.set(key, {
      value: result,
      timestamp: Date.now()
    })
    
    return result
  }
}

// 一次函数（只执行一次）
export function once(func) {
  let called = false
  let result
  return function(...args) {
    if (!called) {
      called = true
      result = func.apply(this, args)
    }
    return result
  }
}

// 重试函数
export function retry(func, retries = 3, delay = 1000) {
  return new Promise((resolve, reject) => {
    const attempt = (n) => {
      func().then(resolve).catch(error => {
        if (n === 1) {
          reject(error)
        } else {
          setTimeout(() => attempt(n - 1), delay)
        }
      })
    }
    
    attempt(retries)
  })
}

// 延迟执行函数
export function delay(func, wait, ...args) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(func.apply(this, args))
    }, wait)
  })
}

// 超时函数
export function timeout(func, wait) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      reject(new Error('Function timed out'))
    }, wait)
    
    func().then(result => {
      clearTimeout(timer)
      resolve(result)
    }).catch(error => {
      clearTimeout(timer)
      reject(error)
    })
  })
}

// 执行函数（带错误处理）
export function attempt(func, ...args) {
  try {
    return { result: func.apply(this, args), error: null }
  } catch (error) {
    return { result: null, error }
  }
}

// 绑定函数上下文
export function bind(func, context, ...args) {
  return function(...boundArgs) {
    return func.apply(context, args.concat(boundArgs))
  }
}

// 部分应用函数
export function partial(func, ...args) {
  return function(...partialArgs) {
    return func.apply(this, args.concat(partialArgs))
  }
}

// 反转函数参数
export function flip(func) {
  return function(...args) {
    return func.apply(this, args.reverse())
  }
}

// 固定参数函数
export function ary(func, n) {
  return function(...args) {
    return func.apply(this, args.slice(0, n))
  }
}

// 忽略参数函数
export function noop() {
  // 什么都不做
}

// 恒定函数
export function constant(value) {
  return function() {
    return value
  }
}

// 身份函数
export function identity(value) {
  return value
}

// 条件函数
export function conditional(predicate, trueFunc, falseFunc) {
  return function(...args) {
    return predicate.apply(this, args) ? trueFunc.apply(this, args) : falseFunc.apply(this, args)
  }
}

// 开关函数
export function switchCase(cases, defaultFunc) {
  return function(value, ...args) {
    const func = cases[value] || defaultFunc
    return func ? func.apply(this, args) : undefined
  }
}

// 链式调用函数
export function chain(value) {
  const wrapper = {
    value,
    chain() {
      return this
    },
    tap(interceptor) {
      interceptor(this.value)
      return this
    },
    thru(interceptor) {
      this.value = interceptor(this.value)
      return this
    },
    execute(func, ...args) {
      this.value = func.apply(this, [this.value, ...args])
      return this
    },
    done() {
      return this.value
    }
  }
  
  return wrapper
}

// 异步函数序列化执行
export async function sequence(funcs, initialValue) {
  let result = initialValue
  
  for (const func of funcs) {
    result = await func(result)
  }
  
  return result
}

// 异步函数并行执行
export async function parallel(funcs, concurrency = Infinity) {
  const results = []
  const executing = []
  
  for (const func of funcs) {
    const promise = Promise.resolve().then(() => func())
    results.push(promise)
    
    if (funcs.length >= concurrency) {
      const executingPromise = promise.then(() => executing.splice(executing.indexOf(executingPromise), 1))
      executing.push(executingPromise)
      
      if (executing.length >= concurrency) {
        await Promise.race(executing)
      }
    }
  }
  
  return Promise.all(results)
}

// 函数执行时间测量
export function measure(func, ...args) {
  const start = performance.now()
  const result = func.apply(this, args)
  const end = performance.now()
  
  return {
    result,
    duration: end - start
  }
}

// 异步函数执行时间测量
export async function measureAsync(asyncFunc, ...args) {
  const start = performance.now()
  const result = await asyncFunc.apply(this, args)
  const end = performance.now()
  
  return {
    result,
    duration: end - start
  }
}