// 日期格式化工具函数

// 格式化为 YYYY-MM-DD HH:mm:ss
export function formatDateTime(date) {
  if (!date) return ''
  
  const d = new Date(date)
  const year = d.getFullYear()
  const month = padZero(d.getMonth() + 1)
  const day = padZero(d.getDate())
  const hours = padZero(d.getHours())
  const minutes = padZero(d.getMinutes())
  const seconds = padZero(d.getSeconds())
  
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
}

// 格式化为 YYYY-MM-DD
export function formatDate(date) {
  if (!date) return ''
  
  const d = new Date(date)
  const year = d.getFullYear()
  const month = padZero(d.getMonth() + 1)
  const day = padZero(d.getDate())
  
  return `${year}-${month}-${day}`
}

// 补零函数
function padZero(num) {
  return num < 10 ? `0${num}` : num
}