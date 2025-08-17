// 性能监控工具函数

// 获取页面加载性能数据
export function getPageLoadPerformance() {
  if (!isPerformanceSupported()) return null
  
  const timing = performance.timing
  const navigation = performance.navigation
  
  return {
    // DNS 查询时间
    dnsTime: timing.domainLookupEnd - timing.domainLookupStart,
    
    // TCP 连接时间
    tcpTime: timing.connectEnd - timing.connectStart,
    
    // 请求时间
    requestTime: timing.responseStart - timing.requestStart,
    
    // 响应时间
    responseTime: timing.responseEnd - timing.responseStart,
    
    // DOM 解析时间
    domParseTime: timing.domInteractive - timing.domLoading,
    
    // DOMContentLoaded 时间
    domContentLoadedTime: timing.domContentLoadedEventEnd - timing.navigationStart,
    
    // 页面加载完成时间
    loadTime: timing.loadEventEnd - timing.navigationStart,
    
    // 首字节时间
    ttfb: timing.responseStart - timing.navigationStart,
    
    // 重定向次数
    redirectCount: navigation.redirectCount,
    
    // 导航类型
    navigationType: getNavigationType(navigation.type)
  }
}

// 获取导航类型
function getNavigationType(type) {
  const types = {
    0: 'navigate',
    1: 'reload',
    2: 'back_forward',
    3: 'prerender'
  }
  
  return types[type] || 'unknown'
}

// 获取资源加载性能数据
export function getResourcePerformance() {
  if (!isPerformanceSupported() || !isResourceTimingSupported()) return []
  
  const resources = performance.getEntriesByType('resource')
  
  return resources.map(resource => ({
    name: resource.name,
    entryType: resource.entryType,
    startTime: resource.startTime,
    duration: resource.duration,
    initiatorType: resource.initiatorType,
    
    // 网络相关
    redirectStart: resource.redirectStart,
    redirectEnd: resource.redirectEnd,
    fetchStart: resource.fetchStart,
    domainLookupStart: resource.domainLookupStart,
    domainLookupEnd: resource.domainLookupEnd,
    connectStart: resource.connectStart,
    connectEnd: resource.connectEnd,
    secureConnectionStart: resource.secureConnectionStart,
    requestStart: resource.requestStart,
    responseStart: resource.responseStart,
    responseEnd: resource.responseEnd,
    
    // 传输大小
    transferSize: resource.transferSize,
    encodedBodySize: resource.encodedBodySize,
    decodedBodySize: resource.decodedBodySize,
    
    // 缓存信息
    isCached: resource.transferSize === 0 && resource.decodedBodySize > 0
  }))
}

// 获取首屏渲染时间
export function getFirstPaintTime() {
  if (!isPerformanceSupported()) return null
  
  // 获取首次绘制时间
  const paints = performance.getEntriesByType('paint')
  const firstPaint = paints.find(paint => paint.name === 'first-paint')
  
  return firstPaint ? firstPaint.startTime : null
}

// 获取首次内容绘制时间
export function getFirstContentfulPaintTime() {
  if (!isPerformanceSupported()) return null
  
  // 获取首次内容绘制时间
  const paints = performance.getEntriesByType('paint')
  const fcp = paints.find(paint => paint.name === 'first-contentful-paint')
  
  return fcp ? fcp.startTime : null
}

// 获取最大内容绘制时间
export function getLargestContentfulPaintTime() {
  return new Promise(resolve => {
    if (!isPerformanceSupported() || !isLargestContentfulPaintSupported()) {
      resolve(null)
      return
    }
    
    const observer = new PerformanceObserver(list => {
      const entries = list.getEntries()
      const lastEntry = entries[entries.length - 1]
      resolve(lastEntry.startTime)
    })
    
    observer.observe({ entryTypes: ['largest-contentful-paint'] })
    
    // 设置超时
    setTimeout(() => {
      observer.disconnect()
      resolve(null)
    }, 1000)
  })
}

// 获取累积布局偏移
export function getCumulativeLayoutShift() {
  return new Promise(resolve => {
    if (!isPerformanceSupported() || !isLayoutShiftSupported()) {
      resolve(null)
      return
    }
    
    let cls = 0
    const observer = new PerformanceObserver(list => {
      for (const entry of list.getEntries()) {
        if (!entry.hadRecentInput) {
          cls += entry.value
        }
      }
    })
    
    observer.observe({ entryTypes: ['layout-shift'] })
    
    // 在页面加载完成后返回CLS值
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') {
        observer.disconnect()
        resolve(cls)
      }
    })
    
    // 设置超时
    setTimeout(() => {
      observer.disconnect()
      resolve(cls)
    }, 1000)
  })
}

// 获取首次输入延迟
export function getFirstInputDelay() {
  return new Promise(resolve => {
    if (!isPerformanceSupported() || !isFirstInputSupported()) {
      resolve(null)
      return
    }
    
    const observer = new PerformanceObserver(list => {
      const entries = list.getEntries()
      const firstEntry = entries[0]
      
      if (firstEntry) {
        const delay = firstEntry.processingStart - firstEntry.startTime
        resolve(delay)
      } else {
        resolve(null)
      }
    })
    
    observer.observe({ entryTypes: ['first-input'] })
    
    // 设置超时
    setTimeout(() => {
      observer.disconnect()
      resolve(null)
    }, 1000)
  })
}

