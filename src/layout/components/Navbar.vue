<template>
  <div class="navbar">
    <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />

    <breadcrumb class="breadcrumb-container" />

    <div class="right-menu">
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <el-avatar :size="40" :src="avatar" class="user-avatar">
            {{ name ? name.charAt(0) : 'A' }}
          </el-avatar>
          <span class="user-info">
            <span class="user-name">{{ name || '管理员' }}</span>
            <span class="user-phone" v-if="userInfo && userInfo.phone">{{ userInfo.phone }}</span>
          </span>
          <el-icon class="el-icon-caret-bottom"><ArrowDown /></el-icon>
        </div>
        <template #dropdown>
          <el-dropdown-menu class="user-dropdown">
            <el-dropdown-item>
              <div class="user-dropdown-info">
                <div class="user-name">{{ name || '管理员' }}</div>
                <div class="user-phone" v-if="userInfo && userInfo.phone">{{ userInfo.phone }}</div>
              </div>
            </el-dropdown-item>
            <el-dropdown-item divided @click="logout">
              <el-icon><SwitchButton /></el-icon>
              <span>退出登录</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { ArrowDown, SwitchButton } from '@element-plus/icons-vue'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'

export default {
  name: 'NavbarComponent',
  components: { Breadcrumb, Hamburger, ArrowDown, SwitchButton },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      'name'
    ]),
    userInfo() {
      return this.$store.state.user.userInfo
    }
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    logout() {
      // 清除localStorage
      localStorage.removeItem('token')
      localStorage.removeItem('userInfo')
      
      // 清除store状态
      this.$store.commit('user/SET_TOKEN', '')
      this.$store.commit('user/SET_NAME', '')
      this.$store.commit('user/SET_AVATAR', '')
      this.$store.commit('user/SET_USER_INFO', null)
      
      this.$message.success('退出成功')
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;
        display: flex;
        align-items: center;
        cursor: pointer;
        padding: 0 8px;
        border-radius: 4px;
        transition: background-color 0.3s;

        &:hover {
          background-color: rgba(0, 0, 0, 0.025);
        }

        .user-avatar {
          margin-right: 8px;
        }

        .user-info {
          display: flex;
          flex-direction: column;
          margin-right: 8px;

          .user-name {
            font-size: 14px;
            font-weight: 500;
            color: #333;
            line-height: 1.2;
          }

          .user-phone {
            font-size: 12px;
            color: #999;
            line-height: 1.2;
          }
        }

        .el-icon-caret-bottom {
          font-size: 12px;
          color: #999;
        }
      }
    }

    .user-dropdown {
      .user-dropdown-info {
        padding: 8px 0;

        .user-name {
          font-size: 14px;
          font-weight: 500;
          color: #333;
          margin-bottom: 4px;
        }

        .user-phone {
          font-size: 12px;
          color: #999;
        }
      }
    }
  }
}
</style>