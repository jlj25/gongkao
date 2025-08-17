// 条形码工具函数

// 生成条形码 (简化版本，实际项目中可能需要使用专门的库如 JsBarcode)
export function generateBarcode(text, options = {}) {
  // 这里只是一个示例，实际项目中建议使用专门的库
  
  if (!text) return ''
  
  // 默认配置
  const defaultOptions = {
    format: 'CODE128',
    width: 2,
    height: 100,
    displayValue: true,
    fontOptions: '',
    font: 'monospace',
    textAlign: 'center',
    textPosition: 'bottom',
    textMargin: 2,
    fontSize: 20,
    backgroundColor: '#ffffff',
    lineColor: '#000000'
  }
  
  // 合并配置
  const config = Object.assign({}, defaultOptions, options)
  
  // 创建一个简单的条形码表示（实际项目中应使用专门的库）
  const barcodeElement = document.createElement('div')
  barcodeElement.style.width = '100%'
  barcodeElement.style.height = `${config.height}px`
  barcodeElement.style.backgroundColor = config.backgroundColor
  barcodeElement.style.position = 'relative'
  barcodeElement.style.display = 'flex'
  barcodeElement.style.flexDirection = 'column'
  barcodeElement.style.alignItems = 'center'
  barcodeElement.style.justifyContent = 'center'
  
  // 创建条形码图案（简化表示）
  const patternElement = document.createElement('div')
  patternElement.style.width = '80%'
  patternElement.style.height = `${config.height - (config.displayValue ? config.fontSize + config.textMargin : 0)}px`
  patternElement.style.background = `repeating-linear-gradient(
    to right,
    ${config.lineColor},
    ${config.lineColor} ${config.width}px,
    ${config.backgroundColor} ${config.width}px,
    ${config.backgroundColor} ${config.width * 2}px
  )`
  
  barcodeElement.appendChild(patternElement)
  
  // 显示文本
  if (config.displayValue) {
    const textElement = document.createElement('div')
    textElement.textContent = text
    textElement.style.color = config.lineColor
    textElement.style.fontSize = `${config.fontSize}px`
    textElement.style.fontFamily = config.font
    textElement.style.marginTop = `${config.textMargin}px`
    
    barcodeElement.appendChild(textElement)
  }
  
  return barcodeElement
}

// 下载条形码
export function downloadBarcode(barcodeElement, filename = 'barcode.png') {
  if (!barcodeElement) return
  
  // 这里只是一个示例，实际项目中可能需要使用 html2canvas 等库将元素转换为图片
  console.warn('条形码下载功能需要使用专门的库，如 html2canvas')
  
  // 临时创建一个提示
  alert(`条形码内容: ${barcodeElement.textContent || barcodeElement.innerText}`)
}

// 验证条形码内容
export function validateBarcodeContent(text, format = 'CODE128') {
  if (!text) return false
  
  // 简单验证，实际项目中可能需要更复杂的验证
  // 不同格式的条形码有不同的验证规则
  switch (format) {
    case 'CODE128':
      // CODE128 可以包含所有 ASCII 字符
      return typeof text === 'string' && text.length > 0
    case 'EAN13':
      // EAN13 必须是 13 位数字
      return /^\d{13}$/.test(text)
    case 'EAN8':
      // EAN8 必须是 8 位数字
      return /^\d{8}$/.test(text)
    case 'UPC':
      // UPC 必须是 12 位数字
      return /^\d{12}$/.test(text)
    default:
      return typeof text === 'string' && text.length > 0
  }
}