// 开始性能监控
export function startPerformanceMonitoring(callback) {
  if (!isPerformanceSupported()) return
  
  // 监控长任务
  if (isLongTaskSupported()) {
    const observer = new PerformanceObserver(list => {
      callback('longtask', list.getEntries())
    })
    
    observer.observe({ entryTypes: ['longtask'] })
  }
  
  // 监控资源加载
  if (isResourceTimingSupported()) {
    const observer = new PerformanceObserver(list => {
      callback('resource', list.getEntries())
    })
    
    observer.observe({ entryTypes: ['resource'] })
  }
  
  // 监控导航
  const observer = new PerformanceObserver(list => {
    callback('navigation', list.getEntries())
  })
  
  observer.observe({ entryTypes: ['navigation'] })
}

// 标记自定义性能指标
export function markPerformanceMark(name) {
  if (!isPerformanceSupported() || !isUserTimingSupported()) return
  
  performance.mark(name)
}

// 清除性能标记
export function clearPerformanceMark(name) {
  if (!isPerformanceSupported() || !isUserTimingSupported()) return
  
  performance.clearMarks(name)
}

// 测量两个标记之间的时间
export function measurePerformance(name, startMark, endMark) {
  if (!isPerformanceSupported() || !isUserTimingSupported()) return null
  
  try {
    performance.measure(name, startMark, endMark)
    const measure = performance.getEntriesByName(name)[0]
    return measure ? measure.duration : null
  } catch (error) {
    console.error('性能测量失败:', error)
    return null
  }
}

// 清除性能测量
export function clearPerformanceMeasure(name) {
  if (!isPerformanceSupported() || !isUserTimingSupported()) return
  
  performance.clearMeasures(name)
}

// 获取所有性能条目
export function getAllPerformanceEntries() {
  if (!isPerformanceSupported()) return []
  
  return performance.getEntries()
}

// 获取特定类型的性能条目
export function getPerformanceEntriesByType(type) {
  if (!isPerformanceSupported()) return []
  
  return performance.getEntriesByType(type)
}

// 获取特定名称的性能条目
export function getPerformanceEntriesByName(name, type) {
  if (!isPerformanceSupported()) return []
  
  return performance.getEntriesByName(name, type)
}

// 清除所有性能条目
export function clearAllPerformanceEntries() {
  if (!isPerformanceSupported()) return
  
  performance.clearResourceTimings()
  performance.clearMarks()
  performance.clearMeasures()
}

// 获取内存使用情况
export function getMemoryUsage() {
  if (!isMemorySupported()) return null
  
  return performance.memory
}

// 获取导航计时数据
export function getNavigationTiming() {
  if (!isPerformanceSupported() || !isNavigationTimingSupported()) return null
  
  const navigation = performance.getEntriesByType('navigation')[0]
  
  if (!navigation) return null
  
  return {
    // 导航开始时间
    navigationStart: navigation.startTime,
    
    // 卸载前一个文档的时间
    unloadEventStart: navigation.unloadEventStart,
    unloadEventEnd: navigation.unloadEventEnd,
    
    // 重定向时间
    redirectStart: navigation.redirectStart,
    redirectEnd: navigation.redirectEnd,
    
    // 获取第一个字节的时间
    fetchStart: navigation.fetchStart,
    domainLookupStart: navigation.domainLookupStart,
    domainLookupEnd: navigation.domainLookupEnd,
    connectStart: navigation.connectStart,
    connectEnd: navigation.connectEnd,
    secureConnectionStart: navigation.secureConnectionStart,
    requestStart: navigation.requestStart,
    responseStart: navigation.responseStart,
    responseEnd: navigation.responseEnd,
    
    // DOM 处理时间
    domLoading: navigation.domLoading,
    domInteractive: navigation.domInteractive,
    domContentLoadedEventStart: navigation.domContentLoadedEventStart,
    domContentLoadedEventEnd: navigation.domContentLoadedEventEnd,
    domComplete: navigation.domComplete,
    
    // 加载事件时间
    loadEventStart: navigation.loadEventStart,
    loadEventEnd: navigation.loadEventEnd,
    
    // 导航类型
    type: navigation.type,
    
    // 重定向次数
    redirectCount: navigation.redirectCount
  }
}

// 检查是否支持 Performance API
export function isPerformanceSupported() {
  return 'performance' in window
}

// 检查是否支持 Navigation Timing API
export function isNavigationTimingSupported() {
  return isPerformanceSupported() && 'getEntriesByType' in performance
}

// 检查是否支持 Resource Timing API
export function isResourceTimingSupported() {
  return isPerformanceSupported() && 'getEntriesByType' in performance && 'Resource' in performance
}

// 检查是否支持 User Timing API
export function isUserTimingSupported() {
  return isPerformanceSupported() && 'mark' in performance && 'measure' in performance
}

