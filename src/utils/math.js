// 数学计算工具函数

// 四舍五入到指定小数位
export function round(value, decimals = 2) {
  if (isNaN(value)) return 0
  
  const factor = Math.pow(10, decimals)
  return Math.round(value * factor) / factor
}

// 向下取整到指定小数位
export function floor(value, decimals = 2) {
  if (isNaN(value)) return 0
  
  const factor = Math.pow(10, decimals)
  return Math.floor(value * factor) / factor
}

// 向上取整到指定小数位
export function ceil(value, decimals = 2) {
  if (isNaN(value)) return 0
  
  const factor = Math.pow(10, decimals)
  return Math.ceil(value * factor) / factor
}

// 保留小数位（不四舍五入）
export function truncate(value, decimals = 2) {
  if (isNaN(value)) return 0
  
  const factor = Math.pow(10, decimals)
  return Math.trunc(value * factor) / factor
}

// 生成指定范围内的随机整数
export function randomInt(min, max) {
  if (min > max) {
    [min, max] = [max, min] // 交换值
  }
  
  return Math.floor(Math.random() * (max - min + 1)) + min
}

// 生成指定范围内的随机浮点数
export function randomFloat(min, max, decimals = 2) {
  if (min > max) {
    [min, max] = [max, min] // 交换值
  }
  
  const value = Math.random() * (max - min) + min
  return round(value, decimals)
}

// 计算百分比
export function percentage(part, total, decimals = 2) {
  if (total === 0) return 0
  
  const result = (part / total) * 100
  return round(result, decimals)
}

// 计算折扣价格
export function calculateDiscount(price, discountPercent) {
  if (isNaN(price) || isNaN(discountPercent)) return 0
  
  const discountAmount = price * (discountPercent / 100)
  return round(price - discountAmount, 2)
}

// 计算税费
export function calculateTax(amount, taxRate) {
  if (isNaN(amount) || isNaN(taxRate)) return 0
  
  const taxAmount = amount * (taxRate / 100)
  return round(taxAmount, 2)
}

// 计算总价（含税）
export function calculateTotalWithTax(amount, taxRate) {
  if (isNaN(amount) || isNaN(taxRate)) return 0
  
  const taxAmount = calculateTax(amount, taxRate)
  return round(amount + taxAmount, 2)
}

// 计算平均值
export function average(numbers) {
  if (!Array.isArray(numbers) || numbers.length === 0) return 0
  
  const sum = numbers.reduce((acc, num) => acc + (isNaN(num) ? 0 : num), 0)
  return round(sum / numbers.length, 2)
}

// 计算总和
export function sum(numbers) {
  if (!Array.isArray(numbers) || numbers.length === 0) return 0
  
  return numbers.reduce((acc, num) => acc + (isNaN(num) ? 0 : num), 0)
}

// 计算最大值
export function max(numbers) {
  if (!Array.isArray(numbers) || numbers.length === 0) return 0
  
  return Math.max(...numbers.filter(num => !isNaN(num)))
}

// 计算最小值
export function min(numbers) {
  if (!Array.isArray(numbers) || numbers.length === 0) return 0
  
  return Math.min(...numbers.filter(num => !isNaN(num)))
}

// 计算中位数
export function median(numbers) {
  if (!Array.isArray(numbers) || numbers.length === 0) return 0
  
  const sorted = numbers.filter(num => !isNaN(num)).sort((a, b) => a - b)
  const middle = Math.floor(sorted.length / 2)
  
  if (sorted.length % 2 === 0) {
    return round((sorted[middle - 1] + sorted[middle]) / 2, 2)
  } else {
    return sorted[middle]
  }
}

// 计算标准差
export function standardDeviation(numbers) {
  if (!Array.isArray(numbers) || numbers.length === 0) return 0
  
  const avg = average(numbers)
  const squaredDiffs = numbers.map(num => {
    if (isNaN(num)) return 0
    const diff = num - avg
    return diff * diff
  })
  
  const avgSquaredDiff = average(squaredDiffs)
  return Math.sqrt(avgSquaredDiff)
}

