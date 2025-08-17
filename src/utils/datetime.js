// 日期时间工具函数

// 格式化日期时间
export function formatDateTime(date, format = 'YYYY-MM-DD HH:mm:ss') {
  if (!date) return ''
  
  const d = new Date(date)
  if (d.toString() === 'Invalid Date') return ''
  
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  const hours = String(d.getHours()).padStart(2, '0')
  const minutes = String(d.getMinutes()).padStart(2, '0')
  const seconds = String(d.getSeconds()).padStart(2, '0')
  
  return format
    .replace('YYYY', year)
    .replace('MM', month)
    .replace('DD', day)
    .replace('HH', hours)
    .replace('mm', minutes)
    .replace('ss', seconds)
}

// 验证日期是否有效
export function isValidDate(date) {
  if (date instanceof Date) {
    return !isNaN(date.getTime())
  }
  
  if (typeof date === 'string' || typeof date === 'number') {
    const d = new Date(date)
    return !isNaN(d.getTime())
  }
  
  return false
}

// 解析日期字符串
export function parseDateString(dateString) {
  // 尝试多种日期格式
  const formats = [
    'YYYY-MM-DD',
    'YYYY/MM/DD',
    'MM/DD/YYYY',
    'DD/MM/YYYY',
    'YYYY-MM-DD HH:mm:ss',
    'YYYY/MM/DD HH:mm:ss'
  ]
  
  for (const format of formats) {
    try {
      const date = new Date(dateString)
      if (!isNaN(date.getTime())) {
        return date
      }
    } catch (e) {
      continue
    }
  }
  
  throw new Error('Invalid date string')
}

// 获取当前日期时间
export function getCurrentDateTime(format = 'YYYY-MM-DD HH:mm:ss') {
  return formatDateTime(new Date(), format)
}

// 获取当前日期
export function getCurrentDate(format = 'YYYY-MM-DD') {
  return formatDateTime(new Date(), format)
}

// 获取当前时间
export function getCurrentTime(format = 'HH:mm:ss') {
  return formatDateTime(new Date(), format)
}

// 计算两个日期之间的天数差
export function dateDiff(date1, date2) {
  const d1 = new Date(date1)
  const d2 = new Date(date2)
  
  if (d1.toString() === 'Invalid Date' || d2.toString() === 'Invalid Date') {
    return 0
  }
  
  const timeDiff = Math.abs(d2.getTime() - d1.getTime())
  return Math.ceil(timeDiff / (1000 * 3600 * 24))
}

// 计算两个日期时间之间的小时差
export function hoursDiff(date1, date2) {
  const d1 = new Date(date1)
  const d2 = new Date(date2)
  
  if (d1.toString() === 'Invalid Date' || d2.toString() === 'Invalid Date') {
    return 0
  }
  
  const timeDiff = Math.abs(d2.getTime() - d1.getTime())
  return Math.ceil(timeDiff / (1000 * 3600))
}

// 计算两个日期时间之间的分钟差
export function minutesDiff(date1, date2) {
  const d1 = new Date(date1)
  const d2 = new Date(date2)
  
  if (d1.toString() === 'Invalid Date' || d2.toString() === 'Invalid Date') {
    return 0
  }
  
  const timeDiff = Math.abs(d2.getTime() - d1.getTime())
  return Math.ceil(timeDiff / (1000 * 60))
}

// 增加天数
export function addDays(date, days) {
  const d = new Date(date)
  if (d.toString() === 'Invalid Date') return null
  
  d.setDate(d.getDate() + days)
  return d
}

// 增加月份
export function addMonths(date, months) {
  const d = new Date(date)
  if (d.toString() === 'Invalid Date') return null
  
  d.setMonth(d.getMonth() + months)
  return d
}

// 增加年份
export function addYears(date, years) {
  const d = new Date(date)
  if (d.toString() === 'Invalid Date') return null
  
  d.setFullYear(d.getFullYear() + years)
  return d
}

// 增加小时
export function addHours(date, hours) {
  const d = new Date(date)
  if (d.toString() === 'Invalid Date') return null
  
  d.setHours(d.getHours() + hours)
  return d
}

// 增加分钟
export function addMinutes(date, minutes) {
  const d = new Date(date)
  if (d.toString() === 'Invalid Date') return null
  
  d.setMinutes(d.getMinutes() + minutes)
  return d
}

// 判断是否为闰年
export function isLeapYear(year) {
  if (typeof year !== 'number') {
    year = new Date(year).getFullYear()
  }
  
  return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0)
}

