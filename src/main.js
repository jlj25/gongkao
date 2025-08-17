import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import directive from './directive'
import { setupGlobalErrorHandling } from './utils/logger'

// 导入Element Plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

// 导入样式
import '@/styles/index.scss'

const app = createApp(App)

// 注册Element Plus图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(router)
app.use(store)
app.use(ElementPlus)
app.use(directive)

// 设置全局错误处理
setupGlobalErrorHandling(app)

app.mount('#app')
