// 表单验证工具函数

// 验证必填字段
export function required(value, message = '此字段为必填项') {
  if (value === undefined || value === null || value === '') {
    return message
  }
  
  if (typeof value === 'string' && value.trim() === '') {
    return message
  }
  
  if (Array.isArray(value) && value.length === 0) {
    return message
  }
  
  return null
}

// 验证最小长度
export function minLength(value, min, message = `长度不能少于 ${min} 个字符`) {
  if (value === undefined || value === null) return null
  
  if (typeof value === 'string' && value.length < min) {
    return message
  }
  
  if (Array.isArray(value) && value.length < min) {
    return message
  }
  
  return null
}

// 验证最大长度
export function maxLength(value, max, message = `长度不能超过 ${max} 个字符`) {
  if (value === undefined || value === null) return null
  
  if (typeof value === 'string' && value.length > max) {
    return message
  }
  
  if (Array.isArray(value) && value.length > max) {
    return message
  }
  
  return null
}

// 验证邮箱格式
export function email(value, message = '请输入有效的邮箱地址') {
  if (value === undefined || value === null || value === '') return null
  
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  if (!emailRegex.test(value)) {
    return message
  }
  
  return null
}

// 验证手机号码格式
export function mobile(value, message = '请输入有效的手机号码') {
  if (value === undefined || value === null || value === '') return null
  
  const mobileRegex = /^1[3-9]\d{9}$/
  if (!mobileRegex.test(value)) {
    return message
  }
  
  return null
}

// 验证固定电话格式
export function telephone(value, message = '请输入有效的电话号码') {
  if (value === undefined || value === null || value === '') return null
  
  const telephoneRegex = /^([0\d]{2,3}-)?[2-9]\d{6,7}(-\d{1,5})?$/
  if (!telephoneRegex.test(value)) {
    return message
  }
  
  return null
}

// 验证身份证号码格式
export function idCard(value, message = '请输入有效的身份证号码') {
  if (value === undefined || value === null || value === '') return null
  
  // 18位身份证号码验证
  const idCardRegex = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
  if (!idCardRegex.test(value)) {
    return message
  }
  
  // 校验码验证
  const weights = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]
  const codes = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2']
  let sum = 0
  
  for (let i = 0; i < 17; i++) {
    sum += parseInt(value[i]) * weights[i]
  }
  
  const mod = sum % 11
  const code = codes[mod]
  
  if (value[17].toUpperCase() !== code) {
    return message
  }
  
  return null
}

// 验证邮政编码
export function postalCode(value, message = '请输入有效的邮政编码') {
  if (value === undefined || value === null || value === '') return null
  
  const postalCodeRegex = /^[1-9]\d{5}$/
  if (!postalCodeRegex.test(value)) {
    return message
  }
  
  return null
}

// 验证数字
export function number(value, message = '请输入有效的数字') {
  if (value === undefined || value === null || value === '') return null
  
  if (isNaN(value)) {
    return message
  }
  
  return null
}

// 验证整数
export function integer(value, message = '请输入整数') {
  if (value === undefined || value === null || value === '') return null
  
  if (!Number.isInteger(Number(value))) {
    return message
  }
  
  return null
}

// 验证最小值
export function min(value, minValue, message = `值不能小于 ${minValue}`) {
  if (value === undefined || value === null || value === '') return null
  
  const numValue = Number(value)
  if (isNaN(numValue) || numValue < minValue) {
    return message
  }
  
  return null
}

// 验证最大值
export function max(value, maxValue, message = `值不能大于 ${maxValue}`) {
  if (value === undefined || value === null || value === '') return null
  
  const numValue = Number(value)
  if (isNaN(numValue) || numValue > maxValue) {
    return message
  }
  
  return null
}

// 验证URL格式
export function url(value, message = '请输入有效的URL') {
  if (value === undefined || value === null || value === '') return null
  
  try {
    new URL(value)
    return null
  } catch (e) {
    return message
  }
}

// 验证日期格式
export function date(value, message = '请输入有效的日期') {
  if (value === undefined || value === null || value === '') return null
  
  const dateObj = new Date(value)
  if (dateObj.toString() === 'Invalid Date' || isNaN(dateObj)) {
    return message
  }
  
  return null
}

// 验证正则表达式
export function pattern(value, regex, message = '格式不正确') {
  if (value === undefined || value === null || value === '') return null
  
  if (!(regex instanceof RegExp)) {
    return '无效的正则表达式'
  }
  
  if (!regex.test(value)) {
    return message
  }
  
  return null
}

// 执行验证规则
export function validate(value, rules) {
  if (!Array.isArray(rules)) {
    throw new Error('验证规则必须是数组')
  }
  
  for (const rule of rules) {
    if (typeof rule === 'function') {
      const result = rule(value)
      if (result !== null) {
        return result
      }
    } else if (typeof rule.validator === 'function') {
      const result = rule.validator(value, rule.value)
      if (result !== null) {
        return result
      }
    }
  }
  
  return null
}

// 批量验证表单数据
export function validateForm(data, rules) {
  const errors = {}
  
  for (const field in rules) {
    if (rules.hasOwnProperty(field)) {
      const value = data[field]
      const fieldRules = rules[field]
      const error = validate(value, fieldRules)
      
      if (error !== null) {
        errors[field] = error
      }
    }
  }
  
  return Object.keys(errors).length > 0 ? errors : null
}