// 货币格式化
export function formatCurrency(amount, currency = 'CNY', locale = 'zh-CN') {
  if (isNaN(amount)) return '0.00'
  
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency
  }).format(amount)
}

// 数字格式化（千分位）
export function formatNumber(num, decimals = 2) {
  if (isNaN(num)) return '0'
  
  return round(num, decimals).toLocaleString()
}

// 判断是否为质数
export function isPrime(num) {
  if (isNaN(num) || num < 2) return false
  
  if (num === 2) return true
  
  if (num % 2 === 0) return false
  
  const sqrt = Math.sqrt(num)
  for (let i = 3; i <= sqrt; i += 2) {
    if (num % i === 0) return false
  }
  
  return true
}

// 计算阶乘
export function factorial(n) {
  if (isNaN(n) || n < 0) return 0
  
  if (n === 0 || n === 1) return 1
  
  let result = 1
  for (let i = 2; i <= n; i++) {
    result *= i
  }
  
  return result
}

// 计算最大公约数
export function gcd(a, b) {
  if (isNaN(a) || isNaN(b)) return 0
  
  a = Math.abs(a)
  b = Math.abs(b)
  
  while (b !== 0) {
    const temp = b
    b = a % b
    a = temp
  }
  
  return a
}

// 计算最小公倍数
export function lcm(a, b) {
  if (isNaN(a) || isNaN(b)) return 0
  
  return Math.abs(a * b) / gcd(a, b)
}

// 获取随机布尔值
export function randomBoolean() {
  return Math.random() >= 0.5
}

// 获取随机数组元素
export function randomElement(arr) {
  if (!Array.isArray(arr) || arr.length === 0) return undefined
  
  const randomIndex = Math.floor(Math.random() * arr.length)
  return arr[randomIndex]
}

// 打乱数组
export function shuffle(arr) {
  if (!Array.isArray(arr) || arr.length === 0) return arr
  
  const result = [...arr]
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[result[i], result[j]] = [result[j], result[i]]
  }
  
  return result
}

// 生成随机颜色
export function randomColor() {
  const r = randomInt(0, 255)
  const g = randomInt(0, 255)
  const b = randomInt(0, 255)
  
  return `rgb(${r}, ${g}, ${b})`
}

// 生成随机十六进制颜色
export function randomHexColor() {
  const color = randomInt(0, 0xFFFFFF)
  return `#${color.toString(16).padStart(6, '0')}`
}

// 限制数值在指定范围内
export function clamp(value, min, max) {
  if (isNaN(value) || isNaN(min) || isNaN(max)) return value
  
  return Math.min(Math.max(value, min), max)
}

// 线性插值
export function lerp(start, end, t) {
  if (isNaN(start) || isNaN(end) || isNaN(t)) return start
  
  return start + (end - start) * t
}

// 反向线性插值
export function inverseLerp(start, end, value) {
  if (isNaN(start) || isNaN(end) || isNaN(value)) return 0
  if (start === end) return 0
  
  return (value - start) / (end - start)
}

// 数值映射
export function mapRange(value, inMin, inMax, outMin, outMax) {
  if (isNaN(value) || isNaN(inMin) || isNaN(inMax) || isNaN(outMin) || isNaN(outMax)) return value
  
  return outMin + (outMax - outMin) * ((value - inMin) / (inMax - inMin))
}

// 角度转弧度
export function degreesToRadians(degrees) {
  if (isNaN(degrees)) return 0
  
  return degrees * (Math.PI / 180)
}

// 弧度转角度
export function radiansToDegrees(radians) {
  if (isNaN(radians)) return 0
  
  return radians * (180 / Math.PI)
}

// 计算两点之间的距离
export function getDistance(x1, y1, x2, y2) {
  if (isNaN(x1) || isNaN(y1) || isNaN(x2) || isNaN(y2)) return 0
  
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2))
}

// 计算阶乘（递归实现）
export function factorialRecursive(n) {
  if (isNaN(n) || n < 0) return 0
  if (n === 0 || n === 1) return 1
  
  return n * factorialRecursive(n - 1)
}

