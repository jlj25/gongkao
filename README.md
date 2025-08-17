# 公考自习室管理系统

## 项目简介

公考自习室管理系统是一个基于Vue 3 + Element Plus的管理后台系统，主要用于管理公考相关的自习室、用户、时政资讯、模拟题和招聘公告等功能。

## 技术栈

- **前端框架**: Vue 3
- **UI组件库**: Element Plus
- **状态管理**: Vuex 4
- **路由管理**: Vue Router 4
- **构建工具**: Vue CLI
- **样式预处理器**: SCSS
- **HTTP客户端**: Axios

## 功能模块

### 1. 用户管理
- 管理员列表查询
- 新增管理员
- 编辑管理员信息
- 删除管理员
- 修改密码

### 2. 时政管理
- 时政资讯列表
- 发布时政资讯
- 编辑时政资讯
- 删除时政资讯

### 3. 模拟题管理
- 模拟题列表
- 新增模拟题
- 编辑模拟题
- 删除模拟题
- 按科目分类

### 4. 招聘公告管理
- 招聘公告列表
- 发布招聘公告
- 编辑招聘公告
- 删除招聘公告
- 时间状态管理

### 5. 自习室管理（待开发）
- 自习室列表
- 新增自习室
- 座位管理
- 预约管理

### 6. 卡券管理（待开发）
- 卡券套餐管理
- 用户购买记录
- 有效期管理

## 项目结构

```
gongkao-management/
├── public/                 # 静态资源
├── src/
│   ├── api/               # API接口
│   ├── assets/            # 资源文件
│   ├── components/        # 公共组件
│   ├── directive/         # 自定义指令
│   ├── layout/            # 布局组件
│   ├── mixins/            # 混入
│   ├── router/            # 路由配置
│   ├── store/             # 状态管理
│   ├── styles/            # 样式文件
│   ├── utils/             # 工具函数
│   ├── views/             # 页面组件
│   ├── App.vue            # 根组件
│   └── main.js            # 入口文件
├── .gitignore             # Git忽略文件
├── babel.config.js        # Babel配置
├── jsconfig.json          # JavaScript配置
├── package.json           # 依赖配置
├── vue.config.js          # Vue配置
└── README.md              # 项目说明
```

## 安装和运行

### 环境要求
- Node.js >= 14.0.0
- npm >= 6.0.0

### 安装依赖
```bash
npm install
```

### 开发环境运行
```bash
npm run serve
```

### 生产环境构建
```bash
npm run build
```

### 代码检查
```bash
npm run lint
```

## 开发指南

### 1. 添加新页面
1. 在 `src/views/` 目录下创建新的页面组件
2. 在 `src/router/index.js` 中添加路由配置
3. 在侧边栏菜单中添加对应的菜单项

### 2. 添加新API
1. 在 `src/api/index.js` 中添加新的API方法
2. 在对应的页面组件中调用API

### 3. 添加新组件
1. 在 `src/components/` 目录下创建新组件
2. 在需要使用的页面中导入并使用

### 4. 样式规范
- 使用SCSS作为样式预处理器
- 遵循BEM命名规范
- 使用Element Plus的设计规范

## 部署说明

### 1. 构建项目
```bash
npm run build
```

### 2. 部署到服务器
将 `dist/` 目录下的文件部署到Web服务器

### 3. 环境变量配置
创建 `.env.production` 文件配置生产环境变量

## 注意事项

1. **API接口**: 项目使用模拟数据，实际使用时需要配置真实的API接口
2. **权限管理**: 当前版本使用简单的角色权限，可根据实际需求扩展
3. **数据验证**: 所有表单都有基本的数据验证，可根据业务需求调整
4. **响应式设计**: 页面支持响应式布局，适配不同屏幕尺寸

## 更新日志

### v1.0.0 (2025-01-15)
- 完成基础框架搭建
- 实现用户管理模块
- 实现时政管理模块
- 实现模拟题管理模块
- 实现招聘公告管理模块
- 完成基础UI组件和布局

## 贡献指南

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开 Pull Request

## 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

## 联系方式

如有问题或建议，请通过以下方式联系：

- 项目Issues: [GitHub Issues](https://github.com/your-username/gongkao-management/issues)
- 邮箱: your-email@example.com

## 致谢

感谢所有为这个项目做出贡献的开发者和用户。
