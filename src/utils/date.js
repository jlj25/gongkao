// 日期时间处理工具函数

// 格式化日期
export function formatDate(date, format = 'YYYY-MM-DD') {
  if (!date) return '';
  
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  const hours = String(d.getHours()).padStart(2, '0');
  const minutes = String(d.getMinutes()).padStart(2, '0');
  const seconds = String(d.getSeconds()).padStart(2, '0');
  
  return format
    .replace('YYYY', year)
    .replace('MM', month)
    .replace('DD', day)
    .replace('HH', hours)
    .replace('mm', minutes)
    .replace('ss', seconds);
}

// 获取当前日期
export function getCurrentDate(format = 'YYYY-MM-DD') {
  return formatDate(new Date(), format);
}

// 获取当前时间
export function getCurrentTime(format = 'HH:mm:ss') {
  return formatDate(new Date(), format);
}

// 获取当前日期时间
export function getCurrentDateTime(format = 'YYYY-MM-DD HH:mm:ss') {
  return formatDate(new Date(), format);
}

// 解析日期字符串
export function parseDate(dateString) {
  const date = new Date(dateString);
  return isNaN(date.getTime()) ? null : date;
}

// 比较两个日期
export function compareDates(date1, date2) {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  
  if (d1 > d2) return 1;
  if (d1 < d2) return -1;
  return 0;
}

// 计算两个日期之间的天数差
export function getDateDiff(date1, date2) {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  const timeDiff = Math.abs(d2.getTime() - d1.getTime());
  return Math.ceil(timeDiff / (1000 * 3600 * 24));
}

// 添加天数
export function addDays(date, days) {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

// 添加月份
export function addMonths(date, months) {
  const d = new Date(date);
  d.setMonth(d.getMonth() + months);
  return d;
}

// 添加年份
export function addYears(date, years) {
  const d = new Date(date);
  d.setFullYear(d.getFullYear() + years);
  return d;
}

// 获取月份的天数
export function getDaysInMonth(year, month) {
  return new Date(year, month, 0).getDate();
}

// 获取月份的第一天
export function getFirstDayOfMonth(date) {
  const d = new Date(date);
  return new Date(d.getFullYear(), d.getMonth(), 1);
}

// 获取月份的最后一天
export function getLastDayOfMonth(date) {
  const d = new Date(date);
  return new Date(d.getFullYear(), d.getMonth() + 1, 0);
}

// 获取季度的第一天
export function getFirstDayOfQuarter(date) {
  const d = new Date(date);
  const quarter = Math.floor(d.getMonth() / 3);
  return new Date(d.getFullYear(), quarter * 3, 1);
}

// 获取季度的最后一天
export function getLastDayOfQuarter(date) {
  const d = new Date(date);
  const quarter = Math.floor(d.getMonth() / 3);
  return new Date(d.getFullYear(), quarter * 3 + 3, 0);
}

// 获取年的第一天
export function getFirstDayOfYear(date) {
  const d = new Date(date);
  return new Date(d.getFullYear(), 0, 1);
}

// 获取年的最后一天
export function getLastDayOfYear(date) {
  const d = new Date(date);
  return new Date(d.getFullYear(), 11, 31);
}

// 判断是否为闰年
export function isLeapYear(year) {
  return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}

// 获取周的第一天（周一）
export function getFirstDayOfWeek(date) {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1); // 调整周日
  return new Date(d.setDate(diff));
}

// 获取周的最后一天（周日）
export function getLastDayOfWeek(date) {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() + (7 - day);
  return new Date(d.setDate(diff));
}

// 获取日期是当年的第几天
export function getDayOfYear(date) {
  const d = new Date(date);
  const start = new Date(d.getFullYear(), 0, 0);
  const diff = d - start;
  const oneDay = 1000 * 60 * 60 * 24;
  return Math.floor(diff / oneDay);
}