// 斐波那契数列
export function fibonacci(n) {
  if (isNaN(n) || n < 0) return 0
  if (n === 0 || n === 1) return n
  
  let a = 0
  let b = 1
  
  for (let i = 2; i <= n; i++) {
    const temp = a + b
    a = b
    b = temp
  }
  
  return b
}

// 斐波那契数列（递归实现）
export function fibonacciRecursive(n) {
  if (isNaN(n) || n < 0) return 0
  if (n === 0 || n === 1) return n
  
  return fibonacciRecursive(n - 1) + fibonacciRecursive(n - 2)
}

// 判断是否为偶数
export function isEven(num) {
  if (isNaN(num)) return false
  
  return num % 2 === 0
}

// 判断是否为奇数
export function isOdd(num) {
  if (isNaN(num)) return false
  
  return num % 2 !== 0
}

// 判断是否为完全平方数
export function isPerfectSquare(num) {
  if (isNaN(num) || num < 0) return false
  
  const sqrt = Math.sqrt(num)
  return sqrt === Math.floor(sqrt)
}

// 计算平方根
export function sqrt(num) {
  if (isNaN(num) || num < 0) return 0
  
  return Math.sqrt(num)
}

// 计算立方根
export function cbrt(num) {
  if (isNaN(num)) return 0
  
  return Math.cbrt(num)
}

// 计算幂
export function pow(base, exponent) {
  if (isNaN(base) || isNaN(exponent)) return 0
  
  return Math.pow(base, exponent)
}

// 计算对数
export function log(num, base = Math.E) {
  if (isNaN(num) || num <= 0 || isNaN(base) || base <= 0) return 0
  
  if (base === Math.E) {
    return Math.log(num)
  } else if (base === 10) {
    return Math.log10(num)
  } else {
    return Math.log(num) / Math.log(base)
  }
}

// 计算绝对值
export function abs(num) {
  if (isNaN(num)) return 0
  
  return Math.abs(num)
}

// 计算正弦值
export function sin(angle) {
  if (isNaN(angle)) return 0
  
  return Math.sin(angle)
}

// 计算余弦值
export function cos(angle) {
  if (isNaN(angle)) return 0
  
  return Math.cos(angle)
}

// 计算正切值
export function tan(angle) {
  if (isNaN(angle)) return 0
  
  return Math.tan(angle)
}

// 计算反正弦值
export function asin(value) {
  if (isNaN(value)) return 0
  
  return Math.asin(value)
}

// 计算反余弦值
export function acos(value) {
  if (isNaN(value)) return 0
  
  return Math.acos(value)
}

// 计算反正切值
export function atan(value) {
  if (isNaN(value)) return 0
  
  return Math.atan(value)
}

// 计算两点之间的角度
export function getAngle(x1, y1, x2, y2) {
  if (isNaN(x1) || isNaN(y1) || isNaN(x2) || isNaN(y2)) return 0
  
  const dx = x2 - x1
  const dy = y2 - y1
  
  return Math.atan2(dy, dx)
}

// 计算百分比变化
export function percentageChange(oldValue, newValue, decimals = 2) {
  if (isNaN(oldValue) || isNaN(newValue) || oldValue === 0) return 0
  
  const change = ((newValue - oldValue) / Math.abs(oldValue)) * 100
  return round(change, decimals)
}

// 计算复利
export function compoundInterest(principal, rate, time, compoundFrequency = 1) {
  if (isNaN(principal) || isNaN(rate) || isNaN(time) || isNaN(compoundFrequency)) return 0
  
  return principal * Math.pow(1 + (rate / 100) / compoundFrequency, compoundFrequency * time)
}

// 计算简单利息
export function simpleInterest(principal, rate, time) {
  if (isNaN(principal) || isNaN(rate) || isNaN(time)) return 0
  
  return principal * (rate / 100) * time
}

// 计算年化收益率
export function annualizedReturn(initialValue, finalValue, years) {
  if (isNaN(initialValue) || isNaN(finalValue) || isNaN(years) || initialValue === 0 || years === 0) return 0
  
  return (Math.pow(finalValue / initialValue, 1 / years) - 1) * 100
}