// 获取月份的天数
export function getDaysInMonth(year, month) {
  if (typeof year !== 'number') {
    const date = new Date(year)
    year = date.getFullYear()
    month = date.getMonth() + 1
  }
  
  return new Date(year, month, 0).getDate()
}

// 获取星期几
export function getDayOfWeek(date, locale = 'zh-CN') {
  const d = new Date(date)
  if (d.toString() === 'Invalid Date') return ''
  
  const weekdays = {
    'zh-CN': ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
    'en-US': ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  }
  
  const day = d.getDay()
  return weekdays[locale] ? weekdays[locale][day] : weekdays['en-US'][day]
}

// 获取时间戳
export function getTimestamp(date = new Date()) {
  const d = new Date(date)
  if (d.toString() === 'Invalid Date') return 0
  
  return Math.floor(d.getTime() / 1000)
}

// 将时间戳转换为日期
export function timestampToDate(timestamp) {
  if (!timestamp) return null
  
  // 如果是秒级时间戳，转换为毫秒级
  if (timestamp < 10000000000) {
    timestamp *= 1000
  }
  
  return new Date(timestamp)
}

// 判断是否为同一天
export function isSameDay(date1, date2) {
  const d1 = new Date(date1)
  const d2 = new Date(date2)
  
  if (d1.toString() === 'Invalid Date' || d2.toString() === 'Invalid Date') {
    return false
  }
  
  return d1.getFullYear() === d2.getFullYear() &&
         d1.getMonth() === d2.getMonth() &&
         d1.getDate() === d2.getDate()
}

// 判断是否为今天
export function isToday(date) {
  return isSameDay(date, new Date())
}

// 格式化为相对时间 (如: 5分钟前, 2小时前等)
export function formatRelativeTime(date, locale = 'zh-CN') {
  const d = new Date(date)
  if (d.toString() === 'Invalid Date') return ''
  
  const now = new Date()
  const diffMs = now - d
  const diffSecs = Math.floor(diffMs / 1000)
  const diffMins = Math.floor(diffSecs / 60)
  const diffHours = Math.floor(diffMins / 60)
  const diffDays = Math.floor(diffHours / 24)
  
  if (locale === 'zh-CN') {
    if (diffSecs < 60) {
      return '刚刚'
    } else if (diffMins < 60) {
      return `${diffMins}分钟前`
    } else if (diffHours < 24) {
      return `${diffHours}小时前`
    } else if (diffDays < 7) {
      return `${diffDays}天前`
    } else {
      return formatDateTime(d, 'YYYY-MM-DD')
    }
  } else {
    if (diffSecs < 60) {
      return 'just now'
    } else if (diffMins < 60) {
      return `${diffMins} minutes ago`
    } else if (diffHours < 24) {
      return `${diffHours} hours ago`
    } else if (diffDays < 7) {
      return `${diffDays} days ago`
    } else {
      return formatDateTime(d, 'YYYY-MM-DD')
    }
  }
}

// 获取日期的开始时间（00:00:00）
export function startOfDay(date) {
  const d = new Date(date)
  if (d.toString() === 'Invalid Date') return null
  
  d.setHours(0, 0, 0, 0)
  return d
}

// 获取日期的结束时间（23:59:59）
export function endOfDay(date) {
  const d = new Date(date)
  if (d.toString() === 'Invalid Date') return null
  
  d.setHours(23, 59, 59, 999)
  return d
}

// 获取月份的第一天
export function startOfMonth(date) {
  const d = new Date(date)
  if (d.toString() === 'Invalid Date') return null
  
  d.setDate(1)
  d.setHours(0, 0, 0, 0)
  return d
}

// 获取月份的最后一天
export function endOfMonth(date) {
  const d = new Date(date)
  if (d.toString() === 'Invalid Date') return null
  
  d.setMonth(d.getMonth() + 1, 0)
  d.setHours(23, 59, 59, 999)
  return d
}

// 获取年份的第一天
export function startOfYear(date) {
  const d = new Date(date)
  if (d.toString() === 'Invalid Date') return null
  
  d.setMonth(0, 1)
  d.setHours(0, 0, 0, 0)
  return d
}

// 获取年份的最后一天
export function endOfYear(date) {
  const d = new Date(date)
  if (d.toString() === 'Invalid Date') return null
  
  d.setMonth(11, 31)
  d.setHours(23, 59, 59, 999)
  return d
}

