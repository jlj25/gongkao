import store from '@/store'

/**
 * @param {Array} value
 * @returns {Boolean}
 * @example see @/views/permission/directive.vue
 */
export function checkPermission(value) {
  if (!value || !Array.isArray(value)) {
    return false
  }
  const roles = store.getters && store.getters.roles
  return roles.some(role => value.includes(role))
}

// 检查用户是否具有指定权限
export function hasPermission(userPermissions, requiredPermission) {
  if (!userPermissions || !requiredPermission) return false
  
  // 如果用户权限是数组
  if (Array.isArray(userPermissions)) {
    return userPermissions.includes(requiredPermission)
  }
  
  // 如果用户权限是对象
  if (typeof userPermissions === 'object') {
    return !!userPermissions[requiredPermission]
  }
  
  // 如果用户权限是字符串
  if (typeof userPermissions === 'string') {
    return userPermissions === requiredPermission
  }
  
  return false
}

// 检查用户是否具有任意一个指定权限
export function hasAnyPermission(userPermissions, requiredPermissions) {
  if (!userPermissions || !requiredPermissions || !requiredPermissions.length) return false
  
  // 如果用户权限是数组
  if (Array.isArray(userPermissions)) {
    return requiredPermissions.some(permission => userPermissions.includes(permission))
  }
  
  // 如果用户权限是对象
  if (typeof userPermissions === 'object') {
    return requiredPermissions.some(permission => !!userPermissions[permission])
  }
  
  // 如果用户权限是字符串
  if (typeof userPermissions === 'string') {
    return requiredPermissions.includes(userPermissions)
  }
  
  return false
}

// 检查用户是否具有所有指定权限
export function hasAllPermissions(userPermissions, requiredPermissions) {
  if (!userPermissions || !requiredPermissions || !requiredPermissions.length) return false
  
  // 如果用户权限是数组
  if (Array.isArray(userPermissions)) {
    return requiredPermissions.every(permission => userPermissions.includes(permission))
  }
  
  // 如果用户权限是对象
  if (typeof userPermissions === 'object') {
    return requiredPermissions.every(permission => !!userPermissions[permission])
  }
  
  // 如果用户权限是字符串
  if (typeof userPermissions === 'string') {
    return requiredPermissions.length === 1 && requiredPermissions[0] === userPermissions
  }
  
  return false
}

// 获取用户角色
export function getUserRole(user) {
  if (!user) return ''
  
  // 如果用户对象有 role 属性
  if (user.role) {
    return user.role
  }
  
  // 如果用户对象有 roles 属性（数组）
  if (user.roles && Array.isArray(user.roles)) {
    return user.roles[0] || ''
  }
  
  return ''
}

// 检查用户是否具有指定角色
export function hasRole(user, requiredRole) {
  if (!user || !requiredRole) return false
  
  // 如果用户对象有 role 属性
  if (user.role) {
    return user.role === requiredRole
  }
  
  // 如果用户对象有 roles 属性（数组）
  if (user.roles && Array.isArray(user.roles)) {
    return user.roles.includes(requiredRole)
  }
  
  return false
}

// 检查用户是否具有任意一个指定角色
export function hasAnyRole(user, requiredRoles) {
  if (!user || !requiredRoles || !requiredRoles.length) return false
  
  // 如果用户对象有 role 属性
  if (user.role) {
    return requiredRoles.includes(user.role)
  }
  
  // 如果用户对象有 roles 属性（数组）
  if (user.roles && Array.isArray(user.roles)) {
    return requiredRoles.some(role => user.roles.includes(role))
  }
  
  return false
}

// 检查路由权限
export function checkRoutePermission(route, userPermissions) {
  if (!route || !route.meta) return true
  
  const { permission, permissions, role, roles } = route.meta
  
  // 检查单个权限
  if (permission && !hasPermission(userPermissions, permission)) {
    return false
  }
  
  // 检查多个权限（需要全部拥有）
  if (permissions && !hasAllPermissions(userPermissions, permissions)) {
    return false
  }
  
  // 检查角色
  if (role && !hasRole(route.meta.user || {}, role)) {
    return false
  }
  
  // 检查多个角色（需要拥有任意一个）
  if (roles && !hasAnyRole(route.meta.user || {}, roles)) {
    return false
  }
  
  return true
}

// 检查按钮权限
export function checkButtonPermission(requiredPermission) {
  if (!requiredPermission) return true
  
  const permissions = store.getters && store.getters.permissions
  if (!permissions || !permissions.length) return false
  
  return hasPermission(permissions, requiredPermission)
}

// 获取用户权限列表
export function getUserPermissions() {
  return store.getters && store.getters.permissions || []
}

// 获取用户角色列表
export function getUserRoles() {
  return store.getters && store.getters.roles || []
}