// 颜色操作工具函数

// 将十六进制颜色转换为 RGB
export function hexToRgb(hex) {
  // 扩展简写形式 (#03F -> #0033FF)
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i
  hex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b)
  
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null
}

// 将 RGB 转换为十六进制颜色
export function rgbToHex(r, g, b) {
  return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)
}

// 将十六进制颜色转换为 HSL
export function hexToHsl(hex) {
  const rgb = hexToRgb(hex)
  if (!rgb) return null
  
  return rgbToHsl(rgb.r, rgb.g, rgb.b)
}

// 将 RGB 转换为 HSL
export function rgbToHsl(r, g, b) {
  r /= 255
  g /= 255
  b /= 255
  
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  
  let h, s, l = (max + min) / 2
  
  if (max === min) {
    h = s = 0 // achromatic
  } else {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break
      case g: h = (b - r) / d + 2; break
      case b: h = (r - g) / d + 4; break
    }
    
    h /= 6
  }
  
  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100)
  }
}

// 将 HSL 转换为 RGB
export function hslToRgb(h, s, l) {
  h /= 360
  s /= 100
  l /= 100
  
  let r, g, b
  
  if (s === 0) {
    r = g = b = l // achromatic
  } else {
    const hue2rgb = (p, q, t) => {
      if (t < 0) t += 1
      if (t > 1) t -= 1
      if (t < 1/6) return p + (q - p) * 6 * t
      if (t < 1/2) return q
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6
      return p
    }
    
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s
    const p = 2 * l - q
    
    r = hue2rgb(p, q, h + 1/3)
    g = hue2rgb(p, q, h)
    b = hue2rgb(p, q, h - 1/3)
  }
  
  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255)
  }
}

// 将 HSL 转换为十六进制颜色
export function hslToHex(h, s, l) {
  const rgb = hslToRgb(h, s, l)
  return rgbToHex(rgb.r, rgb.g, rgb.b)
}

// 颜色亮度
export function getColorBrightness(r, g, b) {
  return (r * 299 + g * 587 + b * 114) / 1000
}

// 检查颜色是否为亮色
export function isLightColor(r, g, b) {
  return getColorBrightness(r, g, b) > 127
}

// 检查颜色是否为暗色
export function isDarkColor(r, g, b) {
  return !isLightColor(r, g, b)
}

// 生成随机颜色
export function generateRandomColor() {
  const r = Math.floor(Math.random() * 256)
  const g = Math.floor(Math.random() * 256)
  const b = Math.floor(Math.random() * 256)
  
  return rgbToHex(r, g, b)
}

// 生成随机 HSL 颜色
export function generateRandomHslColor() {
  const h = Math.floor(Math.random() * 361)
  const s = Math.floor(Math.random() * 101)
  const l = Math.floor(Math.random() * 101)
  
  return { h, s, l }
}

// 生成颜色渐变
export function generateColorGradient(startColor, endColor, steps) {
  const startRgb = typeof startColor === 'string' ? hexToRgb(startColor) : startColor
  const endRgb = typeof endColor === 'string' ? hexToRgb(endColor) : endColor
  
  if (!startRgb || !endRgb) return []
  
  const gradient = []
  
  for (let i = 0; i < steps; i++) {
    const ratio = i / (steps - 1)
    
    const r = Math.round(startRgb.r + ratio * (endRgb.r - startRgb.r))
    const g = Math.round(startRgb.g + ratio * (endRgb.g - startRgb.g))
    const b = Math.round(startRgb.b + ratio * (endRgb.b - startRgb.b))
    
    gradient.push(rgbToHex(r, g, b))
  }
  
  return gradient
}

// 调整颜色亮度
export function adjustColorBrightness(hex, amount) {
  let rgb = hexToRgb(hex)
  if (!rgb) return hex
  
  rgb.r = Math.max(0, Math.min(255, rgb.r + amount))
  rgb.g = Math.max(0, Math.min(255, rgb.g + amount))
  rgb.b = Math.max(0, Math.min(255, rgb.b + amount))
  
  return rgbToHex(rgb.r, rgb.g, rgb.b)
}

// 调整颜色饱和度
export function adjustColorSaturation(hex, amount) {
  let hsl = hexToHsl(hex)
  if (!hsl) return hex
  
  hsl.s = Math.max(0, Math.min(100, hsl.s + amount))
  
  return hslToHex(hsl.h, hsl.s, hsl.l)
}

// 调整颜色色调
export function adjustColorHue(hex, amount) {
  let hsl = hexToHsl(hex)
  if (!hsl) return hex
  
  hsl.h = (hsl.h + amount) % 360
  if (hsl.h < 0) hsl.h += 360
  
  return hslToHex(hsl.h, hsl.s, hsl.l)
}

