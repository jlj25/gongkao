// 文件操作工具函数

// 读取文件内容
export async function readFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    
    reader.onload = (event) => {
      resolve(event.target.result)
    }
    
    reader.onerror = (error) => {
      reject(error)
    }
    
    reader.readAsText(file)
  })
}

// 读取文件为 ArrayBuffer
export async function readFileAsArrayBuffer(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    
    reader.onload = (event) => {
      resolve(event.target.result)
    }
    
    reader.onerror = (error) => {
      reject(error)
    }
    
    reader.readAsArrayBuffer(file)
  })
}

// 读取文件为 Data URL
export async function readFileAsDataURL(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    
    reader.onload = (event) => {
      resolve(event.target.result)
    }
    
    reader.onerror = (error) => {
      reject(error)
    }
    
    reader.readAsDataURL(file)
  })
}

// 读取文件为 Binary String
export async function readFileAsBinaryString(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    
    reader.onload = (event) => {
      resolve(event.target.result)
    }
    
    reader.onerror = (error) => {
      reject(error)
    }
    
    reader.readAsBinaryString(file)
  })
}

// 创建 Blob 对象
export function createBlob(content, type = '') {
  return new Blob([content], { type })
}

// 创建 File 对象
export function createFile(content, filename, type = '') {
  return new File([content], filename, { type })
}

// 下载文件
export function downloadFile(content, filename, type = '') {
  const blob = createBlob(content, type)
  const url = URL.createObjectURL(blob)
  
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  
  URL.revokeObjectURL(url)
}

// 下载 Blob 文件
export function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob)
  
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  
  URL.revokeObjectURL(url)
}

// 获取文件扩展名
export function getFileExtension(filename) {
  return filename.slice((filename.lastIndexOf('.') - 1 >>> 0) + 2)
}

// 获取文件名（不包含扩展名）
export function getFileNameWithoutExtension(filename) {
  return filename.slice(0, filename.lastIndexOf('.'))
}

// 格式化文件大小
export function formatFileSize(bytes) {
  if (bytes === 0) return '0 Bytes'
  
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

// 检查文件类型
export function isFileType(file, type) {
  return file.type.startsWith(type)
}

// 检查是否为图片文件
export function isImageFile(file) {
  return isFileType(file, 'image/')
}

// 检查是否为音频文件
export function isAudioFile(file) {
  return isFileType(file, 'audio/')
}

// 检查是否为视频文件
export function isVideoFile(file) {
  return isFileType(file, 'video/')
}

// 检查是否为文本文件
export function isTextFile(file) {
  return isFileType(file, 'text/')
}

// 检查是否为 PDF 文件
export function isPDFFile(file) {
  return file.type === 'application/pdf' || getFileExtension(file.name).toLowerCase() === 'pdf'
}

// 检查是否为 Word 文档
export function isWordFile(file) {
  const wordTypes = ['application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
  const wordExtensions = ['doc', 'docx']
  
  return wordTypes.includes(file.type) || wordExtensions.includes(getFileExtension(file.name).toLowerCase())
}

// 检查是否为 Excel 文件
export function isExcelFile(file) {
  const excelTypes = ['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet']
  const excelExtensions = ['xls', 'xlsx']
  
  return excelTypes.includes(file.type) || excelExtensions.includes(getFileExtension(file.name).toLowerCase())
}

// 检查是否为 PPT 文件
export function isPPTFile(file) {
  const pptTypes = ['application/vnd.ms-powerpoint', 'application/vnd.openxmlformats-officedocument.presentationml.presentation']
  const pptExtensions = ['ppt', 'pptx']
  
  return pptTypes.includes(file.type) || pptExtensions.includes(getFileExtension(file.name).toLowerCase())
}

// 压缩图片
export async function compressImage(file, quality = 0.8) {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    const img = new Image()
    
    img.onload = () => {
      // 设置压缩后的宽高
      const maxWidth = 800
      const maxHeight = 600
      let { width, height } = img
      
      // 计算压缩比例
      if (width > height) {
        if (width > maxWidth) {
          height = (height * maxWidth) / width
          width = maxWidth
        }
      } else {
        if (height > maxHeight) {
          width = (width * maxHeight) / height
          height = maxHeight
        }
      }
      
      // 设置 canvas 尺寸
      canvas.width = width
      canvas.height = height
      
      // 绘制图片
      ctx.drawImage(img, 0, 0, width, height)
      
      // 转换为 Blob
      canvas.toBlob(resolve, 'image/jpeg', quality)
    }
    
    img.onerror = reject
    
    // 读取文件
    const reader = new FileReader()
    reader.onload = (event) => {
      img.src = event.target.result
    }
    reader.readAsDataURL(file)
  })
}

// 预览图片
export function previewImage(file, container) {
  const reader = new FileReader()
  
  reader.onload = (event) => {
    const img = document.createElement('img')
    img.src = event.target.result
    container.appendChild(img)
  }
  
  reader.readAsDataURL(file)
}

// 预览 PDF
export function previewPDF(file, container) {
  const url = URL.createObjectURL(file)
  
  const iframe = document.createElement('iframe')
  iframe.src = url
  iframe.width = '100%'
  iframe.height = '500px'
  
  container.appendChild(iframe)
  
  return () => {
    container.removeChild(iframe)
    URL.revokeObjectURL(url)
  }
}

// 验证文件大小
export function validateFileSize(file, maxSize) {
  return file.size <= maxSize
}

// 验证文件类型
export function validateFileType(file, allowedTypes) {
  return allowedTypes.includes(file.type)
}

// 验证文件扩展名
export function validateFileExtension(file, allowedExtensions) {
  const extension = getFileExtension(file.name).toLowerCase()
  return allowedExtensions.includes(extension)
}

// 转换文件大小单位
export function convertFileSize(bytes, toUnit) {
  const units = {
    B: 1,
    KB: 1024,
    MB: 1024 * 1024,
    GB: 1024 * 1024 * 1024,
    TB: 1024 * 1024 * 1024 * 1024
  }
  
  return bytes / (units[toUnit] || 1)
}

// 获取文件信息
export function getFileInfo(file) {
  return {
    name: file.name,
    size: file.size,
    type: file.type,
    lastModified: file.lastModified,
    extension: getFileExtension(file.name),
    sizeFormatted: formatFileSize(file.size)
  }
}