// 获取日期是当年的第几周
export function getWeekOfYear(date) {
  const d = new Date(date);
  const firstDay = new Date(d.getFullYear(), 0, 1);
  const firstDayOfWeek = getFirstDayOfWeek(firstDay);
  const diff = d - firstDayOfWeek;
  const oneWeek = 1000 * 60 * 60 * 24 * 7;
  return Math.ceil(diff / oneWeek);
}

// 获取日期是当月的第几周
export function getWeekOfMonth(date) {
  const d = new Date(date);
  const firstDay = new Date(d.getFullYear(), d.getMonth(), 1);
  const firstDayOfWeek = getFirstDayOfWeek(firstDay);
  const diff = d - firstDayOfWeek;
  const oneWeek = 1000 * 60 * 60 * 24 * 7;
  return Math.ceil(diff / oneWeek);
}

// 格式化时间差
export function formatTimeDiff(startDate, endDate) {
  const diff = Math.abs(new Date(endDate) - new Date(startDate));
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  
  if (days > 0) {
    return `${days}天${hours % 24}小时${minutes % 60}分钟${seconds % 60}秒`;
  } else if (hours > 0) {
    return `${hours}小时${minutes % 60}分钟${seconds % 60}秒`;
  } else if (minutes > 0) {
    return `${minutes}分钟${seconds % 60}秒`;
  } else {
    return `${seconds}秒`;
  }
}

// 获取时间戳
export function getTimestamp(date = new Date()) {
  return new Date(date).getTime();
}

// 从时间戳创建日期
export function createDateFromTimestamp(timestamp) {
  return new Date(timestamp);
}

// 验证日期是否有效
export function isValidDate(date) {
  return date instanceof Date && !isNaN(date);
}

// 获取年龄
export function getAge(birthDate) {
  const today = new Date();
  const birth = new Date(birthDate);
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  
  return age;
}

// 获取生肖
export function getZodiac(birthDate) {
  const zodiacList = ['猴', '鸡', '狗', '猪', '鼠', '牛', '虎', '兔', '龙', '蛇', '马', '羊'];
  const year = new Date(birthDate).getFullYear();
  return zodiacList[year % 12];
}

// 获取星座
export function getConstellation(birthDate) {
  const constellations = [
    { name: '摩羯座', start: [12, 22], end: [1, 19] },
    { name: '水瓶座', start: [1, 20], end: [2, 18] },
    { name: '双鱼座', start: [2, 19], end: [3, 20] },
    { name: '白羊座', start: [3, 21], end: [4, 19] },
    { name: '金牛座', start: [4, 20], end: [5, 20] },
    { name: '双子座', start: [5, 21], end: [6, 21] },
    { name: '巨蟹座', start: [6, 22], end: [7, 22] },
    { name: '狮子座', start: [7, 23], end: [8, 22] },
    { name: '处女座', start: [8, 23], end: [9, 22] },
    { name: '天秤座', start: [9, 23], end: [10, 23] },
    { name: '天蝎座', start: [10, 24], end: [11, 22] },
    { name: '射手座', start: [11, 23], end: [12, 21] }
  ];
  
  const date = new Date(birthDate);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  
  for (const constellation of constellations) {
    const { start, end } = constellation;
    
    if ((month === start[0] && day >= start[1]) || (month === end[0] && day <= end[1])) {
      return constellation.name;
    }
  }
  
  return '';
}

// 获取季节
export function getSeason(date) {
  const month = new Date(date).getMonth() + 1;
  if (month >= 3 && month <= 5) return '春季';
  if (month >= 6 && month <= 8) return '夏季';
  if (month >= 9 && month <= 11) return '秋季';
  return '冬季';
}

// 判断是否为工作日
export function isWeekday(date) {
  const day = new Date(date).getDay();
  return day > 0 && day < 6;
}

// 判断是否为周末
export function isWeekend(date) {
  return !isWeekday(date);
}