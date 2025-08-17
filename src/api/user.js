import request from '@/utils/request'

// 管理员登录
export function login(data) {
  return request({
    url: '/api/admin/user/login',
    method: 'post',
    data
  })
}

// 获取管理员信息
export function getInfo(token) {
  return request({
    url: '/api/admin/user/info',
    method: 'get',
    params: { token }
  })
}

// 管理员登出
export function logout() {
  return request({
    url: '/api/admin/user/logout',
    method: 'post'
  })
}

// 修改管理员自己的密码
export function resetPassword(data) {
  return request({
    url: '/api/admin/user/resetPassword',
    method: 'put',
    data
  })
}

// 新增管理员
export function addUser(data) {
  return request({
    url: '/api/admin/user',
    method: 'post',
    data
  })
}

// 管理员列表查询
export function getUserList(params) {
  return request({
    url: '/api/admin/user',
    method: 'get',
    params
  })
}

// 修改管理员信息
export function updateUser(id, data) {
  return request({
    url: `/api/admin/user/${id}`,
    method: 'put',
    data
  })
}

// 删除管理员
export function deleteUser(id) {
  return request({
    url: `/api/admin/user/${id}`,
    method: 'delete'
  })
}