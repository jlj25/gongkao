<template>
  <div class="login-container">
    <div class="login-box">
      <div class="login-header">
        <h2>公考自习室管理系统</h2>
        <p>管理员登录</p>
      </div>
      
      <el-form
        ref="loginForm"
        :model="loginForm"
        :rules="loginRules"
        class="login-form"
        @keyup.enter="handleLogin"
      >
        <el-form-item prop="username">
          <el-input
            v-model="loginForm.username"
            placeholder="请输入用户名"
            prefix-icon="el-icon-user"
            size="large"
          />
        </el-form-item>
        
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            type="password"
            placeholder="请输入密码"
            prefix-icon="el-icon-lock"
            size="large"
            show-password
          />
        </el-form-item>
        
        <el-form-item>
          <el-button
            :loading="loading"
            type="primary"
            size="large"
            class="login-button"
            @click="handleLogin"
          >
            {{ loading ? '登录中...' : '登录' }}
          </el-button>
        </el-form-item>
      </el-form>
      
      <div class="login-footer">
        <p>© 2025 公考自习室管理系统</p>
      </div>
    </div>
  </div>
</template>

<script>
import { userApi } from '@/api'

export default {
  name: 'LoginPage',
  data() {
    return {
      loading: false,
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  
  methods: {
    async handleLogin() {
      this.$refs.loginForm.validate(async (valid) => {
        if (valid) {
          this.loading = true
          try {
            // 开发环境临时登录开关：.env.development 设置 VUE_APP_MOCK_LOGIN=1
            if (
              process.env.NODE_ENV === 'development' &&
              process.env.VUE_APP_MOCK_LOGIN === '1' &&
              this.loginForm.username && this.loginForm.password
            ) {
              const mock = {
                token: 'dev-mock-' + Date.now(),
                id: 1,
                username: this.loginForm.username,
                name: '开发管理员',
                phone: '13800000000'
              }
              localStorage.setItem('token', mock.token)
              localStorage.setItem('userInfo', JSON.stringify(mock))
              this.$store.commit('user/SET_TOKEN', mock.token)
              this.$store.commit('user/SET_USER_INFO', mock)
              this.$message.success('开发模式登录成功')
              this.$router.push('/user/list')
              return
            }
            const response = await userApi.login(this.loginForm)
            
            if (response.code === '200') {
              // 保存用户信息和token到localStorage
              localStorage.setItem('token', response.result.token)
              localStorage.setItem('userInfo', JSON.stringify({
                id: response.result.id,
                username: response.result.username,
                name: response.result.name,
                phone: response.result.phone
              }))
              
              // 保存到Vuex store
              this.$store.commit('user/SET_TOKEN', response.result.token)
              this.$store.commit('user/SET_USER_INFO', {
                id: response.result.id,
                username: response.result.username,
                name: response.result.name,
                phone: response.result.phone
              })
              
              this.$message.success('登录成功')
              
              // 跳转到用户管理页面
              this.$router.push('/user/list')
            } else {
              this.$message.error(response.message || '登录失败')
            }
          } catch (error) {
            console.error('登录失败:', error)
            this.$message.error('登录失败，请检查网络连接')
          } finally {
            this.loading = false
          }
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.login-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #263445 0%, #2b2f3a 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.login-box {
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  padding: 40px;
  width: 100%;
  max-width: 400px;
}

.login-header {
  text-align: center;
  margin-bottom: 30px;
  
  h2 {
    color: #333;
    margin: 0 0 10px 0;
    font-size: 24px;
    font-weight: 600;
  }
  
  p {
    color: #666;
    margin: 0;
    font-size: 14px;
  }
}

.login-form {
  .el-form-item {
    margin-bottom: 20px;
  }
  
  .login-button {
    width: 100%;
    height: 44px;
    font-size: 16px;
    font-weight: 500;
  }
}

.login-footer {
  text-align: center;
  margin-top: 30px;
  
  p {
    color: #999;
    font-size: 12px;
    margin: 0;
  }
}

// 响应式设计
@media (max-width: 480px) {
  .login-box {
    padding: 30px 20px;
  }
  
  .login-header h2 {
    font-size: 20px;
  }
}
</style>