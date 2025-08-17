// 国际化工具函数

// 存储当前语言
let currentLanguage = 'zh-CN'

// 语言包
const languagePack = {
  'zh-CN': {
    // 通用
    'common.confirm': '确认',
    'common.cancel': '取消',
    'common.submit': '提交',
    'common.reset': '重置',
    'common.delete': '删除',
    'common.edit': '编辑',
    'common.view': '查看',
    'common.search': '搜索',
    'common.refresh': '刷新',
    
    // 登录
    'login.title': '用户登录',
    'login.username': '用户名',
    'login.password': '密码',
    'login.rememberMe': '记住我',
    'login.forgetPassword': '忘记密码',
    'login.login': '登录',
    
    // 导航栏
    'navbar.dashboard': '首页',
    'navbar.logout': '退出登录',
    
    // 侧边栏
    'sidebar.userManage': '用户管理',
    'sidebar.roleManage': '角色管理',
    'sidebar.permissionManage': '权限管理',
    
    // 用户管理
    'user.list': '用户列表',
    'user.add': '新增用户',
    'user.edit': '编辑用户',
    'user.delete': '删除用户',
    'user.username': '用户名',
    'user.name': '姓名',
    'user.email': '邮箱',
    'user.phone': '电话',
    'user.status': '状态',
    'user.role': '角色',
    'user.createTime': '创建时间',
    'user.operation': '操作'
  },
  'en-US': {
    // 通用
    'common.confirm': 'Confirm',
    'common.cancel': 'Cancel',
    'common.submit': 'Submit',
    'common.reset': 'Reset',
    'common.delete': 'Delete',
    'common.edit': 'Edit',
    'common.view': 'View',
    'common.search': 'Search',
    'common.refresh': 'Refresh',
    
    // 登录
    'login.title': 'User Login',
    'login.username': 'Username',
    'login.password': 'Password',
    'login.rememberMe': 'Remember Me',
    'login.forgetPassword': 'Forget Password',
    'login.login': 'Login',
    
    // 导航栏
    'navbar.dashboard': 'Dashboard',
    'navbar.logout': 'Logout',
    
    // 侧边栏
    'sidebar.userManage': 'User Management',
    'sidebar.roleManage': 'Role Management',
    'sidebar.permissionManage': 'Permission Management',
    
    // 用户管理
    'user.list': 'User List',
    'user.add': 'Add User',
    'user.edit': 'Edit User',
    'user.delete': 'Delete User',
    'user.username': 'Username',
    'user.name': 'Name',
    'user.email': 'Email',
    'user.phone': 'Phone',
    'user.status': 'Status',
    'user.role': 'Role',
    'user.createTime': 'Create Time',
    'user.operation': 'Operation'
  }
}

// 设置语言
export function setLanguage(lang) {
  if (languagePack[lang]) {
    currentLanguage = lang
  }
}

// 获取当前语言
export function getCurrentLanguage() {
  return currentLanguage
}

// 翻译文本
export function translate(key) {
  const pack = languagePack[currentLanguage]
  return pack && pack[key] ? pack[key] : key
}

// 获取语言包
export function getLanguagePack() {
  return languagePack[currentLanguage]
}