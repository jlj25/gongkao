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
            <el-dropdown-item @click="openChangePassword">
              <el-icon><SwitchButton /></el-icon>
              <span>修改密码</span>
            </el-dropdown-item>
            <el-dropdown-item divided @click="logout">
              <el-icon><SwitchButton /></el-icon>
              <span>退出登录</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>

    <!-- 修改密码对话框 -->
    <el-dialog
      v-model="changePwdDialogVisible"
      title="修改密码"
      width="420px"
      destroy-on-close
    >
      <el-form ref="changePwdFormRef" :model="changePwdForm" :rules="changePwdRules" label-width="100px">
        <el-form-item label="旧密码" prop="oldPassword">
          <el-input v-model="changePwdForm.oldPassword" type="password" placeholder="请输入旧密码" show-password />
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword">
          <el-input v-model="changePwdForm.newPassword" type="password" placeholder="请输入新密码" show-password />
        </el-form-item>
        <el-form-item label="确认新密码" prop="confirmPassword">
          <el-input v-model="changePwdForm.confirmPassword" type="password" placeholder="请再次输入新密码" show-password />
        </el-form-item>
      </el-form>
      <template #footer>
        <div style="text-align:right;">
          <el-button @click="changePwdDialogVisible = false">取消</el-button>
          <el-button type="primary" :loading="changePwdSubmitting" @click="submitChangePassword">确定</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { ArrowDown, SwitchButton } from '@element-plus/icons-vue'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import { userApi } from '@/api'

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
  data() {
    const validateConfirm = (rule, value, callback) => {
      if (!value) return callback(new Error('请再次输入新密码'))
      if (value !== this.changePwdForm.newPassword) return callback(new Error('两次输入的密码不一致'))
      callback()
    }
    return {
      changePwdDialogVisible: false,
      changePwdSubmitting: false,
      changePwdForm: {
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
      },
      changePwdRules: {
        oldPassword: [{ required: true, message: '请输入旧密码', trigger: 'blur' }],
        newPassword: [
          { required: true, message: '请输入新密码', trigger: 'blur' },
          { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
        ],
        confirmPassword: [{ validator: validateConfirm, trigger: 'blur' }]
      }
    }
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    openChangePassword() {
      this.changePwdForm = { oldPassword: '', newPassword: '', confirmPassword: '' }
      this.changePwdDialogVisible = true
      this.$nextTick(() => {
        this.$refs.changePwdFormRef && this.$refs.changePwdFormRef.clearValidate()
      })
    },
    async submitChangePassword() {
      this.$refs.changePwdFormRef.validate(async (valid) => {
        if (!valid) return
        this.changePwdSubmitting = true
        try {
          const payload = {
            oldPassword: this.changePwdForm.oldPassword,
            newPassword: this.changePwdForm.newPassword
          }
          const res = await userApi.resetPassword(payload)
          if (res.code === '200') {
            this.$message.success('修改成功，请重新登录')
            this.changePwdDialogVisible = false
            // 清理并跳登录
            localStorage.removeItem('token')
            localStorage.removeItem('userInfo')
            this.$store.commit('user/SET_TOKEN', '')
            this.$store.commit('user/SET_USER_INFO', null)
            this.$router.push('/login')
          } else {
            this.$message.error(res.message || '修改失败')
          }
        } catch (e) {
          console.error('修改密码失败:', e)
          this.$message.error('修改密码失败')
        } finally {
          this.changePwdSubmitting = false
        }
      })
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
</style>