// 颜色混合
export function blendColors(color1, color2, ratio = 0.5) {
  const rgb1 = typeof color1 === 'string' ? hexToRgb(color1) : color1
  const rgb2 = typeof color2 === 'string' ? hexToRgb(color2) : color2
  
  if (!rgb1 || !rgb2) return '#000000'
  
  const r = Math.round(rgb1.r + ratio * (rgb2.r - rgb1.r))
  const g = Math.round(rgb1.g + ratio * (rgb2.g - rgb1.g))
  const b = Math.round(rgb1.b + ratio * (rgb2.b - rgb1.b))
  
  return rgbToHex(r, g, b)
}

// 计算两种颜色的对比度
export function getColorContrast(hex1, hex2) {
  const rgb1 = hexToRgb(hex1)
  const rgb2 = hexToRgb(hex2)
  
  if (!rgb1 || !rgb2) return 0
  
  const brightness1 = getColorBrightness(rgb1.r, rgb1.g, rgb1.b)
  const brightness2 = getColorBrightness(rgb2.r, rgb2.g, rgb2.b)
  
  return Math.abs(brightness1 - brightness2)
}

// 检查颜色对比度是否足够
export function hasSufficientContrast(hex1, hex2, threshold = 125) {
  return getColorContrast(hex1, hex2) >= threshold
}

// 生成互补色
export function getComplementaryColor(hex) {
  const hsl = hexToHsl(hex)
  if (!hsl) return hex
  
  hsl.h = (hsl.h + 180) % 360
  
  return hslToHex(hsl.h, hsl.s, hsl.l)
}

// 生成类似色
export function getAnalogousColors(hex, count = 3, angle = 30) {
  const hsl = hexToHsl(hex)
  if (!hsl) return [hex]
  
  const colors = []
  
  for (let i = 0; i < count; i++) {
    const newHsl = { ...hsl }
    newHsl.h = (hsl.h + (i - Math.floor(count / 2)) * angle) % 360
    if (newHsl.h < 0) newHsl.h += 360
    
    colors.push(hslToHex(newHsl.h, newHsl.s, newHsl.l))
  }
  
  return colors
}

// 生成三角色
export function getTriadicColors(hex) {
  const hsl = hexToHsl(hex)
  if (!hsl) return [hex]
  
  const colors = [hex]
  
  for (let i = 1; i < 3; i++) {
    const newHsl = { ...hsl }
    newHsl.h = (hsl.h + i * 120) % 360
    
    colors.push(hslToHex(newHsl.h, newHsl.s, newHsl.l))
  }
  
  return colors
}

// 生成四角色
export function getTetradicColors(hex) {
  const hsl = hexToHsl(hex)
  if (!hsl) return [hex]
  
  const colors = [hex]
  
  for (let i = 1; i < 4; i++) {
    const newHsl = { ...hsl }
    newHsl.h = (hsl.h + i * 90) % 360
    
    colors.push(hslToHex(newHsl.h, newHsl.s, newHsl.l))
  }
  
  return colors
}

// 解析颜色字符串
export function parseColor(color) {
  if (typeof color !== 'string') return null
  
  // 十六进制颜色
  if (color.startsWith('#')) {
    return hexToRgb(color)
  }
  
  // RGB 颜色
  if (color.startsWith('rgb')) {
    const match = color.match(/rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/)
    if (match) {
      return {
        r: parseInt(match[1]),
        g: parseInt(match[2]),
        b: parseInt(match[3])
      }
    }
  }
  
  // HSL 颜色
  if (color.startsWith('hsl')) {
    const match = color.match(/hsl\(\s*(\d+)\s*,\s*(\d+)%\s*,\s*(\d+)%\s*\)/)
    if (match) {
      const h = parseInt(match[1])
      const s = parseInt(match[2])
      const l = parseInt(match[3])
      
      return hslToRgb(h, s, l)
    }
  }
  
  return null
}

// 格式化颜色值
export function formatColor(r, g, b, format = 'hex') {
  switch (format) {
    case 'hex':
      return rgbToHex(r, g, b)
    case 'rgb':
      return `rgb(${r}, ${g}, ${b})`
    case 'hsl':
      const hsl = rgbToHsl(r, g, b)
      return `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`
    default:
      return rgbToHex(r, g, b)
  }
}

// 验证十六进制颜色
export function isValidHexColor(hex) {
  return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(hex)
}

// 验证 RGB 颜色
export function isValidRgbColor(r, g, b) {
  return Number.isInteger(r) && Number.isInteger(g) && Number.isInteger(b) &&
         r >= 0 && r <= 255 && g >= 0 && g <= 255 && b >= 0 && b <= 255
}

// 验证 HSL 颜色
export function isValidHslColor(h, s, l) {
  return Number.isInteger(h) && Number.isInteger(s) && Number.isInteger(l) &&
         h >= 0 && h <= 360 && s >= 0 && s <= 100 && l >= 0 && l <= 100
}