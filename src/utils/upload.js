// 文件上传工具函数

// 检查文件类型是否被允许
export function isFileTypeAllowed(file, allowedTypes = []) {
  if (!file || !allowedTypes.length) return true
  
  const fileType = file.type
  const fileName = file.name
  const fileExt = fileName.substring(fileName.lastIndexOf('.')).toLowerCase()
  
  // 检查 MIME 类型
  if (allowedTypes.includes(fileType)) return true
  
  // 检查文件扩展名
  for (let type of allowedTypes) {
    if (type.startsWith('.')) {
      if (fileExt === type.toLowerCase()) return true
    }
  }
  
  return false
}

// 检查文件大小是否符合要求
export function isFileSizeValid(file, maxSizeMB = 10) {
  if (!file) return false
  
  const maxSizeBytes = maxSizeMB * 1024 * 1024
  return file.size <= maxSizeBytes
}

// 格式化文件大小
export function formatFileSize(bytes) {
  if (bytes === 0) return '0 Bytes'
  
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

// 上传文件到服务器 (简化版本)
export function uploadFile(file, url, options = {}) {
  return new Promise((resolve, reject) => {
    // 检查文件
    if (!file) {
      reject(new Error('文件不能为空'))
      return
    }
    
    // 检查文件大小
    if (options.maxSizeMB && !isFileSizeValid(file, options.maxSizeMB)) {
      reject(new Error(`文件大小不能超过 ${options.maxSizeMB} MB`))
      return
    }
    
    // 检查文件类型
    if (options.allowedTypes && !isFileTypeAllowed(file, options.allowedTypes)) {
      reject(new Error('不支持的文件类型'))
      return
    }
    
    // 创建 FormData
    const formData = new FormData()
    formData.append('file', file)
    
    // 添加额外参数
    if (options.params) {
      Object.keys(options.params).forEach(key => {
        formData.append(key, options.params[key])
      })
    }
    
    // 创建 XMLHttpRequest
    const xhr = new XMLHttpRequest()
    
    // 设置进度回调
    if (options.onProgress && typeof options.onProgress === 'function') {
      xhr.upload.addEventListener('progress', options.onProgress)
    }
    
    // 设置加载回调
    xhr.addEventListener('load', () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const response = JSON.parse(xhr.responseText)
          resolve(response)
        } catch (e) {
          resolve(xhr.responseText)
        }
      } else {
        reject(new Error(`上传失败: ${xhr.status} ${xhr.statusText}`))
      }
    })
    
    // 设置错误回调
    xhr.addEventListener('error', () => {
      reject(new Error('网络错误，上传失败'))
    })
    
    // 发送请求
    xhr.open('POST', url, true)
    
    // 设置 headers
    if (options.headers) {
      Object.keys(options.headers).forEach(key => {
        xhr.setRequestHeader(key, options.headers[key])
      })
    }
    
    xhr.send(formData)
  })
}

// 多文件上传
export function uploadMultipleFiles(files, url, options = {}) {
  if (!files || !files.length) {
    return Promise.reject(new Error('文件列表不能为空'))
  }
  
  const uploadPromises = Array.from(files).map(file => {
    return uploadFile(file, url, options)
  })
  
  return Promise.all(uploadPromises)
}

// 预览图片文件
export function previewImageFile(file, callback) {
  if (!file || !callback) return
  
  // 检查是否为图片文件
  if (!file.type.startsWith('image/')) {
    console.warn('文件不是图片类型')
    return
  }
  
  const reader = new FileReader()
  reader.onload = (e) => {
    callback(e.target.result)
  }
  reader.onerror = (e) => {
    console.error('读取文件失败:', e)
  }
  reader.readAsDataURL(file)
}