// 检查是否支持 Paint Timing API
export function isPaintTimingSupported() {
  return isPerformanceSupported() && 'getEntriesByType' in performance && 'paint' in performance
}

// 检查是否支持 Long Task API
export function isLongTaskSupported() {
  return 'PerformanceObserver' in window && 'LongTaskTiming' in window
}

// 检查是否支持 Largest Contentful Paint API
export function isLargestContentfulPaintSupported() {
  return 'PerformanceObserver' in window && 'LargestContentfulPaint' in window
}

// 检查是否支持 Layout Shift API
export function isLayoutShiftSupported() {
  return 'PerformanceObserver' in window && 'LayoutShift' in window
}

// 检查是否支持 First Input API
export function isFirstInputSupported() {
  return 'PerformanceObserver' in window && 'FirstInputTiming' in window
}

// 检查是否支持 Memory API
export function isMemorySupported() {
  return isPerformanceSupported() && 'memory' in performance
}

// 格式化时间
export function formatTime(ms) {
  if (ms < 1000) {
    return `${Math.round(ms)}ms`
  }
  
  return `${(ms / 1000).toFixed(2)}s`
}

// 格式化字节大小
export function formatBytes(bytes) {
  if (bytes < 1024) {
    return `${bytes}B`
  }
  
  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(2)}KB`
  }
  
  if (bytes < 1024 * 1024 * 1024) {
    return `${(bytes / (1024 * 1024)).toFixed(2)}MB`
  }
  
  return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)}GB`
}

// 计算资源加载统计
export function getResourceLoadStatistics() {
  const resources = getResourcePerformance()
  
  if (resources.length === 0) return null
  
  const stats = {
    totalResources: resources.length,
    totalSize: 0,
    cachedResources: 0,
    failedResources: 0,
    byType: {},
    slowestResources: []
  }
  
  resources.forEach(resource => {
    // 总大小
    stats.totalSize += resource.decodedBodySize || 0
    
    // 缓存资源
    if (resource.isCached) {
      stats.cachedResources++
    }
    
    // 失败资源
    if (resource.responseEnd === 0) {
      stats.failedResources++
    }
    
    // 按类型统计
    if (!stats.byType[resource.initiatorType]) {
      stats.byType[resource.initiatorType] = {
        count: 0,
        size: 0,
        time: 0
      }
    }
    
    stats.byType[resource.initiatorType].count++
    stats.byType[resource.initiatorType].size += resource.decodedBodySize || 0
    stats.byType[resource.initiatorType].time += resource.duration
    
    // 最慢资源
    if (stats.slowestResources.length < 5) {
      stats.slowestResources.push({
        name: resource.name,
        type: resource.initiatorType,
        duration: resource.duration
      })
      
      // 按时间排序
      stats.slowestResources.sort((a, b) => b.duration - a.duration)
    } else if (resource.duration > stats.slowestResources[4].duration) {
      stats.slowestResources[4] = {
        name: resource.name,
        type: resource.initiatorType,
        duration: resource.duration
      }
      
      // 重新排序
      stats.slowestResources.sort((a, b) => b.duration - a.duration)
    }
  })
  
  return stats
}

// 获取页面性能报告
export function getPagePerformanceReport() {
  const report = {
    timestamp: new Date().toISOString(),
    url: window.location.href,
    userAgent: navigator.userAgent
  }
  
  // 页面加载性能
  const pageLoad = getPageLoadPerformance()
  if (pageLoad) {
    report.pageLoad = pageLoad
  }
  
  // 首屏渲染时间
  const firstPaint = getFirstPaintTime()
  if (firstPaint) {
    report.firstPaint = firstPaint
  }
  
  // 首次内容绘制时间
  const fcp = getFirstContentfulPaintTime()
  if (fcp) {
    report.firstContentfulPaint = fcp
  }
  
  // 资源加载统计
  const resourceStats = getResourceLoadStatistics()
  if (resourceStats) {
    report.resourceStats = resourceStats
  }
  
  // 内存使用情况
  const memory = getMemoryUsage()
  if (memory) {
    report.memory = memory
  }
  
  return report
}

// 发送性能数据到服务器
export function sendPerformanceData(url, data) {
  if (!isBeaconSupported()) {
    // 如果不支持 Beacon API，使用 fetch
    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
  }
  
  // 使用 Beacon API 发送数据
  const blob = new Blob([JSON.stringify(data)], { type: 'application/json' })
  return navigator.sendBeacon(url, blob)
}

// 检查是否支持 Beacon API
export function isBeaconSupported() {
  return 'sendBeacon' in navigator
}

// 自动发送性能报告
export function autoSendPerformanceReport(url, options = {}) {
  const { delay = 3000, includeResourceStats = true } = options
  
  // 页面加载完成后发送报告
  window.addEventListener('load', () => {
    setTimeout(() => {
      const report = getPagePerformanceReport()
      
      // 如果不需要资源统计，移除相关数据
      if (!includeResourceStats && report.resourceStats) {
        delete report.resourceStats
      }
      
      sendPerformanceData(url, report)
    }, delay)
  })
}