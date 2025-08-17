// 错误日志工具函数

// 记录错误日志
export function logError(error, info = {}) {
  console.error('应用错误:', error, info)
  
  // 在生产环境中，可以将错误日志发送到服务器
  if (process.env.NODE_ENV === 'production') {
    // 这里可以调用 API 将错误日志发送到服务器
    // sendErrorToServer(error, info)
  }
}

// 记录警告日志
export function logWarning(message, info = {}) {
  console.warn('应用警告:', message, info)
}

// 记录信息日志
export function logInfo(message, info = {}) {
  console.info('应用信息:', message, info)
}

// 全局错误处理
export function setupGlobalErrorHandling(app) {
  // 捕获 JavaScript 运行时错误
  window.addEventListener('error', event => {
    logError(event.error, {
      message: event.message,
      filename: event.filename,
      lineno: event.lineno,
      colno: event.colno
    })
  })
  
  // 捕获 Promise 未处理的拒绝
  window.addEventListener('unhandledrejection', event => {
    logError(event.reason, {
      type: 'unhandledrejection'
    })
  })
  
  // Vue 应用错误处理
  if (app) {
    app.config.errorHandler = (error, instance, info) => {
      logError(error, {
        type: 'vue-error',
        info: info,
        component: instance?.$options?.name || 'unknown'
      })
    }
  }
}