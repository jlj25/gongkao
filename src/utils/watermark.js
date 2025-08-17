// 水印工具函数

// 创建水印
export function createWatermark(text, options = {}) {
  // 默认配置
  const defaultOptions = {
    container: document.body,
    width: 300,
    height: 200,
    textAlign: 'center',
    textBaseline: 'middle',
    font: '20px Microsoft Yahei',
    fillStyle: 'rgba(184, 184, 184, 0.3)',
    rotate: 30,
    zIndex: 1000
  }
  
  // 合并配置
  const config = Object.assign({}, defaultOptions, options)
  
  // 创建 canvas
  const canvas = document.createElement('canvas')
  canvas.width = config.width
  canvas.height = config.height
  
  // 绘制水印
  const ctx = canvas.getContext('2d')
  ctx.textAlign = config.textAlign
  ctx.textBaseline = config.textBaseline
  ctx.font = config.font
  ctx.fillStyle = config.fillStyle
  ctx.translate(config.width / 2, config.height / 2)
  ctx.rotate((Math.PI / 180) * config.rotate)
  ctx.fillText(text, 0, 0)
  
  // 创建水印容器
  const watermarkDiv = document.createElement('div')
  watermarkDiv.style.position = 'fixed'
  watermarkDiv.style.top = '0'
  watermarkDiv.style.left = '0'
  watermarkDiv.style.width = '100%'
  watermarkDiv.style.height = '100%'
  watermarkDiv.style.pointerEvents = 'none'
  watermarkDiv.style.backgroundImage = `url(${canvas.toDataURL('image/png')})`
  watermarkDiv.style.backgroundRepeat = 'repeat'
  watermarkDiv.style.zIndex = config.zIndex
  
  // 添加到容器
  config.container.style.position = 'relative'
  config.container.appendChild(watermarkDiv)
  
  return watermarkDiv
}

// 移除水印
export function removeWatermark(watermarkDiv) {
  if (watermarkDiv && watermarkDiv.parentNode) {
    watermarkDiv.parentNode.removeChild(watermarkDiv)
  }
}