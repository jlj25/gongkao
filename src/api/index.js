import request from '@/utils/request'

// 用户管理相关API
export const userApi = {
  // 管理员登录
  login: (data) => request({
    url: '/api/admin/user/login',
    method: 'post',
    data
  }),

  // 修改管理员密码
  resetPassword: (data) => request({
    url: '/api/admin/user/resetPassword',
    method: 'put',
    data
  }),

  // 新增管理员
  add: (data) => request({
    url: '/api/admin/user',
    method: 'post',
    data
  }),

  // 管理员列表查询
  getList: (params) => request({
    url: '/api/admin/user',
    method: 'get',
    params
  }),

  // 修改管理员信息
  update: (id, data) => request({
    url: `/api/admin/user/${id}`,
    method: 'put',
    data
  }),

  // 删除管理员
  delete: (id) => request({
    url: `/api/admin/user/${id}`,
    method: 'delete'
  })
}

// 时政管理相关API
export const politicsApi = {
  // 新增时政
  add: (data) => request({
    url: '/api/admin/politics',
    method: 'post',
    data
  }),

  // 查询时政
  getList: (params) => request({
    url: '/api/admin/politics',
    method: 'get',
    params
  }),

  // 删除时政
  delete: (id) => request({
    url: `/api/admin/politics/${id}`,
    method: 'delete'
  }),

  // 修改时政
  update: (id, data) => request({
    url: `/api/admin/politics/${id}`,
    method: 'put',
    data
  }),

  // 客户端查询时政
  getClientList: (params) => request({
    url: '/api/client/politics',
    method: 'get',
    params
  })
}

// 模拟题管理相关API
export const simulationApi = {
  // 新增模拟题
  add: (data) => request({
    url: '/api/admin/simulation',
    method: 'post',
    data
  }),

  // 查询模拟题
  getList: (params) => request({
    url: '/api/admin/simulation',
    method: 'get',
    params
  }),

  // 修改模拟题
  update: (id, data) => request({
    url: `/api/admin/simulation/${id}`,
    method: 'put',
    data
  }),

  // 删除模拟题
  delete: (id) => request({
    url: `/api/admin/simulation/${id}`,
    method: 'delete'
  }),

  // 客户端查询模拟题
  getClientList: (params) => request({
    url: '/api/client/simulation',
    method: 'get',
    params
  }),

  // 查询所有模拟题类型
  getSubjects: () => request({
    url: '/api/simulation/subject',
    method: 'get'
  })
}

// 招聘公告管理相关API
export const recruitApi = {
  // 新增招聘公告
  add: (data) => request({
    url: '/api/admin/recruit',
    method: 'post',
    data
  }),

  // 查询招聘公告
  getList: (params) => request({
    url: '/api/admin/recruit',
    method: 'get',
    params
  }),

  // 删除招聘公告
  delete: (id) => request({
    url: `/api/admin/recruit/${id}`,
    method: 'delete'
  }),

  // 修改招聘公告
  update: (id, data) => request({
    url: `/api/admin/recruit/${id}`,
    method: 'put',
    data
  }),

  // 客户端查询招聘公告
  getClientList: (params) => request({
    url: '/api/client/recruit',
    method: 'get',
    params
  })
}