// 获取本周的第一天（周一）
export function startOfWeek(date) {
  const d = new Date(date)
  if (d.toString() === 'Invalid Date') return null
  
  const day = d.getDay()
  const diff = d.getDate() - day + (day === 0 ? -6 : 1); // 调整周日
  return new Date(d.setDate(diff))
}

// 获取本周的最后一天（周日）
export function endOfWeek(date) {
  const d = new Date(date)
  if (d.toString() === 'Invalid Date') return null
  
  const day = d.getDay()
  const diff = d.getDate() + (7 - day)
  return new Date(d.setDate(diff))
}

// 判断是否为工作日（周一到周五）
export function isWeekday(date) {
  const d = new Date(date)
  if (d.toString() === 'Invalid Date') return false
  
  const day = d.getDay()
  return day > 0 && day < 6
}

// 判断是否为周末（周六或周日）
export function isWeekend(date) {
  return !isWeekday(date)
}

// 计算年龄
export function calculateAge(birthDate) {
  const birth = new Date(birthDate)
  if (birth.toString() === 'Invalid Date') return 0
  
  const today = new Date()
  let age = today.getFullYear() - birth.getFullYear()
  const monthDiff = today.getMonth() - birth.getMonth()
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--
  }
  
  return age
}

// 获取季度
export function getQuarter(date) {
  const d = new Date(date)
  if (d.toString() === 'Invalid Date') return 0
  
  return Math.floor(d.getMonth() / 3) + 1
}

// 获取季度的第一天
export function startOfQuarter(date) {
  const d = new Date(date)
  if (d.toString() === 'Invalid Date') return null
  
  const quarter = getQuarter(d)
  return new Date(d.getFullYear(), (quarter - 1) * 3, 1)
}

// 获取季度的最后一天
export function endOfQuarter(date) {
  const d = new Date(date)
  if (d.toString() === 'Invalid Date') return null
  
  const quarter = getQuarter(d)
  return new Date(d.getFullYear(), quarter * 3, 0)
}

// 格式化时间段
export function formatDuration(milliseconds) {
  const seconds = Math.floor(milliseconds / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)
  
  const parts = []
  
  if (days > 0) parts.push(`${days}天`)
  if (hours % 24 > 0) parts.push(`${hours % 24}小时`)
  if (minutes % 60 > 0) parts.push(`${minutes % 60}分钟`)
  if (seconds % 60 > 0) parts.push(`${seconds % 60}秒`)
  
  return parts.join('') || '0秒'
}

// 获取两个日期之间的工作日数量
export function getWeekdaysCount(startDate, endDate) {
  const start = new Date(startDate)
  const end = new Date(endDate)
  
  if (start.toString() === 'Invalid Date' || end.toString() === 'Invalid Date') {
    return 0
  }
  
  let count = 0
  const current = new Date(start)
  
  while (current <= end) {
    if (isWeekday(current)) {
      count++
    }
    current.setDate(current.getDate() + 1)
  }
  
  return count
}

// 获取两个日期之间的周末数量
export function getWeekendsCount(startDate, endDate) {
  const start = new Date(startDate)
  const end = new Date(endDate)
  
  if (start.toString() === 'Invalid Date' || end.toString() === 'Invalid Date') {
    return 0
  }
  
  let count = 0
  const current = new Date(start)
  
  while (current <= end) {
    if (isWeekend(current)) {
      count++
    }
    current.setDate(current.getDate() + 1)
  }
  
  return count
}

// 判断日期是否在两个日期之间
export function isBetween(date, startDate, endDate) {
  const d = new Date(date)
  const start = new Date(startDate)
  const end = new Date(endDate)
  
  if (d.toString() === 'Invalid Date' || start.toString() === 'Invalid Date' || end.toString() === 'Invalid Date') {
    return false
  }
  
  return d >= start && d <= end
}

// 获取年份的天数
export function getDaysInYear(year) {
  if (typeof year !== 'number') {
    year = new Date(year).getFullYear()
  }
  
  return isLeapYear(year) ? 366 : 365
}

// 获取季节
export function getSeason(date) {
  const d = new Date(date)
  if (d.toString() === 'Invalid Date') return ''
  
  const month = d.getMonth() + 1
  
  if (month >= 3 && month <= 5) return 'spring'
  if (month >= 6 && month <= 8) return 'summer'
  if (month >= 9 && month <= 11) return 'autumn'
  return 'winter'
}

// 获取季节的中文名称
export function getChineseSeason(date) {
  const seasons = {
    spring: '春季',
    summer: '夏季',
    autumn: '秋季',
    winter: '冬季'
  }
  
  return seasons[getSeason(date)] || ''
}