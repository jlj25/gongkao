<template>
  <div class="not-found">
    <div class="not-found-content">
      <h1 class="error-code">404</h1>
      <h2 class="error-title">页面不存在</h2>
      <p class="error-desc">抱歉，您访问的页面不存在或已被删除</p>
      <div class="actions">
        <el-button type="primary" @click="goHome">返回首页</el-button>
        <el-button @click="goBack">返回上页</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NotFound',
  methods: {
    goHome() {
      this.$router.push('/')
    },
    goBack() {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss" scoped>
.not-found {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  
  .not-found-content {
    text-align: center;
    color: white;
    
    .error-code {
      font-size: 120px;
      font-weight: bold;
      margin: 0;
      text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
    }
    
    .error-title {
      font-size: 32px;
      margin: 20px 0;
      font-weight: 500;
    }
    
    .error-desc {
      font-size: 18px;
      margin: 20px 0 40px 0;
      opacity: 0.9;
    }
    
    .actions {
      .el-button {
        margin: 0 10px;
        padding: 12px 24px;
        font-size: 16px;
      }
    }
  }
}
</style>