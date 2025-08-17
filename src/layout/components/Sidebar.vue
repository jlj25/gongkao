<template>
  <div :class="{'has-logo':showLogo}" class="sidebar-container">
    <SidebarLogo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <!-- 调试信息 -->
      <div v-if="false" style="padding: 10px; color: white; font-size: 12px;">
        <div>当前路由: {{ $route.path }}</div>
        <div>路由数量: {{ permission_routers.length }}</div>
        <div>路由数据: {{ JSON.stringify(permission_routers.map(r => ({ 
          path: r.path, 
          title: r.meta?.title,
          children: r.children?.length || 0,
          hidden: r.hidden
        })), null, 2) }}</div>
      </div>
      
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
        style="background-color: #2b2f3a !important"
      >
        <sidebar-item
          v-for="route in permission_routers"
          :key="route.path"
          :item="route"
          :base-path="route.path"
        />
        <!-- 如果没有路由数据，显示默认菜单 -->
        <div v-if="permission_routers.length === 0" style="padding: 20px; color: white;">
          <div>正在加载菜单...</div>
        </div>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarLogo from './SidebarLogo'
import SidebarItem from './SidebarItem'

export default {
  name: 'SidebarComponent',
  components: { SidebarItem, SidebarLogo },
  computed: {
    ...mapGetters([
      'sidebar',
      'permission_routers',
      'variables'
    ]),
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      return meta.activeMenu || path
    },
    showLogo() {
      return this.$store.state.settings.showSidebarLogo
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  }
}
</script>