// 计算加权平均值
export function weightedAverage(values, weights) {
  if (!Array.isArray(values) || !Array.isArray(weights) || values.length !== weights.length || values.length === 0) return 0
  
  const weightedSum = values.reduce((sum, value, index) => sum + value * weights[index], 0)
  const totalWeight = sum(weights)
  
  if (totalWeight === 0) return 0
  
  return weightedSum / totalWeight
}

// 计算方差
export function variance(numbers) {
  if (!Array.isArray(numbers) || numbers.length === 0) return 0
  
  const avg = average(numbers)
  const squaredDiffs = numbers.map(num => {
    if (isNaN(num)) return 0
    const diff = num - avg
    return diff * diff
  })
  
  return average(squaredDiffs)
}

// 计算协方差
export function covariance(arr1, arr2) {
  if (!Array.isArray(arr1) || !Array.isArray(arr2) || arr1.length !== arr2.length || arr1.length === 0) return 0
  
  const avg1 = average(arr1)
  const avg2 = average(arr2)
  
  const products = arr1.map((val1, index) => {
    const val2 = arr2[index]
    if (isNaN(val1) || isNaN(val2)) return 0
    return (val1 - avg1) * (val2 - avg2)
  })
  
  return average(products)
}

// 计算相关系数
export function correlation(arr1, arr2) {
  if (!Array.isArray(arr1) || !Array.isArray(arr2) || arr1.length !== arr2.length || arr1.length === 0) return 0
  
  const cov = covariance(arr1, arr2)
  const stdDev1 = standardDeviation(arr1)
  const stdDev2 = standardDeviation(arr2)
  
  if (stdDev1 === 0 || stdDev2 === 0) return 0
  
  return cov / (stdDev1 * stdDev2)
}

// 计算排列数
export function permutation(n, r) {
  if (isNaN(n) || isNaN(r) || n < 0 || r < 0 || r > n) return 0
  
  let result = 1
  for (let i = n; i > n - r; i--) {
    result *= i
  }
  
  return result
}

// 计算组合数
export function combination(n, r) {
  if (isNaN(n) || isNaN(r) || n < 0 || r < 0 || r > n) return 0
  
  r = Math.min(r, n - r) // 利用对称性优化
  let result = 1
  
  for (let i = 1; i <= r; i++) {
    result = (result * (n - i + 1)) / i
  }
  
  return Math.round(result)
}

// 判断是否为闰年
export function isLeapYear(year) {
  if (isNaN(year)) return false
  
  return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0)
}

// 获取数组中的众数
export function mode(numbers) {
  if (!Array.isArray(numbers) || numbers.length === 0) return []
  
  const frequency = {}
  let maxFreq = 0
  
  // 计算频率
  for (const num of numbers) {
    if (isNaN(num)) continue
    frequency[num] = (frequency[num] || 0) + 1
    maxFreq = Math.max(maxFreq, frequency[num])
  }
  
  // 找出众数
  const modes = []
  for (const num in frequency) {
    if (frequency[num] === maxFreq) {
      modes.push(Number(num))
    }
  }
  
  return modes
}

// 计算数组的范围
export function range(numbers) {
  if (!Array.isArray(numbers) || numbers.length === 0) return 0
  
  return max(numbers) - min(numbers)
}

// 计算数组的几何平均数
export function geometricMean(numbers) {
  if (!Array.isArray(numbers) || numbers.length === 0) return 0
  
  const product = numbers.reduce((acc, num) => isNaN(num) ? acc : acc * num, 1)
  return Math.pow(product, 1 / numbers.length)
}

// 计算数组的调和平均数
export function harmonicMean(numbers) {
  if (!Array.isArray(numbers) || numbers.length === 0) return 0
  
  const reciprocals = numbers.map(num => isNaN(num) || num === 0 ? 0 : 1 / num)
  const sumReciprocals = sum(reciprocals)
  
  if (sumReciprocals === 0) return 0
  
  return numbers.length / sumReciprocals
}