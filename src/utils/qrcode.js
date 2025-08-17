// 二维码工具函数

// 生成二维码 (简化版本，实际项目中可能需要使用专门的库如 qrcode.js)
export function generateQRCode(text, options = {}) {
  // 这里只是一个示例，实际项目中建议使用专门的库
  
  if (!text) return ''
  
  // 默认配置
  const defaultOptions = {
    size: 200,
    color: '#000000',
    backgroundColor: '#ffffff'
  }
  
  // 合并配置
  const config = Object.assign({}, defaultOptions, options)
  
  // 创建一个简单的二维码表示（实际项目中应使用专门的库）
  const qrCodeElement = document.createElement('div')
  qrCodeElement.style.width = `${config.size}px`
  qrCodeElement.style.height = `${config.size}px`
  qrCodeElement.style.backgroundColor = config.backgroundColor
  qrCodeElement.style.position = 'relative'
  qrCodeElement.style.display = 'flex'
  qrCodeElement.style.alignItems = 'center'
  qrCodeElement.style.justifyContent = 'center'
  
  const textElement = document.createElement('div')
  textElement.textContent = text
  textElement.style.color = config.color
  textElement.style.fontSize = `${config.size / 10}px`
  textElement.style.textAlign = 'center'
  textElement.style.wordBreak = 'break-all'
  
  qrCodeElement.appendChild(textElement)
  
  return qrCodeElement
}

// 下载二维码
export function downloadQRCode(qrCodeElement, filename = 'qrcode.png') {
  if (!qrCodeElement) return
  
  // 这里只是一个示例，实际项目中可能需要使用 html2canvas 等库将元素转换为图片
  console.warn('二维码下载功能需要使用专门的库，如 html2canvas')
  
  // 临时创建一个提示
  alert(`二维码内容: ${qrCodeElement.textContent || qrCodeElement.innerText}`)
}

// 验证二维码内容
export function validateQRCodeContent(text) {
  if (!text) return false
  
  // 简单验证，实际项目中可能需要更复杂的验证
  return typeof text === 'string' && text.length > 0
}