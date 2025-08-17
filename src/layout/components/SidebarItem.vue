<template>
  <div v-if="!item.meta || !item.meta.hidden">
    <!-- 如果有子路由，显示子菜单 -->
    <el-sub-menu v-if="item.children && item.children.length > 0" :index="resolvePath(item.path)" popper-append-to-body>
      <template #title>
        <el-icon v-if="item.meta && item.meta.icon">
          <component :is="getIconComponent(item.meta.icon)" />
        </el-icon>
        <span>{{ item.meta.title }}</span>
      </template>
      <sidebar-item
        v-for="child in item.children"
        :key="child.path"
        :is-nest="true"
        :item="child"
        :base-path="resolvePath(item.path)"
        class="nest-menu"
      />
    </el-sub-menu>
    
    <!-- 如果没有子路由，显示单个菜单项 -->
    <app-link v-else-if="item.meta" :to="resolvePath(item.path)">
      <el-menu-item :index="resolvePath(item.path)" :class="{'submenu-title-noDropdown':!isNest}">
        <el-icon v-if="item.meta.icon">
          <component :is="getIconComponent(item.meta.icon)" />
        </el-icon>
        <template #title>
          <span>{{ item.meta.title }}</span>
        </template>
      </el-menu-item>
    </app-link>
  </div>
</template>

<script>
import { isExternal } from '@/utils/validate'
import AppLink from './Link'
import { 
  House, 
  User, 
  Document, 
  Bell, 
  CreditCard,
  Files,
  Odometer
} from '@element-plus/icons-vue'

export default {
  name: 'SidebarItem',
  components: { AppLink },
  props: {
    // route object
    item: {
      type: Object,
      required: true
    },
    isNest: {
      type: Boolean,
      default: false
    },
    basePath: {
      type: String,
      default: ''
    }
  },
  data() {
    // TODO: refactor if there's a better way
    this.onlyOneChild = null
    return {}
  },
  methods: {
    resolvePath(routePath) {
      if (isExternal(routePath)) {
        return routePath
      }
      if (isExternal(this.basePath)) {
        return this.basePath
      }
      
      // 如果是子路由（isNest为true），需要拼接父路径
      if (this.isNest) {
        // 子路由的路径应该是父路径 + 子路径
        return this.basePath + '/' + routePath.replace(/^\//, '')
      }
      
      // 对于父路由，直接返回路径
      return routePath
    },
    getIconComponent(iconName) {
      const iconMap = {
        'House': House,
        'User': User,
        'Document': Document,
        'Bell': Bell,
        'CreditCard': CreditCard,
        'Files': Files,
        'Odometer': Odometer
      }
      return iconMap[iconName] || House
    }
  }
}
</script>

<style scoped>
.sidebar-item {
  /* 添加样式 */
}
</style>