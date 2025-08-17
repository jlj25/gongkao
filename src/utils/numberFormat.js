// 数字格式化工具函数

// 格式化为千分位
export function formatNumber(num) {
  if (num === null || num === undefined) return '0'
  
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

// 保留两位小数
export function formatDecimal(num, decimals = 2) {
  if (num === null || num === undefined) return '0.00'
  
  return parseFloat(num).toFixed(decimals)
}

// 格式化为百分比
export function formatPercentage(num, decimals = 2) {
  if (num === null || num === undefined) return '0.00%'
  
  return `${(parseFloat(num) * 100).toFixed(decimals)}%`
}